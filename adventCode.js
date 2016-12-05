'use strict';

calcDistance(process.argv.slice(2));

function calcDistance(input) {
  var inputArr = input[0].split(', ');
  var facing = 'N';
  var dirKey = {'N': 0, 'E': 1, 'S': 2, 'W': 3};
  var dirTotals = {'N': 0, 'E': 0, 'S': 0, 'W': 0};
  var directionArr = ['N', 'E', 'S', 'W'];
  for (var i = 0; i < inputArr.length; i++) {
    var currDirection = inputArr[i].charAt(0);
    if (currDirection === 'R') {
      if (facing === 'W') {
        facing = 'N';
      } else {
        facing = directionArr[dirKey[facing] + 1];
      }
    } else if (currDirection === 'L') {
      if (facing === 'N') {
        facing = 'W';
      } else {
        facing = directionArr[dirKey[facing] - 1];
      }
    }

    dirTotals[facing] += parseInt(inputArr[i].substring(1)); 
  }
  var dist = Math.abs(dirTotals['N'] - dirTotals['S']) + Math.abs(dirTotals['W'] - dirTotals['E']);
  console.log(dist);
}