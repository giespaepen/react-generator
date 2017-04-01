"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http = require("http");
const https = require("https");
const os = require("os");
const path = require("path");
const Enums = require("../../shared/Enums");
const AppConstants_1 = require("./AppConstants");
const AutoLoader_1 = require("./AutoLoader");
const ControllerBootstrapper_1 = require("./ControllerBootstrapper");
const express = require("express");
const moment = require("moment");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let favicon = require("serve-favicon");
let hbs = require("express-handlebars");
class BaseApp {
    constructor(environment, logger, config, kernel) {
        this.environment = environment;
        this.logger = logger;
        this.config = config;
        this.kernel = kernel;
        this.bootstrapper = new ControllerBootstrapper_1.default(kernel);
    }
    initialize() {
        this.onInitialize();
        this.initializeExpress();
        this.autoLoad();
        this.initializeCommonMiddleware();
        this.initializeWebpack();
        this.initializeHandlebars();
        this.initializeRoutes();
        this.initializeServer();
        this.onInitialized();
    }
    autoLoad() {
        AutoLoader_1.default(path.join(__dirname, AppConstants_1.default.FOLDER_CONTROLLERS), this.logger);
    }
    initializeExpress() {
        if (!this.express) {
            this.express = express();
        }
    }
    initializeCommonMiddleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        let clientdir = path.join(__dirname, AppConstants_1.default.FOLDER_CLIENT);
        let faviconPath = path.join(clientdir, "favicon.ico");
        this.assertDir(clientdir);
        this.express.use(express.static(clientdir));
        if (fs.existsSync(faviconPath)) {
            this.express.use(favicon(faviconPath));
        }
        else {
            this.logger.debug(`Favicon could not be found: ${faviconPath}`);
        }
    }
    initializeWebpack() {
        if (!this.environment.isProduction()) {
            let webpack = require("webpack");
            let webpackDevMiddleware = require("webpack-dev-middleware");
            let webpackHotMiddleware = require("webpack-hot-middleware");
            let webpackConfig = require(AppConstants_1.default.WEBPACK_CONFIG);
            let wpCompiler = new webpack(webpackConfig);
            this.express.use(webpackDevMiddleware(wpCompiler, {
                inline: true,
                noInfo: true,
                path: "/",
                publicPath: "http://localhost:3000/assets/scripts",
                stats: { colors: true },
            }));
            this.express.use(webpackHotMiddleware(wpCompiler));
            this.logger.info("Webpack initialized");
        }
    }
    initializeHandlebars() {
        let viewsdir = path.join(__dirname, AppConstants_1.default.FOLDER_VIEWS);
        let layoutsdir = path.join(__dirname, AppConstants_1.default.FOLDER_VIEWS, "layouts");
        let partialsdir = path.join(__dirname, AppConstants_1.default.FOLDER_VIEWS, "partials");
        this.assertDir(viewsdir);
        this.assertDir(layoutsdir);
        this.assertDir(partialsdir);
        let engine = hbs({
            defaultLayout: "layout.hbs",
            extname: "hbs",
            layoutsDir: layoutsdir,
            partialsDir: partialsdir,
        });
        this.express.set("views", viewsdir);
        this.express.engine("hbs", engine);
        this.express.set("view engine", "hbs");
    }
    initializeRoutes() {
        this.bootstrapper.bindRoutes(this.express, this.logger);
    }
    initializeServer() {
        let server;
        let port = this.config.port;
        if (this.config.ssl) {
            port = AppConstants_1.default.SSL_PORT;
            this.assertDir(this.config.sslCertLocation);
            let options = {
                ca: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants_1.default.SSL_PEM_CHAIN)),
                cert: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants_1.default.SSL_PEM_FULLCHAIN)),
                key: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants_1.default.SSL_PEM_PRIVKEY)),
            };
            server = https.createServer(options, this.express);
        }
        else {
            server = http.createServer(this.express);
        }
        server.listen(port);
        server.on("error", this.onServerErrorHandler(port));
        server.on("close", () => { this.logger.info("Server closed"); });
        server.on("connect", (request) => {
            this.logger.debug(`[${request.method}] ${request.url}`);
        });
        this.logger.info(`Server listening on port ${port} on ${os.hostname()}`);
    }
    onInitialize() {
        let version = require(AppConstants_1.default.PROJECT_FILE).version;
        let env = Enums.Environment[this.environment.getEnvironment()];
        this.lastInitialized = moment();
        this.logger.info("");
        this.logger.info(AppConstants_1.default.APP_TITLE);
        this.logger.info(`**** version: ${version} - ${env}`);
        this.logger.debug("");
    }
    onInitialized() {
        let now = moment();
        let duration = moment.duration(now.diff(this.lastInitialized)).asMilliseconds();
        if (duration > AppConstants_1.default.MAX_BOOTDURATION) {
            this.logger.warn(`Intialization took longer than ${AppConstants_1.default.MAX_BOOTDURATION}ms: ${duration}ms`);
        }
        else {
            this.logger.info(`Initialization took ${duration}ms`);
        }
    }
    onServerErrorHandler(port) {
        return (error) => {
            switch (error.code) {
                case "EACCESS":
                    this.logger.fatal(`Port ${port} needs more privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    this.logger.error(`Server Error of type ${error.code}: ${error.message}`);
                    this.logger.debug(error);
                    throw error;
            }
        };
    }
    assertDir(dir) {
        if (!fs.existsSync(dir)) {
            throw new Error(`Directory doesn't exist: ${dir}`);
        }
    }
}
exports.default = BaseApp;
//# sourceMappingURL=BaseApp.js.map