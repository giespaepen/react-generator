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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interfaces = require("../core/Interfaces");
const attr = require("../core/ControllerAttributes");
const Controller_1 = require("../core/Controller");
const ControllerAttributes_1 = require("../core/ControllerAttributes");
const inversify_1 = require("inversify");
let ErrorController = class ErrorController extends Controller_1.default {
    constructor(config, logger) {
        super();
        this.logger = logger;
        this.env = config;
    }
    log(context) {
        let error = context.body;
        let ip = context.request.connection.remoteAddress;
        let prefix = "CLIENT ERROR";
        this.logger.error(prefix, ip);
        if (error.message) {
            this.logger.error(prefix, error.message);
        }
        if (!this.env.isProduction() && error.stack) {
            this.logger.error(prefix, error.stack);
        }
        return {};
    }
};
__decorate([
    attr.post("/"),
    attr.json(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ControllerAttributes_1.ActionContext]),
    __metadata("design:returntype", Object)
], ErrorController.prototype, "log", null);
ErrorController = __decorate([
    attr.autowire("/error"),
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IEnvironmentProvider")),
    __param(1, inversify_1.inject("ILogger")),
    __metadata("design:paramtypes", [Object, Object])
], ErrorController);
exports.default = ErrorController;
//# sourceMappingURL=ErrorController.js.map