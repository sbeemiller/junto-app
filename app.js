'use strict';
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const currentMemberId = 'james';

const brothers = [
  {
    id: 'james',
    name: 'James Miller',
    partnerId: 'daniel',
    partnerName: 'Daniel Reyes',
    chapter: 'Practicing presence every day',
    theme: 'Family & personal growth',
    location: 'Austin, TX',
    story: 'James is working on being fully present with the people in front of him. He is creating small habits that make room for family, movement, and honest reflection.',
    support: ['Ask how his personal focus is showing up this week.', 'Make space for an honest high, low, and buffalo.', 'Celebrate small agreements kept.'],
    color: '#7c6332',
    currentGoal: { title: 'Three phone-free evenings with kids', progress: 2, target: 3, status: 'On track' },
    portraitTraits: { hair: '#2a2215', skin: '#d2a17b', beard: '#342918', glasses: false }
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    partnerId: 'chris',
    partnerName: 'Chris Bennett',
    chapter: 'Finding his next chapter',
    theme: 'Purpose & career',
    location: 'Austin, TX',
    story: 'After ten years in product design, Alex is exploring what meaningful work looks like. He is also learning to slow down as a new dad.',
    support: ['Ask how his career conversations are going.', 'Invite him for a walk without an agenda.', 'Remind him that being present is productive, too.'],
    color: '#4f5539',
    currentGoal: { title: 'Two exploratory career conversations', progress: 2, target: 2, status: 'Goal met' },
    portraitTraits: { hair: '#403222', skin: '#e2b38d', beard: '#4a3a28', glasses: true }
  },
  {
    id: 'brandon',
    name: 'Brandon Ellis',
    partnerId: 'peter',
    partnerName: 'Peter Walsh',
    chapter: 'Building a stronger foundation',
    theme: 'Health & consistency',
    location: 'Denver, CO',
    story: 'Brandon is training for his first half marathon and making space for rest. His goal is consistency over intensity.',
    support: ['Check in on his weekly running goal.', 'Celebrate recovery days as well as milestones.', 'Offer to join a weekend trail walk.'],
    color: '#6e492b',
    currentGoal: { title: 'Four trail runs and one recovery day', progress: 3, target: 4, status: 'On track' },
    portraitTraits: { hair: '#1a1815', skin: '#c8926c', beard: '#2b241e', glasses: false }
  },
  {
    id: 'chris',
    name: 'Chris Bennett',
    partnerId: 'alex',
    partnerName: 'Alex Morgan',
    chapter: 'Leading with more intention',
    theme: 'Leadership & integrity',
    location: 'Portland, OR',
    story: 'Chris is growing a small business while practicing clearer boundaries. He wants his team and family to get the best of him.',
    support: ['Ask which boundary he protected this week.', 'Be a sounding board for a difficult conversation.', 'Share a book that changed how you lead.'],
    color: '#3d4f43',
    currentGoal: { title: 'Protect 6:00 PM evening shutdown daily', progress: 4, target: 5, status: 'On track' },
    portraitTraits: { hair: '#504332', skin: '#deb08d', beard: '#362c20', glasses: false }
  },
  {
    id: 'daniel',
    name: 'Daniel Reyes',
    partnerId: 'james',
    partnerName: 'James Miller',
    chapter: 'Making room for what matters',
    theme: 'Family & presence',
    location: 'Santa Fe, NM',
    story: 'Daniel is trading a packed calendar for more unhurried time with his children. He is practicing listening before solving.',
    support: ['Ask about his phone-free evenings.', 'Make plans that include the whole family.', 'Give him room to talk things through.'],
    color: '#714e38',
    currentGoal: { title: 'Unplug from work phone by 6:00 PM', progress: 3, target: 4, status: 'On track' },
    portraitTraits: { hair: '#221e1a', skin: '#ba8560', beard: '#2f2720', glasses: false }
  },
  {
    id: 'marcus',
    name: 'Marcus Cole',
    partnerId: 'brandon',
    partnerName: 'Brandon Ellis',
    chapter: 'Learning to ask for support',
    theme: 'Connection & courage',
    location: 'Seattle, WA',
    story: 'After a recent move, Marcus is building community from scratch. His growth edge is asking for help before he feels overwhelmed.',
    support: ['Reach out first this month.', 'Invite him into an existing weekend tradition.', 'Ask a second question when he says he is fine.'],
    color: '#5b4a3a',
    currentGoal: { title: 'Reach out first to two new friends', progress: 1, target: 2, status: 'In progress' },
    portraitTraits: { hair: '#121212', skin: '#8f5d3d', beard: '#1e1b18', glasses: false }
  },
  {
    id: 'peter',
    name: 'Peter Walsh',
    partnerId: 'marcus',
    partnerName: 'Marcus Cole',
    chapter: 'Returning to creative work',
    theme: 'Creativity & service',
    location: 'Boulder, CO',
    story: 'Peter is making time for writing again and volunteering as a mentor. He is learning that small creative acts count.',
    support: ['Ask to read something he has written.', 'Protect a quiet coffee hour together.', 'Connect him with a local mentoring program.'],
    color: '#3d4d59',
    currentGoal: { title: 'Write for 30 minutes 5 mornings', progress: 4, target: 5, status: 'On track' },
    portraitTraits: { hair: '#6b6659', skin: '#e5be9b', beard: '#545044', glasses: true }
  }
];

