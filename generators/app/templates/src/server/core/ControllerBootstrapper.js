"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums = require("./ControllerEnums");
const Express = require("express");
const ControllerAttributes_1 = require("./ControllerAttributes");
class ControllerBootstrapper {
    constructor(kernel) {
        if (kernel) {
            ControllerBootstrapper.kernel = kernel;
        }
        else {
            if (!ControllerBootstrapper.kernel) {
                throw new Error("Cannot initialize ControllerBootstrapper when no kernel is defined");
            }
        }
    }
    static registerController(target, basePath) {
        let key = target.name;
        ControllerBootstrapper.kernel.bind(key).to(target);
        let instance = ControllerBootstrapper.kernel.get(key);
        instance.basePath = basePath;
        ControllerBootstrapper.controllers[key] = instance;
    }
    static registerActionFilter(className, key, actionType, path) {
        if (!this.isActionRegistered(className, key)) {
            ControllerBootstrapper.actions.push(new ControllerAttributes_1.ActionFilter(className, key, actionType, path));
        }
    }
    static findControllerInstance(key) {
        return ControllerBootstrapper.controllers[key];
    }
    static resetBootstrapper() {
        ControllerBootstrapper.actions = [];
        ControllerBootstrapper.controllers = [];
    }
    static isActionRegistered(className, key) {
        ControllerBootstrapper.actions.filter((value) => value.className !== className && value.key !== key);
    }
    getRegisteredActions() {
        return ControllerBootstrapper.actions;
    }
    bindRoutes(express, logger) {
        for (let key in ControllerBootstrapper.controllers) {
            if (ControllerBootstrapper.controllers[key]) {
                logger.info(`Binding routes of ${key}`);
                let router = Express.Router();
                let target = ControllerBootstrapper.controllers[key];
                let actions = this.getRegisteredActions().filter((value, index) => {
                    return value.className === key;
                });
                actions.forEach((value, index) => {
                    logger.debug(`-> ${Enums.ActionType[value.type]} ${(target.basePath + value.getPath()).replace("//", "/")}`);
                    switch (value.type) {
                        case Enums.ActionType.GET:
                            router.get(value.getPath(), this.wrapRequestHandler(value.type, value.getPath(), target[value.key], logger));
                            break;
                        case Enums.ActionType.POST:
                            router.post(value.getPath(), this.wrapRequestHandler(value.type, value.getPath(), target[value.key], logger));
                            break;
                        case Enums.ActionType.PATCH:
                            router.patch(value.getPath(), this.wrapRequestHandler(value.type, value.getPath(), target[value.key], logger));
                            break;
                        case Enums.ActionType.PUT:
                            router.put(value.getPath(), this.wrapRequestHandler(value.type, value.getPath(), target[value.key], logger));
                            break;
                        case Enums.ActionType.DELETE:
                            router.delete(value.getPath(), this.wrapRequestHandler(value.type, value.getPath(), target[value.key], logger));
                            break;
                        default:
                            break;
                    }
                });
                express.use(target.basePath, router);
            }
        }
    }
    wrapRequestHandler(type, path, handler, logger) {
        return (req, res, next) => {
            logger.debug(`ACCESS: ${Enums.ActionType[type]} ${req.path}`);
            return handler(req, res, next);
        };
    }
}
ControllerBootstrapper.actions = [];
ControllerBootstrapper.controllers = [];
exports.default = ControllerBootstrapper;
//# sourceMappingURL=ControllerBootstrapper.js.map