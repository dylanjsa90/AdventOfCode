'use strict';

const fs = require('fs');

function readData() {
  fs.readFile(__dirname + '/../input/day6input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let inputArray = data.split('\n');
    parseData(inputArray);
  });
}

function parseData(inputArray) {
  let totals = [{}, {}, {}, {}, {}];
  inputArray.forEach(l => {
    let lineCol = l.split('');
    for (let i = 0; i < lineCol.length; i++) {
      if (totals[i] === undefined) {
        let obj = {};
        obj[lineCol[i]] = 1;
        totals[i] = obj;
      } else if (!totals[i].hasOwnProperty(lineCol[i])) {
        totals[i][lineCol[i]] = 1;
      } else {
        totals[i][lineCol[i]]++;
      }
    }
  });
  errorCorrect(totals);
}

function errorCorrect(totals) {
  let result = '';
  for (let i = 0; i < totals.length; i++) {
    let min = 99;
    let k;
    let col = totals[i]
    Object.keys(totals[i]).forEach(key => {
      if (col[key] < min) {
        min = col[key];
        k = key;
      }
    });
    result += k;
  }
  console.log('Result: ' + result);
}

readData();