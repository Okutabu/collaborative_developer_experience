//var requete = require('../api/stack-overflow/STOWrequests');
var profil = require('../calculateur');
const { COSINUS_SIMILARITY, RATIO_SIMILARITY, QUESTION_SIMILARITY, ANSWER_SIMILARITY } = require('./similarityQueries');
//import { RATIO_SIMILARITY, COSINUS_SIMILARITY } from 'similarityQueries.js';

//let allTags = requete.get_users_tags("1673130000","1673136000")
//console.log(allTags);

//let allUsers = requete.get_all_users();
//console.log(allUsers);

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






//----------------------------------------------- MAIN ----------------------------------------------------------------------------------------------
(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

    try {


        //récupère les "profils" de tous les utilisateurs
        let allProfils = await profil.get_users_profils();

        //console.log(allProfils);

        //permet d'insérer tous les profils et les relations dans la bdd
        await insert_profils(allProfils);

        //await link_user_question(user63);
        //await link_user_reponse(user63);

        //compareSimilarityResultsForUser(6309);
        //compareSimilarityResultsForUser(65387);

        //find_similar_user(6309, COSINUS_SIMILARITY);


        //Cosinus fonctionnel seulement en fonction des interactions
        // console.log("Utilisateurs similaires à 6309 avec la similarité de cosinus :");
        // await cosinus_similarity(6309);
        // console.log("\n");

        //Trouver un utilisateur similaire qui repond à des questions sur un sujets où l'on pose de questions
        // console.log("Utilisateurs similaires à 6309 qui repondent aux mêmes sujets que les questions qu'il pose :");
        // await question_similarity(6309);
        // console.log("\n");
    
        //Trouver un utilisateur similaire qui pose des questions sur les sujets où l'utilisateur repond
        // console.log("Utilisateurs similaires à 6309 qui posent des questions sur les sujets auxquels il repond :");
        // await answer_similarity(6309);
        // console.log("\n");

        //await insert_users(allUsers);
        

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }


//----------------------------------------------------------------------------------------------------------------------------------------------------------------

    async function compareSimilarityResultsForUser(userId){
        const similarityQueryList = [RATIO_SIMILARITY, COSINUS_SIMILARITY];
        for (let similarityQuery of similarityQueryList){
           await find_similar_user(userId, similarityQuery);
        }
    }

    async function insert_tags(allTags) {

        const session = driver.session({ database: 'neo4j' });
        try {

            for (let tag of allTags){
                
                const requete = `MERGE (t:Tag { title: $tag })`;
            
                const writeResult = await session.executeWrite(tx =>
                    tx.run(requete, { tag })
                );
                writeResult.records.forEach(record => {
                    console.log(`Found tag: ${record.get('tag')}`)
                });
            }
        } catch (error) {
            console.error(`Something went wrong, Tags could not be inserted : ${error}`);
        } finally {
            await session.close();
        }
    }


    async function insert_user(id) {

        const session = driver.session({ database: 'neo4j' });
        try {
            
            const requete = `MERGE (u:User { id: $id} )`;
        
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { id })
            );

            writeResult.records.forEach(record => {
                console.log(`Found user: ${record.get('id')}`)
            });
        
        } catch (error) {
            console.error(`Something went wrong, User could not be inserted : ${error}`);
        } finally {
            await session.close();
        }
    }

    /*
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
    */


    async function create_interact_link(idUser, tag, info){
        /*
        let pourcentageTag = info[0];
        let nbRelations = info[1];
        */
    
        
        const session = driver.session({ database: 'neo4j' });
    
        try {


            ratio = info.interact[tag] ? info.interact[tag] : 0;
            nbQ = info.question[tag] ? info.question[tag] : 0;
            nbA = info.answer[tag] ? info.answer[tag] : 0;

            const requete = `MATCH (u:User{id : $idUser}), (t:Tag {title : $tag})
                            MERGE (u)-[r:INTERACT]->(t)
                            SET r.ratio =  toFloat($ratio),
                            r.nbQuestions = toInteger($nbQ),
                            r.nbAnswers = toInteger($nbA)`;
                            /*,
                            r.nbInteractions = toInteger($nbRelations)`;*/
        
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { idUser, tag, info, nbQ, nbA, ratio})
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


    /*
    async function create_asked_link(user){

        let id = user.id
        let questions = user.question;
 
        const session = driver.session({ database: 'neo4j' });
     
         try {
 
             for (let tag in questions){
                 //console.log(tag);
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

    async function create_answered_link(user){
        
        let id = user.id
        let answer = user.answer;
 
        const session = driver.session({ database: 'neo4j' });
     
         try {
 
             for (let tag in answer){
                 //console.log(tag);
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
    */


    //permet d'inserer tous les utilisateurs, tous les tags, et de créer les relations
    async function insert_profils(allProfils) {

        const session = driver.session({ database: 'neo4j' });
        try {

            for(profilInfo of allProfils){

                const id = profilInfo.id;
                console.log(`Inserting ${id}...`);

                let allTags = [];
                for(let tag in profilInfo.interact){
                    allTags.push(tag);
                }
                                
                await insert_user(id);
                await insert_tags(allTags);
                /*
                await create_asked_link(profilInfo);
                await create_answered_link(profilInfo);
                */
                for (let tag of allTags){
                     await create_interact_link(id, tag, profilInfo);
                }
            
            }
            
        } catch (error) {
            console.error(`Something went wrong, profiles could not be inserted : ${error}`);
        } finally {
            await session.close();
        }
    }



    

    async function find_similar_user(idUser, query) {
        
        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = query;

            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            /* readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            }); */
            console.log(readResult.records + "\n");

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function cosinus_similarity(idUser) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = COSINUS_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            console.log(readResult.records);

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }


    async function question_similarity(idUser) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = QUESTION_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            console.log(readResult.records);

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }
    

    async function answer_similarity(idUser) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = ANSWER_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idUser })
            );

            console.log(readResult.records);

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }
})();




    

