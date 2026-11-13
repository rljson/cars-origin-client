<!--
@license
Copyright (c) rljson

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# @rljson/cars-origin-client

[English](README.md) | Deutsch

[![CI](https://github.com/rljson/cars-origin-client/actions/workflows/quick_check.yaml/badge.svg)](https://github.com/rljson/cars-origin-client/actions/workflows/quick_check.yaml)

Client-Website der Seite origin der cars-Beispiel-App, wo Kataloge ursprünglich erfasst werden.

## Motivation

- Die Seite origin der cars-Beispiel-App hat eine eigene Client-Website,
  wo Kataloge ursprünglich erfasst werden
- Eine statische Seite, ausgeliefert von nginx; sie zeigt ihre eigene
  Hello-Zeile und die Zeilen, die der Master ihrer Seite auf `api/hello`
  antwortet; nginx leitet dorthin an `MASTER_URL` weiter. Die URL ist
  relativ zur Seite, daher läuft die Seite unter jedem Pfad, etwa hinter
  einem Proxy, der sie unter `/origin-client/` ausliefert und dieses
  Präfix entfernt
- `GET /health` antwortet `ok`; sie läuft als Container in den Stufen
  `dev`, `test` und `prod`

## Installation

Das Package ist privat und nicht auf npm veröffentlicht. Hänge von einer
getaggten Version seines Git-Repos ab:

```bash
pnpm add git+ssh://git@github.com/rljson/cars-origin-client.git#semver:^0.0.1
```

## Verwendung

Die Hello-Zeilen in einem Element zeigen:

```ts
import { showHello } from '@rljson/cars-origin-client';

await showHello(document.getElementById('hello')!, (url) => fetch(url));
```

Die Seite zeigt `Hello from cars-origin-client` und die Zeilen des Masters.

### Container

Das Image in der Registry `crcars` bauen, getaggt mit der Version:

```bash
az acr build --registry crcars --image cars-origin-client:<version> .
```

## Grenzen

- Noch keine Synchronisierung und keine Electron-App, nur das Hello World

## Dokumentation

- Die Guides in [doc/guides](doc/guides)

## Stand

Vor 1.0 — die API kann sich zwischen Minor-Versionen ändern.

## Mitwirken

Siehe [doc/guides/develop-guide.md](doc/guides/develop-guide.md).

## Lizenz

MIT — siehe [LICENSE](LICENSE).
