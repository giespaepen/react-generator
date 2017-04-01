"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../shared/Enums");
const Utils_1 = require("../../shared/Utils");
const inversify_1 = require("inversify");
let EnvironmentProvider = EnvironmentProvider_1 = class EnvironmentProvider {
    getEnvironment() {
        if (!EnvironmentProvider_1.currentEnvironment) {
            let env = undefined;
            if (process && process.env) {
                if (process.env.NODE_ENV) {
                    let envName = process.env.NODE_ENV.toLowerCase();
                    let filtered = Utils_1.mapEnum(Enums_1.Environment)
                        .filter((e) => e.key.toLowerCase() === envName);
                    if (filtered.length === 1) {
                        env = Enums_1.Environment[filtered[0].key];
                    }
                }
            }
            env = env || Enums_1.Environment.DEV;
            EnvironmentProvider_1.currentEnvironment = env;
            return env;
        }
        else {
            return EnvironmentProvider_1.currentEnvironment;
        }
    }
    isDevelopment() {
        return this.getEnvironment() === Enums_1.Environment.DEV;
    }
    isProduction() {
        return this.getEnvironment() === Enums_1.Environment.PRD ||
            this.getEnvironment() === Enums_1.Environment.ACC;
    }
    setEnvironment(env) {
        EnvironmentProvider_1.currentEnvironment = env;
        if (process && process.env) {
            process.env.NODE_ENV = Enums_1.Environment[env];
        }
    }
};
EnvironmentProvider.currentEnvironment = undefined;
EnvironmentProvider = EnvironmentProvider_1 = __decorate([
    inversify_1.injectable()
], EnvironmentProvider);
exports.default = EnvironmentProvider;
var EnvironmentProvider_1;
//# sourceMappingURL=EnvironmentProvider.js.map