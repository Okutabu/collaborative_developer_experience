function fetch(url){
    var request = require('sync-request')
    var res = request('GET', url)
    var string = res.getBody('utf8')
    var json = JSON.parse(string)

    return json
}

                                                    //mettre ici l'id du user souhaité 
const URL = 'https://api.stackexchange.com/2.3/users/3741589/timeline?fromdate=1656979200&todate=1672876800&site=stackoverflow&filter=!4-q5axL*s.NyACS38';

async function GET_QUESTIONS(postid, posttype){


    const URL2 = 'https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    const result = await fetch(URL2)

    result.json().then( data => {
        //console.log("\n");
        //console.log(posttype);
        
        //let tags = data.items
        let tags = data.items[0].tags
        /*
        for (tag of tags){
            console.log(tag);
        };
        */
        //console.log(tags)
        return tags
    })
}

async function GET_ANSWERS(postid, posttype){

    const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    const result = await fetch(URL3)

    result.json().then( data => { 
        return GET_QUESTIONS(data.items[0].question_id, posttype);
    })
}

async function GET_USER_TAGS(){

    const result = await fetch(URL)
    let tags = [];

    result.json().then( data => {
        const items = data.items;
        
        for (item of items){
            //console.log(data.items[i].post_type)
            if(item.post_type == "answer"){
                tags.push(GET_ANSWERS(item.post_id, item.post_type));
            } else {
                tags.push(GET_QUESTIONS(item.post_id, item.post_type));
            }
        }
    })
    return tags
}

let tags = GET_USER_TAGS();
console.log(tags);

//GET_USER
