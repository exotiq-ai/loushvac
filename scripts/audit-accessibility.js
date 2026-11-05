// Browser QA helper; no dependency installation and never included in the site build.
// Serve scripts/ on localhost:4318, load this script from the built-site browser,
// then await auditLousAccessibility(). Uses pinned axe-core from its public CDN.
window.auditLousAccessibility = async function ({paths, widths = [390, 1440]} = {}) {
  if (!paths) {
    const xml = await (await fetch('/sitemap-0.xml')).text();
    paths = [...new DOMParser().parseFromString(xml, 'application/xml').querySelectorAll('loc')].map(n => new URL(n.textContent).pathname);
    paths.push('/404.html');
  }
  const results = [];
  for (const width of widths) {
    for (const path of paths) {
      const frame = document.createElement('iframe');
      frame.title = `Accessibility QA: ${path}`;
      frame.style.cssText = `position:fixed;top:0;left:0;width:${width}px;height:1000px;z-index:2147483647;border:0;background:white`;
      try {
        const loaded = new Promise((resolve, reject) => {
          frame.onload = resolve;
          frame.onerror = reject;
        });
        frame.src = new URL(path, location.origin).href;
        document.body.append(frame);
        await loaded;
        const w = frame.contentWindow;
        if (!w.document.querySelector('main')) throw new Error(`No main content at ${path}`);
        await w.document.fonts.ready;
        const axeScript = w.document.createElement('script');
        const ready = new Promise((resolve, reject) => {
          axeScript.onload = resolve;
          axeScript.onerror = reject;
        });
        axeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js';
        w.document.head.append(axeScript);
        await ready;
        const audit = await w.axe.run(w.document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa']}});
        const result = {
          path, width: w.innerWidth,
          overflow: w.document.documentElement.scrollWidth > w.innerWidth,
          canonical: w.document.querySelector('link[rel="canonical"]')?.href,
          violations: audit.violations.map(v => ({id: v.id, nodes: v.nodes.map(n => ({target: n.target, summary: n.failureSummary}))})),
          manualReview: audit.incomplete.map(v => ({id: v.id, count: v.nodes.length})),
        };
        results.push(result);
      } finally {
        frame.remove();
      }
    }
  }
  window.lousAuditResults = results;
  const failures = results.filter(r => r.overflow || r.violations.length);
  return {checks: results.length, failures, manualReviewChecks: results.filter(r => r.manualReview.length).length};
};
