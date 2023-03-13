const db = require('./neo4j_request');
const requete = require('./STOWrequests');
const users = require('./users');
const profil = require('./calculateur');


async function start_collector_first_time(){

    // récupération des données d'un utilisateurs + insertion (id, avatar, pseudo)
    console.log("Step 1");
    const infos = await requete.get_users(users.list_id);

    console.log("Step 2");
    await db.add_all_names_and_pictures(infos);

    //erreur insertion tag
    //Something went wrong, Tags could not be inserted : Neo4jError: Expected parameter(s): id

    
    // récupère tous les données d'interactions (questions, réponses)
    console.log("Step 3");
    const allProfiles = await profil.get_users_profils("1668610633","1673881033");

    console.log("Step 4");
    await db.insert_profils(allProfiles);
}

/*
async function start_collector_new_users(){

}

async function update_db(){
    
}

*/

(async() => {


    await start_collector_first_time();

    db.driver.close();
    
})();