import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';const js=fs.readFileSync(new URL('../public/assets/js/app.js',import.meta.url),'utf8'),css=fs.readFileSync(new URL('../public/assets/css/app.css',import.meta.url),'utf8');
test('real URLs exist for core pages',()=>{for(const p of ['/dashboard','/scan','/plan','/waiting','/attendance','/master/employees','/master/skills','/master/lines'])assert.ok(js.includes(`'${p}'`),p)});
test('sidebar is collapsible and preference only is local',()=>{assert.match(js,/mpp\.sidebar/);assert.match(css,/sidebar\.collapsed/)});
test('production frontend does not carry original monolith size',()=>{assert.ok(Buffer.byteLength(js)<100000);assert.ok(Buffer.byteLength(css)<100000)});
