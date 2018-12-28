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
var https = require('https');
var util = require("util");
var express = require("express");
var crypto = require("crypto");
try { bcrypt = require('bcrypt'); }
catch(e) { bcrypt = require('bcryptjs'); }
var nopt = require("nopt");
var path = require("path");
var fs = require("fs-extra");
var RED = require("./red/red.js");

var server;
var app = express();

var settingsFile;
var flowFile;

var knownOpts = {
    "help": Boolean,
    "port": Number,
    "settings": [path],
    "title": String,
    "userDir": [path],
    "verbose": Boolean
};
var shortHands = {
    "?":["--help"],
    "p":["--port"],
    "s":["--settings"],
    // As we want to reserve -t for now, adding a shorthand to help so it
    // doesn't get treated as --title
    "t":["--help"],
    "u":["--userDir"],
    "v":["--verbose"]
};
nopt.invalidHandler = function(k,v,t) {
    // TODO: console.log(k,v,t);
}

var parsedArgs = nopt(knownOpts,shortHands,process.argv,2)




// settingsFile="\\Users\\Administrator.WIN7-1611070926\\.node-red\\settings.js"
// console.log("*****************************")
// console.log(settingsFile)

    // var settings = require(settingsFile);
    // settings.settingsFile = settingsFile;





    server = http.createServer(function(req,res) {app(req,res);});

server.setMaxListeners(0);

// function formatRoot(root) {
//     if (root[0] != "/") {
//         root = "/" + root;
//     }
//     if (root.slice(-1) != "/") {
//         root = root + "/";
//     }
//     return root;
// }


//     settings.httpRoot = settings.httpRoot||"/";
//     settings.disableEditor = settings.disableEditor||false;




//     settings.httpAdminRoot = formatRoot(settings.httpAdminRoot || settings.httpRoot || "/");
//     settings.httpAdminAuth = settings.httpAdminAuth || settings.httpAuth;


//     settings.httpNodeRoot = formatRoot(settings.httpNodeRoot || settings.httpRoot || "/");
//     settings.httpNodeAuth = settings.httpNodeAuth || settings.httpAuth;




// settings.uiHost = settings.uiHost||"0.0.0.0";

var set={}
set.uiPort=1880;
set.mqttReconnectTime=15000;
set.serialReconnectTime=15000;
set.debugMaxLength=1000;
set.functionGlobalContext={};
set.logging={ console: { level: 'info', metrics: false, audit: false } }
set.editorTheme={ projects: { enabled: false } }
set.settingsFile='\\Users\\Administrator.WIN7-1611070926\\.node-red\\settings.js';
set.httpRoot='/';
set.disableEditor=false;
set.httpAdminRoot= '/';
set.httpAdminAuth= undefined;
set.httpNodeRoot= '/';
set.httpNodeAuth= undefined;
set.uiHost= '0.0.0.0';


// console.log(settings)

// try {
    RED.init(server,set);
// } catch(err) {
//     if (err.code == "unsupported_version") {
//         console.log("Unsupported version of node.js:",process.version);
//         console.log("Node-RED requires node.js v4 or later");
//     } else if (err.code == "not_built") {
//         console.log("Node-RED has not been built. See README.md for details");
//     } else {
//         console.log("Failed to start server:");
//         if (err.stack) {
//             console.log(err.stack);
//         } else {
//             console.log(err);
//         }
//     }
//     process.exit(1);
// }

// function basicAuthMiddleware(user,pass) {
//     var basicAuth = require('basic-auth');
//     var checkPassword;
//     var localCachedPassword;
//     if (pass.length == "32") {
//         // Assume its a legacy md5 password
//         checkPassword = function(p) {
//             return crypto.createHash('md5').update(p,'utf8').digest('hex') === pass;
//         }
//     } else {
//         checkPassword = function(p) {
//             return bcrypt.compareSync(p,pass);
//         }
//     }

//     var checkPasswordAndCache = function(p) {
//         // For BasicAuth routes we know the password cannot change without
//         // a restart of Node-RED. This means we can cache the provided crypted
//         // version to save recalculating each time.
//         if (localCachedPassword === p) {
//             return true;
//         }
//         var result = checkPassword(p);
//         if (result) {
//             localCachedPassword = p;
//         }
//         return result;
//     }

//     return function(req,res,next) {
//         if (req.method === 'OPTIONS') {
//             return next();
//         }
//         var requestUser = basicAuth(req);
//         if (!requestUser || requestUser.name !== user || !checkPasswordAndCache(requestUser.pass)) {
//             res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//             return res.sendStatus(401);
//         }
//         next();
//     }
// }

// if (set.httpAdminRoot !== false && set.httpAdminAuth) {
   
//     RED.log.warn(RED.log._("server.httpadminauth-deprecated"));
//     app.use(set.httpAdminRoot, basicAuthMiddleware(set.httpAdminAuth.user,set.httpAdminAuth.pass));
// }

// if (set.httpAdminRoot !== false) {
   
    app.use(set.httpAdminRoot,RED.httpAdmin);
// }
// if (set.httpNodeRoot !== false && set.httpNodeAuth) {
//     console.log(set)
//     app.use(set.httpNodeRoot,basicAuthMiddleware(set.httpNodeAuth.user,set.httpNodeAuth.pass));
// }
// if (set.httpNodeRoot !== false) {
    
    app.use(set.httpNodeRoot,RED.httpNode);
// }
// if (set.httpStatic) {
  
//     set.httpStaticAuth = set.httpStaticAuth || set.httpAuth;
//     if (set.httpStaticAuth) {
//         console.log(set)
//         app.use("/",basicAuthMiddleware(set.httpStaticAuth.user,set.httpStaticAuth.pass));
//     }
//     app.use("/",express.static(set.httpStatic));
// }

// function getListenPath() {
//     var port = set.serverPort;
//     if (port === undefined){
//         port = set.uiPort;
//     }

//     var listenPath = 'http'+(set.https?'s':'')+'://'+
//                     (set.uiHost == '::'?'localhost':(set.uiHost == '0.0.0.0'?'127.0.0.1':set.uiHost))+
//                     ':'+port;
//     if (set.httpAdminRoot !== false) {
//         listenPath += set.httpAdminRoot;
//     } else if (set.httpStatic) {
//         listenPath += "/";
//     }
//     console.log("***********************************************************")
//     console.log(listenPath)
//     return listenPath;
// }

RED.start().then(function() {
    if (set.httpAdminRoot !== false || set.httpNodeRoot !== false || set.httpStatic) {
       
        server.on('error', function(err) {
          
            process.exit(1);
        });
        server.listen(set.uiPort,set.uiHost,function() {
            // if (set.httpAdminRoot === false) {
            //     RED.log.info(RED.log._("server.admin-ui-disabled"));
            // }
            
            set.serverPort = server.address().port;
            // process.title = '666';
            // RED.log.info(RED.log._("server.now-running", {listenpath:"http://127.0.0.1:1880/"}));
        });
    } else {
        RED.log.info(RED.log._("server.headless-mode"));
    }
}).otherwise(function(err) {
    RED.log.error(RED.log._("server.failed-to-start"));
    if (err.stack) {
        RED.log.error(err.stack);
    } else {
        RED.log.error(err);
    }
});

// process.on('uncaughtException',function(err) {
//     util.log('[red] Uncaught Exception:');
//     if (err.stack) {
//         util.log(err.stack);
//     } else {
//         util.log(err);
//     }
//     process.exit(1);
// });

// process.on('SIGINT', function () {
//     RED.stop().then(function() {
//         process.exit();
//     });
// });
