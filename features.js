'use strict';
// These helpers extend the same browser-local prototype; no network API is used.
let showPastReflections = false;

function localDate(){const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
function safeLink(value){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}

function reflectionPanel(){
  const entries=state.reflections.filter(r=>r.memberId===currentMemberId).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt.localeCompare(a.updatedAt));
  const latest=entries[0];
  const earlier=entries.slice(1);

  return `<section class="panel wide">
    <div class="section-head">
      <div>
        <span class="eyebrow">A MOMENT TO CHECK IN</span>
        <h2>High / Low / Buffalo</h2>
      </div>
      <button class="btn primary" data-action="reflection">＋ Reflect</button>
    </div>
    <p class="subtitle">Here for the call or catching up afterward, take a moment to name what’s happening in your life.</p>
    <p class="small muted">Your reflections stay in this browser. They aren’t shared with the circle yet.</p>
    
    ${latest ? `
      <article class="reflection-entry">
        <div class="section-head">
          <div>
            <span class="date">${dateLabel(latest.date)}</span>
            <span class="pill" style="margin-left:8px">Latest check-in</span>
          </div>
          <button class="text-btn" data-action="reflection" data-id="${escapeHTML(latest.id)}" aria-label="Edit reflection for ${dateLabel(latest.date)}">Edit</button>
        </div>
        <div class="reflection-grid">
          ${[
            ['high','High','Something that lifted you up'],
            ['low','Low','Something that’s been hard'],
            ['buffalo','Buffalo','Something random, quirky, or surprising']
          ].map(([key,title,hint])=>`
            <div class="reflection-box">
              <span class="eyebrow">${title}</span>
              <p class="reflection-text">${latest[key] ? escapeHTML(latest[key]) : `<span class="muted">${hint} — not added yet.</span>`}</p>
            </div>
          `).join('')}
        </div>
      </article>

      ${earlier.length ? `
        <div class="reflection-accordion">
          <button class="text-btn" data-action="toggle-past-reflections">
            ${showPastReflections ? 'Hide earlier reflections ↑' : `View ${earlier.length} earlier reflection${earlier.length > 1 ? 's' : ''} ↓`}
          </button>
          ${showPastReflections ? earlier.map(r=>`
            <article class="reflection-entry" style="opacity:.85">
              <div class="section-head">
                <span class="date">${dateLabel(r.date)}</span>
                <button class="text-btn" data-action="reflection" data-id="${escapeHTML(r.id)}" aria-label="Edit reflection for ${dateLabel(r.date)}">Edit</button>
              </div>
              <div class="reflection-grid">
                ${[['high','High','Something that lifted you up'],['low','Low','Something that’s been hard'],['buffalo','Buffalo','Something random, quirky, or surprising']].map(([key,title,hint])=>`
                  <div class="reflection-box">
                    <span class="eyebrow">${title}</span>
                    <p class="reflection-text">${r[key] ? escapeHTML(r[key]) : `<span class="muted">${hint} — not added yet.</span>`}</p>
                  </div>
                `).join('')}
              </div>
            </article>
          `).join('') : ''}
        </div>
      ` : ''}
    ` : `
      <div class="reflection-empty">
        <span class="eyebrow">HIGH · LOW · BUFFALO</span>
        <p>A bright spot. A hard thing. Something unexpected.</p>
        <span class="small muted">Your first reflection can start with just one of the three.</span>
        <div style="margin-top:14px">
          <button class="btn primary" data-action="reflection">Start check-in</button>
        </div>
      </div>
    `}
  </section>`;
}

function editReflection(id){
  const r=state.reflections.find(item=>item.id===id);
  openModal(`${modalHeader(r?'Edit your reflection':'How are you arriving?','HIGH / LOW / BUFFALO')}
  <form id="reflection-form" data-id="${r?escapeHTML(r.id):''}">
    <label for="reflection-date">Reflection date</label>
    <input id="reflection-date" name="date" type="date" required value="${r?.date||localDate()}">
    <label for="reflection-high">High · Something that lifted you up</label>
    <textarea id="reflection-high" name="high" maxlength="2000" placeholder="A win, a moment of gratitude, a good surprise…">${escapeHTML(r?.high||'')}</textarea>
    <label for="reflection-low">Low · Something that’s been hard</label>
    <textarea id="reflection-low" name="low" maxlength="2000" placeholder="A challenge, a disappointment, something weighing on you…">${escapeHTML(r?.low||'')}</textarea>
    <label for="reflection-buffalo">Buffalo · Something random, quirky, or surprising</label>
    <textarea id="reflection-buffalo" name="buffalo" maxlength="2000" placeholder="An unexpected moment, a fun fact, a small oddity…">${escapeHTML(r?.buffalo||'')}</textarea>
    <p class="small muted">Fill in any one field or all three. Saved only in this browser.</p>
    <p id="reflection-error" class="form-error" role="alert"></p>
    <div class="actions">
      <button type="button" class="btn" data-action="close">Cancel</button>
      <button class="btn primary">Save reflection</button>
    </div>
  </form>`);
}

