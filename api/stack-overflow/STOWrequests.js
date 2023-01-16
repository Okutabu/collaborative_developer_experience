/*

Contient les requêtes à l'API StackExchange de Stack OverFlow. On commence tout d'abord par récupérer les id des utilisateurs contenu dans un autre fichier
puis on vient récupèrer la liste d'activité de chaque utilisateur dans une tranche de temps donnée. A partir de cette liste d'activité, on accède à chaque
réponse et question posé par un utilisateur et on récupère les tags liés à ceux-ci.

*/
const user = require('../../users.js')

/*
Un tableau de users à renvoyer
{
    "users": [
        {
            "id": 12345,
            "activities": [
                {
                    "type": "question",
                    "tags": ["javascript", "jquery", "ajax"]
                },
                {
                    "type": "answer",
                    "tags": ["python", "django", "orm"]
                }
            ]
        },
        {
            "id": 67890,
            "activities": [
                {
                    "type": "question",
                    "tags": ["c#", "asp.net", "mvc"]
                },
                {
                    "type": "answer",
                    "tags": ["java", "spring", "rest"]
                }
            ]
        }
    ]
}
*/

//Permet de temporiser une requête
async function sleep(time){
    await new Promise(resolve => setTimeout(resolve, time));
}
/*
async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
*/

//effectue un GET de l'url et renvoie un JSON
function Paul(url){

    var request = require('sync-request')
    var res = request('GET', url)
    var string = res.getBody('utf8')
    var json = JSON.parse(string)

    console.log("   fetching : " + url)

    return json
} 

// Permet de récupérer les tags d'une question et d'insérer le résultat dans un objet.
// La fonction renvoie un objet qui possède le type de l'activité de l'utilisateur et les tags correspondant.
function get_questions_tags(postid, posttype){


    const URL2 = 'https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('
    
    /* const result = await fetch(URL2)

    result.json().then( data => {
        //console.log("\n");
        //console.log(posttype);
        
        //let tags = data.items
        let tags = data.items[0].tags
        
        for (tag of tags){
            console.log(tag);
        };
        
        //console.log(tags)
        return tags
    }) */

    var data = Paul(URL2)

    let activities = {
        TypePost : posttype,
        Tags : data.items[0].tags

    }
    
    return activities
}

//Version asynchrone de la fonction
// Permet de récupérer les tags d'une question et d'insérer le résultat dans un objet.
// La fonction renvoie un objet qui possède le type de l'activité de l'utilisateur et les tags correspondant.
async function get_questions_tags_async(postid, posttype){

    const response = await fetch('https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((')
    //.then(response => response.json())
    //console.log(response)
    const data = await response.json();
    
    let activities = {
        typePost : posttype,
        tags : data.items[0].tags
    }
    
    return activities;
}

