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
      {/*
        Password managers ignore `autocomplete="off"` almost universally, and
        Safari/iCloud Keychain classifies a lone text input inside a <form>
        as the username step of a username-first login — which is why it was
        offering to autofill passwords here.

        No single attribute fixes this, so the standard mitigations are
        layered: an explicit non-credential `name`, `autocomplete="off"` on
        both the form and the field, and the per-vendor opt-outs. The form is
        kept so Enter still submits.
      */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim() && !checking) void apply(value);
        }}
        autoComplete="off"
        className="flex flex-wrap items-center gap-2"
      >
        <label htmlFor="coupon-code" className="sr-only">
          Coupon code
        </label>
        <input
          id="coupon-code"
          name="coupon-code"
          type="text"
          inputMode="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Coupon code"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck={false}
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
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
