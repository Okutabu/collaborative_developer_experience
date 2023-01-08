var requete = require('./STOWrequests');

//let allTags = requete.get_users_tags("1673130000","1673136000")
//console.log(allTags);

let allUsers = requete.get_all_users();
console.log(allUsers);

(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    

    try {

        await insert_users(allUsers);
        //await insert_tags(allTags);
        //await test("TagName");
        //await makeApiCall();

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }


    async function insert_tag(title) {

        const session = driver.session({ database: 'neo4j' });
    
        try {
            const requete = `MERGE (t:Tags { title: $title })`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { title })
            );
    
            writeResult.records.forEach(record => {
                console.log(`Found tag: ${record.get('tag')}`)
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function insert_tags(allTags) {
    
        try {

            for(userInfo of allTags){
                for(tags of userInfo.tags){
                    for(tag of tags){
                        await insert_tag(tag);
                    }
                }

            }
            
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    }

    async function insert_user(user) {

        const session = driver.session({ database: 'neo4j' });
        const id = user.id
        const name = user.name
    
        try {

            const requete = `MERGE (u:User { id: $id, name: $name } )`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { id, name })
            );
    
            writeResult.records.forEach(record => {
                console.log(`Found user: ${record.get('user')}`)
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function insert_users(allUsers) {
    
        try {

            for(userInfo of allUsers){
                await insert_user(userInfo);
            }
            
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    }



})();




    

