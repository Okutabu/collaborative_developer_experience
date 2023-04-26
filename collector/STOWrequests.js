/*

Contient les requêtes à l'API StackExchange de Stack OverFlow. On commence tout d'abord par récupérer les id des utilisateurs contenu dans un autre fichier
puis on vient récupèrer la liste d'activité de chaque utilisateur dans une tranche de temps donnée. A partir de cette liste d'activité, on accède à chaque
réponse et question posé par un utilisateur et on récupère les tags liés à ceux-ci.

*/
const user = require('./users/users')

/*
Un tableau de users à renvoyer
{
    "users": [
        {
            "id": 12345,
            "activities": [
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                },
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                }
            ]
        },
        {
            "id": 67890,
            "activities": [
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                },
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                }
            ]
        }
    ]
}

à modifier en =>
{
    "typePost": "answer",
    "question": { "idQuestion": 75131252, "title": "Comment faire du go sur github avec gopath ?"  }, 
    "dateInteraction": 1673848584,
    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
}
*/

//Permet de temporiser une requête
async function sleep(time){
    await new Promise(resolve => setTimeout(resolve, time));
}


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
        idQuestion: postid,
        dateInteraction : data.items[0].creation_date,
        tags : data.items[0].tags
    }
    //console.log(activities);
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

    //console.log("POSTID : ", data.items[0].question_id, " POSTYPE : ", posttype, " POSTID : ", postid);

    return await get_questions_tags_async(data.items[0].question_id, posttype);
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
                } 
                if(type == "question") {
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


// fonction qui permet de récupérer toutes les activitées des utilisateurs
async function get_users_tags_async(start, end){
    let users = []

    console.log("Converting IDs to string ...");
    user.list_id.map(id => id.toString());

    for(let i=0; i < user.list_id.length; i++){

        let state = Math.floor(i / user.list_id.length * 100);
        console.log("Collecting datas of " + `${user.list_id[i]}` + " : "+state + " %");

        let userInfo =  {
            id : user.list_id[i],
            activities : await get_user_tags_async(user.list_id[i], start, end)
        }

        await sleep(800);
        if (i % 20 == 0 && i != 0){
            await sleep(10000);
        }
        //console.log(userInfo);

        users.push(userInfo); ;
    }
    return users
}



// permet de récupérer la dernière date d'activité, va devenir obselete avec la nouvelle version de la bdd
async function get_user_last_activity_date(userId, start, end){

    res = -1;
    try {

        await sleep(2000);

        const getActivities = await fetch('https://api.stackexchange.com/2.3/users/' + userId + '/timeline?fromdate=' + start + '&todate=' + end + '&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg((')
         .then(response => response.json());
        
        //console.log(getActivities);
        

        if(getActivities.items[0] != undefined){
            
            for(const data of getActivities.items){
                //on prend la première activité qui est une question ou un réponse, si c'est l'acquisition d'un badge
                //par exemple, on passe à la prochaine activité
                if(data.post_type != undefined){
                    //let type = data.post_type;
                    
                    res = data.creation_date;
                    //console.log(`   Last activity of ${userId} : ${res}`);
                    break;
                }
            }
            
        }
        return res;
        
    } catch (error) {
        console.error(`Error function get_user_last_activity : ${error}`);
        return error;
    }
        
}

// Version asynchrone de la fonction.
// Permet de récupérer toutes les informations d'un utilisateur.
// Renvoie un objet user contenant le nom et l'id de l'utilisateur ainsi que sa dernière date d'activité.
async function get_user(id, start, end){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ id +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("[ GET user ] : " + id);

    try {
        await sleep(1000);
        var data = await fetch(URL).then(response => response.json());

        //console.log(data);
        
        //var date = await get_user_last_activity_date(id, start, end);

        var info = {
            idSTOW: data.items[0].user_id,
            pseudo: data.items[0].display_name,
            avatar: data.items[0].profile_image,
            //lastInteraction: date
        };
        return info;
        
    } catch (error) {
        console.error(`Error function get_user : ${error}`);
    }
}

async function get_users(allIds, start, end){

    let ids = allIds.map(id => id.toString());
    let users_info = [];

    for(let i =0; i < ids.length; i++){
        const info = await get_user(ids[i]);
        await sleep(2000);
        users_info.push(info);

        if( i % 20 == 0 && i != 0){
            console.log("[ TEMPORISATION ]");
            await sleep(10000);
        }
    }
    return users_info;
}

function get_users_tags_questions(userProfil){

    let infos = {
        tags : [],
        questions: [],
        ids: []
    };

    //let userProfil = await get_users_tags_async(start, end);

    userProfil.map(
        user => {

            infos.ids.push(user.id);

            user.activities.map(
                activity => {

                    allTags = infos.tags.concat(activity.tags);
                    infos.tags = allTags;

                    infos.questions.push(activity.idQuestion);
                }
            );
        }
    );

    return infos;
}

// from 2023-03-19 to 2023-03-23
//fromdate= 1679184000 &todate= 1679529600

// (async() => {
    

//     let res = await get_users_tags_async("1672904976", "1680162576");
//     //console.log(res[0].activities);
    
// })();




module.exports = {
    get_answers_tags_async, get_users, get_users_tags_async, get_users_tags_questions
}