// Add dependecies
const request = require('request');
const util = require('./utils/util');

// Starts first page 
const pageActual = 1;

let arrayData = [];

// First get data pagination
request(util.getPage(pageActual) , function (error, response, html) {
  if (!error && response.statusCode == 200) {
    const maxPagination = util.getMaxRangePagination($);

    for(let i = 1; i < maxPagination; i++) {
        $ = util.getCheerioByIndexHomePage(i);
        console.log($)
    }
  }
});