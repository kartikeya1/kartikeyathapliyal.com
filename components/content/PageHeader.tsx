export function PageHeader({
  title,
  dek,
}: {
  title: string;
  /** One sentence. */
  dek?: string;
}) {
  return (
    <div data-box>
      <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
      {dek && <p className="mt-3 max-w-[62ch] text-muted">{dek}</p>}
    </div>
  );
}
