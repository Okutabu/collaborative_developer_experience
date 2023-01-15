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
      percentages[item] = [(counts[item] / total) * 100, (counts[item])];
    }
  
    return percentages;
  }

  let items = [ ['javascript', 'html', 'css' , 'html' ], ['mysql', 'sql', 'go-gorm' ], ['php', 'excel', 'laravel'], ['javascript' ,'php', 'pdo' ], ['javascript', 'html', 'checkbox' ], ['C#', 'asp.net', 'sql-server', 'authentication' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], ['javascript', 'html', 'checkbox' ], [ 'javascript', 'arrays', 'string' ], ['c', 'command-line-arguments' ], ['javascript', 'arrays', 'object' ], ['javascript', 'css', 'svg', 'd3.js', 'safari' ], [ 'mysql', 'python-3.x', 'django', 'postgresql' ], [ 'c#' ], [ 'c#' ], [ 'c#' ], ['c#' ], ['php' ], ['php', 'html', 'arrays' ], ['javascript', 'html' ], ['javascript', 'html' ], ['php', 'hash' , 'passwords' ], ['php', 'hash', 'passwords' ] ];
let percentages = calculatePercentages(items);
let sortedArr = Object.entries(percentages).sort((a, b) => a[1][0]-b[1][0]).reverse();
console.log(sortedArr);

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

  let frequencies = calculateFrequencyOfItemsAppearingTogetherFromArrayOfArraysOfItem(items);