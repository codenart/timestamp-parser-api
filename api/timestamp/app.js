/* global __dirname */

'use strict';

const RequestURLException = require(__dirname + '/../RequestURLException');
const APIException = require(__dirname + '/../APIException');
const Parser = require(__dirname + '/parser');
const Checker = require('type-check');

const express = require('express');
const app = express();

/**
 * Parse date string
 * @param request
 * @param response
 * @param next
 */
app.get('/api/timestamp/parse', (request, response, next) => {
   const datetime = request.query.datetime;
   if(Checker.typeCheck('Undefined', datetime))
      next();
   else
      Parser.parseDateTime(datetime, (error, result) => {
         if(error) {
            console.error(error);
            response.json(new APIException());
         }
         else
            response.json(result);
      });
});

/**
 * Parse unix timestamp
 * @param request
 * @param response
 * @param next
 */
app.get('/api/timestamp/parse', (request, response, next) => {
   const unixtime = Number.parseInt( request.query.unixtime ) * 1000;
   if( Number.isNaN(unixtime) )
      next();
   else
      Parser.parseUnixTime(unixtime, (error, result) => {
         if(error) {
            console.error(error);
            response.json(new APIException());
         }
         else
            response.json(result);
      });
});

/**
 * Invalid URL
 * @param request
 * @param response
 */
app.get('*', (request, response) => {
   const format = '/api/timestamp/parse?type=timestamp';
   const samples = [
                      '/api/timestamp/parse?datetime=Wed,%2027%20Sep%202017%2013:49:35%20GMT',
                      '/api/timestamp/parse?unixtime=1506520175'
                   ];
   const exception = new RequestURLException(format, samples);
   response.json(exception);
});

/**
 * Export app
 */
module.exports = app;
