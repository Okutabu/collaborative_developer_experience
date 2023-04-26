var requete = require('./STOWrequests');
var profil = require('./calculateur');

//let allTags = requete.get_users_tags("1673130000","1673136000")
//console.log(allTags);
//let allUsers = requete.get_all_users();
//console.log(allUsers);
/*
const user63 =  
{
            "id": 12345,
            "activities": [
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                },
                {
                    "typePost": "answer",
                    "idQuestion": 75131252,
                    "dateInteraction": 1673848584,
                    "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                }
            ]
        }
*/
const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
const user = 'neo4j';
const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


async function insert_tags(allTags) {

    const session = driver.session({ database: 'neo4j' });
    try {

        for (let tag of allTags) {

            //console.log(`Inserting Tag : ${tag}`);
            console.log(`[ Inserting tag ] : ${tag}`);

            const requete = `MERGE (t:Tag { title: $tag })`;

            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { tag })
            );
            // writeResult.records.forEach(record => {
            //     console.log(`Found tag: ${record.get('tag')}`)
            // });
        }
    } catch (error) {
        console.error(`Error function insert_tag : ${error}`);
    } finally {
        await session.close();
    }
}

/*
async function insert_user(id) {

    const session = driver.session({ database: 'neo4j' });
    try {
        
        const requete = `MERGE (u:User { idSTOW: $id} )`;
    
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { id })
        );

        writeResult.records.forEach(record => {
            console.log(`Found user: ${record.get('id')}`)
        });
    
    } catch (error) {
        console.error(`Erreur function insert_user : ${error}`);
    } finally {
        await session.close();
    }
}
*/


async function insert_users(allUsers) {

    const session = driver.session({ database: 'neo4j' });

    try {
        for (let userInfo of allUsers) {

            //console.log(`Inserting User : ${userInfo}`);
            console.log(`[ Inserting user ] : ${userInfo}`);

            const requete = `MERGE (u:User { idSTOW: toInteger($userInfo)} )`;

            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { userInfo })
            );

            // writeResult.records.forEach(record => {
            //     console.log(`Found user: ${record.get('user')}`)
            // });
        }
    } catch (error) {
        console.error(`Erreur function insert_users : ${error}`);
    } finally {
        await session.close();
    }
}

async function insert_questions(allQuestions) {

    const session = driver.session({ database: 'neo4j' });

    try {
        for (let i = 0; i < allQuestions.length; i++ ) {

            let id = allQuestions[i].idQuestion;
            let title = allQuestions[i].title;

            //console.log(`Inserting Question : ${question}`);
            console.log(`[ Inserting question ] : ${id}`);

            if (question != undefined) {
                const requete = `MERGE (q:Question { idQuestion: toInteger($id), title:$title } )`;

                const writeResult = await session.executeWrite(tx =>
                    tx.run(requete, { id, title })
                );

                // writeResult.records.forEach(record => {
                //     console.log(`Found user: ${record.get('Question')}`)
                // });
            }
        }
    } catch (error) {
        console.error(`Erreur function insert_questions : ${error}`);
    } finally {
        await session.close();
    }
}

/*
async function create_interact_link(idUser, tag, info) {
    
    // let pourcentageTag = info[0];
    // let nbRelations = info[1];

    const session = driver.session({ database: 'neo4j' });

    ratio = info.interact[tag] ? info.interact[tag] : 0;
    nbQ = info.question[tag] ? info.question[tag] : 0;
    nbA = info.answer[tag] ? info.answer[tag] : 0;

    if (ratio > 0) {

        try {

            const requete = `MATCH (u:User{idSTOW : $idUser}), (t:Tag {title : $tag})
                            MERGE (u)-[r:INTERACT]->(t)
                            SET r.ratio =  toFloat($ratio),
                            r.nbQuestions = toInteger($nbQ),
                            r.nbAnswers = toInteger($nbA)`;
            
            //r.nbInteractions = toInteger($nbRelations)`;

            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { idUser, tag, info, nbQ, nbA, ratio })
            );
            // writeResult.records.forEach(record => {
            //     console.log(`Found user: ${record.get('user')}`)
            // });

        } catch (error) {
            console.error(`Erreur function create_interact_link : ${error}`);
        } finally {
            await session.close();
        }
    }
}
*/

