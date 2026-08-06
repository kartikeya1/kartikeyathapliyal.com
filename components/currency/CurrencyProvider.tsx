"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FALLBACK_RATE,
  type Currency,
  type FxRate,
  loadRate,
  readStoredCurrency,
  inferCurrency,
  storeCurrency,
} from "@/lib/currency";

interface CurrencyState {
  currency: Currency;
  rate: FxRate;
  setCurrency: (c: Currency) => void;
}

/**
 * Initial state deliberately matches what the server rendered — the
 * build-time rate and INR. Everything real happens in an effect *after*
 * hydration, so React never sees a mismatch.
 */
const Ctx = createContext<CurrencyState>({
  currency: "inr",
  rate: FALLBACK_RATE,
  setCurrency: () => {},
});

export const useCurrency = () => useContext(Ctx);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("inr");
  const [rate, setRate] = useState<FxRate>(FALLBACK_RATE);

  useEffect(() => {
    setCurrencyState(readStoredCurrency() ?? inferCurrency());
    let cancelled = false;
    loadRate().then((r) => {
      if (!cancelled) setRate(r);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    storeCurrency(c);
    // The attribute drives CSS visibility; React only owns the USD number.
    document.documentElement.dataset.currency = c;
  }, []);

  return (
    <Ctx.Provider value={{ currency, rate, setCurrency }}>
      {children}
    </Ctx.Provider>
  );
}
