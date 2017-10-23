# Unip

Unip website project

## Installing

In order to start working with project, you must:

####  Clone repository to your local machine

```
https://bitbucket.org/vintageua/unip.git
```

####  Install dependencies

npm
```
npm i -g jscs && npm i
```

yarn
```
yarn add global jscs && yarn install
```

#### Configure WebStorm

Turn off 'Safe write' option
```
Settings | Appearance & Behavior | System Settings | Use "safe write"
```

Change ECMAScript version
```
Settings | Languages & Frameworks | Javascript | Javascript language version: "ECMAScript6"
```

Enable JSCS linter
```
Settings | Languages & Frameworks | Javascript | Code Quality Tools | JSCS | "Enable"
```

## NPM scripts

Start development

```
npm run development
```

Build production bundle

```
npm run production
```

## JSDoc

Install JSDoc globally

```
npm install jsdoc -g
```

Generate docs

```
npm run-script compileDocs
```

Open docs
```
npm run-script openDocs
```

## Built with

* [Gulp](http://gulpjs.com/)
* [Pug](https://github.com/pugjs/pug)
* [Webpack 2.2](https://webpack.js.org/)
* [Sass](http://sass-lang.com/)
* [Babel](https://babeljs.io/)
* [Browsersync](https://www.browsersync.io/)

## Versioning

Current version is 0.1.1
