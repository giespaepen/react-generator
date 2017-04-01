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
const AppConstants_1 = require("../core/AppConstants");
const inversify_1 = require("inversify");
let IndexController = IndexController_1 = class IndexController extends Controller_1.default {
    constructor(config, logger) {
        super();
        this.logger = logger;
        this.config = config;
        if (!IndexController_1.version) {
            IndexController_1.version = require(AppConstants_1.default.PROJECT_FILE).version;
        }
    }
    index() {
        return { version: IndexController_1.version };
    }
    version() {
        return { version: IndexController_1.version };
    }
    apiKey() {
        return {
            apiKey: this.config.apiKey,
            spaceId: this.config.spaceId,
            version: IndexController_1.version,
        };
    }
};
__decorate([
    attr.get("/"),
    attr.view("index"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], IndexController.prototype, "index", null);
__decorate([
    attr.get("version"),
    attr.json(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], IndexController.prototype, "version", null);
__decorate([
    attr.get("config"),
    attr.json(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], IndexController.prototype, "apiKey", null);
IndexController = IndexController_1 = __decorate([
    attr.autowire("/"),
    inversify_1.injectable(),
    __param(0, inversify_1.inject("ICoreConfigProvider")),
    __param(1, inversify_1.inject("ILogger")),
    __metadata("design:paramtypes", [Object, Object])
], IndexController);
exports.default = IndexController;
var IndexController_1;
//# sourceMappingURL=IndexController.js.map