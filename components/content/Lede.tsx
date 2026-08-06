/** At most two sentences. */
export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[62ch] text-muted">{children}</p>;
}