function meetingLinks(id){return state.meetingLinks[id]||{folder:'',recording:'',notes:'',resources:[]};}
function externalLink(url,label){const href=safeLink(url);return href?`<a class="resource-link" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`:'';}
function meetingArtifacts(id){
  const links=meetingLinks(id);
  const google=[['folder','Meeting folder in Google Drive'],['recording','Google Meet recording'],['notes','Meeting notes / transcript']];
  return `<section class="detail-section"><div class="section-head"><h3>Saved in Google</h3><button class="text-btn" data-action="meeting-links" data-id="${id}">Edit links</button></div><p class="small muted">Open the original meeting materials in Google.</p><div class="resource-list">${google.map(([key,title])=>links[key]?externalLink(links[key],title):`<span class="missing-link">${title} · No link yet</span>`).join('')}</div></section><section class="detail-section"><div class="section-head"><h3>From the circle</h3><button class="text-btn" data-action="resource" data-id="${id}">＋ Add resource</button></div><p class="small muted">Tools, videos, readings, and other things suggested during the conversation.</p>${links.resources.length?`<div class="resource-list">${links.resources.map(r=>`<div class="resource-item">${externalLink(r.url,r.title)}<span class="small muted">${escapeHTML(r.kind)}${r.suggestedBy?' · Suggested by '+escapeHTML(r.suggestedBy):''}</span>${r.note?`<p class="reflection-text small">${escapeHTML(r.note)}</p>`:''}<button class="text-btn" data-action="resource" data-id="${id}" data-resource="${escapeHTML(r.id)}" aria-label="Edit ${escapeHTML(r.title)}">Edit resource</button></div>`).join('')}</div>`:'<p class="small muted">No resources linked yet. Add the first recommendation.</p>'}<p class="small muted">Links open in a new tab. Google permissions still apply. Resources are linked from their original location.</p></section>`;
}
function showMeeting(id){
  const m=meetings.find(item=>item.id===id);
  if(!m)return;
  openModal(`${modalHeader(m.title,dateLabel(m.date))}${pills(m.topics)}<div class="meta">${m.attendees} brothers · 7:00–8:30 PM CT</div><section class="detail-section"><h3>Summary</h3><p>${m.summary}</p></section><section class="detail-section"><h3>Key takeaways</h3><ul>${m.takeaways.map(t=>`<li>${t}</li>`).join('')}</ul></section><section class="detail-section"><h3>A question to carry forward</h3><p>${m.question}</p></section>${meetingArtifacts(id)}`);
}
function editMeetingLinks(id){
  const links=meetingLinks(id);
  openModal(`${modalHeader('Link the original meeting','SAVED IN GOOGLE')}<form id="meeting-links-form" data-id="${id}"><p class="small muted">Paste links from Google. Leave a field blank if that material isn’t available. These links are saved only in this browser.</p>${[['folder','Google Drive meeting folder'],['recording','Google Meet recording'],['notes','Notes / transcript']].map(([key,label])=>`<label for="link-${key}">${label}</label><input id="link-${key}" name="${key}" type="url" maxlength="2000" placeholder="https://…" value="${escapeHTML(links[key])}">`).join('')}<p class="form-error" id="links-error" role="alert"></p><div class="actions"><button type="button" class="btn" data-action="meeting" data-id="${id}">Cancel</button><button class="btn primary">Save links</button></div></form>`);
}
function editResource(id,resourceId){
  const r=meetingLinks(id).resources.find(item=>item.id===resourceId);
  openModal(`${modalHeader(r?'Edit a recommendation':'Something worth passing on','FROM THE CIRCLE')}<form id="resource-form" data-id="${id}" data-resource="${r?escapeHTML(r.id):''}"><label for="resource-title">Resource title</label><input id="resource-title" name="title" maxlength="160" required value="${escapeHTML(r?.title||'')}"><label for="resource-url">Link to the resource</label><input id="resource-url" name="url" type="url" maxlength="2000" required placeholder="https://…" value="${escapeHTML(r?.url||'')}"><div class="form-grid"><div><label for="resource-kind">Type</label><select id="resource-kind" name="kind">${['Tool','Video','Reading','Other'].map(t=>`<option ${r?.kind===t?'selected':''}>${t}</option>`).join('')}</select></div><div><label for="resource-by">Suggested by (optional)</label><input id="resource-by" name="suggestedBy" maxlength="100" value="${escapeHTML(r?.suggestedBy||'')}"></div></div><label for="resource-note">Why it helped (optional)</label><textarea id="resource-note" name="note" maxlength="1000">${escapeHTML(r?.note||'')}</textarea><p class="form-error" id="resource-error" role="alert"></p><div class="actions"><button class="btn" type="button" data-action="meeting" data-id="${id}">Cancel</button><button class="btn primary">Save resource</button></div></form>`);
}

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');
  if(!button)return;
  const {action,id,resource}=button.dataset;
  if(action==='reflection')editReflection(id);
  if(action==='meeting-links')editMeetingLinks(id);
  if(action==='resource')editResource(id,resource);
  if(action==='toggle-past-reflections'){
    showPastReflections=!showPastReflections;
    render();
  }
});

