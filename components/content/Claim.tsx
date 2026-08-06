import { claimById, type ClaimId } from "@/lib/claims";

/**
 * The only way a metric may render on the site. `id` is typed against the
 * claim registry, so a typo'd id is a compile error — that's the sync
 * guarantee between rendered copy and lib/claims.ts.
 */
export function Claim({ id }: { id: ClaimId }) {
  const claim = claimById(id);
  return <span data-claim-id={id}>{claim.text}</span>;
}
