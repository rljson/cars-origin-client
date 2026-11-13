<!--
@license
Copyright (c) rljson

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# @rljson/cars-origin-client

English | [Deutsch](README.de.md)

[![CI](https://github.com/rljson/cars-origin-client/actions/workflows/quick_check.yaml/badge.svg)](https://github.com/rljson/cars-origin-client/actions/workflows/quick_check.yaml)

Client website of the origin side of the cars example app, where catalogs are captured originally.

## Motivation

- The origin side of the cars example app has its own client website,
  where catalogs are captured originally
- A static page served by nginx; it shows its own hello line and the
  lines the master of its side answers on `api/hello`, which nginx
  forwards to `MASTER_URL`. The URL is relative to the page, so the page
  works under any path, e.g. behind a proxy that serves it at
  `/origin-client/` and strips that prefix
- `GET /health` answers `ok`; it runs as a container in the stages
  `dev`, `test` and `prod`

## Installation

The package is private and not published to npm. Depend on a tagged
version of its git repository:

```bash
pnpm add git+ssh://git@github.com/rljson/cars-origin-client.git#semver:^0.0.1
```

## Usage

Show the hello lines in an element:

```ts
import { showHello } from '@rljson/cars-origin-client';

await showHello(document.getElementById('hello')!, (url) => fetch(url));
```

The page shows `Hello from cars-origin-client` and the lines of the master.

### Container

Build the image in the registry `crcars`, tagged with the version:

```bash
az acr build --registry crcars --image cars-origin-client:<version> .
```

## Limitations

- No sync and no Electron app yet, only the hello world

## Documentation

- The guides in [doc/guides](doc/guides)

## Status

Before 1.0 — the API may change between minor versions.

## Contributing

See [doc/guides/develop-guide.md](doc/guides/develop-guide.md).

## License

MIT — see [LICENSE](LICENSE).
