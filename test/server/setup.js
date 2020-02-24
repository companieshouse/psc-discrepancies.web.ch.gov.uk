'use strict';

const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const chaiAsPromised = require("chai-as-promised");
const sinonChai = require('sinon-chai');
const expect = require('chai').expect;


chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(sinonChai);

// Expose all test libraries to app modules
global.sinon = sinon;
global.chai = chai;
global.should = should;
global.chaiAsPromised = chaiAsPromised;
global.expect = expect;
global.request = chai.request;

global.testRoot = __dirname;
global.appRoot = __dirname + '/../..';
global.serverRoot = __dirname + '/../../server';
