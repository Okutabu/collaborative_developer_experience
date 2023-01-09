var requete = require('./STOWrequests');
var profil = require('./calculateur');

//let allTags = requete.get_users_tags("1673130000","1673136000")
//console.log(allTags);

//let allUsers = requete.get_all_users();
//console.log(allUsers);

/* let allProfils = profil.get_users_profils();
console.log(allProfils); */

(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    

    try {

        console.log("Utilisateurs similaires à 63009 :");
        await find_similar_user(driver, 6309)
        console.log("\n");

        console.log("Utilisateurs similaires à 65387 :");
        await find_similar_user(driver, 65387)
        console.log("\n");


        //await insert_profils(allProfils);
        //await insert_users(allUsers);
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
            const requete = `MERGE (t:Tag { title: $title })`;
            
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

            for (let tag in allTags){
                await insert_tag(tag);
            }
        
            
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    }

    async function insert_user(user) {

        const session = driver.session({ database: 'neo4j' });
    
        try {

            const requete = `MERGE (u:User { id: $user} )`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { user })
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

    async function insert_profil(profil) {

        const session = driver.session({ database: 'neo4j' });
        const id = profil.user
        const tags = profil.tags
    
        try {

            await insert_user(id);
            await insert_tags(tags);

            for ( tag in tags){
                await create_relation(id, tag, tags[tag]);
            }

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    }


    async function insert_profils(allProfils) {
    
        try {

            for(profilInfo of allProfils){
                await insert_profil(profilInfo);
            }
            
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        }
    }

    async function create_relation(idUser, tag, info){

        let pourcentageTag = info[0];
        let nbRelations = info[1];

        const session = driver.session({ database: 'neo4j' });
    
        try {

            const requete = `MATCH (u:User{id : $idUser}), (t:Tag{title : $tag})
                             MERGE (u)-[r:INTERACT]->(t)
                             SET r.ratio = $pourcentageTag,
                             r.nbInteractions = $nbRelations`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { idUser, tag, pourcentageTag, nbRelations })
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

    async function find_similar_user(driver, idUser) {
        
        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = `MATCH (u1:User {id:$idUser})-[r1:INTERACT]->(t:Tag)<-[r2:INTERACT]-(u2)
                               WHERE r1.ratio > 10 AND r2.ratio > 10
                               RETURN u1.id AS User1, r1.ratio AS PoidsU1, u2.id AS User2, r2.ratio AS PoidsU2, t.title AS Tag
                               ORDER BY PoidsU1 + PoidsU2 DESC
                               LIMIT 5`;
            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            /* readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            }); */
            console.log(readResult.records);



        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    /*
    Requete reco UserCase :
    MATCH (u:User {id:6309})-[r:INTERACT]->(t:Tag)<-[r1:INTERACT]-(u2)
    WHERE r1.ratio > 10 AND r.ratio > 10
    RETURN u.id, r.ratio AS pourcentage, u2.id, r1.ratio, t.title
    ORDER BY pourcentage + r1.ratio DESC
    LIMIT 10
    */


})();




    

