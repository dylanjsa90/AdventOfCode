'use strict';

const fs = require('fs');
// let testData = ['aaaaa-bbb-z-y-x-123[abxyz]','a-b-c-d-e-f-g-h-987[abcde]','not-a-real-room-404[oarel]', 'totally-real-room-200[decoy]'];

function readInput() {
  fs.readFile(__dirname + '/../input/day4input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let inputArray = data.trim().split('\n');
    console.log('File length: ' + inputArray.length);
    let total = inputArray.map(function(room) {
      let roomVal = decryptRoom(room);
      return roomVal;
    }).reduce((a, b) => a + b);
    console.log('Total: ' + total);
  });
}

function decryptRoom(room) {
  let parsing = room.split('-');
  let cypherAndSec = parsing.splice(-1)[0].split('[');
  let sector = parseInt(cypherAndSec[0]);
  let cypher = cypherAndSec[1].substring(0, cypherAndSec[1].length -1);
  parsing = parsing.join('');
  // if (!roomContainsCode(cypher, parsing)) return 0;
  let characterCount = countCharacters(parsing);
  let sort = sortCharactersByCount(characterCount);
  let orderedString = convertSortedToString(sort);
  let check = [];
  cypher.split('').forEach(c => {
    let isValid = (orderedString.length - orderedString.indexOf(c)) <=5
    if (isValid) check.push(c);
  }); 
  // for (let i = 0; i < 5; i++) {
  //   let topChar = sort.pop();
  //   let cIndex = cypher.indexOf(topChar.key);
  //   if (cIndex !== -1) {
  //     cypher = cypher.substring(0, cIndex) + cypher.substring(cIndex + 1);
  //     check.push(topChar);
  //   }  
  // }    
  // console.log('Check: ', check);
  // console.log('Cypher: ' + cypher);
  return (check.length === 5) ? sector : 0;  
}

function convertSortedToString(sort) {
  let orderedString = '';
  for (let i = 0; i < sort.length; i++) {
    orderedString += sort[i].key;
  }
  return orderedString;
}


function sortCharactersByCount(characterCounts) {
  let arr = [];
  for (let prop in characterCounts) {
    if (characterCounts.hasOwnProperty(prop)) arr.push({'key': prop, 'value': characterCounts[prop]});
  }
  arr.sort(function(a, b) { 
    if (a.value !== b.value) return a.value - b.value; 
    return a.key < b.key;  
  });
  return arr;
}

// function roomContainsCode(cypher, characters) {
//   cypher.split('').forEach((c) => {
//     if (characters.indexOf(c) === -1) return false;
//   });
//   return true;
// }

function countCharacters(characters) {
  let characterCounts = characters.split('').reduce(function(allCharacters, char) {
    if (char in allCharacters) {
      allCharacters[char]++;
    } else {
      allCharacters[char] = 1;
    }
    return allCharacters;
  }, {});
  return characterCounts;
}

readInput();