async function create_answered_link(idUser, idQuestion, date){

    const session = driver.session({ database: 'neo4j' });
    try {
        //console.log(`Creating link : (:User {idSTOW: ${idUser}})-[:ANSWERED]->(:Question {idQuestion: ${idQuestion}})`);
        const requete =  `MATCH (u:User {idSTOW:$idUser}), (q:Question {idQuestion: $idQuestion})
                          MERGE (u)-[a:ANSWERED]->(q)
                          SET a.dateInteraction = toInteger($date)`;
    
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { idUser, idQuestion, date })
        );

        // writeResult.records.forEach(record => {
        //     console.log(`Found user: ${record.get('id')}`)
        // });
    
    } catch (error) {
        console.error(`Erreur function create_answered_link : ${error}`);
    } finally {
        await session.close();
    }
}

async function create_asked_link(idUser, idQuestion, date){

    const session = driver.session({ database: 'neo4j' });
    try {
        //console.log(`Creating link : (:User {idSTOW: ${idUser}})-[:ASKED]->(:Question {idQuestion: ${idQuestion}})`);
        const requete =  `MATCH (u:User {idSTOW:$idUser}), (q:Question {idQuestion: $idQuestion})
                          MERGE (u)-[a:ASKED]->(q)
                          SET a.dateInteraction = toInteger($date)`;
    
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { idUser, idQuestion, date })
        );

        // writeResult.records.forEach(record => {
        //     console.log(`Found user: ${record.get('id')}`)
        // });
    
    } catch (error) {
        console.error(`Erreur function create_asked_link : ${error}`);
    } finally {
        await session.close();
    }
}

async function create_has_topic_link(tags, idQuestion){
    const session = driver.session({ database: 'neo4j' });
    try {
        
        for( let tag of tags){
            console.log(`Creating link : (:Tag {title: ${tag}})-[:HAS_TOPIC]->(:Question {idQuestion: ${idQuestion}})`);
            const requete =  `MATCH (q:Question {idQuestion: $idQuestion}), (t:Tag {title: $tag})
                              MERGE (q)-[h:HAS_TOPIC]->(t)`;
    
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { idQuestion, tag })
            );

            // writeResult.records.forEach(record => {
            //     console.log(`Found user: ${record.get('id')}`)
            // });
        }
    } catch (error) {
        console.error(`Erreur function create_has_topic_link : ${error}`);
    } finally {
        await session.close();
    }
}


/*
//permet d'inserer tous les utilisateurs, tous les tags, et de créer les relations
async function insert_profils(allProfils) {

    const session = driver.session({ database: 'neo4j' });
    try {

        for(profilInfo of allProfils){
            const id = profilInfo.idSTOW;
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
            
            for (let tag of allTags){
                await create_interact_link(id, tag, profilInfo);
            }
        
        }
        
    } catch (error) {
        console.error(`Erreur function insert_profils : ${error}`);
    } finally {
        await session.close();
    }
}
*/

//permet d'inserer tous les utilisateurs, tous les tags, et de créer les relations
async function insert_nodes_user_question_tag(allProfils) {

    const session = driver.session({ database: 'neo4j' });

    try {
        
        await insert_questions(allProfils.questions);
        await insert_tags(allProfils.tags);
        await insert_users(allProfils.ids);

    } catch (error) {
        console.error(`Erreur function insert_nodes_user_question_tag : ${error}`);
    } finally {
        await session.close();
    }
}
/*
{
  id: 6309,
  pseudo: 'VonC',
  avatar: 'https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1'
}
*/
async function add_name_picture_lastInteraction(userInfo) {

    const id = userInfo.idSTOW;
    const pseudo = userInfo.pseudo;
    const avatar = userInfo.avatar;
    const lastInteraction = userInfo.lastInteraction;

    const session = driver.session({ database: 'neo4j' });

    try {

        const requete = `MATCH (u:User { idSTOW: toInteger($id)})
                         SET u.pseudo = $pseudo,
                             u.avatar = $avatar`;

        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { id, pseudo, avatar, lastInteraction })
        );
        /*
        writeResult.records.forEach(record => {
            console.log(record);
            //console.log(`Found tag: ${record.get('tag')}`)
        });
        */

    } catch (error) {
        console.error(`Error function add_name_and_picture : ${error}`);
    } finally {
        await session.close();
    }
}

