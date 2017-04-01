"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapEnum(e) {
    return Object.keys(e)
        .map((key) => e[key])
        .filter((key) => typeof key === "string")
        .map((key) => {
        return {
            key,
            value: e[key],
        };
    });
}
exports.mapEnum = mapEnum;
//# sourceMappingURL=Utils.js.map