
                                                    //mettre ici l'id du user souhaité 
const URL = 'https://api.stackexchange.com/2.3/users/3741589/timeline?fromdate=1656979200&todate=1672876800&site=stackoverflow&filter=!4-q5axL*s.NyACS38';

async function GET(){
    const result = await fetch(URL)
    result.json().then(data=>{
        for (i in data.items){
            //console.log(data.items[i].post_type)
            if(data.items[i].post_type == "answer"){
                makeApiCall3(data.items[i].post_id, data.items[i].post_type);
            } else {
                makeApiCall2(data.items[i].post_id, data.items[i].post_type);
            }
        }
    })
}

async function makeApiCall2(postid, posttype){
    const URL2 = 'https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    const result = await fetch(URL2)
    result.json().then(data=>{
        console.log("\n")
        console.log(posttype)
        console.log("\n")
        for (i in data.items[0].tags){
        console.log(data.items[0].tags[i])
        };
        
    })
}

async function makeApiCall3(postid, posttype){
    const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow'
    const result = await fetch(URL3)
    result.json().then(data=>{
        makeApiCall2(data.items[0].question_id, posttype)
    })
}

GET();