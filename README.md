# 🖌 JSON Studio - JSON Schema Based Editor

![CI/CD](https://github.com/sujinleeme/json-studio/actions/workflows/master_deploy.yml/badge.svg)
[![Codecov](https://img.shields.io/codecov/c/github/sujinleeme/json-studio)](https://codecov.io/gh/sujinleeme/json-studio)
![License](https://img.shields.io/github/license/sujinleeme/json-studio)

![alt text](./demo.png "demo")

- Download / Upload JSON file
- JSON formatter: Minify, Prettify, Fix JSON content
- JSON Schema Validation

## Built with

- [monaco-react](https://github.com/suren-atoyan/monaco-react) - Monaco Editor for React
- [fluent ui](https://github.com/microsoft/fluentui) - A react component library developed by Microsoft
- [dirty-json](https://github.com/RyanMarcus/dirty-json) - A JSON parser that tries to handle non-conforming or otherwise invalid JSON
- [Ajv](https://github.com/ajv-validator/ajv) - A fastest JSON validator for Node.js and browser
- [vite](https://vitejs.dev) and [vercel](https://vercel.com)

## Demo

Visit to https://json-studio.vercel.app

## Installation

Git clone this repo and run `yarn && yarn start`.

## Current Monaco Editor's Problems

### Testing

As the initialization process is supposed to load some scripts from CDN, there is a problem with Jest (and other testing tools). It only shows "Loading..." and never gets the editor working in the test.

See : https://github.com/suren-atoyan/monaco-react/issues/88

## TODO

- Form integration
- Toast notification message

## License

MIT (2020~)
