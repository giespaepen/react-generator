"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const AppConstants_1 = require("./AppConstants");
let CoreConfigProvider = class CoreConfigProvider {
    get appTitle() {
        return process.env.APP_TITLE || AppConstants_1.default.APP_TITLE;
    }
    get apiKey() {
        return process.env.CR_APIKEY || "";
    }
    get spaceId() {
        return process.env.CR_SPACEID || "";
    }
    get logDir() {
        return process.env.LOG_DIR || AppConstants_1.default.LOG_DIR;
    }
    get port() {
        return process.env.NODE_PORT || 3000;
    }
    get ssl() {
        return false;
    }
    get sslCertLocation() {
        return "/";
    }
};
CoreConfigProvider = __decorate([
    inversify_1.injectable()
], CoreConfigProvider);
exports.default = CoreConfigProvider;
//# sourceMappingURL=CoreConfigProvider.js.map