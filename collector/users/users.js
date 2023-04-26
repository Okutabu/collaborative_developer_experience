// Noms et prénoms pour générer des profils
// à utiliser comme des tableaux
var names_f = require('./firstnames_f.json');
var names_m = require('./firstnames_m.json');
var surnames = require('./surnames.json');

//Id utilisateurs STOW : 


// const list_id = [6309, 13431819, 6392120, 654730, 12439119, 7297700, 2772584, 2257564, 8243653, 564406, 3943312, 6527049, 85371, 4198317, 3962914, 1271826, 1693192, 123471, 174728, 
//     11182, 65387, 34088, 1366033, 9560594, 284240, 19290081, 5151202, 1154350,  2029983, 2408867, 2303865, 905, 1426227, 954940, 20919215, 5987, 12950, 18533248, 14172808, 
//     20924391, 20934832, 20725928, 1973207, 20706987, 20774099, 20714914, 20726757, 20790167, 2308683, 6738015, 11178549, 1599751, 20446596, 17959618, 238704, 15239077, 20935520, 11749777,
//     633440, 2298998, 3064538, 865175, 679240, 20845503, 20765546, 20864520, 2016562, 4323, 5928186, 20706987, 20785192, 20788232, 20855849, 100297, 825, 7941188, 201952, 3288890, 3448419,
//     893780, 1138192, 3930247, 329700, 2756547, 234590, 10785975, 544825, 4851590, 4788546, 20430449, 2840436, 3645650, 1420701, 11717481, 396458, 3434970, 184546, 8893686, 576911, 2483313,
//     14853666, 20740880, 98713, 714501, 5221149, 1000343, 297696, 107409, 2172, 422476, 16475264, 11804213, 11666461, 19255938, 6213883, 8593689, 250259, 10317633, 56541, 193619, 947357, 
//     40882, 62118, 911930, 253468, 3795379, 8951377, 3820189, 11389012, 3741589, 11901859, 5425860, 12349734, 13431819, 10067022, 9353539, 6676512, 3763293];

const list_id = [6309];



function getSurnames(size, tabSurnames){
    let res = [];
    if( size <= tabSurnames.length ){

        for(let i = 0; i < size; i++){
            res.push(tabSurnames[i]);
        }
    }else{
        console.log("[ getSurnames ] : erreur taille trop grande !")
    }
    return res;
}


function getFnames( size, tabFnames){
    let res = [];
    if( size <= tabFnames.length ){

        for(let i = 0; i < size; i++){
            res.push(tabFnames[i]);
        }
    }else{
        console.log("[ getFnames ] : erreur taille trop grande !")
    }
    return res;
}


function getHnames( size, tabHnames){
    let res = [];
    if( size <= tabHnames.length ){

        for(let i = 0; i < size; i++){
            res.push(tabHnames[i]);
        }
    }else{
        console.log("[ getHnames ] : erreur taille trop grande !")
    }
    return res;
}


function getFirstNames( size, tabFnames, tabHnames){
    let res = [];
    let limit = size / 2;

    let homme = getHnames(limit, tabHnames);
    let femme = getFnames(limit, tabFnames);

    res = homme.concat(femme);
    return res;
}


function createMails(size, firstnames, lastnames){
    let mails = [];
    if( size <= firstnames.length && size <= lastnames.length ){

        
        for(let i = 0; i < size; i++){
            let mail = firstnames[i] + '.' + lastnames[i] + '@email.com';
            mails.push(mail);
        }
    }else{
        console.log("[ createMails ] : erreur taille trop grande !")
    }
    return mails;
}


function createFakeUser(prenom, nom, mail){
    return {
        name : prenom,
        surname : nom,
        mail : mail
    }
}


function createUsers(){
    
    let n = list_id.length;
    console.log("Number of fake users to create : ", n);
    let prenoms = getFirstNames(n, names_m, names_f);
    let noms = getSurnames(n, surnames);
    let mails = createMails(n, prenoms, noms);

    let users = [];

    for(let i = 0; i < n; i++){
        users.push(createFakeUser(prenoms[i], noms[i], mails[i]));
    }
    return users;
}

module.exports = {
    list_id, createUsers
}

// let users = createUsers();
// console.log(users);