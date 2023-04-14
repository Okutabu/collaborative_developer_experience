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
        if (interaction.typePost == 'question') {

            arrayOfQuestionTags.push(interaction.tags)
        } else if (interaction.typePost == 'answer') {

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
        idSTOW: user.id,
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


async function get_users_profils(startString, endString) {

    let profils = await requete.get_users_tags_async(startString, endString);

    //la fonction à importer
    let newProfils = createUserObjectListFromArrayOfUsers(profils);

    return newProfils;
}

// from 2023-03-19 to 2023-03-23
//fromdate= 1679184000 &todate= 1679529600
/*
(async () => {
    let tab = await get_users_profils("1679184000","1679529600");
    console.log(tab);
    //console.log(tab[0]);

})();
*/

module.exports = {
    get_users_profils
}

/*
[
  {
    idSTOW: 6309,
    interact: {
      jenkins: 1.1235955056179776,
      gitlab: 6.741573033707865,
      devops: 1.1235955056179776,
      metrics: 1.1235955056179776,
      git: 16.853932584269664,
      'version-control': 2.247191011235955,
      dvcs: 1.1235955056179776,
      migration: 1.1235955056179776,
      backup: 1.1235955056179776,
      'merge-request': 1.1235955056179776,
      tags: 1.1235955056179776,
      'gitlab-ci': 3.3707865168539324,
      cicd: 1.1235955056179776,
      xml: 1.1235955056179776,
      markdown: 1.1235955056179776,
      diagram: 1.1235955056179776,
      'continuous-integration': 3.3707865168539324,
      fastlane: 2.247191011235955,
      'visual-studio-code': 2.247191011235955,
      javascript: 6.741573033707865,
      github: 15.730337078651685,
      'next.js': 6.741573033707865,
      'github-organizations': 2.247191011235955,
      'github-codeowners': 2.247191011235955,
      'azure-devops': 1.1235955056179776,
      terraform: 1.1235955056179776,
      'github-actions': 1.1235955056179776,
      'github-flavored-markdown': 2.247191011235955,
      'github-api': 1.1235955056179776,
      bitbucket: 1.1235955056179776,
      'ubuntu-16.04': 1.1235955056179776,
      'git-submodules': 1.1235955056179776,
      branch: 1.1235955056179776,
      go: 1.1235955056179776,
      ssh: 1.1235955056179776,
      https: 1.1235955056179776,
      'network-protocols': 1.1235955056179776
    },
    question: { jenkins: 1, gitlab: 1, devops: 1, metrics: 1 },
    answer: {
      git: 15,
      'version-control': 2,
      dvcs: 1,
      gitlab: 5,
      migration: 1,
      backup: 1,
      'merge-request': 1,
      tags: 1,
      'gitlab-ci': 3,
      cicd: 1,
      xml: 1,
      markdown: 1,
      diagram: 1,
      'continuous-integration': 3,
      fastlane: 2,
      'visual-studio-code': 2,
      javascript: 6,
      github: 14,
      'next.js': 6,
      'github-organizations': 2,
      'github-codeowners': 2,
      'azure-devops': 1,
      terraform: 1,
      'github-actions': 1,
      'github-flavored-markdown': 2,
      'github-api': 1,
      bitbucket: 1,
      'ubuntu-16.04': 1,
      'git-submodules': 1,
      branch: 1,
      go: 1,
      ssh: 1,
      https: 1,
      'network-protocols': 1
    }
  }
]
*/