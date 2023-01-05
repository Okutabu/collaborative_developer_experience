const URL = 'https://api.stackexchange.com/2.3/users/6309/timeline?fromdate=1656979200&todate=1672876800&site=stackoverflow&filter=!4-q5axL*s.NyACS38';
async function makeApiCall(){
    const result = await fetch(URL)
    result.json().then(data=>{
        for (i in data.items){
        console.log(data.items[i].post_id)
        console.log(data.items[i].post_type)
        }
    })
}
makeApiCall();