document.addEventListener('submit',event=>{
  const form=event.target;if(!['reflection-form','meeting-links-form','resource-form'].includes(form.id))return;
  event.preventDefault();const data=new FormData(form);const id=form.dataset.id;
  if(form.id==='reflection-form'){
    const entry={id:id||crypto.randomUUID(),memberId:currentMemberId,date:data.get('date'),high:data.get('high').trim(),low:data.get('low').trim(),buffalo:data.get('buffalo').trim(),updatedAt:new Date().toISOString()};
    if(!entry.high&&!entry.low&&!entry.buffalo){$('#reflection-error').textContent='Add a high, low, or buffalo before saving.';return;}
    const index=state.reflections.findIndex(r=>r.id===id);if(index<0)state.reflections.push(entry);else state.reflections[index]=entry;
    const persisted=save();$('#modal').close();render();if(persisted)toast('Reflection saved in this browser.');return;
  }
  const links=structuredClone(meetingLinks(id));
  if(form.id==='meeting-links-form'){
    for(const key of ['folder','recording','notes']){const value=data.get(key).trim();if(value&&!safeLink(value)){$('#links-error').textContent='Use a complete http:// or https:// link.';return;}links[key]=value?safeLink(value):'';}
  }else{
    const url=safeLink(data.get('url').trim()),title=data.get('title').trim();
    if(!url||!title){$('#resource-error').textContent='Add a title and a complete http:// or https:// link.';return;}
    const item={id:form.dataset.resource||crypto.randomUUID(),title,url,kind:data.get('kind'),suggestedBy:data.get('suggestedBy').trim(),note:data.get('note').trim()};
    const index=links.resources.findIndex(r=>r.id===item.id);if(index<0)links.resources.push(item);else links.resources[index]=item;
  }
  state.meetingLinks[id]=links;const persisted=save();showMeeting(id);if(persisted)toast('Meeting links saved in this browser.');
});

function profileReflection(memberId){
  const latest=state.reflections.filter(r=>r.memberId===memberId).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt.localeCompare(a.updatedAt))[0];
  return `<section class="detail-section"><div class="section-head"><h3>Latest High / Low / Buffalo</h3>${memberId===currentMemberId?'<a class="text-btn" href="#home" data-action="close">Reflect on Home →</a>':''}</div>${latest?`<span class="date">${dateLabel(latest.date)}</span>${[['high','High'],['low','Low'],['buffalo','Buffalo']].map(([key,label])=>`<div class="profile-reflection"><span class="eyebrow">${label}</span><p class="reflection-text">${latest[key]?escapeHTML(latest[key]):'<span class="muted">Not added in this reflection.</span>'}</p></div>`).join('')}<p class="small muted">Saved on this browser. This update isn’t shared with other devices yet.</p>`:'<p class="small muted">No reflection yet.</p>'}</section>`;
}
