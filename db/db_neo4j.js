//var requete = require('../api/stack-overflow/STOWrequests');
var profil = require('../calculateur');
//import { RATIO_SIMILARITY, COSINUS_SIMILARITY } from 'similarityQueries.js';

//let allTags = requete.get_users_tags("1673130000","1673136000")
//console.log(allTags);

//let allUsers = requete.get_all_users();
//console.log(allUsers);

let allProfils = profil.get_users_profils();
console.log(allProfils);

/*
const user63 =       
  {
    "id": 6309,
    "interact":{
        "typescript": 19.56,
        "java": 2.8
    },
    "question":{
        "github": 2,
        "java": 10

    },
    "answer":{
        "github": 2,
        "java": 10

    }
};
*/

(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

    try {

        await link_user_question(user63);
        await link_user_reponse(user63);

        //compareSimilarityResultsForUser(driver, 6309);
        //compareSimilarityResultsForUser(driver, 65387);

        //await insert_profils(allProfils);
        //await insert_users(allUsers);
        //await insert_tags(allTags);

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }




    async function compareSimilarityResultsForUser(driver, userId){
        const similarityQueryList = [RATIO_SIMILARITY, COSINUS_SIMILARITY];
        for (let similarityQuery of similarityQueryList){
           await find_similar_user(driver, userId, similarityQuery);
        }
    }

    async function insert_tags(allTags) {
    
        try {

            for (let tag in allTags){
                const requete = `MERGE (t:Tag { title: $title })`;
            
                const writeResult = await session.executeWrite(tx =>
                    tx.run(requete, { tag })
                );
        
                writeResult.records.forEach(record => {
                    console.log(`Found tag: ${record.get('tag')}`)
            });

            }
            
        } catch (error) {
            console.error(`Something went wrong, Tags could not be inserted : ${error}`);
        }
    }

    async function insert_users(allUsers) {
    
        try {

            for(userInfo of allUsers){
                const requete = `MERGE (u:User { id: $user} )`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { userInfo })
            );
    
            writeResult.records.forEach(record => {
                console.log(`Found user: ${record.get('user')}`)
            });
            }
            
        } catch (error) {
            console.error(`Something went wrong, Users could not be inserted : ${error}`);
        }
    }


    async function insert_profils(allProfils) {

        const session = driver.session({ database: 'neo4j' });
        try {

            for(profilInfo of allProfils){
                const id = profilInfo.user
                const tagsInfo = profilInfo.activities.Tags
                
                await insert_user(id);
                await insert_tags(tags);

                for ( tag in tagsInfo){
                    await create_relation_interact(id, tag, tagsInfo[tag]);
                }
            }
            
        } catch (error) {
            console.error(`Something went wrong, profiles could not be inserted : ${error}`);
        }
    }

    async function create_relation_interact(idUser, tag, info){

        let pourcentageTag = info[0];
        let nbRelations = info[1];

        const session = driver.session({ database: 'neo4j' });
    
        try {

            const requete = `MATCH (u:User{id : $idUser}), (t:Tag{title : $tag})
                             MERGE (u)-[r:INTERACT]->(t)
                             SET r.ratio = $pourcentageTag,
                             r.nbInteractions = toInteger($nbRelations)`;
            
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

    async function find_similar_user(driver, idUser, query) {
        
        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = query;
            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            /* readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            }); */
            console.log(readResult.records+ "\n");

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function link_user_question(user){

       let id = user.id
       let questions = user.question;

       const session = driver.session({ database: 'neo4j' });
    
        try {

            for (let tag in questions){
                console.log(tag);
                let nb = questions[tag]

                const requete = `MATCH (u:User{id : $id}), (t:Tag{title : $tag})
                                 MERGE (u)-[r:ASKED]->(t)
                                 SET r.number = toInteger($nb)`;
            
                const writeResult = await session.executeWrite(tx =>
                    tx.run(requete, { tag, id, nb })
                );
        
                writeResult.records.forEach(record => {
                    console.log(`Found tag: ${record.get('tag')}`)
                });

            }
            
        } catch (error) {
            console.error(`Something went wrong, Tags could not be inserted : ${error}`);
        }finally {
            await session.close();
        }
    }

    async function link_user_reponse(user){
        
        let id = user.id
        let answer = user.answer;
 
        const session = driver.session({ database: 'neo4j' });
     
         try {
 
             for (let tag in answer){
                 console.log(tag);
                 let nb = answer[tag]
 
                 const requete = `MATCH (u:User{id : $id}), (t:Tag{title : $tag})
                                  MERGE (u)-[r:ANSWERED]->(t)
                                  SET r.number = toInteger($nb)`;
             
                 const writeResult = await session.executeWrite(tx =>
                     tx.run(requete, { tag, id, nb })
                 );
         
                 writeResult.records.forEach(record => {
                     console.log(`Found tag: ${record.get('tag')}`)
                 });
 
             }
             
         } catch (error) {
             console.error(`Something went wrong, Tags could not be inserted : ${error}`);
         }finally {
             await session.close();
         }
     }

})();




    

