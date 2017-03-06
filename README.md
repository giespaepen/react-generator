# generator-react-template 
> Simple React template to set up your project at once. It includes an express server with an easy MVC pattern to build services.

## Installation

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

This is a React-Redux front-end template. By installing the project with Yeoman everything is 
good to go. The back-end of this project is an Express site,
which can be found in: ```src/server```

The main intend of the server is to provide all the needed front-end stuff. Feel free to add extra controllers and 
functionality if needed. The client code can be found in: ```src/client```.

All base stuff is located in the core directory. Wich should be left as it is. As you expect you get the following folders: 

* components: Define extra react components here 
* state: You can extend the base state here 
* reducers: ... and write the appropriate reducers 
* reducers: ... and write the appropriate reducers 
* views: These are the base handlebar views used by the ExpressJS. 
* assets: Base style files, images and fonts 

## Getting started
A good place to start is the **Index.tsx** file. It contains the basic routing. This leads to the pages folder. 
Where you can find the source code of this one. A page is a react component in which you can use the core 
components such as ItemComponent, ItemLinks... You can use the core components to compose pages based on one 
or more Contentful items. Every item is also an independent page via the ItemRoute.

## The commands
The project is based on webpack. In order to run the project:

```npm start```

And express and webpack are spinned up, including hot reloading. Default port is 3000.

If you want to build the server-side and client-side separately:

* Server: ```tsc -p src/server```
* Client: ```webpack src/client````

However we advise you to use the build-in commands:

* Development: ```npm build```
* Acceptance: ```npm build-acc```
* Production: ```npm build-prd```

There's an additional build procedure for automated testing and CI:

* ```npm build-ci```


Finally, if you are coding, run an ```npm clean``` first. The hot-reloading module serves from 
memory. But if a file is available that one is taken.

To run the front-end tests:

```npm run test```

## Configurable environment variables

* APP_TITLE: Set the application title, by default Contentful-React
* LOG_DIR: Set the log directory, by default ./log
* NODE_PORT: Set the port of the application, by default 3000

## License

MIT © [Gie Spaepen]()


[npm-image]: https://badge.fury.io/js/generator-react-template.svg
[npm-url]: https://npmjs.org/package/generator-react-template
[travis-image]: https://travis-ci.org/giespaepen/generator-react-template.svg?branch=master
[travis-url]: https://travis-ci.org/giespaepen/generator-react-template
[daviddm-image]: https://david-dm.org/giespaepen/generator-react-template.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/giespaepen/generator-react-template
