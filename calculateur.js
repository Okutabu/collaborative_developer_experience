var requete = require('./STOWrequests');

function createAnArrayOfArraysFromTwoArraysOfArrays(arr1, arr2) {
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

  function createUserObjectListFromArrayOfUsers(arrayOfUsers) {
    var info = [];
    for (let user of arrayOfUsers) {
      info.push(createUserObject(user));
    }

  }

  function createUserObject(user) {
    var info = {
      id: user.id,
    };
    InsertIntoInfoFromActivities(info, user.activities)
  }

    function InsertIntoInfoFromActivities(info, activities){
      arrayOfQuestionTags = [];
      arrayOfAnswerTags = [];
      for(let interaction of activities){
        if(interaction.type == "question"){
          arrayOfQuestionTags.push(interaction.tags)
        } else if(interaction.type == "answer"){
          arrayOfAnswerTags.push(interaction.tags)
        }
      }
      info.question = calculateNumber(arrayOfQuestionTags);
      info.answer = calculateNumber(arrayOfAnswerTags);

      let arrayOfTags = createAnArrayOfArraysFromTwoArraysOfArrays(arrayOfQuestionTags, arrayOfAnswerTags);
      info.ratio = calculatePercentages(arrayOfTags);

  }

  

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


   exports.get_users_profils = function (){
    let allTags = requete.get_users_tags("1673130000","1673136000");

    allTags.map(user => {
        let percent = calculatePercentages( user.tags);
        user.tags = percent
    })

    return allTags
  }

//let profils = get_users_profils()
//console.log(profils);
// let items = [ ['javascript', 'html', 'css' , 'html' ], ['mysql', 'sql', 'go-gorm' ], ['php', 'excel', 'laravel'], ['javascript' ,'php', 'pdo' ], ['javascript', 'html', 'checkbox' ], ['C#', 'asp.net', 'sql-server', 'authentication' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], [ 'javascript', 'arrays', 'string' ], ['c', 'command-line-arguments' ], ['javascript', 'arrays', 'object' ], ['javascript', 'css', 'svg', 'd3.js', 'safari' ], [ 'mysql', 'python-3.x', 'django', 'postgresql' ], [ 'c#' ], [ 'c#' ], [ 'c#' ], ['c#' ], ['php' ], ['php', 'html', 'arrays' ], ['javascript', 'html' ], ['javascript', 'html' ], ['php', 'hash' , 'passwords' ], ['php', 'hash', 'passwords' ] ];
// let percentages = calculatePercentages(items);
// let sortedArr = Object.entries(percentages).sort((a, b) => a[1][0]-b[1][0]).reverse();
// console.log(sortedArr);console.log(percentages);