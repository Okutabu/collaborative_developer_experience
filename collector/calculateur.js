const requete = require("./STOWrequests");

function concatTwoArrays(arr1, arr2) {
  let arr = arr1;

  for (let i = 0; i < arr2.length; i++) {
    arr.push(arr2[i]);
  }

  return arr;
}

function calculatePercentages(arr) {
  let counts = {};

  for (let subarr of arr) {
    for (let item of subarr) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }

  let total = arr.flat().length;
  let percentages = {};

  for (let item in counts) {
    if (counts[item] > 0) {
      percentages[item] = (counts[item] / total) * 100;
    } else {
      percentages[item] = 0;
    }
  }

  return percentages;
}

function calculateNumber(arr) {
  let counts = {};

  for (let subarr of arr) {
    for (let item of subarr) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }

  let total = arr.flat().length;
  let nbOccurences = {};

  for (let item in counts) {
    nbOccurences[item] = counts[item];
  }

  return nbOccurences;
}

function InsertIntoInfoFromActivities(activities) {
  arrayOfQuestionTags = [];
  arrayOfAnswerTags = [];

  for (let interaction of activities) {
    if (interaction.typePost == "question") {
      arrayOfQuestionTags.push(interaction.tags);
    } else if (interaction.typePost == "answer") {
      arrayOfAnswerTags.push(interaction.tags);
    }
  }
  let question = calculateNumber(arrayOfQuestionTags);
  let answer = calculateNumber(arrayOfAnswerTags);

  let arrayOfTags = concatTwoArrays(arrayOfQuestionTags, arrayOfAnswerTags);
  let ratio = calculatePercentages(arrayOfTags);

  return [ratio, question, answer];
}

function createUserObject(user) {
  let tab = InsertIntoInfoFromActivities(user.activities);

  var info = {
    idSTOW: user.id,
    interact: tab[0],
    question: tab[1],
    answer: tab[2],
  };

  return info;
}

function createUserObjectListFromArrayOfUsers(arrayOfUsers) {
  var info = [];
  for (let user of arrayOfUsers) {
    info.push(createUserObject(user));
  }
  return info;
}

async function get_users_profils(startString, endString) {
  let profils = await requete.get_users_tags_async(startString, endString);

  //la fonction à importer
  let newProfils = createUserObjectListFromArrayOfUsers(profils);

  return newProfils;
}

module.exports = {
  get_users_profils,
};
