/* ResumeForge - Resume Template Engine */
const TEMPLATES = [
  { id: 'classic',      name: 'Classic',      tagline: 'Timeless & traditional' },
  { id: 'modern',       name: 'Modern',       tagline: 'Clean with a blue accent' },
  { id: 'professional', name: 'Professional', tagline: 'Polished corporate look' },
  { id: 'minimal',      name: 'Minimal',      tagline: 'Quiet and refined' },
  { id: 'executive',    name: 'Executive',    tagline: 'Bold and authoritative' }
];
function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function nl2br(s) { return esc(s).replace(/\n/g, '<br>'); }
function bullets(text) {
  if (!text) return '';
  const lines = String(text).split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return '';
  return '<ul>' + lines.map(l => '<li>' + esc(l.replace(/^[-•·*]\s*/, '')) + '</li>').join('') + '</ul>';
}
function fmtRange(start, end, current) {
  const s = (start || '').trim();
  const e = current ? 'Present' : (end || '').trim();
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return s + ' – ' + e;
}
function joinContact(d) {
  const parts = [];
  if (d.email) parts.push('<span>' + esc(d.email) + '</span>');
  if (d.phone) parts.push('<span>' + esc(d.phone) + '</span>');
  if (d.location) parts.push('<span>' + esc(d.location) + '</span>');
  if (d.website) parts.push('<span>' + esc(d.website) + '</span>');
  if (d.linkedin) parts.push('<span>' + esc(d.linkedin) + '</span>');
  return parts.join(' ');
}
const SAMPLE_DATA = {
  personal: {
    name: 'Alex Morgan', jobTitle: 'Senior Marketing Manager',
    email: 'alex.morgan@email.com', phone: '(555) 123-4567',
    location: 'San Francisco, CA', website: 'alexmorgan.com',
    linkedin: 'linkedin.com/in/alexmorgan',
    summary: 'Results-driven marketing leader with 8+ years driving demand generation and brand strategy for B2B SaaS. Proven track record of scaling pipeline 3x and leading cross-functional teams of 12+.'
  },
  experience: [
    { title: 'Senior Marketing Manager', company: 'Acme Cloud', location: 'San Francisco, CA', startDate: 'Mar 2022', endDate: '', current: true, description: 'Led demand-gen strategy that grew qualified pipeline from $2M to $7M annually.\nManaged a team of 6 across content, paid media, and lifecycle marketing.\nLaunched ABM program targeting 200 enterprise accounts with 22% conversion.' },
    { title: 'Marketing Manager', company: 'Brightline', location: 'Remote', startDate: 'Jun 2019', endDate: 'Mar 2022', current: false, description: 'Scaled inbound program from 200 to 1,500 MQLs/month.\nOwned $1.2M annual marketing budget across 5 channels.\nReduced CAC by 28% through optimized paid acquisition.' }
  ],
  education: [{ degree: 'B.S. Business Administration', school: 'UC Berkeley', location: 'Berkeley, CA', startDate: '2014', endDate: '2018', gpa: '3.8' }],
  skills: ['Demand Generation', 'ABM', 'SQL', 'HubSpot', 'Salesforce', 'Content Strategy', 'Analytics', 'Team Leadership'],
  projects: [],
  certifications: [{ name: 'Google Analytics 4', issuer: 'Google', date: '2023' }]
};
function renderClassic(d) {
  let html = '<div class="resume-page tmpl-classic">';
  html += '<div class="r-name">' + esc(d.personal.name || 'Your Name') + '</div>';
  html += '<div class="r-contact">' + joinContact(d.personal) + '</div>';
  if (d.personal.summary) { html += '<h2>Summary</h2><p>' + nl2br(d.personal.summary) + '</p>'; }
  if (d.experience && d.experience.length) {
    html += '<h2>Experience</h2>';
    d.experience.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.title) + '</span>';
      if (x.company) html += ' <span class="r-item-sub">— ' + esc(x.company) + (x.location ? ', ' + esc(x.location) : '') + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate, x.current)) + '</span></div>';
      html += bullets(x.description) + '</div>';
    });
  }
  if (d.education && d.education.length) {
    html += '<h2>Education</h2>';
    d.education.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.degree) + '</span>';
      if (x.school) html += ' <span class="r-item-sub">— ' + esc(x.school) + (x.location ? ', ' + esc(x.location) : '') + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate)) + '</span></div>';
      if (x.gpa) html += '<div class="r-item-sub">GPA: ' + esc(x.gpa) + '</div>';
      html += '</div>';
    });
  }
  if (d.skills && d.skills.length) { html += '<h2>Skills</h2><p>' + d.skills.map(esc).join(' · ') + '</p>'; }
  if (d.certifications && d.certifications.length) {
    html += '<h2>Certifications</h2>';
    d.certifications.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><span class="r-item-title">' + esc(x.name) + '</span>';
      html += '<span class="r-item-date">' + esc(x.date || '') + '</span></div>';
      if (x.issuer) html += '<div class="r-item-sub">' + esc(x.issuer) + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
}
function renderModern(d) {
  let html = '<div class="resume-page tmpl-modern"><div class="r-header">';
  html += '<div class="r-name">' + esc(d.personal.name || 'Your Name') + '</div>';
  if (d.personal.jobTitle) html += '<div class="r-title">' + esc(d.personal.jobTitle) + '</div>';
  html += '<div class="r-contact">' + joinContact(d.personal) + '</div></div>';
  if (d.personal.summary) html += '<h2>Profile</h2><p>' + nl2br(d.personal.summary) + '</p>';
  if (d.experience && d.experience.length) {
    html += '<h2>Experience</h2>';
    d.experience.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.title) + '</span>';
      if (x.company) html += '<div class="r-item-sub">' + esc(x.company) + (x.location ? ' · ' + esc(x.location) : '') + '</div>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate, x.current)) + '</span></div>';
      html += bullets(x.description) + '</div>';
    });
  }
  if (d.education && d.education.length) {
    html += '<h2>Education</h2>';
    d.education.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.degree) + '</span>';
      if (x.school) html += '<div class="r-item-sub">' + esc(x.school) + (x.location ? ' · ' + esc(x.location) : '') + '</div>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate)) + '</span></div></div>';
    });
  }
  if (d.skills && d.skills.length) {
    html += '<h2>Skills</h2><div class="r-skills">';
    d.skills.forEach(s => { html += '<span>' + esc(s) + '</span>'; });
    html += '</div>';
  }
  if (d.certifications && d.certifications.length) {
    html += '<h2>Certifications</h2>';
    d.certifications.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><span class="r-item-title">' + esc(x.name) + '</span>';
      html += '<span class="r-item-date">' + esc(x.date || '') + '</span></div>';
      if (x.issuer) html += '<div class="r-item-sub">' + esc(x.issuer) + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
}
function renderProfessional(d) {
  let html = '<div class="resume-page tmpl-professional">';
  html += '<div class="r-name">' + esc(d.personal.name || 'Your Name') + '</div>';
  if (d.personal.jobTitle) html += '<div class="r-title">' + esc(d.personal.jobTitle) + '</div>';
  html += '<div class="r-contact">' + joinContact(d.personal) + '</div>';
  if (d.personal.summary) html += '<h2>Professional Summary</h2><p>' + nl2br(d.personal.summary) + '</p>';
  if (d.experience && d.experience.length) {
    html += '<h2>Professional Experience</h2>';
    d.experience.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.title) + '</span>';
      if (x.company) html += ' <span class="r-item-sub">| ' + esc(x.company) + (x.location ? ' · ' + esc(x.location) : '') + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate, x.current)) + '</span></div>';
      html += bullets(x.description) + '</div>';
    });
  }
  if (d.education && d.education.length) {
    html += '<h2>Education</h2>';
    d.education.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.degree) + '</span>';
      if (x.school) html += ' <span class="r-item-sub">| ' + esc(x.school) + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate)) + '</span></div></div>';
    });
  }
  if (d.skills && d.skills.length) html += '<h2>Core Competencies</h2><p>' + d.skills.map(esc).join(' • ') + '</p>';
  if (d.certifications && d.certifications.length) {
    html += '<h2>Certifications</h2>';
    d.certifications.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><span class="r-item-title">' + esc(x.name) + '</span>';
      html += '<span class="r-item-date">' + esc(x.date || '') + '</span></div>';
      if (x.issuer) html += '<div class="r-item-sub">' + esc(x.issuer) + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
}
function renderMinimal(d) {
  let html = '<div class="resume-page tmpl-minimal">';
  html += '<div class="r-name">' + esc(d.personal.name || 'Your Name') + '</div>';
  if (d.personal.jobTitle) html += '<div class="r-title">' + esc(d.personal.jobTitle) + '</div>';
  html += '<div class="r-contact">' + joinContact(d.personal) + '</div>';
  if (d.personal.summary) html += '<h2>About</h2><p>' + nl2br(d.personal.summary) + '</p>';
  if (d.experience && d.experience.length) {
    html += '<h2>Experience</h2>';
    d.experience.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.title) + '</span>';
      if (x.company) html += ' <span class="r-item-sub">at ' + esc(x.company) + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate, x.current)) + '</span></div>';
      html += bullets(x.description) + '</div>';
    });
  }
  if (d.education && d.education.length) {
    html += '<h2>Education</h2>';
    d.education.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.degree) + '</span>';
      if (x.school) html += ' <span class="r-item-sub">— ' + esc(x.school) + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate)) + '</span></div></div>';
    });
  }
  if (d.skills && d.skills.length) html += '<h2>Skills</h2><p>' + d.skills.map(esc).join(', ') + '</p>';
  if (d.certifications && d.certifications.length) {
    html += '<h2>Certifications</h2>';
    d.certifications.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><span class="r-item-title">' + esc(x.name) + '</span>';
      html += '<span class="r-item-date">' + esc(x.date || '') + '</span></div>';
      if (x.issuer) html += '<div class="r-item-sub">' + esc(x.issuer) + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
}
function renderExecutive(d) {
  let html = '<div class="resume-page tmpl-executive"><div class="r-header">';
  html += '<div class="r-name">' + esc(d.personal.name || 'Your Name') + '</div>';
  if (d.personal.jobTitle) html += '<div class="r-title">' + esc(d.personal.jobTitle) + '</div>';
  html += '<div class="r-contact">' + joinContact(d.personal) + '</div></div>';
  if (d.personal.summary) html += '<h2>Executive Summary</h2><p>' + nl2br(d.personal.summary) + '</p>';
  if (d.experience && d.experience.length) {
    html += '<h2>Career Experience</h2>';
    d.experience.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.title) + '</span>';
      if (x.company) html += ' <span class="r-item-sub">— ' + esc(x.company) + (x.location ? ', ' + esc(x.location) : '') + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate, x.current)) + '</span></div>';
      html += bullets(x.description) + '</div>';
    });
  }
  if (d.education && d.education.length) {
    html += '<h2>Education</h2>';
    d.education.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><div><span class="r-item-title">' + esc(x.degree) + '</span>';
      if (x.school) html += ' <span class="r-item-sub">— ' + esc(x.school) + '</span>';
      html += '</div><span class="r-item-date">' + esc(fmtRange(x.startDate, x.endDate)) + '</span></div></div>';
    });
  }
  if (d.skills && d.skills.length) html += '<h2>Areas of Expertise</h2><p style="text-align:center;">' + d.skills.map(esc).join(' ◆ ') + '</p>';
  if (d.certifications && d.certifications.length) {
    html += '<h2>Certifications</h2>';
    d.certifications.forEach(x => {
      html += '<div class="r-item"><div class="r-item-head"><span class="r-item-title">' + esc(x.name) + '</span>';
      html += '<span class="r-item-date">' + esc(x.date || '') + '</span></div>';
      if (x.issuer) html += '<div class="r-item-sub">' + esc(x.issuer) + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
}
const RENDERERS = { classic: renderClassic, modern: renderModern, professional: renderProfessional, minimal: renderMinimal, executive: renderExecutive };
function renderResume(templateId, data) { const fn = RENDERERS[templateId] || renderClassic; return fn(data); }
function renderTemplatePreviewCard(tpl, options) {
  options = options || {};
  const data = options.data || SAMPLE_DATA;
  const linkBuilder = options.linkBuilder !== false;
  const html = renderResume(tpl.id, data);
  let card = '<div class="template-card" data-template="' + tpl.id + '">';
  card += '<div class="template-preview"><div class="preview-scaler" style="transform: scale(0.42); transform-origin: top left; width: 238%;">' + html + '</div></div>';
  card += '<div class="template-info"><h3>' + esc(tpl.name) + '</h3><span>' + esc(tpl.tagline) + '</span></div>';
  if (linkBuilder) card += '<a class="btn btn-primary" href="builder.html?template=' + encodeURIComponent(tpl.id) + '">Use this template →</a>';
  card += '</div>';
  return card;
}
