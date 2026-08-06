/**
 * Phase 3 only. Applies the saved design direction before first paint, the
 * same way ThemeScript applies the theme — otherwise switching directions
 * would flash direction A on every navigation.
 *
 * Deleted along with DesignSwitcher once a direction is chosen.
 */
const script = `(function(){try{var d=localStorage.getItem('design');if(d==='b'||d==='c'){document.documentElement.dataset.design=d}}catch(e){}})()`;

export function DesignScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
