/**
 * Meridian Experience 2.0 - progressive enhancement for the static demo.
 * No backend integration, no access to credentials, no outbound requests.
 * Screening decisions remain human initiated and visually confirmable.
 */
(() => {
  'use strict';
  const docs = document.documentElement;
  const approvedClicks = new WeakSet();
  let activeDialog = null;
  const routeName = () => {
    const path = location.hash.slice(1).replace(/^[/]/, '').split(/[?/]/).filter(Boolean);
    if (path[0] === 'candidates' && path.length > 1) return 'candidate-detail';
    if (path[0] === 'jobs' && path.length > 1) return 'job-detail';
    return ['candidates', 'jobs', 'automations', 'reports'].includes(path[0]) ? path[0] : 'dashboard';
  };
  const names = {
    dashboard: 'Dashboard', candidates: 'Candidates', 'candidate-detail': 'Candidate',
    jobs: 'Jobs', 'job-detail': 'Role', automations: 'Automations', reports: 'Reports'
  };
  const copyImprovements = new Map([
    ['The agents did the screening — approve, reject, or open the full evidence',
      'Review each screening summary and supporting evidence before making a decision.'],
    ['Recruiting operations at a glance — review queue first, then interviews and automation health.',
      'Your decision queue, upcoming interviews, and workflow health in one place.'],
    ['Browse, filter, and act on everyone in the pipeline.',
      'Find people, review evidence, and track the next step in their hiring journey.'],
    ['Open roles, their pipelines, and how each one is screened.',
      'Your open positions, hiring teams, and evaluation criteria.']
  ]);
  const syncExperience = () => {
    const route = routeName();
    if (docs.dataset.meridianRoute !== route) docs.dataset.meridianRoute = route;
    const name = document.querySelector('.auth-stage') ? 'Explore demo' : (names[route] || 'Workspace');
    const title = name + ' · Meridian Talent Operations';
    if (document.title !== title) document.title = title;
    for (const el of document.querySelectorAll('#main p')) {
      const replacement = copyImprovements.get(el.textContent.trim());
      if (replacement && el.textContent !== replacement) el.textContent = replacement;
    }
    for (const button of document.querySelectorAll('button[title]:not([aria-label])')) {
      if (!button.textContent.trim()) button.setAttribute('aria-label', button.title);
    }
    // Do not offer an automation recipe that automatically advances an applicant
    // solely on a numerical screening score.
    for (const button of document.querySelectorAll('button')) {
      if (button.textContent.includes('score above 80, approve for interview')) {
        button.disabled = true;
        button.title = 'Automatic advancement based on a screening score is unavailable. Review is a human decision.';
        button.setAttribute('aria-label', 'Automatic approval workflow unavailable; human review required');
      }
    }
  };
  const el = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content) node.textContent = content;
    return node;
  };
  const openDecisionReview = (button, row, action) => {
    if (activeDialog) return;
    const candidateLink = row.querySelector('a[href*="#/candidates/"]');
    if (!candidateLink) return;
    const candidate = candidateLink.textContent.trim() || 'this candidate';
    const role = row.querySelector('p')?.textContent.trim() || 'Candidate in review';
    const score = row.querySelector('[role="img"][aria-label*="Fit score"]')?.getAttribute('aria-label');
    const backdrop = el('div', 'meridian-review-overlay');
    backdrop.setAttribute('role', 'presentation');
    const dialog = el('section', 'meridian-review-dialog');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'meridian-review-heading');
    dialog.setAttribute('aria-describedby', 'meridian-review-explainer');
    const overline = el('p', 'meridian-review-overline', 'RECRUITER DECISION');
    const heading = el('h2', '', 'Confirm your decision');
    heading.id = 'meridian-review-heading';
    const explainer = el('p', 'meridian-review-description', action === 'Approve'
      ? 'You are preparing to advance this candidate to the interview stage.'
      : 'You are preparing to mark this candidate as not progressing.');
    explainer.id = 'meridian-review-explainer';
    const profile = el('div', 'meridian-review-profile');
    profile.append(el('strong', '', candidate), el('span', '', role));
    if (score) profile.append(el('span', 'meridian-review-score', score + ' · advisory only'));
    const note = el('p', 'meridian-review-note', 'Review the candidate record, role criteria, and evidence before confirming. A fit score alone is never a hiring decision.');
    const controls = el('div', 'meridian-review-actions');
    const cancel = el('button', 'meridian-review-cancel', 'Cancel');
    cancel.type = 'button';
    const review = el('a', 'meridian-review-view', 'View evidence');
    review.href = candidateLink.getAttribute('href');
    const confirm = el('button', 'meridian-review-confirm' + (action === 'Reject' ? ' is-decline' : ''),
      action === 'Approve' ? 'Confirm advance' : 'Confirm not progressing');
    confirm.type = 'button';
    const dismiss = () => {
      backdrop.remove();
      activeDialog = null;
      document.body.classList.remove('meridian-dialog-open');
      if (button.isConnected) button.focus({preventScroll:true});
    };
    cancel.addEventListener('click', dismiss);
    review.addEventListener('click', dismiss);
    confirm.addEventListener('click', () => {
      dismiss();
      if (button.isConnected) {
        approvedClicks.add(button);
        button.click();
      }
    });
    backdrop.addEventListener('mousedown', (event) => { if (event.target === backdrop) dismiss(); });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); dismiss(); }
      if (event.key !== 'Tab') return;
      const items = [cancel, review, confirm];
      const index = items.indexOf(document.activeElement);
      if (event.shiftKey && index === 0) { event.preventDefault(); confirm.focus(); }
      else if (!event.shiftKey && index === 2) { event.preventDefault(); cancel.focus(); }
    });
    controls.append(cancel, review, confirm);
    dialog.append(overline, heading, explainer, profile, note, controls);
    backdrop.append(dialog);
    document.body.append(backdrop);
    activeDialog = backdrop;
    document.body.classList.add('meridian-dialog-open');
    review.focus({preventScroll:true});
  };
  document.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('button') : null;
    if (!button) return;
    if (approvedClicks.has(button)) { approvedClicks.delete(button); return; }
    const action = button.textContent.trim();
    if (routeName() !== 'dashboard' || (action !== 'Approve' && action !== 'Reject')) return;
    const row = button.closest('li');
    if (!row || !row.querySelector('a[href*="#/candidates/"]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openDecisionReview(button, row, action);
  }, true);
  new MutationObserver(syncExperience).observe(document.querySelector('#root') || document.body, {subtree:true, childList:true});
  window.addEventListener('hashchange', syncExperience, {passive:true});
  window.addEventListener('popstate', syncExperience, {passive:true});
  syncExperience();
})();
