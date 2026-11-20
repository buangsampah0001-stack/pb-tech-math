import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const root=process.cwd();const dest=join(root,'site');
if(existsSync(dest))rmSync(dest,{recursive:true,force:true});
mkdirSync(dest,{recursive:true});
for(const file of ['index.html'])copyFileSync(join(root,file),join(dest,file));
for(const folder of ['assets','docs'])cpSync(join(root,folder),join(dest,folder),{recursive:true});
console.log('PeriLuas Lab site prepared:',dest);