// Fonction intermédiaire qui permet de récupérer le post d'origine contenant les tags de la réponse.
// Exécute la fonction get_questions_tags avec le type answer.
function get_answers_tags(postid, posttype){

    const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('
    
    /* const result = await fetch(URL3)

    result.json().then( data => { 
        return get_questions_tags(data.items[0].question_id, posttype);
    }) */
    var data = Paul(URL3)
    return get_questions_tags(data.items[0].question_id, posttype)
}

// Version Asynchrone de la fonction
// Fonction intermédiaire qui permet de récupérer le post d'origine contenant les tags de la réponse.
// Exécute la fonction get_questions_tags avec le type answer.
async function get_answers_tags_async(postid, posttype){

    const promise = fetch('https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((')
      .then(response => response.json())

    const data = await promise;

    return get_questions_tags_async(data.items[0].question_id, posttype);
}

// Permet de récupérer la liste d'activité d'un utilisateur et d'éxécuter la fonction correspondant au bon type de post.
// Renvoie la liste d'activité de l'utilisateur.
function get_user_tags(idUser, start, end){
    //3741589
    let activities = [];

    /* const result = await fetch(URL)
    result.json().then( data => {
        const items = data.items;
        
        for (item of items){
            //console.log(data.items[i].post_type)
            if(item.post_type == "answer"){
                tags.push(GET_ANSWERS(item.post_id, item.post_type));
            } else {
                tags.push(get_questions_tags(item.post_id, item.post_type));
            }
        }
    }) */


    
    const URL = 'https://api.stackexchange.com/2.3/users/' + idUser + '/timeline?fromdate='+start+'&todate='+end+'&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((&filter=!4-q5axL*s.NyACS38';
    
    var data = Paul(URL)
    const items = data.items;
    
    for (item of items){
        //console.log(data.items[i].post_type)
        let id = item.post_id
        let type = item.post_type

        if(id !== undefined){

            if(type == "answer"){
                activities.push(get_answers_tags(id, type));
            } else {
                activities.push(get_questions_tags(id, type));
            }
        }

        //sleep(1000)
    }

    return activities
}
/*
let tags = get_user_tags("3741589");
console.log(tags);
*/


//récupère tous les tags sous forme de liste d'objet

exports.get_users_tags = function (start, end){

    let tags = []

    user.list_id.map(id => id.toString())

    for(let i =0; i < user.list_id.length ; i++){

        let id = user.list_id[i]
        console.log("GET tags of : " + id)
        let tagUser = {
            user : id,
            activities : get_user_tags(id, start, end)
        }
        console.log("\n")
        tags.push(tagUser)

    }
    return tags
}

// Version asynchrone de la fonction
// Permet de récupérer la liste d'activité d'un utilisateur et d'éxécuter la fonction correspondant au bon type de post.
// Renvoie la liste d'activité de l'utilisateur.
async function get_user_tags_async(idUser, start, end) {

    let activities = [];

    const promise = fetch('https://api.stackexchange.com/2.3/users/' + idUser + '/timeline?fromdate='+start+'&todate='+end+'&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((&filter=!4-q5axL*s.NyACS38')
      .then(response => response.json())
  
    const data = await promise;
    
    for (const item of data.items) {

        let id = item.post_id
        let type = item.post_type

        if(id !== undefined){

            if(type == "answer"){
                get_answers_tags_async(id, type)
                .then(data => {
                    activities.push(data);
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                get_questions_tags_async(id, type)
                .then(data => {
                    activities.push(data);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
    console.log(activities);
    return activities;
  }


async function get_users_tags_async(start, end){
    let users = []

    user.list_id.map(id => id.toString())

    for(let i=0; i < /* user.list_id.length */ 100; i++){
        let userInfo = {
            id : user.list_id[i],
            activities : await get_user_tags_async(user.list_id[i], start, end)
        }

        users.push(userInfo)
    }

    return users
}


// Permet de récupérer toutes les informations d'un utilisateur.
// Renvoie un objet user contenant le nom et l'id de l'utilisateur.
function get_user_info(idUser){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ idUser +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("GET user : " + idUser)
    const data = Paul(URL)
    
    let user = {
        id: idUser,
        name: data.items[0].display_name
    }

    return user
}
// Récupère les id et les noms de tous les user provenant d'un autre fichier.
exports.get_all_users = function (){

    let users = []
    user.list_id.map(id => id.toString())

    for(let i =0; i < user.list_id.length; i++){

        let userInfo = get_user_info(user.list_id[i])
        users.push(userInfo)
    }
    return users
}
/*
let info = get_all_users()
console.log(info)
*/

// Version asynchrone de la fonction.
// Permet de récupérer toutes les informations d'un utilisateur.
// Renvoie un objet user contenant le nom et l'id de l'utilisateur.
async function get_user(dev, tab){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ dev.id +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("GET user : " + dev.id)

    var result = await fetch(URL)
    
    result.json().then( data => { 
        tab.push(data.items[0].display_name);
    })
}




async function test(){
    let allTags = get_user_tags_async("6309","1670000000","1673136000");
    await sleep(2000);
    return allTags;
    
}



//get_user_tags_async("6309", "1670000000", "1673136000")
test().then(data =>{ 
    let time = new Date()
    console.log(time.getTime());
    console.log(data);
})
.catch(error => {
    console.log(error);
})


/*
get_users_tags_async("1670000000", "1673136000")
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
});
*/
