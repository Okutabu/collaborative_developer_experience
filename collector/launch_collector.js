
const db = require('./neo4j_request');
const requete = require('./STOWrequests');


(async() => {

    try {
        
        const driver = db.driver;
        
        const infos = await requete.get_users();
        await add_all_names_and_pictures(infos);

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
})();