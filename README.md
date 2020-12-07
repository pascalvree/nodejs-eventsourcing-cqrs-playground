# nodejs-eventsourcing-cqrs-playground
[![Build Status](https://travis-ci.com/rogare-org/nodejs-eventsourcing-cqrs-playground.svg?branch=main)](https://travis-ci.com/rogare-org/nodejs-eventsourcing-cqrs-playground)
[![Coverage Status](https://coveralls.io/repos/github/pascalvree/nodejs-eventsourcing-cqrs-playground/badge.svg?branch=main)](https://coveralls.io/github/pascalvree/nodejs-eventsourcing-cqrs-playground?branch=main)
[![Dependencies Status](https://david-dm.org/pascalvree/nodejs-eventsourcing-cqrs-playground.svg)](https://david-dm.org/pascalvree/nodejs-eventsourcing-cqrs-playground.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rogare-org_nodejs-eventsourcing-cqrs-playground&metric=alert_status)](https://sonarcloud.io/dashboard?id=rogare-org_nodejs-eventsourcing-cqrs-playground)

## Integrates with
* Travis CI, https://travis-ci.com
* SonarCloud, https://sonarcloud.io
* Coveralls, https://coveralls.io
* David-DM, https://david-dm.org
* Snyk, https://app.snyk.io

## Build Server
Travis CI is used as the Build Server; during the build
the codebase is checked for
* allowed licenses
* linting errors / coding style
* known security vulnerabilities using npm audit and snyk test
* reported to be monitored by snyk for new disclosed vulnerabilities 
* scanned by sonarqube
* unit tested
  
and publishes
* code coverage
* the sonarqube report

to do that, it needs the following environment variables
* SNYK_TOKEN=[secure]
* COVERALLS_REPO_TOKEN=[secure]
* SONAR_LOGIN=[secure]
* SONAR_HOST=[secure]
* SONAR_ORGANISATION=[secure]
* SONAR_PROJECT_KEY=[secure]
* SONAR_SOURCES=[secure]

## Resources
* https://spdx.org/licenses/
