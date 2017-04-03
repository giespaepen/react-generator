# generator-react-template 

[![Build Status](https://travis-ci.org/giespaepen/react-generator.svg?branch=master)](https://travis-ci.org/giespaepen/react-generator)
[![npm version](https://badge.fury.io/js/generator-react-template.svg)](https://badge.fury.io/js/generator-react-template)

> Simple React template to set up your project at once. It includes an express server with an easy MVC pattern to build services.

## Installation
### Quickly use it locally
Clone the repository and link it:

```bash
npm link
```

### When it's installed via npm or yarn
First, install [Yeoman](http://yeoman.io) and generator-react-template using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-template
```

Then generate your new project:

```bash
yo react-template
```

### Also...

Make sure to install yarn as a package manager.

# About the template
You might use this template if you need a full React-Redux-Saga-Axios setup with an ExpressJS back-end in order to provide API calls, data, authentication... 

The back-end is an adapted ExpressJS with a real MVC structure and classes which can be decorated to generate endpoints. 

The front-end is based on the combo React-Redux, enhanced with Saga for side-effects and Axios for making calls.

## License

MIT © [Gie Spaepen]()


[npm-image]: https://badge.fury.io/js/generator-react-template.svg
[npm-url]: https://npmjs.org/package/generator-react-template
[travis-image]: https://travis-ci.org/giespaepen/generator-react-template.svg?branch=master
[travis-url]: https://travis-ci.org/giespaepen/generator-react-template
[daviddm-image]: https://david-dm.org/giespaepen/generator-react-template.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/giespaepen/generator-react-template
