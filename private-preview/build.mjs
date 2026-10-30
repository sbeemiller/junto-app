// Builds outside the public source tree. No dependencies or credentials are bundled.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const source=path.dirname(fileURLToPath(import.meta.url));
const root=path.dirname(source);
const envText=await fs.readFile(path.join(root,'.env.local'),'utf8');
const env=Object.fromEntries(envText.split('\n').filter(line=>line&&!line.startsWith('#')).map(line=>{const i=line.indexOf('=');return [line.slice(0,i),line.slice(i+1)];}));
for(const key of ['JUNTO_OWNER_EMAIL','JUNTO_SHEET_ID'])if(!env[key])throw new Error('Missing '+key+' in .env.local');
const output=process.argv[2];if(!output||!path.isAbsolute(output))throw new Error('Pass an absolute build-output directory outside the public repository.');
if(path.resolve(output).startsWith(root+path.sep))throw new Error('Build output must stay outside the public repository.');
await fs.mkdir(output,{recursive:true});
for(const file of ['Code.gs','Index.html','appsscript.json'])await fs.copyFile(path.join(source,file),path.join(output,file));
const css=(await fs.readFile(path.join(root,'styles.css'),'utf8')).replace(/url\(['"]?assets\/[^)]+\)/g,'none');
await fs.writeFile(path.join(output,'Style.html'),css);
await fs.writeFile(path.join(output,'Config.gs'),'const JUNTO_CONFIG = '+JSON.stringify({ownerEmail:env.JUNTO_OWNER_EMAIL,spreadsheetId:env.JUNTO_SHEET_ID})+';\n');
console.log('Built owner preview. Keep Config.gs outside public hosting and Git.');
