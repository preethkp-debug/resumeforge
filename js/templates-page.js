// Templates gallery page: render all templates
(function() {
  const grid = document.getElementById('templates-grid');
  if (!grid) return;
  grid.innerHTML = TEMPLATES.map(t => renderTemplatePreviewCard(t)).join('');
})();
