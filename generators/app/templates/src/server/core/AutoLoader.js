"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const JS_EXTENSION = ".js";
function default_1(basePath, logger) {
    if (fs.existsSync(basePath)) {
        fs.readdirSync(basePath)
            .filter(f => f.endsWith(JS_EXTENSION))
            .forEach(f => {
            let requirePath = path.join(basePath, f.replace(JS_EXTENSION, ""));
            if (logger) {
                logger.debug(`Autload: ${requirePath}`);
            }
            require(requirePath);
        });
    }
    else {
        throw new Error(`Cannot autoload controllers, ${path} does not exist`);
    }
}
exports.default = default_1;
//# sourceMappingURL=AutoLoader.js.map