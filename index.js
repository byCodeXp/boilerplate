#!/usr/bin/env node

const prompts = require('prompts');
const path = require('path');
const fs = require('fs');
const { argv, argv0 } = require('process');

const cwd = process.cwd();

const templates = [
   'react',
   'react-tailwind'
   'react-ts',
   'react-ts-tailwind',
   'electron-react'
];

async function init() {
   const result = await prompts([
      {
         type: 'select',
         name: 'template',
         message: 'Select a template:',
         choices: templates.map((t) => {
            return {
               title: t,
               value: t
            }
         })
      }
   ]);

   const src = path.join(__dirname, `templates\\${result.template}`);
   const dest = path.join(cwd, argv[2] || '');

   copy(src, dest);
}

init();

function copy(src, dest) {
   const stat = fs.statSync(src)
   if (stat.isDirectory()) {
      copyDir(src, dest)
   } else {
      fs.copyFileSync(src, dest)
   }
}

function copyDir(srcDir, destDir) {
   fs.mkdirSync(destDir, { recursive: true })
   for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
   }
}