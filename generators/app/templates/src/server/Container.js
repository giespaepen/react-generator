"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreConfigProvider_1 = require("./core/CoreConfigProvider");
const EnvironmentProvider_1 = require("./core/EnvironmentProvider");
const Logger_1 = require("./core/Logger");
const inversify_1 = require("inversify");
let kernel = new inversify_1.Container();
kernel.bind("ILogger").to(Logger_1.default);
kernel.bind("IEnvironmentProvider").to(EnvironmentProvider_1.default);
kernel.bind("ICoreConfigProvider").to(CoreConfigProvider_1.default);
exports.default = kernel;
//# sourceMappingURL=Container.js.map