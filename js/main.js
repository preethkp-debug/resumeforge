// Landing page: render a 3-template preview row
(function() {
  const grid = document.getElementById('home-templates');
  if (!grid) return;
  const featured = TEMPLATES.slice(0, 3);
  grid.innerHTML = featured.map(t => renderTemplatePreviewCard(t)).join('');
})();
