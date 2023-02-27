var requete = require('./STOWrequests');
var profil = require('./calculateur');

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
const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
const user = 'neo4j';
const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


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

    ratio = info.interact[tag] ? info.interact[tag] : 0;
    nbQ = info.question[tag] ? info.question[tag] : 0;
    nbA = info.answer[tag] ? info.answer[tag] : 0;

    if (ratio > 0){
        
        try {

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
}

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


/*
{
  id: 6309,
  pseudo: 'VonC',
  avatar: 'https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1'
}
*/
async function add_name_and_picture(userInfo) {

    const id = userInfo.id;
    const pseudo = userInfo.pseudo;
    const avatar = userInfo.avatar;

    const session = driver.session({ database: 'neo4j' });
    try {

        const requete = `MERGE (u:User { id: toInteger($id)})
                         SET u.pseudo = $pseudo,
                             u.avatar = $avatar`;
    
        const writeResult = await session.executeWrite(tx =>
            tx.run(requete, { id, pseudo, avatar })
        );
        writeResult.records.forEach(record => {
            console.log(record);
            //console.log(`Found tag: ${record.get('tag')}`)
        });
        
    } catch (error) {
        console.error(`Something went wrong, Tags could not be inserted : ${error}`);
    } finally {
        await session.close();
    }
}


//------------ main pour tester les fonctions ---------------------
(async() => {

    try {
        
        const vonc = {
            id: 2756547,
            pseudo: 'Artem Bilan',
            avatar: 'https://www.gravatar.com/avatar/2158ce6e7c048277890eb64458864c1c?s=256&d=identicon&r=PG'                                                   
        };
        
        await add_name_and_picture(vonc);

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
})();
    