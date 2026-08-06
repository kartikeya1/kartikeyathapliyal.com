/**
 * Sets `data-theme` on <html> synchronously, before the body parses, so there
 * is never a frame of the wrong theme.
 *
 * Must be rendered as the first child of <head>. The server deliberately emits
 * no `data-theme` attribute — this script adds it — which is why <html> carries
 * `suppressHydrationWarning`.
 *
 * Hand-minified on purpose: this is a blocking script and every byte is in the
 * critical path.
 */
const script = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
