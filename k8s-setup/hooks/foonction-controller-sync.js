/*
Copyright 2019 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const winston   = require('winston'),
  YAML          = require('yaml'),
  fs            = require('fs');

const DEBUG   = process.env.DEBUG || 'info';
const depFile = fs.readFileSync('/node/templates/deployment.yaml', 'utf8')
const svcFile = fs.readFileSync('/node/templates/service.yaml', 'utf8')

const logger = winston.createLogger({
  level: DEBUG,
  defaultMeta: { service: 'catalog' },
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ],
});

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}

const toPropertiesString = function(p) {
  return Object.keys(p).map( i => `${i}=` + p[i] ).join('\n');
}

const newSvc = function() {
  let svc = YAML.parse(svcFile);
  return svc;
}

const newDeployment = function() {
  let deployment = YAML.parse(depFile);
  return deployment;
}

const finalize = function(observed,desired) {
  desired.children = [];

  listOfChildren.forEach( i => {
    if ( !observed.children[i].isEmpty() ) {
      desired.finalized = false;
      return {status: 200, body: desired, headers: {'Content-Type': 'application/json'}};
    }
  });
  desired.finalized = true;
  return {status: 200, body: desired, resyncAfterSeconds: 10, headers: {'Content-Type': 'application/json'}};

}

module.exports = async function (context) {
  let observed = context.request.body;
  let desired = {status: {}, children: []};
  let status = {};

  let dep = newDeployment();

  logger.info('This is the very nice context: ', context);
  logger.info('This is the very nice deployment: ', dep);

  /*
  try {
    let apigeeplanet = observed.parent;
    let children = observed.children;
    let planetstatus = false;

    //the previous thing maps to the next thing so we can sequentially add it all
    const listOfSpecs = {
      "ConfigMap.v1": newDS(),
      "datastore.apigee.google.com/v1":newMS(),
      "managementserver.apigee.google.com/v1":newQS(),
      "qs.apigee.google.com/v1":newPSMaster(),
      "psmaster.apigee.google.com/v1":newPSSlave(),
      "psslave.apigee.google.com/v1" : {}
    };

    status = calculateStatus(children);

    if (observed.finalizing) {
      console.log('Finalizing...');
      return finalize(observed,desired);
    }

    desired.children.push( newCM(apigeeplanet) )
    for(a in listOfChildren) {
      let name = listOfChildren[a];
      if (status[name] && !status[name].isEmpty() && name === "datastore.apigee.google.com/v1") {
        desired.children.push( listOfSpecs[name] )
      }
      else if (status[name] && !status[name].isEmpty() && status[name].ready) {
        desired.children.push( listOfSpecs[name] )
      }
    }

    if (status['router.apigee.google.com/v1'] != null && status['router.apigee.gogle.com/v1']) {
      planetstatus = true;

    }

    desired.status = { members: status, planet: planetstatus };
  }
  catch(e) {
    console.log('zoinks! : %j', e.stack);
    return {status: 500, body: e.stack};
  }
  */

  return {status: 200, body: desired, resyncAfterSeconds: 10, headers: {'Content-Type': 'application/json'}};

};
