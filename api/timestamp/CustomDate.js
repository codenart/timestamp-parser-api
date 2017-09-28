'use strict';

const Checker = require('type-check');

module.exports = class CustomDate {
   constructor() {
      this['datetime'] = null;
      this['unixtime'] = null;
   }

   /**
    * @param date : Date
    */
   setValues(date) {
      if(! Checker.typeCheck('Date', date))
         throw new TypeError('"date" argument is not a date object.');
      else {
         this['datetime'] = date.toUTCString();
         this['unixtime'] = date.getTime() / 1000;
      }
   }
}; // class CustomDate