async function add_all_names_pictures_lastInteractions(usersInfo) {

    const session = driver.session({ database: 'neo4j' });

    try {

        for (info of usersInfo) {
            console.log(`Inserting user : ${info.idSTOW}`)
            await add_name_picture_lastInteraction(info);
        }

    } catch (error) {
        console.error(`Error add_all_names_and_pictures : ${error}`);
    } finally {
        await session.close();
    }
}

async function set_name_surname_mail(id, objUser){

    const session = driver.session({ database: 'neo4j' });

    const mail = objUser.mail;
    const name = objUser.name;
    const surname = objUser.surname;

    try {

        console.log(`Adding Name Surname and Mail to user : ${id}`);
        
        const requete = `MATCH (u:User { idSTOW: $id})
                         SET u.mail = $mail,
                             u.name = $name,
                             u.surname = $surname`;

        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { id, mail, name, surname })
        );


    } catch (error) {
        console.error(`Error set_name_surname_mai : ${error}`);
    } finally {
        await session.close();
    }
}

async function setTopTag(idSTOW){

    const session = driver.session({ database: 'neo4j' });
    try {
        const requete =  `MATCH(u:User{idSTOW: $idSTOW})-[i]-(q)-[h]-(t:Tag)
                            WITH count(h) as topTags, u, t 
                            ORDER BY count(h) DESC LIMIT 1
                            set u.topTag = t.title`;
    
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { idSTOW })
        );
    
    } catch (error) {
        console.error(`Erreur function create_answered_link : ${error}`);
    } finally {
        await session.close();
    }
}

async function setAllTopTags(allUsers) {

    const session = driver.session({ database: 'neo4j' });

    try {

        for (let id of allUsers) {
            await setTopTag(id);
        }

    } catch (error) {
        console.error(`Error add_all_names_and_pictures : ${error}`);
    } finally {
        await session.close();
    }
}

async function setLastInteraction(idSTOW){

    const session = driver.session({ database: 'neo4j' });
    try {
        const requete =  `MATCH (u:User{idSTOW:$idSTOW})-[i]-(q:Question)
                            WITH collect(i.dateInteraction) as lastInteraction , u ORDER BY lastInteraction
                            set u.lastInteraction = lastInteraction[0]`;
                        
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { idSTOW })
        );
    
    } catch (error) {
        console.error(`Erreur function create_answered_link : ${error}`);
    } finally {
        await session.close();
    }
}

async function setAllInteractions(allUsers) {

    const session = driver.session({ database: 'neo4j' });

    try {

        for (let id of allUsers) {
            await setLastInteraction(id);
        }

    } catch (error) {
        console.error(`Error add_all_names_and_pictures : ${error}`);
    } finally {
        await session.close();
    }
}

//------------ main pour tester les fonctions ---------------------
// (async() => {

//     try {
        
//         let user = { name: 'Jesse', surname: 'Perry', mail: 'Jesse.Perry@email.com' };
        
//         await set_name_surname_mail(6309, user);

//     } catch (error) {
//         console.error(`Something went wrong: ${error}`);
//     } finally {
//         // Don't forget to close the driver connection when you're finished with it.
//         await driver.close();
//     }
// })();
/*

REQUETE IMPORTANTE POUR LA GESTION DES TAGS DE L'UTILISATEUR----------

match (u:User)-[i:INTERACT]-(t:Tag)
with u, t order by (i.nbQuestions + i.nbAnswers) desc
with t.title as tag,collect(u) as user
return tag, user[0..1]
*/

module.exports = {
    driver, add_all_names_pictures_lastInteractions, insert_users, insert_nodes_user_question_tag,
    create_asked_link, create_has_topic_link, create_answered_link, set_name_surname_mail, setAllTopTags, setAllInteractions
}
