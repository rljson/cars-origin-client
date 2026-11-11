// @license
// Copyright (c) 2026 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { helloLines } from './cars-origin-client.ts';

export const example = async () => {
  const l = console.log;

  // A master that answers one line
  const fetchFn = async () => ({
    ok: true,
    json: async () => ({ lines: ['Hello from the master'] }),
  });

  l('helloLines(fetchFn)');
  for (const line of await helloLines(fetchFn)) {
    l(`  ${line}`);
  }
};

/*
// Run via "npx vite-node src/example.ts"
await example();
*/
