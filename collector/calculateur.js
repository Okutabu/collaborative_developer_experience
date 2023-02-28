const requete = require('./STOWrequests');

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
    if (counts[item] >0 ){
      percentages[item] = (counts[item] / total) * 100;
    }else{
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


exports.get_users_profils = async function() {

    let profils = await requete.get_users_tags_async("1668610633","1673881033");
    

    //la fonction à importer
    let newProfils = createUserObjectListFromArrayOfUsers(profils);

    return newProfils;
}




// (async() => {
//     let tab = await get_users_profils();
//     console.log(tab);
    //console.log(tab[0]);

// })();
    
/* Exemple de profils après récupération des données 
[
  {
    id: 6309,
    interact: {
      go: 8,
      github: 16,
      path: 5,
      'oh-my-zsh': 5,
      gopath: 5,
      git: 17,
      'git-checkout': 6,
      'invalid-characters': 6,
      'git-history': 6,
      gitlab: 1,
      python: 1,
      'pre-commit-hook': 1,
      'pre-commit': 1,
      docker: 1,
      django: 6,
      cpanel: 6,
      gitignore: 1,
      goroutine: 3,
      api: 2,
      'ssh-keys': 1,
      ed25519: 1,
      'multiple-accounts': 1
    },
    question: { go: 1, github: 1, path: 1, 'oh-my-zsh': 1, gopath: 1 },
    answer: {
      go: 7,
      github: 15,
      path: 4,
      'oh-my-zsh': 4,
      gopath: 4,
      git: 17,
      'git-checkout': 6,
      'invalid-characters': 6,
      'git-history': 6,
      gitlab: 1,
      python: 1,
      'pre-commit-hook': 1,
      'pre-commit': 1,
      docker: 1,
      django: 6,
      cpanel: 6,
      gitignore: 1,
      goroutine: 3,
      api: 2,
      'ssh-keys': 1,
      ed25519: 1,
      'multiple-accounts': 1
    }
  },
  {
    id: 13431819,
    interact: {
      flutter: 13.043478260869565,
      'flutter-animation': 1.0869565217391304,
      html: 5.434782608695652,
      css: 17.391304347826086,
      grid: 2.1739130434782608,
      'tailwind-css': 18.478260869565215,
      bloc: 5.434782608695652,
      cubit: 5.434782608695652,
      dart: 7.608695652173914,
      'flutter-dependencies': 1.0869565217391304,
      'flutter-web': 1.0869565217391304,
      reactjs: 4.3478260869565215,
      pug: 2.1739130434782608,
      postcss: 2.1739130434782608,
      'vue.js': 1.0869565217391304,
      'background-image': 1.0869565217391304,
      list: 1.0869565217391304,
      android: 1.0869565217391304,
      null: 1.0869565217391304,
      'user-interface': 1.0869565217391304,
      firebase: 2.1739130434782608,
      database: 1.0869565217391304,
      'firebase-authentication': 1.0869565217391304,
      javascript: 1.0869565217391304,
      'react-slick': 1.0869565217391304
    },
    question: {
      flutter: 2,
      'flutter-animation': 1,
      html: 1,
      css: 1,
      grid: 1,
      'tailwind-css': 1,
      bloc: 1,
      cubit: 1
    },
    answer: {
      flutter: 10,
      dart: 7,
      'flutter-dependencies': 1,
      'flutter-web': 1,
      css: 15,
      'tailwind-css': 16,
      bloc: 4,
      cubit: 4,
      html: 4,
      reactjs: 4,
      pug: 2,
      postcss: 2,
      'vue.js': 1,
      'background-image': 1,
      list: 1,
      grid: 1,
      android: 1,
      null: 1,
      'user-interface': 1,
      firebase: 2,
      database: 1,
      'firebase-authentication': 1,
      javascript: 1,
      'react-slick': 1
    }
  },
  {
    id: 6392120,
    interact: {
      html: 33.33333333333333,
      '.htaccess': 8.333333333333332,
      php: 33.33333333333333,
      forms: 25
    },
    question: { html: 4, '.htaccess': 1, php: 4, forms: 3 },
    answer: {}
  }
]
*/