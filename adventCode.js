'use strict';

const fs = require('fs');
calcDistance();

function calcDistance() {
  fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let dataArr = data.split(', ');
    let heading = 'N'; 
    let dirMap = {'N': 0, 'E': 1, 'S': 2, 'W': 3};
    let dirTotals = {'N': 0, 'E': 0, 'S': 0, 'W': 0};
    let directionArr = ['N', 'E', 'S', 'W'];
    dataArr.forEach(i => {
      var currentDirection = i.charAt(0);
      if (currentDirection === 'R') heading = (heading === 'W') ? 'N' : directionArr[dirMap[heading] + 1];
      if (currentDirection === 'L') heading = (heading === 'N') ? 'W' : directionArr[dirMap[heading] - 1];
      dirTotals[heading] += parseInt(i.substring(1));
    });
    let dist = Math.abs(dirTotals['N'] - dirTotals['S']) + Math.abs(dirTotals['W'] - dirTotals['E']);
    console.log(dist);

  });
}