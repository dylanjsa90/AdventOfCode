'use strict';

const fs = require('fs');

let coordinateHistory = [[0,0]];
let duplicates = [];
let coordinates = {x: 0, y: 0};

// Part One
function calcDistances() {
  fs.readFile(__dirname + '/../input/day1input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let dataArr = data.split(', ');
    let heading = 'N'; 
    dataArr.forEach(i => {
      heading = newHeading(i.charAt(0), heading);
      coordinates = move(parseInt(i.substring(1)), heading);
      compareLocations();
      coordinateHistory.push([coordinates.x, coordinates.y]);
    });
    console.log('Part One: ' + coordinatesToDistance());
    console.log('Part 2: ' + duplicates[0].distance);
  });
}

function compareLocations() {
  coordinateHistory.forEach((c) => {
    if (c[0] === coordinates.x && c[1] === coordinates.y) duplicates.push({coordinates: [coordinates.x, coordinates.y], distance: coordinatesToDistance()});
  });
}

function move(steps, heading) {
  if (heading === 'N' || heading === 'S') coordinates.y = (heading === 'N') ? coordinates.y += steps : coordinates.y -= steps;
  if (heading === 'E' || heading === 'W') coordinates.x = (heading === 'E') ? coordinates.x += steps : coordinates.x -= steps;
  return coordinates;
}

function newHeading(turn, facing) {
  let dirMap = {'N': 0, 'E': 1, 'S': 2, 'W': 3};
  let directionArr = ['N', 'E', 'S', 'W'];
  if (turn === 'R') return (facing === 'W') ? 'N' : directionArr[dirMap[facing] + 1];
  if (turn === 'L') return (facing === 'N') ? 'W' : directionArr[dirMap[facing] - 1];
}

function coordinatesToDistance() {
  return Math.abs(coordinates.x) + Math.abs(coordinates.y);
}

calcDistances();