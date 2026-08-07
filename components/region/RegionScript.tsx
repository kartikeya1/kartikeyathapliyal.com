/**
 * Sets `data-region` on <html> before the priced content is parsed, exactly
 * like ThemeScript and CurrencyScript - an explicit choice wins, otherwise
 * the timezone decides.
 *
 * Both regions' prices ship in the static HTML and CSS picks one, so the
 * page is correct with JavaScript disabled, correct for crawlers, and free
 * of both a flash and a hydration mismatch. The server emits no
 * `data-region`, so React has nothing to disagree with.
 *
 * Rendered inside the /lab/services subtree rather than the root <head>:
 * it is a prototype mechanism, and every element it governs appears after
 * it in document order, which is all the guarantee that is needed. An
 * inline script is not hoisted by React, so that ordering holds.
 *
 * Mirrors inferRegion() in lib/regions.ts. Duplicated rather than imported
 * because this has to be a string that runs before any bundle loads.
 */
const script = `(function(){try{
var s=localStorage.getItem('region');
var r=(s==='in'||s==='intl')?s:(/Asia\\/(Kolkata|Calcutta)/i.test(Intl.DateTimeFormat().resolvedOptions().timeZone||'')?'in':'intl');
document.documentElement.dataset.region=r;
}catch(e){document.documentElement.dataset.region='in'}})()`;

export function RegionScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
