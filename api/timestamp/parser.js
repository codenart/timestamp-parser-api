/* global __dirname */

'use strict';

const CustomDate = require(__dirname + '/CustomDate');
const Checker = require('type-check');

class TimestampParser {
   /**
    * @param datetime : String
    * @param callback (error, result) : Function
    * @return result : CustomDate
    */
   parseDateTime(datetime, callback) {
      if(! Checker.typeCheck('String', datetime))
         throw new TypeError('"datestring" argument is not a string.');
      else {
         const dateObject = new Date(datetime);
         const result = new CustomDate();
         const dateStringIsInvalid = Number.isNaN( dateObject.getTime() );
         if(dateStringIsInvalid)
            console.log('Invalid date string.');
         else
            result.setValues(dateObject);

         callback(null, result);
      }
   }

   /**
    * @param unixtime : Number
    * @param callback (error, result) : Function
    * @return result : CustomDate
    */
   parseUnixTime(unixtime, callback) {
      if(! Checker.typeCheck('Number', unixtime))
         throw new TypeError('"unixtime" argument is not a number.');
      else {
         const dateObject = new Date(unixtime);
         const result = new CustomDate();
         const invalidUnixTime = Number.isNaN( dateObject.getTime() );
         if(invalidUnixTime)
            console.log('Invalid date string.');
         else
            result.setValues(dateObject);
         callback(null, result);
      }
   }
} // class Timestamp

module.exports = new TimestampParser();
