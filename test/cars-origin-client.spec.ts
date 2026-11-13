// @license
// Copyright (c) 2026 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

import {
  Fetch,
  helloLines,
  noMaster,
  showHello,
  uiHello,
} from '../src/cars-origin-client';

const answering =
  (body: unknown, ok = true): Fetch =>
  async () => ({ ok, json: async () => body });

describe('helloLines()', () => {
  it('puts its own line before the lines of the master', async () => {
    const lines = await helloLines(answering({ lines: ['a', 'b'] }));
    expect(lines).toEqual([uiHello, 'a', 'b']);
  });

  it('asks api/hello relative to the page', async () => {
    const urls: string[] = [];
    await helloLines(async (url) => {
      urls.push(url);
      return { ok: true, json: async () => ({ lines: [] }) };
    });
    expect(urls).toEqual(['api/hello']);
  });

  it('shows only its own line when the answer has no lines', async () => {
    expect(await helloLines(answering({}))).toEqual([uiHello]);
  });

  it('says so when the master answers an error', async () => {
    expect(await helloLines(answering({}, false))).toEqual([
      uiHello,
      noMaster,
    ]);
  });

  it('says so when the master cannot be reached', async () => {
    const failing: Fetch = async () => {
      throw new Error('offline');
    };
    expect(await helloLines(failing)).toEqual([uiHello, noMaster]);
  });
});

describe('showHello()', () => {
  it('writes one paragraph per line', async () => {
    const element = document.createElement('main');
    element.innerHTML = '<p>Loading …</p>';
    await showHello(element, answering({ lines: ['b'] }));
    expect(
      Array.from(element.querySelectorAll('p')).map((p) => p.textContent),
    ).toEqual([uiHello, 'b']);
  });
});
