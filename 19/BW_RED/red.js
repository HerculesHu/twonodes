/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var fs = require("fs");
var path = require('path');

var runtime = require("./runtime");
var api = require("./api");

process.env.NODE_RED_HOME = process.env.NODE_RED_HOME || path.resolve(__dirname+"/..");

var nodeApp = null;
var adminApp = null;
var server = null;
var apiEnabled = false;


module.exports = {
    init: function(httpServer,userSettings) {
            userSettings.coreNodesDir = path.resolve(path.join(__dirname,"..","nodes"));            
            runtime.init(userSettings,api);
            api.init(httpServer,runtime);
            apiEnabled = true;
            server = runtime.adminApi.server;
            runtime.server = runtime.adminApi.server;

        adminApp = runtime.adminApi.adminApp;
        nodeApp = runtime.nodeApp;
        return;
    },
    start: function() {
        return runtime.start().then(function() {
            if (apiEnabled) {
              
                return api.start();
            }
        });
    },
    stop: function() {
        return runtime.stop().then(function() {
            if (apiEnabled) {
                return api.stop();
            }
        })
    },
    nodes: runtime.nodes,
    log: runtime.log,
    settings:runtime.settings,
    util: runtime.util,
    version: runtime.version,
    events: runtime.events,

    comms: api.comms,
    library: api.library,
    auth: api.auth,

    get app() { console.log("Deprecated use of RED.app - use RED.httpAdmin instead"); return runtime.app },
    get httpAdmin() { return adminApp },
    get httpNode() { return nodeApp },
    get server() { return server }
};
