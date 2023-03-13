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


//(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

//----------------------------------------------- MAIN ----------------------------------------------------------------------------------------------
    /*
    try {

        const logan = {
            "name": "Logan",
            "surname": "LeG",
            "mail": "leLleG@gmail.com",
            "password": "blablabla",
            "idSTOW": 8965,
        };
        await createUser(logan);


    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
    */
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


    async function createUser(member){

        /*
        const user ={
            "name": ,
            "surname":,
            "mail":,
            "idSTOW":,
            };
        */
        const name = member.name;
        const surname = member.surname;
        const mail = member.mail;
        const idSTOW = member.idSTOW;
       
        const session = driver.session({ database: 'neo4j' });

        try {

            const requete = `MERGE (u:User { name: $name, surname: $surname, mail: $mail, idSTOW: toInteger($idSTOW) })`;
        
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { name, surname, mail, idSTOW })
            );
            /*
            writeResult.records.forEach(record => {
                console.log(`Found user: ${record.get('u')}`)
            });
            */
            
        } catch (error) {
            console.error(`Something went wrong, User could not be inserted : ${error}`);
        } finally {
            await session.close();
        }
    }

    async function connectUser(idSTOW){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `Match (u:User{idSTOW: $idSTOW})
            return u`;
        
            const readResult = await session.executeRead(tx =>
                tx.run(requete, { idSTOW})
            );
            /*
            readResult.records.forEach(record => {
                console.log(`Found user: ${record.get('u')}`);
            });
            */
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong, wrong mail or password : ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getUserTopTags(idSTOW){

        const session = driver.session({ database: 'neo4j' });

        try{
            // Il faudra penser à changer id par idSTOW quand on refera la bdd
            const requete = `MATCH(u:User{idSTOW: $idSTOW})-[i:INTERACT]-(t:Tag)
                                WITH i.ratio as topTags, t, u 
                                RETURN u, t, topTags ORDER BY topTags DESC
                                LIMIT 5`;
        
            const readResult = await session.executeRead(tx =>
                tx.run(requete, { idSTOW })
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong, wrong mail or password : ${error}`);
        } finally {
            await session.close();
        }
    }
//})();

    //à remodifier quand tous les utilisateutrs auront des nom mail...
    async function getUserProficiency(idSTOW){

        var res = null;
        const data = await getUserTopTags(idSTOW);

        if(data.lenght != 0){

            var users = [];
            var technos = [];
            var test = {
                idSTOW : idSTOW,
                pseudo : data[0]._fields[0].properties.pseudo,
                avatar: data[0]._fields[0].properties.avatar
            }
            users.push(test)
            data.map( (elem) => {
                var title = {
                    techno: elem._fields[1].properties.title,
                    ratio: elem._fields[2]
                };
                technos.push(title);
            });

            users.push(technos)

            res = users;
        }
        return res;
    }

    async function getNbUsers(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH(u:User)
                             RETURN count(u) as nbUsers`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbTags(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH(t:Tag)                            
                             RETURN count(t) as nbTags`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getTopTags(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User)-[i:INTERACT]-(t:Tag)
                             WITH sum(i.nbQuestions + i.nbAnswers) AS interactions, t AS topTags
                             RETURN topTags, interactions
                             ORDER BY interactions DESC
                             LIMIT 5`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getTopTags ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbOfActiveUsers(){
        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User)
                             WHERE  u.lastInteraction <> -1
                             WITH COUNT(u) AS nbActive
                             RETURN nbActive`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbOfActiveUsers ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbQuestions(){
        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User)-[i:INTERACT]-(t:Tag)
                             WITH sum(i.nbQuestions) AS nbQuestions
                             RETURN nbQuestions`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbQuestions ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbAnswers(){
        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User)-[i:INTERACT]-(t:Tag)
                             WITH sum(i.nbQuestions) AS nbQuestions
                             RETURN nbQuestions`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbAnswers ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    

    async function getNbInteractions(){
        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User)-[i:INTERACT]-(t:Tag)
                            WITH sum(i.nbQuestions) AS questions, sum(i.nbAnswers) AS answers
                            RETURN (questions + answers) AS interactions`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbInteractions ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getTagsWithMostUsers(){
        const session = driver.session({ database: 'neo4j' });
    
        try{
            const requete = `MATCH (u:User)-[i:INTERACT]-(t:Tag)
                             WITH COUNT(i) AS nbUsers, t AS tag
                             RETURN nbUsers, tag
                             ORDER BY nbUsers DESC
                             LIMIT 5`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getTagsWithMostUsers ]:  ${error}`);
        } finally {
            await session.close();
        }
    }



    async function getUsers(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH(u:User)                             
                             RETURN u`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;

        }catch(error){
            console.error(`[ getUsers ] Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }



    /**
    * @param ATTRIBUTE String, "lastInteraction", "name" or "surname", "name" by default
    * @param DESC String, "DESC" or nothing
    */
    async function getUsersSorted(ATTRIBUTE, DESC = ""){
        // mettre "DESC" en paramètre si on veut classer de manière décroissante
        // Les différents types disponnible pour TypeSort


        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH(u:User)                             
            WHERE u.${ATTRIBUTE} IS NOT NULL
            RETURN u
            ORDER BY u.${ATTRIBUTE} ${DESC}`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;

        }catch(error){
            console.error(`[ getUsersByLastActivity ] Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }


    
module.exports = {
    createUser, connectUser, getUserTopTags, getUserProficiency, getNbTags, getNbUsers, getTopTags, getUsers,
    getUsersSorted, getNbOfActiveUsers, getNbQuestions, getNbAnswers, getNbInteractions
};

/*
(async()=>{

    try {
    
        const oui = await getUsersSorted("surname", "DESC");
    
        console.log(oui[0]._fields[0].properties);
        //console.log(oui);

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
    // Don't forget to close the driver connection when you're finished with it.
    await driver.close();
    }
})();
*/






