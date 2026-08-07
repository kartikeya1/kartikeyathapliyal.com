/**
 * Sets `data-currency` on <html> before first paint, exactly like
 * ThemeScript - an explicit choice wins, otherwise the timezone decides.
 *
 * Visibility is then pure CSS, so both currencies ship in the static HTML
 * and the correct one is showing before hydration. That is what avoids both
 * a flash and a hydration mismatch: the server emits no `data-currency`, so
 * there is nothing for React to disagree with.
 */
const script = `(function(){try{
var s=localStorage.getItem('currency');
var c=(s==='inr'||s==='usd')?s:(/Asia\\/(Kolkata|Calcutta)/i.test(Intl.DateTimeFormat().resolvedOptions().timeZone||'')?'inr':'usd');
document.documentElement.dataset.currency=c;
}catch(e){document.documentElement.dataset.currency='inr'}})()`;

export function CurrencyScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
