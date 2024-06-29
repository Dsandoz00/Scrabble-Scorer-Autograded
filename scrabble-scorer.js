// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};
//a: 1
function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

//let info = input.question("Let's play some scrabble! Enter a word:");
function initialPrompt() {
  info = input.question("Let's play some scrabble! Enter a word:");
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  //I took the console.log() which just printed a string and transformed it into a function where the user can input a word for the algorithm above.
  //let finalScore = oldScrabbleScorer(info);
  // console.log(`Points for '${info}': ${finalScore}\n`);
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  return info;
}
function transform(oldPointStructure) 
{
let newPointObj = {};
for (let points in oldPointStructure) {

  for (let letter of oldPointStructure[points]) {
      //objectName[myNewKey] = newValue
      newPointObj[letter.toLowerCase()] = Number(points)
  }
}
return newPointObj;
}

let newPointStructure = transform(oldPointStructure);


let simpleScorer = function (word) {
  word = word.toLowerCase();
  let simpleTotal = 0;

  for (let j = 0; j < word.length; j++) {
    simpleTotal = simpleTotal + 1;
  }
  return simpleTotal;
};
//---------------------------------------------------------------------------------------------------------------------------------
//In simpleScorer I am initializing the variable + creating a function + returning a score
//This function like oldScrabbleScorer() takes a word as its parameter + returns a numerical score + condition: Every letter = 1pt
//What do I need? A function + an iteration (for loop) + a conditional statement + case insensitivity + return statement
//---------------------------------------------------------------------------------------------------------------------------------
let vowelBonusScorer = function (word) {
  word = word.toLowerCase();
  let theScore = 0;
  let vowels = ["a", "e", "i", "o", "u"];

  for (let h = 0; h < word.length; h++) {
    if (vowels.includes(word[h])) {
      theScore = theScore + 3;
    } else {
      theScore = theScore + 1;
    }
  }
  return theScore;
};
//-----------------------------------------------------------------------------------------------------------------------------------------
//In vowelBonusScorer I am initializing the variable + creating a function + returning a score
//This function like simpleScorer() takes a word as its parameter + returns a numerical score + conditions: Vowels = 3pts, consonants = 1pt
//What do I need? A function + an iteration (for loop) + a conditional statement for vowels and consonants + case insensitivity
//-----------------------------------------------------------------------------------------------------------------------------------------
let scrabbleScorer = function (word) {
  //console.log("My word is" + word);
  word = word.toLowerCase();
  let ogScrabbleScore = 0;
  for (let i = 0; i < word.length; i++) {
     ogScrabbleScore +=  newPointStructure[word[i]]
  }
  //console.log("Checking the score:" + ogScrabbleScore);
  return ogScrabbleScore;
};
//---------------------------------------------------------------------------------------------
//In scrabbleScorer I am initializing the variable + assign oldScrabbleScorer to this variable
//---------------------------------------------------------------------------------------------

let simpObject = {
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scorerFunction: simpleScorer,
};

let vowelObject = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pts.",
  scorerFunction: vowelBonusScorer,
};

let scrabbleObject = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpObject, vowelObject, scrabbleObject];


function scorerPrompt() {
  let selectedAlgorithm = "";
  console.log("Which scoring algorithm would you like to use?");
  console.log();
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  selectedAlgorithm = input.question("Enter 0, 1, or 2: ");
  const bangAlgorithm = scoringAlgorithms[selectedAlgorithm];
  console.log(bangAlgorithm.scorerFunction(info));
  console.log(`Score for '${info}': '${bangAlgorithm.scorerFunction(info)}'`);
}

//------------------------------------------------------------------------------
//In transform() I am defining this function to iterate in oldPointStructure + switch the key/value pairs
//Need this function to use in newPointStructure()
//------------------------------------------------------------------------------
function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