const meetings = [
  {id:'m1',date:'2026-10-22',title:'Resilience in uncertain times',topics:['Resilience','Mindset'],attendees:7,summary:'We talked honestly about the pressure to have everything figured out. The conversation came back to community, steady routines, and the courage to ask for help before things become overwhelming.',takeaways:['Separate what you can influence from what you cannot.','Protect the basics: sleep, movement, and honest conversation.','A check-in can be an invitation, without needing to fix anything.'],question:'Where could you trade control for trust this week?'},
  {id:'m2',date:'2026-10-08',title:'Fatherhood and presence',topics:['Family','Presence'],attendees:6,summary:'The circle explored what it means to be available, beyond simply being in the room. We shared small rituals that help our families feel seen.',takeaways:['Put the phone in another room during family time.','Ask what support looks like instead of assuming.','Small, repeated moments build trust.'],question:'Who needs your full attention right now?'},
  {id:'m3',date:'2026-09-24',title:'The courage to change direction',topics:['Career','Purpose'],attendees:8,summary:'Alex opened up about a career transition. The group explored identity beyond job titles, and how to take a small next step without a complete plan.',takeaways:['Name the values you want your work to serve.','Run a small experiment before making a big leap.','Ask for introductions with a specific question.'],question:'What would you try if you did not need to be good at it yet?'},
  {id:'m4',date:'2026-09-10',title:'Health, habits, and the long game',topics:['Health','Habits'],attendees:7,summary:'We compared approaches to sustainable habits. The strongest routines were simple enough to keep on difficult weeks and flexible enough for real life.',takeaways:['Build a minimum version of each habit.','Track consistency without judging a missed day.','Let an accountability partner see the whole picture.'],question:'What is the smallest version you can keep doing?'},
  {id:'m5',date:'2026-08-27',title:'Building a meaningful life',topics:['Purpose','Values'],attendees:8,summary:'The group reflected on the difference between a full calendar and a fulfilling life. Each brother named one value to put into practice.',takeaways:['Let your calendar reflect what you say matters.','Leave room for service and friendship.','Choose one concrete action over a perfect statement.'],question:'What deserves more space in your life?'}
];

const seed = {
  focus: 'Be fully present with the people in front of me.',
  commitments: [
    {id:'c1',title:'Be present with my kids',category:'Family',partner:'Daniel Reyes',target:3,progress:2,notes:'Three phone-free evenings each week.'},
    {id:'c2',title:'Move my body four times',category:'Health',partner:'Brandon Ellis',target:4,progress:2,notes:'Make room for movement, even on busy days.'},
    {id:'c3',title:'Read for 30 minutes',category:'Growth',partner:'Peter Walsh',target:7,progress:1,notes:'A little space for a new perspective.'},
    {id:'c4',title:'Check in with Alex about his transition',category:'Connection',partner:'Alex Morgan',target:1,progress:0,notes:'Set aside time to listen.'}
  ],
  kudos: {}
};

