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
            const requete = `MATCH (u:User{idSTOW: $idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                                WITH u,t, count(h) as nbRelations
                                MATCH (u)-[]-()-[i]-()
                                RETURN u as utilisateur ,t as tags ,nbRelations, count(i) as alltags
                                ORDER BY nbRelations DESC
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

    async function getUserLastInteraction(idSTOW){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User{idSTOW:$idSTOW})-[i]-(q:Question)
                                WITH collect(i.dateInteraction) as lastInteraction , u
                                RETURN u,lastInteraction[0] ORDER BY lastInteraction`;
        
            const readResult = await session.executeRead(tx =>
                tx.run(requete, { idSTOW })
            );
            return readResult.records;
        }catch(error){
            console.error(`Erreur getUserLastInteraction : ${error}`);
        } finally {
            await session.close();
        }
    }


    //à remodifier quand tous les utilisateutrs auront des nom mail...
    async function getUserProficiency(idSTOW){

        var res = null;
        const data = await getUserTopTags(idSTOW);
        const lastInteraction = await getUserLastInteraction(idSTOW);

        if(data.lenght != 0){
            var users = [];
            var technos = [];
            
            var test = {
                idSTOW : data[0]._fields[0].properties.idSTOW.low,
                pseudo : data[0]._fields[0].properties.pseudo,
                avatar: data[0]._fields[0].properties.avatar,
                lastInteraction: lastInteraction[0]._fields[0].properties.lastInteraction.low
            }
            //console.log("User : ", test);
            users.push(test)
            data.map( (elem) => {
                var title = {
                    techno: elem._fields[1].properties.title,
                    ratio: elem._fields[2].low/elem._fields[3].low
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
            const requete = `MATCH (u:User)-[i]-()-[]-(t:Tag)
                             WITH count(i) AS interactions, t AS topTags
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
                                WHERE (u)--()
                                RETURN COUNT(u) as nbActive`;
                            
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
            const requete = `MATCH (u:User)-[a:ASKED]-()
                             RETURN count(a) as nbQuestions`;
        
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
            const requete = `MATCH (u:User)-[a:ANSWERED]-()
                             RETURN count(a) as nbAnswers`;
        
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
            const requete = `MATCH (u:User)-[a:ANSWERED]-()
                                WITH count (a) as nbAnswered
                                MATCH (u:User)-[a:ASKED]-()
                                WITH nbAnswered, count(a) as nbAsked
                                RETURN (nbAnswered + nbAsked) as interactions`;
        
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
            const requete = `MATCH (u:User)-[i]-()-[]-(t:Tag)
                             WITH COUNT( DISTINCT u) AS nbUsers, t AS tag
                             RETURN tag, nbUsers
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
                             WHERE u.name IS NOT NULL                           
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

    async function getTagAdmin(idSTOW){

        const session = driver.session({ database: 'neo4j' });

        try{
            // Il faudra penser à changer id par idSTOW quand on refera la bdd
            const requete = `MATCH(u:User{idSTOW: $idSTOW})-[i:INTERACT]-(t:Tag)
                                WITH i.ratio as topTags, t, u 
                                RETURN t ORDER BY topTags DESC
                                LIMIT 1`;
        
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

    async function getInteractionDates(type){

        // type est soit ANSWERED ou ASKED

        if(type == "ANSWERED" || type == "ASKED"){
            const session = driver.session({ database: 'neo4j' });

            try{
                const requete = `MATCH (u:User)-[i:${type}]-(q:Question)
                RETURN i.dateInteraction as dates`;
            
                const readResult =  await session.executeRead(tx =>
                    tx.run(requete)
                );
                return readResult.records;
    
            }catch(error){
                console.error(`[ getInteractionDates ] Something went wrong :  ${error}`);
            } finally {
                await session.close();
            }
        }
        else{
            console.log(`[ getInteractionDates ] Something went wrong : bad parameters.`)
        }
    }

    async function getUsersWhoInteractedWithMe(myIdSTOW){
        
        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u1:User { idSTOW: $myIdSTOW })--(q:Question)--(u2:User)
            WHERE u1 <> u2
            RETURN u2 AS InteractedWith`;

            const readResult =  await session.executeRead(tx =>
                tx.run(requete, {myIdSTOW})
            );
            return readResult.records;

        }catch(error){
            console.error(`[ getUsersWhoInteractedWithMe ] Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getUsersSortedByLastInteraction(DESC = ""){
        // mettre "DESC" en paramètre si on veut classer de manière décroissante
        // Les différents types disponnible pour TypeSort

        const session = driver.session({ database: 'neo4j' });
        
        try{

            const requete = `MATCH (u:User)-[i]-(q:Question)
                            UNWIND i.dateInteraction AS dates
                            WITH u, max(dates) AS date
                            RETURN u
                            ORDER BY date ${DESC}`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
                );
            return readResult.records;

        }catch(error){
            console.error(`[ getUsersSortedByLastInteraction ] Something went wrong :  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbNodes(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u) RETURN COUNT(u) as nbNodes`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbNodes ]:  ${error}`);
        } finally {
            await session.close();
        }
    }

    async function getNbRelations(){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH ()-[i]-() RETURN count( DISTINCT i) as nbRelations`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete)
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getNbRelations ]:  ${error}`);
        } finally {
            await session.close();
        }
    }


    async function getInteractionDatesUser(idSTOW){

        const session = driver.session({ database: 'neo4j' });

        try{
            const requete = `MATCH (u:User {idSTOW:$idSTOW})-[r]-(q)
                             RETURN r.dateInteraction`;
        
            const readResult =  await session.executeRead(tx =>
                tx.run(requete, {idSTOW})
            );
            return readResult.records;
        }catch(error){
            console.error(`Something went wrong [ getInteractionDatesUser ]:  ${error}`);
        } finally {
            await session.close();
        }
    }



(async()=>{

    try {
        
        // const oui = await getUsersSorted("surname", "DESC");
    
        // console.log(oui[0]._fields[0].properties);
        // //console.log(oui);

        // const non = await getInteractionDates("ASKED");
        // const oui = await getInteractionDates("ANSWERED");

        // console.log(non);
        // console.log(oui[1]._fields[0]);
    
        const oui = await getInteractionDatesUser(7297700);
    
        console.log(oui[1]._fields[0].low);
        //console.log(oui);

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
    // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
})();


module.exports = {
    createUser, connectUser, getUserTopTags, getUserProficiency, getNbTags, getNbUsers, getTopTags, getUsers,
    getUsersSorted, getNbOfActiveUsers, getNbQuestions, getNbAnswers, getNbInteractions, getTagsWithMostUsers, getTagAdmin,
    getInteractionDates, getUsersWhoInteractedWithMe, getUsersSortedByLastInteraction, getNbNodes, getNbRelations,
    getInteractionDatesUser
}
