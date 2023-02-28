
const db = require('./neo4j_request');
const requete = require('./STOWrequests');
const users = require('./users');


async function start_collector_first_time(){

    const infos = await requete.get_users(users.list_id);
    await add_all_names_and_pictures(infos);
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