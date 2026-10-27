// Dependency-free checks for local persistence, migration, and link safety.
// Run: node tests/check.js
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
let stored = JSON.stringify({focus:'Keep my existing focus',commitments:[{id:'old',title:'Existing promise',target:3,progress:2,category:'Growth',partner:'Alex',notes:''}]});
const nodes = new Map(), handlers = {};
function node(){return {innerHTML:'',textContent:'',classList:{add(){},remove(){}},addEventListener(){},showModal(){},close(){},focus(){}};}
const ctx = {structuredClone,URL,Date,crypto:{randomUUID:()=> 'new-id'},setTimeout:()=>0,clearTimeout(){},FormData:class{constructor(form){this.data=form.values;}get(key){return this.data[key]??'';}},localStorage:{getItem:()=>stored,setItem:(key,value)=>{stored=value;}},location:{hash:'#home'},window:{addEventListener(){}},document:{querySelector(key){if(!nodes.has(key))nodes.set(key,node());return nodes.get(key);},addEventListener(type,fn){(handlers[type]??=[]).push(fn);}}};
vm.createContext(ctx);
function boot(){vm.runInContext(fs.readFileSync('features.js','utf8'),ctx);vm.runInContext(fs.readFileSync('app.js','utf8'),ctx);}
boot();
const read=code=>vm.runInContext(code,ctx);
function submit(id,values,dataset={}){const event={target:{id,values,dataset},preventDefault(){}};for(const fn of handlers.submit)fn(event);}
assert.equal(read('state.focus'),'Keep my existing focus');
assert.equal(read('state.commitments[0].progress'),2);
assert.equal(read('state.reflections.length'),0);
submit('reflection-form',{date:'2026-10-27',high:'',low:'',buffalo:''});
assert.equal(read('state.reflections.length'),0);
submit('reflection-form',{date:'2026-10-27',high:'Good walk',low:'',buffalo:'Saw a fox'});
assert.equal(JSON.parse(stored).reflections[0].buffalo,'Saw a fox');
submit('reflection-form',{date:'2026-10-26',high:'Updated',low:'Hard day',buffalo:''},{id:'new-id'});
assert.equal(read('state.reflections.length'),1);
assert.equal(read('state.reflections[0].high'),'Updated');
submit('meeting-links-form',{folder:'https://drive.google.com/drive/folders/example',recording:'',notes:''},{id:'m1'});
assert.match(JSON.parse(stored).meetingLinks.m1.folder,/drive.google.com/);
submit('resource-form',{title:'Helpful reading',url:'javascript:alert(1)',kind:'Reading'},{id:'m1'});
assert.equal(read('meetingLinks("m1").resources.length'),0);
submit('resource-form',{title:'Helpful reading',url:'https://example.com/reading',kind:'Reading',suggestedBy:'Alex',note:'Useful prompt'},{id:'m1'});
assert.equal(JSON.parse(stored).meetingLinks.m1.resources.length,1);
submit('resource-form',{title:'Updated reading',url:'https://example.com/new',kind:'Reading',suggestedBy:'Alex',note:''},{id:'m1',resource:'new-id'});
assert.equal(read('meetingLinks("m1").resources.length'),1);
assert.equal(read('meetingLinks("m1").resources[0].title'),'Updated reading');
assert.equal(read('safeLink("data:text/html,test")'),'');
assert(read('reflectionPanel()').includes('Updated'));
assert(read('meetingArtifacts("m1")').includes('rel="noopener noreferrer"'));
assert(!read('commitRow(state.commitments[0])').includes('role="checkbox"'));
assert(read('commitRow({...state.commitments[0],target:1,progress:1})').includes('aria-checked="true"'));
// Recreate the JavaScript context to simulate a fresh page loading browser data.
const reloaded={...ctx,document:{...ctx.document,addEventListener(){}},window:{addEventListener(){}}};
vm.createContext(reloaded);vm.runInContext(fs.readFileSync('features.js','utf8'),reloaded);vm.runInContext(fs.readFileSync('app.js','utf8'),reloaded);
assert.equal(vm.runInContext('state.reflections[0].high',reloaded),'Updated');
assert.equal(vm.runInContext('meetingLinks("m1").resources[0].title',reloaded),'Updated reading');
assert.equal(vm.runInContext('state.commitments[0].progress',reloaded),2);
console.log('Passed: existing data migration; reflection create/edit/reload; meeting links and resource create/edit/reload; unsafe URL rejection; binary/counted controls.');
