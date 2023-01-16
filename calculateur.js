const requete = require('./api/stack-overflow/STOWrequests');

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
    percentages[item] = (counts[item] / total) * 100;
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



function InsertIntoInfoFromActivities(activities){
    arrayOfQuestionTags = [];
    arrayOfAnswerTags = [];

    for(let interaction of activities){
        if(interaction.typePost == 'question'){

            arrayOfQuestionTags.push(interaction.tags)
        } else if(interaction.typePost == 'answer'){
            
            arrayOfAnswerTags.push(interaction.tags)
        }
    }
    let question = calculateNumber(arrayOfQuestionTags);
    let answer = calculateNumber(arrayOfAnswerTags);

    let arrayOfTags = concatTwoArrays(arrayOfQuestionTags, arrayOfAnswerTags);
    let ratio = calculatePercentages(arrayOfTags);

    return [ratio, question, answer]
    //return [question, a, arrayOfAnswerTags]

}

function createUserObject(user) {
    let tab = InsertIntoInfoFromActivities(user.activities)

    var info = {
        id: user.id,
        interact: tab[0],
        question: tab[1],
        answer: tab[2]
    };

    return info
}

function createUserObjectListFromArrayOfUsers(arrayOfUsers) {
    var info = [];
    for (let user of arrayOfUsers) {
        info.push(createUserObject(user));
    }
    return info;

}

/*
function calculateFrequencyOfItemsAppearingTogetherFromArrayOfArraysOfItem(arr) {
    let counts = {};

    for (let subarr of arr) {
        for (let i = 0; i < subarr.length; i++) {
            for (let j = i + 1; j < subarr.length; j++) {
                let key = subarr[i] + ' ' + subarr[j];
                counts[key] = (counts[key] || 0) + 1;
            }
        }
    }

    return counts;
}
*/


get_users_profils = async function (){

    let profils = await requete.get_users_tags_async("1668610633","1673881033");
    

    //la fonction à importer
    let newProfils = createUserObjectListFromArrayOfUsers(profils);

    return newProfils;
}




(async() => {
    
    let tab = await get_users_profils();
    console.log(tab);
    console.log(tab[0]);

})();