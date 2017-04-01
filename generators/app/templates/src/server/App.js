"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const BaseApp_1 = require("./core/BaseApp");
const Container_1 = require("./Container");
class App extends BaseApp_1.default {
    static Boot() {
        let app = App.Create();
        app.initialize();
    }
    static Create() {
        let app = new App(Container_1.default.get("IEnvironmentProvider"), Container_1.default.get("ILogger"), Container_1.default.get("ICoreConfigProvider"));
        return app;
    }
    constructor(environment, logger, config) {
        super(environment, logger, config, Container_1.default);
    }
}
exports.default = App;
App.Boot();
//# sourceMappingURL=App.js.map