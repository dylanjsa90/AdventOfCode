'use strict';

const fs = require('fs');

function readInput() {
  fs.readFile(__dirname + '/../input/day3input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    findTriangles(data);
    findTrianglesVertically(data);
  });
}

function findTriangles(input) {
  let validList = input.split('\n').filter(function(a) { 
    return isValid([parseInt(a.substring(2, 5)), parseInt(a.substring(7, 10)), parseInt(a.substring(12, 15))]);
  });  
  console.log('Total Possible: ' + validList.length);
  return validList.length;  
}

function findTrianglesVertically(input) {
  let columns = [[], [], []];
  let possible = 0;
  input.split('\n').forEach(function(r) {
    columns[0].push(r.substring(2,5));
    columns[1].push(r.substring(7,10));
    columns[2].push(r.substring(12,15)); 
  });
  for (let i = 0; i < columns[0].length; i = i+3) {
    possible = (isValid([columns[0][i], columns[0][i+1], columns[0][i+2]])) ? possible += 1 : possible += 0;
    possible = (isValid([columns[1][i], columns[1][i+1], columns[1][i+2]])) ? possible += 1 : possible += 0;
    possible = (isValid([columns[2][i], columns[2][i+1], columns[2][i+2]])) ? possible += 1 : possible += 0;   
  }
  console.log('Result: ' + possible);
  return possible;
}

function isValid(i) {
  let s1 = parseInt(i[0]);
  let s2 = parseInt(i[1]);
  let s3 = parseInt(i[2]);
  let sum = s1 + s2 + s3;
  let greatest = ((s1 > s2 ) ? s1 > s3 ? s1: s3 : s2 > s3 ? s2: s3);
  let remainder = sum - greatest;
  return (remainder > greatest);
}

readInput();