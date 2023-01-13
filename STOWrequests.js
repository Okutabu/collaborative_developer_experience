
const user = require('./users.js')


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
async function sleep(times){
    await new Promise(resolve => setTimeout(resolve, times));
} 

//effectue un GET de l'url et renvoie un JSON
/* function fetch(url){

    var request = require('sync-request')
    var res = request('GET', url)
    var string = res.getBody('utf8')
    var json = JSON.parse(string)

    console.log("   fetching : " + url)

    return json
} */

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

    var data = fetch(URL2)
    
    //sleep(1000)
    return data.items[0].tags
}


function get_answers_tags(postid, posttype){

    const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('
    
    /* const result = await fetch(URL3)

    result.json().then( data => { 
        return get_questions_tags(data.items[0].question_id, posttype);
    }) */
    var data = fetch(URL3)
    return get_questions_tags(data.items[0].question_id, posttype)
}


function get_user_tags(idUser, start, end){
    //3741589
    let tags = [];

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
    
    var data = fetch(URL)
    const items = data.items;
    
    for (item of items){
        //console.log(data.items[i].post_type)
        let id = item.post_id
        let type = item.post_type

        if(id !== undefined){

            if(type == "answer"){
                tags.push(get_answers_tags(id, type));
            } else {
                tags.push(get_questions_tags(id, type));
            }
        }

        //sleep(1000)
    }

    return tags
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
            tags : get_user_tags(id, start, end)
        }
        console.log("\n")
        tags.push(tagUser)

    }
    return tags
}



function get_user_info(idUser){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ idUser +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("GET user : " + idUser)
    const data = fetch(URL)
    
    let user = {
        id: idUser,
        name: data.items[0].display_name
    }

    return user
}

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

async function get_user(dev, tab){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ dev.id +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

    console.log("GET user : " + dev.id)

    var result = await fetch(URL)
    

   

    result.json().then( data => { 
        tab.push(data.items[0].display_name);
    })
}



try{
    var dev = {
        id: '6309',
        name: ""
    }
    let tab = [];
    console.log(dev)
    get_user(dev, tab);
    console.log(tab);
}catch(err){
    console.log(err);
}