let state = structuredClone(seed), storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem('junto18.v1'));
  if (saved && typeof saved.focus === 'string' && Array.isArray(saved.commitments) && saved.commitments.every(c => typeof c.title === 'string' && typeof c.id === 'string' && Number.isInteger(c.target) && c.target>0 && Number.isInteger(c.progress) && c.progress>=0 && c.progress<=c.target)) {
    state = saved;
  }
} catch {
  storageAvailable = false;
}

state.reflections = Array.isArray(state.reflections)
  ? state.reflections.filter(r => r && ['id','date','high','low','buffalo','updatedAt'].every(key => typeof r[key] === 'string') && /^\d{4}-\d{2}-\d{2}$/.test(r.date)).map(r => ({...r, memberId: brothers.some(b => b.id === r.memberId) ? r.memberId : currentMemberId}))
  : [];

state.meetingLinks = state.meetingLinks && typeof state.meetingLinks === 'object' && !Array.isArray(state.meetingLinks) ? state.meetingLinks : {};
for (const [id, links] of Object.entries(state.meetingLinks)) {
  if (!links || typeof links !== 'object') { delete state.meetingLinks[id]; continue; }
  for (const key of ['folder','recording','notes']) links[key] = typeof links[key] === 'string' ? safeLink(links[key]) : '';
  links.resources = Array.isArray(links.resources) ? links.resources.filter(r => r && ['id','title','url','kind','suggestedBy','note'].every(key => typeof r[key] === 'string') && safeLink(r.url)) : [];
}

state.kudos = state.kudos && typeof state.kudos === 'object' && !Array.isArray(state.kudos) ? state.kudos : {};

let section = 'home', commitmentFilter = 'All', query = '', topic = 'All topics', toastTimer;
const navItems = [['home','⌂','Home'],['brothers','♧','Brothers'],['meetings','▣','Meetings'],['commitments','☑','Agreements']];

function save() {
  try {
    localStorage.setItem('junto18.v1', JSON.stringify(state));
    return true;
  } catch {
    storageAvailable = false;
    toast('Browser storage unavailable. Changes last for this visit.');
    return false;
  }
}

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3200);
}

function dateLabel(date) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

