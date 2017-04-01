"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums = require("./ControllerEnums");
const AppConstants_1 = require("./AppConstants");
const Controller_1 = require("./Controller");
const ControllerBootstrapper_1 = require("./ControllerBootstrapper");
const EnvironmentProvider_1 = require("./EnvironmentProvider");
function get(path) {
    return createActionAttribute(Enums.ActionType.GET, path);
}
exports.get = get;
function post(path) {
    return createActionAttribute(Enums.ActionType.POST, path);
}
exports.post = post;
function patch(path) {
    return createActionAttribute(Enums.ActionType.PATCH, path);
}
exports.patch = patch;
function put(path) {
    return createActionAttribute(Enums.ActionType.PUT, path);
}
exports.put = put;
function del(path) {
    return createActionAttribute(Enums.ActionType.DELETE, path);
}
exports.del = del;
function raw() {
    return createViewAttribute(Enums.ViewType.RAW);
}
exports.raw = raw;
function view(view) {
    return createViewAttribute(Enums.ViewType.VIEW, view);
}
exports.view = view;
function json() {
    return createViewAttribute(Enums.ViewType.JSON);
}
exports.json = json;
function autowire(path = "") {
    return (target) => {
        if (path === "") {
            path = AppConstants_1.default.SITE_ROOT + target.name.toLowerCase().replace("controller", "");
        }
        ControllerBootstrapper_1.default.registerController(target, path);
    };
}
exports.autowire = autowire;
function createActionAttribute(type, path) {
    return (target, propertyKey, descriptor) => {
        if (isTarget(target)) {
            path = fixPath(propertyKey, path);
            ControllerBootstrapper_1.default.registerActionFilter(target.constructor.name, propertyKey, type, path);
        }
        else {
            throw new Error("Action attribute cannot be used on a non Controller class");
        }
    };
}
function createViewAttribute(type, view, layout) {
    return (target, propertyKey, descriptor) => {
        if (isTarget(target)) {
            let method = descriptor.value;
            descriptor.value = function (request, response, next) {
                try {
                    let controller = ControllerBootstrapper_1.default.findControllerInstance(target.constructor.name);
                    let data = method.apply(controller, [new ActionContext(request, response)]);
                    if (data && (data instanceof Promise || data.then)) {
                        data.then((asyncData) => {
                            if (layout) {
                                asyncData.layout = layout;
                            }
                            dispatchResponse(type, asyncData, response, view);
                        }).catch((e) => {
                            response.status(500);
                            dispatchResponse(type, e, response, view);
                        });
                    }
                    else {
                        if (layout) {
                            data.layout = layout;
                        }
                        dispatchResponse(type, data, response, view);
                    }
                }
                catch (e) {
                    console.error(e);
                    response.status(500);
                    dispatchResponse(type, e, response, view);
                }
            };
            return descriptor;
        }
    };
}
function dispatchResponse(type, data, response, view) {
    switch (type) {
        case Enums.ViewType.VIEW:
            if (!data) {
                data = {};
            }
            try {
                data.isDevelopment = (new EnvironmentProvider_1.default()).isDevelopment();
            }
            catch (e) {
                data.isDevelopment = true;
            }
            if (view) {
                response.render(view, data);
            }
            else {
                throw new Error("View is not defined!");
            }
            break;
        case Enums.ViewType.JSON:
            response.json(data);
            break;
        case Enums.ViewType.RAW:
        default:
            response.send(data);
            break;
    }
}
function isTarget(target) {
    return typeof target === "object" && target instanceof Controller_1.default;
}
function fixPath(propertyKey, path) {
    if (path === undefined) {
        path = "/" + propertyKey;
    }
    path = path.replace("~", propertyKey);
    if (!path.startsWith("/")) {
        path = "/" + path;
    }
    return path.toLowerCase();
}
class ActionFilter {
    constructor(className, key, type, path) {
        this.className = className;
        this.key = key;
        this.type = type;
        this.path = path;
        if (!this.path || this.path === "") {
            this.path = "/" + this.key.toLowerCase();
        }
        if (!this.path.startsWith("/")) {
            this.path = "/" + this.path;
        }
    }
    getPath() {
        return this.path;
    }
}
exports.ActionFilter = ActionFilter;
class ActionContext {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.urlParams = {};
        this.body = undefined;
        this.urlParams = this.parseParams();
        this.body = this.parseBody();
    }
    parseBody() {
        if (this.request.body) {
            return this.request.body;
        }
    }
    parseParams() {
        if (this.request.params) {
            return this.request.params;
        }
    }
}
exports.ActionContext = ActionContext;
//# sourceMappingURL=ControllerAttributes.js.map