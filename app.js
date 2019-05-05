// Add dependecies
const request = require('request');
const cheerio = require('cheerio');
const util = require('./utils/util');

// Starts first page 
const pageActual = 1;
const selectorDataCar = 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody';
const selectorDetailsDataCar = 'body > table:nth-child(5) > tbody > tr > td:nth-child(1) > table > tbody';

let arrayDataJson = [];
let maxPagination = '';

// First get data pagination
request(util.getPage(pageActual) , function (error, response, html) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    maxPagination = util.getMaxRangePagination($);
    triggerScraping();
  }
});

async function triggerScraping() {
  for (let page = 1; page < 2; page++) {
    let $ = await util.getCheerioTableByIndexHomePage(page);
    // Get firsts data auto
    let el = $(selectorDataCar);
    el.find('tr').each((i, elem) => {
      let firstData = $(elem).find('>td:nth-child(4) > font > a > font > b').text();
      let linkToDetails = $(elem).find('>td:nth-child(4) > font > a').attr('href');
      if (firstData.trim().length && linkToDetails.trim().length) {
        let id_car = linkToDetails.split('?')[1].split('=')[1]
        let treatData = util.treatArray(firstData.split('\n'));
        treatData.push(id_car);
        mountDataDetailsAuto(linkToDetails, treatData)
      }
    });
  }
}

async function mountDataDetailsAuto(link, treatData) {
  let $ = await util.getCheerioDetailsAuto(link);
  let el = $(selectorDetailsDataCar);
  el.find('tr').each((i, elem) => {

  });
}