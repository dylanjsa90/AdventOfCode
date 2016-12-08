'use strict';

const fs = require('fs');

function readInput() {
  fs.readFile(__dirname + '/../input/day2input.txt', 'utf8', (err, data) => {
    decipherCode(data);
    decipherCodePartTwo(data);
  })
}

function decipherCode(input) {
  let coords = [1, 1];
  let keypad = [[1,2,3], [4,5,6], [7,8,9]];
  let objFn = {'U': moveU, 'R': moveR, 'D': moveD, 'L': moveL};
  let inputArr = input.trim().split('\n');
  console.log('Input, ', inputArr);
  let result = '';
  for (let i = 0; i < inputArr.length; i++) {
    let line = inputArr[i].split('');
    line.forEach(function(e) {
      coords = objFn[e](coords);
    });
    console.log('Result: ' + keypad[coords[0]][coords[1]]);
    result += keypad[coords[0]][coords[1]];
  } 
  console.log('Part One: ' + result);
}

function moveD(co) {
  if (co[0] + 1 >= 2) {
    co[0] = 2;
  } else {
    co[0] = co[0] + 1;
  }
  return co;
}

function moveU(co) {
  if (co[0] - 1 <= 0) {
    co[0] = 0;
  } else {
    co[0] = co[0] - 1;
  }
  return co;
}

function moveR(co) {
  if (co[1] + 1 >= 2) {
    co[1] = 2;
  } else {
    co[1] = co[1] + 1;
  }
  return co;
}

function moveL(co) {
  if (co[1] -1 <= 0) {
    co[1] = 0;
  } else {
    co[1] = co[1] - 1;
  }
  return co;
}

function decipherCodePartTwo(input) {
  let coords = [2, 0];
  let keypad = [[0,0,1,0,0], [0,2,3,4,0], [5,6,7,8,9], [0, 'A','B','C',0],[0,0,'D',0,0]];
  let objFn = {'U': moveUP, 'R': moveRI, 'D': moveDO, 'L': moveLE};
  let inputArr = input.trim().split('\n');
  let result = '';
  for (let i = 0; i < inputArr.length; i++) {
    let line = inputArr[i].split('');
    line.forEach(function(e) {
      coords = objFn[e](coords, keypad);

    });
    result += (keypad[coords[0]][coords[1]]);
  } 
  console.log('FInal Array: ', result);
}

function moveUP(co, keypad) {
  if (co[0] !== 0 && keypad[co[0]-1][co[1]] !== 0) {
    co[0] -= 1;    
  }
  return co;
}

function moveDO(co, keypad) {
  if (co[0] !== 4 && keypad[co[0]+1][co[1]] !== 0) {
    co[0] += 1;
  }
  return co;
}

function moveRI(co, keypad) {
  if (co[1] !== 4 && keypad[co[0]][co[1]+1] !== 0) {
    co[1] += 1;
  }
  return co;
}

function moveLE(co, keypad) {
  if (co[1] !== 0 && keypad[co[0]][co[1]-1] !== 0) {
    co[1] -= 1;   
  }
  return co;
}

function keypadNum(co, keypad) {
  return keypad[co[0]][co[1]];
}
readInput();
