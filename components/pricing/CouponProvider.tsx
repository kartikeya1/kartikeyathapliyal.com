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

/**
 * One message for every failure mode, deliberately.
 *
 * A visitor can't act differently on "expired" versus "never existed"
 * versus "the sheet was unreachable" - in all three cases the outcome is
 * the same and the advice is the same. Collapsing them also avoids
 * confirming that a code exists but is switched off, which would otherwise
 * let someone enumerate retired codes.
 *
 * The distinction is kept in the console for debugging, since the one case
 * that isn't the visitor's fault (`unavailable`) is worth being able to
 * spot in the field.
 */
const NOT_FOUND =
  "No such promotional code. Check the spelling, or it may no longer be running.";

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
      if (result.reason === "unavailable") {
        // Not the visitor's fault - surfaced only here so a sheet outage is
        // diagnosable without showing them a different message.
        console.warn(
          "[coupon] lookup failed - the coupon sheet was unreachable or malformed. Check that it is still shared as 'Anyone with the link - Viewer'.",
        );
      }
      setStatus({ state: "error", message: NOT_FOUND });
      return;
    }

    setCoupon(result.coupon);
    setStatus({ state: "applied", coupon: result.coupon });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result.coupon));
    } catch {
      // Storage blocked - the coupon just won't survive navigation.
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
    // A `?code=` in the URL wins over a stored one - that's how an ad or a
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
      // Re-validated against the sheet, never trusted from the URL - so a
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
      // Corrupt entry - ignore it and start clean.
    }
  }, [apply]);

  return (
    <Ctx.Provider value={{ coupon, status, apply, clear }}>
      {children}
    </Ctx.Provider>
  );
}
