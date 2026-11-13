# Changelog

## Unreleased

- Ask `api/hello` relative to the page, so the page works under any
  path, e.g. behind a proxy that strips a prefix
- Build the image into the registry `crcars`, tagged with the version
- Name the stages `dev`, `test` and `prod` in the README
- Add the hello world after the setup of `cars-client`: the static page, its `showHello()` and the nginx container that forwards `/api` to `MASTER_URL` and answers `GET /health`
