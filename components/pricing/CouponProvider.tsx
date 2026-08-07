"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { lookupCoupon, type Coupon } from "@/lib/coupons";

export type CouponStatus =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "applied"; coupon: Coupon }
  | { state: "error"; message: string };

interface CouponState {
  coupon: Coupon | null;
  status: CouponStatus;
  apply: (code: string) => Promise<void>;
  clear: () => void;
}

const STORAGE_KEY = "coupon";

const Ctx = createContext<CouponState>({
  coupon: null,
  status: { state: "idle" },
  apply: async () => {},
  clear: () => {},
});

export const useCoupon = () => useContext(Ctx);

const MESSAGES = {
  unknown: "That code isn't valid. Check the spelling and try again.",
  inactive: "That code has expired.",
  unavailable:
    "Couldn't check the code just now — prices below are unchanged. Try again in a moment.",
} as const;

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [status, setStatus] = useState<CouponStatus>({ state: "idle" });

  const apply = useCallback(async (code: string) => {
    setStatus({ state: "checking" });
    const result = await lookupCoupon(code);

    if (!result.ok) {
      setCoupon(null);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Storage blocked; nothing to clean up.
      }
      setStatus({ state: "error", message: MESSAGES[result.reason] });
      return;
    }

    setCoupon(result.coupon);
    setStatus({ state: "applied", coupon: result.coupon });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result.coupon));
    } catch {
      // Storage blocked — the coupon just won't survive navigation.
    }
  }, []);

  const clear = useCallback(() => {
    setCoupon(null);
    setStatus({ state: "idle" });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to do.
    }
  }, []);

  useEffect(() => {
    // A `?code=` in the URL wins over a stored one — that's how an ad or a
    // LinkedIn post hands someone a pre-applied discount. Read from
    // location.search rather than Next's searchParams: the server-side hook
    // would opt this route out of static rendering and fail check-static.
    let fromUrl: string | null = null;
    try {
      fromUrl = new URLSearchParams(window.location.search).get("code");
    } catch {
      // Malformed URL; fall through to the stored coupon.
    }

    if (fromUrl) {
      // Re-validated against the sheet, never trusted from the URL — so a
      // retired code in an old ad stops working the moment it's deactivated.
      void apply(fromUrl);
      return;
    }

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Coupon;
      if (typeof parsed?.code === "string" && typeof parsed?.discount === "number") {
        setCoupon(parsed);
        setStatus({ state: "applied", coupon: parsed });
      }
    } catch {
      // Corrupt entry — ignore it and start clean.
    }
  }, [apply]);

  return (
    <Ctx.Provider value={{ coupon, status, apply, clear }}>
      {children}
    </Ctx.Provider>
  );
}
