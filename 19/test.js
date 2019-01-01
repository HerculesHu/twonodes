#!/usr/bin/env node
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
var http = require('http');

var express = require("express");
try { bcrypt = require('bcrypt'); }
catch(e) { bcrypt = require('bcryptjs'); }
var RED = require("./BW_RED/red.js");
var app = express();
var server;
server = http.createServer(function(req,res) {app(req,res);});
server.setMaxListeners(0);

var set={
uiPort : 1880,
mqttReconnectTime : 15000,
serialReconnectTime : 15000,
debugMaxLength : 1000,
functionGlobalContext : {},
logging : { console: { level: 'info', metrics: false, audit: false } },
editorTheme : { projects: { enabled: false } },
settingsFile :'\\Users\\Administrator.WIN7-1611070926\\.node-red\\settings.js',
httpRoot : '/',
disableEditor : false,
httpAdminRoot : '/',
httpAdminAuth : undefined,
httpNodeRoot : '/',
httpNodeAuth : undefined,
uiHost : '0.0.0.0',
}
    RED.init(server,set);
    app.use(set.httpAdminRoot,RED.httpAdmin);
    app.use(set.httpNodeRoot,RED.httpNode);


RED.start().then(function() {

        server.listen(set.uiPort,set.uiHost,function() {

        });

})


