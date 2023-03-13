/*

Contient les requêtes à l'API StackExchange de Stack OverFlow. On commence tout d'abord par récupérer les id des utilisateurs contenu dans un autre fichier
puis on vient récupèrer la liste d'activité de chaque utilisateur dans une tranche de temps donnée. A partir de cette liste d'activité, on accède à chaque
réponse et question posé par un utilisateur et on récupère les tags liés à ceux-ci.

*/
const user = require('./users')

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

//Version asynchrone de la fonction
// Permet de récupérer les tags d'une question et d'insérer le résultat dans un objet.
// La fonction renvoie un objet qui possède le type de l'activité de l'utilisateur et les tags correspondant.
async function get_questions_tags_async(postid, posttype){

    const response = await fetch('https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((')
    //.then(response => response.json())
    //console.log(response)
    const data = await response.json();
    
    if (data.items == undefined){
        return [];
    }
    let activities = {
        typePost : posttype,
        tags : data.items[0].tags
    }
    
    return activities;
}


// Version Asynchrone de la fonction
// Fonction intermédiaire qui permet de récupérer le post d'origine contenant les tags de la réponse.
// Exécute la fonction get_questions_tags avec le type answer.
async function get_answers_tags_async(postid, posttype){


    const promise = fetch('https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((')
      .then(response => response.json())

    const data = await promise;
    if (data.items == undefined){
        return [];
    }

    return get_questions_tags_async(data.items[0].question_id, posttype);
}


// Version asynchrone de la fonction
// Permet de récupérer la liste d'activité d'un utilisateur et d'éxécuter la fonction correspondant au bon type de post.
// Renvoie la liste d'activité de l'utilisateur.
async function get_user_tags_async(idUser, start, end) {

    let activities = [];

    const promise = fetch('https://api.stackexchange.com/2.3/users/' + idUser + '/timeline?fromdate='+start+'&todate='+end+'&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((&filter=!4-q5axL*s.NyACS38')
      .then(response => response.json())
  
    const data = await promise;
    
    if (data.items != undefined){
        for (const item of data.items) {
            let id = item.post_id
            let type = item.post_type
    
            if(id !== undefined){
    
                if(type == "answer"){
                    await get_answers_tags_async(id, type)
                    .then(data => {
                        activities.push(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    await get_questions_tags_async(id, type)
                    .then(data => {
                        activities.push(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            }
        }
    }
    
    
    return activities;
}


async function get_users_tags_async(start, end){
    let users = []

    console.log("Converting IDs to string ...");
    user.list_id.map(id => id.toString());

    for(let i=0; i < user.list_id.length; i++){

        let state = i / user.list_id.length * 100
        console.log("Collecting datas of " + `${user.list_id[i]}` + " : "+state + " %");
        let userInfo =  {
            id : user.list_id[i],
            activities : await get_user_tags_async(user.list_id[i], start, end)
        }

        await sleep(800);
        if (i == 20){
            await sleep(10000);
        }
        //console.log(userInfo);

        users.push(userInfo); ;
    }
    return users
}

// Version asynchrone de la fonction.
// Permet de récupérer toutes les informations d'un utilisateur.
// Renvoie un objet user contenant le nom et l'id de l'utilisateur.
async function get_user(id){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ id +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("GET user : " + id);

    try {
        var data = await fetch(URL).then(response => response.json());

        //console.log(data);
        var info = {
            idSTOW: data.items[0].user_id,
            pseudo: data.items[0].display_name,
            avatar: data.items[0].profile_image
        };
        return info;
        
    } catch (error) {
        console.error(`Error function get_user : ${error}`);
    }
}

async function get_users(allIds){

    let ids = allIds.map(id => id.toString());
    let users_info = [];

    for(id of ids){
        const info = await get_user(id);
        await sleep(1000);
        users_info.push(info);
    }

    return users_info;
}

/*
(async() => {
    
    let res = await get_user('13431819');
    console.log(res);
    
})();
*/


module.exports = {
    get_answers_tags_async, get_users, get_users_tags_async
}




