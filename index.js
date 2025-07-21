/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */

import { writeFile } from 'node:fs/promises';
import { extractHostnamesWithNotes } from './lib/hostnames.js';
import { generateLSRulesFromHostnames } from './lib/lsrules.js';

const FILE_EXTENSION = '.lsrules';
const OUTPUT_PATH = './rules';

const rulesToGenerate = /** @type {const} */ ([
  {
    filename: 'vscode',
    description: 'Auto-generated rules from the VS Code documentation',
    name: 'VS Code',
    process: 'identifier.UBF8T346G9/com.microsoft.VSCode',
    source: 'https://raw.githubusercontent.com/microsoft/vscode-docs/main/docs/setup/network.md',
    startAtHeader: '## Common hostnames',
  },
]);

const settled = await Promise.allSettled(rulesToGenerate.map(async (definition) => {
  const {
    filename,
    source,
    startAtHeader,
    ...lsrulesOptions
  } = definition;

  const req = await fetch(source);

  if (!req.ok) {
    throw new Error(`Failed to fetch source, got: ${req.status} ${req.statusText}`);
  }

  const hostnamesWithNotes = extractHostnamesWithNotes(await req.text(), startAtHeader);

  const result = generateLSRulesFromHostnames(hostnamesWithNotes, lsrulesOptions);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await writeFile(
    new URL(`${OUTPUT_PATH}/${filename}${FILE_EXTENSION}`, import.meta.url),
    JSON.stringify(result, undefined, 2),
    'utf8'
  );

  return filename;
}));

let failed = false;

for (const status of settled) {
  if (status.status === 'rejected') {
    // type-coverage:ignore-next-line
    console.error('Failed because:', status.reason);
    failed = true;
  } else {
    console.log('Successfully handled:', status.value);
  }
}

if (failed) {
  process.exit(1);
}
