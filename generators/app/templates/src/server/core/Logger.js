"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const winston = require("winston");
const Enums_1 = require("../../shared/Enums");
const EnvironmentProvider_1 = require("./EnvironmentProvider");
const inversify_1 = require("inversify");
const AppConstants_1 = require("./AppConstants");
let Logger = class Logger {
    constructor() {
        this.logDir = process.env.NODE_LOG || AppConstants_1.default.LOG_DIR;
        this.environment = new EnvironmentProvider_1.default();
        this.ensureDirectory();
        this.initializeLogger();
    }
    debug(...params) {
        if (!this.environment.isProduction()) {
            let message = this.paramsToString(params);
            this.internalLogger.debug(message);
        }
    }
    error(...params) {
        let message = this.paramsToString(params);
        this.internalLogger.error(message);
    }
    info(...params) {
        let message = this.paramsToString(params);
        this.internalLogger.info(message);
    }
    warn(...params) {
        let message = this.paramsToString(params);
        this.internalLogger.warn(message);
    }
    fatal(...params) {
        let message = this.paramsToString(params);
        this.internalLogger.error("FATAL! >> " + message);
    }
    ensureDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }
    initializeLogger() {
        this.internalLogger = new winston.Logger({
            timestamp: true,
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: "debug",
                    prettyPrint: true,
                    silent: false,
                    timestamp: false,
                }),
                new (winston.transports.File)({
                    filename: path.join(this.logDir, Enums_1.Environment[this.environment.getEnvironment()] + ".log"),
                }),
            ],
        });
    }
    paramsToString(...params) {
        return params.map(((value) => value.toString())).join(" ");
    }
};
Logger = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Logger);
exports.default = Logger;
//# sourceMappingURL=Logger.js.map