import fetch from 'node-fetch';

const list_id = [6309, 13431819, 6392120, 654730, 12439119, 7297700, 2772584]

var ids = list_id.map(id => id.toString())

async function get_user_info(idUser){

    const URL = 'https://api.stackexchange.com/2.3/users/'+ idUser +'?site=stackoverflow&key=djYBpvTDkmPNdHk*uNJKjg(('

   

    console.log("GET user : " + idUser)
    const reponse = await fetch(URL)

    reponse.json().then(get => {

        let user = {
            id: idUser,
            name: get.items[0].display_name
        }
        console.log(user.name)
    })
    
    return user
}

async function get_all_users(){

    let users = []
    

    for(let i =0; i < /* ids.length */ 1; i++){

        await get_user_info(ids[i]).then( data =>{
            users.push(data)
        })
        
    }
    return users
}

await get_all_users().then(data => console.log(data))
//console.log(user)