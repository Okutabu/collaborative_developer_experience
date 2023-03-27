function convertTimeStampToString(intDate){

    let date = new Date(intDate * 1000);

    return date.getFullYear();
}

let test = convertTimeStampToString(1478367453);
console.log(test);