function portrait(b) {
  const t = b.portraitTraits || { hair: '#2b2922', skin: '#d2a17b', beard: '#39342b', glasses: false };
  const glassesSvg = t.glasses
    ? `<circle cx="39" cy="42" r="7" fill="none" stroke="#efb92f" stroke-width="2"/><circle cx="61" cy="42" r="7" fill="none" stroke="#efb92f" stroke-width="2"/><line x1="46" y1="42" x2="54" y2="42" stroke="#efb92f" stroke-width="2"/>`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="${b.color}"/>
    <circle cx="80" cy="15" r="55" fill="#ffd86b" opacity=".18"/>
    <path d="M6 100q4-34 44-34t44 34" fill="#141410"/>
    <path d="M40 59h20v17H40" fill="${t.skin}" filter="brightness(0.9)"/>
    <ellipse cx="50" cy="42" rx="23" ry="29" fill="${t.skin}"/>
    <path d="M26 40Q18 6 49 8q33-2 25 36l-8-17q-18 6-31-3Z" fill="${t.hair}"/>
    <path d="M29 48q4 29 21 27 19 1 22-27l-9 9q-13-6-25 0Z" fill="${t.beard}"/>
    <path d="M43 61q7 4 14 0" fill="none" stroke="#332415" stroke-width="2"/>
    <g fill="#1a1811"><circle cx="39" cy="42" r="2.2"/><circle cx="61" cy="42" r="2.2"/></g>
    ${glassesSvg}
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function pills(items) {
  return items.map(t => `<span class="pill">${escapeHTML(t)}</span>`).join('');
}

function heading(kicker, title, subtitle, action = '') {
  return `<div class="page-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p class="subtitle">${subtitle}</p></div>${action}</div>`;
}

function commitRow(c, full = false) {
  const title = escapeHTML(c.title), id = escapeHTML(c.id);
  const partnerBrother = brothers.find(b => b.name === c.partner);
  const partnerIdAttr = partnerBrother ? `data-id="${partnerBrother.id}"` : '';

  const controls = c.target === 1
    ? `<button class="check ${c.progress === 1 ? 'done' : ''}" role="checkbox" aria-checked="${c.progress === 1}" data-action="toggle-commitment" data-id="${id}" aria-label="Mark ${title} ${c.progress === 1 ? 'incomplete' : 'complete'}">${c.progress === 1 ? '✓' : ''}</button>`
    : '';
  const counter = c.target > 1
    ? `<div class="stepper" role="group" aria-label="Progress for ${title}"><button data-action="step" data-delta="-1" data-id="${id}" aria-label="Decrease progress for ${title}" ${c.progress === 0 ? 'disabled' : ''}>−</button><span class="step-count" aria-live="polite">${c.progress}<span> / ${c.target}</span></span><button data-action="step" data-delta="1" data-id="${id}" aria-label="Increase progress for ${title}" ${c.progress === c.target ? 'disabled' : ''}>+</button></div>`
    : '';

  return `<div class="commit-row">
    ${controls}
    <div class="commit-body">
      <p class="commit-title">${title}</p>
      ${c.target > 1
        ? `<div class="progress-line"><div class="progress" role="progressbar" aria-label="${title}" aria-valuenow="${c.progress}" aria-valuemin="0" aria-valuemax="${c.target}"><span style="width:${(c.progress / c.target) * 100}%"></span></div></div>`
        : `<span class="count">${c.progress ? 'Complete' : 'Not yet complete'}</span>`
      }
      ${full
        ? `<p class="commit-detail">${escapeHTML(c.category)} · Active partner: <button class="partner-tag" data-action="partner" ${partnerIdAttr} data-partner="${escapeHTML(c.partner)}">${escapeHTML(c.partner)} ↗</button>${c.notes ? `<br>${escapeHTML(c.notes)}` : ''}</p>`
        : `<p class="commit-detail">Partner: <button class="partner-tag" data-action="partner" ${partnerIdAttr} data-partner="${escapeHTML(c.partner)}">${escapeHTML(c.partner)} ↗</button></p>`
      }
    </div>
    ${counter}
    <button class="text-btn" data-action="edit-commitment" data-id="${id}" aria-label="Edit ${title}">${full ? 'Edit' : '›'}</button>
  </div>`;
}

function render() {
  section = location.hash.slice(1) || 'home';
  if (!navItems.some(n => n[0] === section)) section = 'home';
  for (const id of ['desktop-nav', 'mobile-nav']) {
    $('#' + id).innerHTML = navItems.map(([key, icon, label]) => `<a class="nav-link ${section === key ? 'active' : ''}" href="#${key}" ${section === key ? 'aria-current="page"' : ''}><span class="icon" aria-hidden="true">${icon}</span>${label}</a>`).join('');
  }
  $('#main').innerHTML = (!storageAvailable ? '<p class="storage-warning">Local storage is unavailable. Changes will last for this visit only.</p>' : '') + ({home: homeView, brothers: brothersView, meetings: meetingsView, commitments: commitmentsView}[section])();
  document.title = navItems.find(n => n[0] === section)[2] + ' · Junto';
}

function homeView() {
  return `${heading('YOUR CIRCLE. YOUR NEXT CHAPTER.', 'Good to have you here, James.', 'A little intention. A little accountability. A stronger week.')}
  <section class="hero" aria-label="Brotherhood">
    <span class="eyebrow">EST. 2024 · BUILT ON SHOWING UP</span>
    <h1>BETTER MEN.<br>RICHER LIVES.<br>TOGETHER.</h1>
    <p>A space to be honest, challenge each other, and keep becoming who we want to be.</p>
    <div class="hero-bottom">GROWTH IS A PRACTICE. WE DO IT TOGETHER.</div>
  </section>
  <div class="grid">
    <section class="panel">
      <div class="section-head">
        <h2>The next gathering</h2>
        <span class="pill">Upcoming</span>
      </div>
      <div class="meeting-art"></div>
      <span class="eyebrow">THURSDAY, OCTOBER 29, 2026</span>
      <h3 style="margin-top:8px">Showing up when life gets full</h3>
      <div class="meta">
        <span>◷ 7:00–8:30 PM CT</span>
        <span>◎ Online gathering</span>
      </div>
      <p class="subtitle">An honest check-in on priorities, presence, and the promises we make to ourselves.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
        <button class="btn primary" data-action="upcoming">View gathering <span>↗</span></button>
        <button class="btn ghost" data-action="reflection">Prepare High / Low →</button>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <h2>My focus</h2>
        <button class="text-btn" data-action="focus">Edit focus</button>
      </div>
      <div class="focus-note">“${escapeHTML(state.focus)}”</div>
      <div class="section-head" style="margin-top:24px">
        <span class="eyebrow">SMALL AGREEMENTS, KEPT</span>
        <a class="text-btn" href="#commitments">View all →</a>
      </div>
      ${state.commitments.slice(0, 3).map(c => commitRow(c)).join('')}
      ${state.commitments.length ? '' : '<p class="muted small">Add your first agreement to give your focus a next step.</p>'}
    </section>
    ${reflectionPanel()}
    <section class="panel wide">
      <div class="section-head">
        <h2>From our last circle</h2>
        <span class="date">Oct 22, 2026</span>
      </div>
      <h3>Resilience in uncertain times</h3>
      <p class="subtitle">“We don’t have to have it all figured out to take the next honest step.”</p>
      <button class="text-btn" data-action="meeting" data-id="m1">Revisit the conversation →</button>
    </section>
  </div>`;
}

function brothersView() {
  return `${heading('THE PEOPLE IN YOUR CORNER', 'The brothers', 'Know their story. Notice their growth. Show up for each other.')}
  <p class="small muted">${brothers.length} brothers in circle · Paired with active partners for support and shared agreements</p>
  <div class="brothers-grid">
    ${brothers.map(b => `
      <button class="brother-card" data-action="brother" data-id="${b.id}">
        <img class="portrait" src="${portrait(b)}" alt="Illustrated portrait of ${b.name}">
        <h3>${b.name}</h3>
        <p>${b.chapter}</p>
        ${pills([b.theme])}
        <div class="card-partner">
          <span>Active Partner: <strong style="color:var(--text)">${escapeHTML(b.partnerName)}</strong></span>
          <span style="color:var(--gold)">↗</span>
        </div>
      </button>
    `).join('')}
  </div>`;
}

function meetingsView() {
  return `${heading('CONVERSATIONS WORTH KEEPING', 'The meeting archive', 'Our conversations, insights, and the things we carry forward.')}
  <div class="toolbar">
    <input id="meeting-search" type="search" placeholder="Search conversations, topics, or takeaways…" aria-label="Search meeting history" value="${escapeHTML(query)}">
    <select id="topic-filter" aria-label="Filter meetings by topic">
      ${['All topics', ...new Set(meetings.flatMap(m => m.topics))].map(t => `<option ${topic === t ? 'selected' : ''}>${t}</option>`).join('')}
    </select>
  </div>
  <div id="meeting-results">${meetingResults()}</div>`;
}

function meetingResults() {
  const results = meetings.filter(m => (topic === 'All topics' || m.topics.includes(topic)) && [m.title, m.summary, ...m.topics, ...m.takeaways].join(' ').toLowerCase().includes(query.toLowerCase()));
  return `<p class="small muted" role="status">${results.length} conversation${results.length === 1 ? '' : 's'}</p>
  <div class="meeting-list">
    ${results.length ? results.map(m => `
      <button class="meeting-row" data-action="meeting" data-id="${m.id}">
        <span class="meeting-thumb" aria-hidden="true"></span>
        <span class="meeting-info">
          <span class="date">${dateLabel(m.date)}</span>
          <h3>${m.title}</h3>
          <span class="small muted">${m.attendees} brothers · ${m.takeaways.length} takeaways</span>
        </span>
        <span class="tags">${pills(m.topics)}</span>
        <span class="chevron">›</span>
      </button>
    `).join('') : '<div class="empty">No conversations found. Try another search or topic.</div>'}
  </div>`;
}

function commitmentsView() {
  const completed = state.commitments.filter(c => c.progress >= c.target).length;
  const visible = state.commitments.filter(c => commitmentFilter === 'All' || (commitmentFilter === 'Completed' ? c.progress >= c.target : c.progress < c.target));
  return `${heading('INTENTION INTO ACTION', 'My agreements', 'Small steps. Honest progress. Walking with a brother.', '<button class="btn primary" data-action="add-commitment">＋ Add agreement</button>')}
  <div class="stats">
    <div class="stat"><strong>${state.commitments.length}</strong><span>Agreements made</span></div>
    <div class="stat"><strong>${completed}</strong><span>Completed</span></div>
    <div class="stat"><strong>${state.commitments.length ? Math.round(state.commitments.reduce((a, c) => a + c.progress / c.target, 0) / state.commitments.length * 100) : 0}%</strong><span>Overall progress</span></div>
  </div>
  <div class="filters" aria-label="Commitment filters">
    ${['All', 'In progress', 'Completed'].map(f => `<button class="filter ${commitmentFilter === f ? 'active' : ''}" data-action="filter" data-filter="${f}" aria-pressed="${commitmentFilter === f}">${f}</button>`).join('')}
  </div>
  <section class="panel">
    <div class="section-head">
      <h2>Keep showing up</h2>
      <span class="eyebrow">SHARED AGREEMENTS</span>
    </div>
    <p class="small muted">Use − and + for counted goals. Check off one-time agreements when they’re done. Tap an accountability partner’s name to view their profile.</p>
    ${visible.length ? visible.map(c => commitRow(c, true)).join('') : '<p class="empty">No agreements here yet. A small agreement with a brother is a good place to start.</p>'}
  </section>`;
}

let previousFocus;
function openModal(content) {
  previousFocus = document.activeElement;
  $('#modal-content').innerHTML = content;
  $('#modal').showModal();
}

function modalHeader(title, kicker = '') {
  return `<div class="modal-heading">
    <div>${kicker ? `<span class="eyebrow">${kicker}</span>` : ''}<h2>${escapeHTML(title)}</h2></div>
    <button class="close" data-action="close" aria-label="Close dialog">×</button>
  </div>`;
}

function openBrotherModal(b) {
  const assignedPartner = brothers.find(item => item.id === b.partnerId) || brothers.find(item => item.name === b.partnerName);
  const shared = state.commitments.filter(c => c.partner === b.name);
  const kudosCount = state.kudos[b.id] || 0;

  openModal(`${modalHeader(b.name, 'THE BROTHERS')}
    <div class="profile-top">
      <img class="portrait" src="${portrait(b)}" alt="Illustrated portrait of ${b.name}">
      <div>
        <p class="muted small">${b.location}</p>
        ${pills([b.theme])}
      </div>
    </div>

    <!-- Active Accountability Partner: Always another member of the circle -->
    <div class="partner-callout">
      <div>
        <span class="eyebrow">${b.id === currentMemberId ? 'YOUR ACTIVE ACCOUNTABILITY PARTNER' : 'ACTIVE ACCOUNTABILITY PARTNER'}</span>
        <div class="partner-name">
          <button class="partner-tag" data-action="brother" data-id="${assignedPartner.id}">
            ${assignedPartner.name}${assignedPartner.id === currentMemberId ? ' (You)' : ''} ↗
          </button>
        </div>
      </div>
      <span class="pill">Paired for support</span>
    </div>

    ${shared.length ? `
      <section class="shared-accountability-card">
        <div class="shared-head">
          <span class="eyebrow">AGREEMENTS WITH ${b.name.split(' ')[0].toUpperCase()}</span>
          <span class="pill">Active Partner</span>
        </div>
        <p class="small muted" style="margin:2px 0 8px">${b.name.split(' ')[0]} is your partner on ${shared.length} agreement${shared.length > 1 ? 's' : ''}:</p>
        <div class="shared-commitments-list">
          ${shared.map(c => `
            <div class="shared-item">
              <div>
                <strong>${escapeHTML(c.title)}</strong>
                <div class="count">${c.progress} of ${c.target} ${c.target === 1 ? 'completed' : 'steps'}</div>
              </div>
              <button class="text-btn" data-action="edit-commitment" data-id="${escapeHTML(c.id)}">Update ›</button>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <section class="kudos-box">
      <div class="section-head" style="margin-bottom:8px">
        <span class="eyebrow">${b.name.split(' ')[0]}’s goal this week</span>
        <span class="pill">${escapeHTML(b.currentGoal?.status || 'Active')}</span>
      </div>
      <p style="font-size:13.5px;font-weight:600;margin:4px 0 8px">“${escapeHTML(b.currentGoal?.title || 'Showing up with intention')}”</p>
      <div class="progress-line" style="margin-bottom:12px">
        <div class="progress"><span style="width:${Math.round(((b.currentGoal?.progress || 1) / (b.currentGoal?.target || 1)) * 100)}%"></span></div>
        <span class="count">${b.currentGoal?.progress || 0}/${b.currentGoal?.target || 1}</span>
      </div>
      <button class="kudos-btn ${kudosCount ? 'sent' : ''}" data-action="kudo" data-id="${escapeHTML(b.id)}">
        <span>👊</span>
        <span>${kudosCount ? `Fist-bump sent to ${b.name.split(' ')[0]} (${kudosCount})` : `Send ${b.name.split(' ')[0]} a fist-bump (Kudos)`}</span>
      </button>
    </section>

    <section class="detail-section">
      <h3>Current chapter</h3>
      <p>${b.story}</p>
    </section>
    <section class="detail-section">
      <h3>How to support ${b.name.split(' ')[0]}</h3>
      <ul>${b.support.map(s => `<li>${s}</li>`).join('')}</ul>
    </section>
    ${profileReflection(b.id)}
    <p class="small muted">Fictional sample profile · Browser-saved accountability</p>
  `);
}

function editCommitment(id) {
  const c = state.commitments.find(c => c.id === id);
  // Exclude the active user so the accountability partner is ALWAYS another brother for genuine support
  const selectablePartners = brothers.filter(b => b.id !== currentMemberId);
  const defaultPartner = brothers.find(b => b.id === currentMemberId)?.partnerName || selectablePartners[0].name;

  openModal(`${modalHeader(c ? 'Edit agreement' : 'Make an agreement', 'ACCOUNTABILITY BEGINS WITH INTENTION')}
  <form id="commitment-form" data-id="${c ? escapeHTML(c.id) : ''}">
    <label for="title">What will you agree to?</label>
    <input id="title" name="title" required maxlength="120" value="${escapeHTML(c?.title || '')}" placeholder="e.g. Take a phone-free walk">
    <div class="form-grid">
      <div>
        <label for="category">Growth theme</label>
        <select id="category" name="category" style="width:100%">
          ${['Family', 'Health', 'Growth', 'Connection', 'Purpose', 'Service'].map(t => `<option ${c?.category === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div>
        <label for="partner">Accountability partner (another brother)</label>
        <select id="partner" name="partner" style="width:100%">
          ${selectablePartners.map(b => `<option ${(c?.partner ? c.partner === b.name : b.name === defaultPartner) ? 'selected' : ''}>${b.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-grid">
      <div>
        <label for="target">Target steps (1–100)</label>
        <input id="target" name="target" type="number" min="1" max="100" required value="${c?.target || 1}">
      </div>
      <div>
        <label for="progress">Steps completed</label>
        <input id="progress" name="progress" type="number" min="0" max="${c?.target || 1}" required value="${c?.progress || 0}">
      </div>
    </div>
    <label for="notes">What would support look like? (optional)</label>
    <textarea id="notes" name="notes" maxlength="1000">${escapeHTML(c?.notes || '')}</textarea>
    <div class="actions">
      ${c ? `<button class="btn ghost danger" type="button" data-action="delete" data-id="${escapeHTML(c.id)}">Remove</button>` : ''}
      <button class="btn" type="button" data-action="close">Cancel</button>
      <button class="btn primary" type="submit">Save agreement</button>
    </div>
  </form>`);
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const {action, id, partner} = button.dataset;

  if (action === 'close') $('#modal').close();
  if (action === 'focus') openModal(`${modalHeader('What matters most right now?', 'YOUR PERSONAL FOCUS')}<form id="focus-form"><label for="focus">One intention to come back to</label><textarea id="focus" name="focus" required maxlength="300">${escapeHTML(state.focus)}</textarea><div class="actions"><button type="button" class="btn" data-action="close">Cancel</button><button class="btn primary">Save focus</button></div></form>`);
  if (action === 'brother') {
    const b = brothers.find(b => b.id === id);
    if (b) openBrotherModal(b);
  }
  if (action === 'partner') {
    const b = (id ? brothers.find(item => item.id === id) : null) || brothers.find(item => item.name === partner);
    if (b) openBrotherModal(b);
  }
  if (action === 'kudo') {
    const b = brothers.find(b => b.id === id);
    if (b) {
      state.kudos[b.id] = (state.kudos[b.id] || 0) + 1;
      save();
      toast(`👊 Fist-bump sent to ${b.name.split(' ')[0]}!`);
      openBrotherModal(b);
    }
  }
  if (action === 'meeting') showMeeting(id);
  if (action === 'upcoming') openModal(`${modalHeader('Showing up when life gets full', 'NEXT GATHERING')}<div class="meeting-art"></div><p class="muted">Thursday, October 29, 2026<br>7:00–8:30 PM Central · Online gathering</p><section class="detail-section"><h3>Our agenda</h3><ol><li>Honest check-ins · 15 minutes</li><li>Priorities and presence · 40 minutes</li><li>Agreements and support · 25 minutes</li><li>Closing reflection · 10 minutes</li></ol></section><div style="margin-top:16px"><button class="btn primary" data-action="reflection">Prepare High / Low reflection →</button></div>`);
  if (action === 'add-commitment' || action === 'edit-commitment') editCommitment(id);
  if (action === 'step' || action === 'toggle-commitment') {
    const c = state.commitments.find(c => c.id === id);
    if (action === 'toggle-commitment' && c.target === 1) c.progress = c.progress ? 0 : 1;
    if (action === 'step' && c.target > 1) c.progress = Math.max(0, Math.min(c.target, c.progress + Number(button.dataset.delta)));
    const persisted = save();
    render();
    const replacement = [...document.querySelectorAll('[data-action]')].find(el => el.dataset.action === action && el.dataset.id === id && el.dataset.delta === button.dataset.delta && !el.disabled);
    if (replacement) replacement.focus({preventScroll: true});
    if (persisted) toast(c.progress === c.target ? 'Agreement kept. Keep growing.' : 'Progress saved.');
  }
  if (action === 'filter') {
    commitmentFilter = button.dataset.filter;
    render();
  }
  if (action === 'delete') {
    openModal(`${modalHeader('Remove this agreement?')}<p class="muted">This removes it from this browser. You can create a new agreement anytime.</p><div class="actions"><button class="btn" data-action="edit-commitment" data-id="${escapeHTML(id)}">Keep agreement</button><button class="btn danger" data-action="confirm-delete" data-id="${escapeHTML(id)}">Remove agreement</button></div>`);
  }
  if (action === 'confirm-delete') {
    state.commitments = state.commitments.filter(c => c.id !== id);
    const persisted = save();
    $('#modal').close();
    render();
    if (persisted) toast('Agreement removed.');
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'meeting-search') {
    query = event.target.value;
    $('#meeting-results').innerHTML = meetingResults();
  }
  if (event.target.id === 'target') $('#progress').max = event.target.value;
});

document.addEventListener('change', event => {
  if (event.target.id === 'topic-filter') {
    topic = event.target.value;
    $('#meeting-results').innerHTML = meetingResults();
  }
});

document.addEventListener('submit', event => {
  if (!['commitment-form', 'focus-form'].includes(event.target.id)) return;
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  if (form.id === 'focus-form') {
    const focus = data.get('focus').trim();
    if (!focus) {
      $('#focus').setCustomValidity('Enter a focus before saving.');
      $('#focus').reportValidity();
      $('#focus').oninput = () => $('#focus').setCustomValidity('');
      return;
    }
    state.focus = focus;
  } else {
    const title = data.get('title').trim();
    if (!title) {
      $('#title').setCustomValidity('Enter an agreement before saving.');
      $('#title').reportValidity();
      $('#title').oninput = () => $('#title').setCustomValidity('');
      return;
    }
    const item = {
      id: form.dataset.id || crypto.randomUUID(),
      title,
      category: data.get('category'),
      partner: data.get('partner'),
      target: Number(data.get('target')),
      progress: Number(data.get('progress')),
      notes: data.get('notes').trim()
    };
    const index = state.commitments.findIndex(c => c.id === item.id);
    if (index >= 0) state.commitments[index] = item;
    else state.commitments.push(item);
  }
  const persisted = save();
  $('#modal').close();
  render();
  if (persisted) toast('Saved in this browser.');
});

$('#modal').addEventListener('close', () => {
  if (previousFocus?.isConnected) previousFocus.focus();
  else $('#main').focus({preventScroll: true});
});

window.addEventListener('hashchange', () => {
  render();
  window.scrollTo(0, 0);
  $('#main').focus({preventScroll: true});
});

render();
