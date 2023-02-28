
const db = require('./neo4j_request');
const requete = require('./STOWrequests');
const users = require('./users');
const profil = require('./calculateur');


async function start_collector_first_time(){

    // récupération des données d'un utilisateurs + insertion (id, avatar, pseudo)
    const infos = await requete.get_users(users.list_id);
    await db.add_all_names_and_pictures(infos);

    // récupère tous les données d'interactions (questions, réponses)
    const allProfiles = await profil.get_users_profils("1668610633","1673881033");
    await db.insert_profils(allProfiles);
}

async function start_collector_new_users(){

}

async function update_db(){
    
}



(async() => {

    try {
        
        const driver = db.driver;
        
        await start_collector();
        
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
})();