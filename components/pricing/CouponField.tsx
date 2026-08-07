"use client";

import { useState } from "react";
import { useCoupon } from "./CouponProvider";

export function CouponField() {
  const { coupon, status, apply, clear } = useCoupon();
  const [value, setValue] = useState("");

  const checking = status.state === "checking";

  if (coupon) {
    return (
      <div data-box className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-[var(--radius)] border border-price-cut px-3 py-1.5 text-xs text-price-cut">
          {coupon.code} applied · extra {Math.round(coupon.discount * 100)}% off
        </span>
        <button
          type="button"
          onClick={() => {
            clear();
            setValue("");
          }}
          className="text-xs text-muted underline hover:text-text"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div data-box className="space-y-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim() && !checking) void apply(value);
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <label htmlFor="coupon" className="sr-only">
          Coupon code
        </label>
        <input
          id="coupon"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Coupon code"
          autoComplete="off"
          spellCheck={false}
          className="rounded-[var(--radius)] border border-border bg-bg px-3 py-2 text-sm uppercase placeholder:normal-case placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!value.trim() || checking}
          className="rounded-[var(--radius)] border border-border px-4 py-2 text-sm hover:border-text disabled:opacity-50"
        >
          {checking ? "Checking…" : "Apply"}
        </button>
      </form>

      {status.state === "error" && (
        <p role="alert" className="text-xs text-price-cut">
          {status.message}
        </p>
      )}
    </div>
  );
}
