
//effectue un GET de l'url et renvoie un JSON
function fetch(url){

    var request = require('sync-request')
    var res = request('GET', url)
    var string = res.getBody('utf8')
    var json = JSON.parse(string)

    return json
}

function get_questions_tags(postid, posttype){


    const URL2 = 'https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    
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
    return data.items[0].tags
}


function get_answers_tags(postid, posttype){

    const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    
    /* const result = await fetch(URL3)

    result.json().then( data => { 
        return get_questions_tags(data.items[0].question_id, posttype);
    }) */
    var data = fetch(URL3)
    return get_questions_tags(data.items[0].question_id, posttype)
}


function get_user_tags(idUser){
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

    
    const URL = 'https://api.stackexchange.com/2.3/users/' + idUser + '/timeline?fromdate=1656979200&todate=1672876800&site=stackoverflow&filter=!4-q5axL*s.NyACS38';
    
    var data = fetch(URL)
    
    const items = data.items;
    
    for (item of items){
        //console.log(data.items[i].post_type)
        let id = item.post_id
        let type = item.post_type

        if(type == "answer"){
            tags.push(get_answers_tags(id, type));
        } else {
            tags.push(get_questions_tags(id, type));
        }
    }

    return tags
}

let tags = get_user_tags("3741589");
console.log(tags);

//GET_USER

