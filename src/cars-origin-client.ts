// @license
// Copyright (c) 2026 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

/** The greeting of this package */
export const uiHello = 'Hello from cars-origin-client';

/** The line shown when the master does not answer */
export const noMaster = '(no answer from /api/hello yet)';

/** The fetch function the page uses; replaceable in tests */
export type Fetch = (url: string) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

/**
 * Loads all lines of the hello world: its own line first, then the lines
 * the master of its side answers on `/api/hello`
 * @param fetchFn - The fetch function to use
 * @returns The lines to show
 */
export async function helloLines(fetchFn: Fetch): Promise<string[]> {
  try {
    const res = await fetchFn('/api/hello');
    if (!res.ok) {
      return [uiHello, noMaster];
    }
    const body = (await res.json()) as { lines?: unknown };
    const lines = Array.isArray(body.lines) ? body.lines.map(String) : [];
    return [uiHello, ...lines];
  } catch {
    return [uiHello, noMaster];
  }
}

/**
 * Shows the hello lines in an element, one paragraph per line
 * @param element - The element to fill
 * @param fetchFn - The fetch function to use
 */
export async function showHello(
  element: HTMLElement,
  fetchFn: Fetch,
): Promise<void> {
  const lines = await helloLines(fetchFn);
  element.replaceChildren(
    ...lines.map((line) => {
      const p = element.ownerDocument.createElement('p');
      p.textContent = line;
      return p;
    }),
  );
}
