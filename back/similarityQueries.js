// COSINUS SIMILARITY


// La similarité de cosinus est une mesure de similarité qui mesure la similarité entre deux vecteurs d'objets, Dans ce cas ci, 
// les vecteurs sont les tags d'un utilisateur.
const COSINUS_SIMILARITY = `MATCH (user1:User {id:$idUser})-[data1:INTERACT]->(t:Tag)<-[data2:INTERACT]-(user2:User)
                            WHERE data1.ratio > 5 and data2.ratio > 5
                            WITH SUM(data1.ratio * data2.ratio) AS data1data2Product,
                            SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(data1.ratio)| data1Dot + a^2)) AS data1Length,
                            SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(data2.ratio)| data2Dot + b^2)) AS data2Length,
                            user1, user2
                            RETURN user2, data1data2Product / (data1Length * data2Length) AS similarite
                            ORDER BY similarite DESC
                            LIMIT 5`;


//  COSINUS SIMILARITY
// POURCENTAGE D'INTERACTION AVEC LES TAGS
const RATIO_SIMILARITY = `MATCH (user1:User {id:$idUser})-[r1:INTERACT]->(t:Tag)<-[r2:INTERACT]-(user2)
                            WHERE r1.ratio > 10 AND r2.ratio > 10
                            RETURN r1.ratio AS PoidsU1, user2, r2.ratio AS PoidsU2, t.title AS Tag
                            ORDER BY PoidsU1 + PoidsU2 DESC
                            LIMIT 5`;




//ANSWER_SIMILARITY
//Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags)
// puis récupère les utilisateurs qui posent des questions sur les sujets auxquels l'utilisateur principal répond
const ANSWER_SIMILARITY = `MATCH (user1:User {id:$idUser})-[data1:INTERACT]->(t:Tag)<-[data2:INTERACT]-(user2:User)
                            WHERE data1.ratio > 5 and data2.ratio > 5
                            WITH SUM(data1.ratio * data2.ratio) AS data1data2Product,
                            SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(data1.ratio)| data1Dot + a^2)) AS data1Length,
                            SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(data2.ratio)| data2Dot + b^2)) AS data2Length,
                            user1, user2
                            MATCH (user1)-[i:INTERACT]->(t2:Tag)<-[i2:INTERACT]-(user2)
                            WHERE i.nbAnswers > 5 AND i2.nbQuestions > 5 AND data1data2Product / (data1Length * data2Length) > 0.5
                            RETURN DISTINCT user2, data1data2Product / (data1Length * data2Length) AS similarite
                            ORDER BY similarite DESC
                            LIMIT 5`;




//QUESTION_SIMILARITY
//Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags)
// puis récupère les utilisateurs qui répondent aux questions sur le sujet sur lequel l'utilisateur principal pose des questions

const QUESTION_SIMILARITY = `MATCH (user1:User {id:$idUser})-[data1:INTERACT]->(t:Tag)<-[data2:INTERACT]-(user2:User)
                                WHERE data1.ratio > 5 and data2.ratio > 5
                                WITH SUM(data1.ratio * data2.ratio) AS data1data2Product,
                                SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(data1.ratio)| data1Dot + a^2)) AS data1Length,
                                SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(data2.ratio)| data2Dot + b^2)) AS data2Length,
                                user1, user2
                                MATCH (user1)-[i:INTERACT]->(t2:Tag)<-[i2:INTERACT]-(user2)
                                WHERE i.nbQuestions > 5 AND i2.nbAnswers > 5 AND data1data2Product / (data1Length * data2Length) > 0.5
                                RETURN DISTINCT user2, data1data2Product / (data1Length * data2Length) AS similarite
                                ORDER BY similarite DESC
                                LIMIT 5`;


//TOP_QUESTIONS_REQUEST
//Récupère les tags sur lesquels l'utilisateur a répondu à des questions.
//Renvoi les 3 tops tags

const TOP_QUESTIONS_REQUEST = `MATCH (u:User{id: $idUser})-[i:INTERACT]->(t:Tag)
                                RETURN u.id as utilisateur, t.title as tag, toFloat(i.nbQuestions) as nbQuestions
                                ORDER BY nbQuestions DESC
                                LIMIT 3`;


//TOP_ANSWERS_REQUEST
//Récupère les tags sur lesquels l'utilisateur a posé  des questions.
//Renvoi les 3 tops tags

const TOP_ANSWERS_REQUEST = `MATCH (u:User{id: $idUser})-[i:INTERACT]->(t:Tag)
                                RETURN u.id as utilisateur, t.title as tag, toFloat(i.nbAnswers) as nbAnswers
                                ORDER BY nbAnswers DESC
                                LIMIT 3`;

//(async() => {

    //connexion à auraDB
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


//----------------------------------------------- MAIN ----------------------------------------------------------------------------------------------    
    /*
    try {    

        //compareSimilarityResultsForUser(6309);
        //compareSimilarityResultsForUser(65387);
        //find_similar_user(6309, COSINUS_SIMILARITY);

        //Cosinus fonctionnel seulement en fonction des interactions
        // console.log("Utilisateurs similaires à 6309 avec la similarité de cosinus :");
        //await cosinus_similarity(6309);
        // console.log("\n");

        //Trouver un utilisateur similaire qui repond à des questions sur un sujets où l'on pose de questions
        // console.log("Utilisateurs similaires à 6309 qui repondent aux mêmes sujets que les questions qu'il pose :");
        // await question_similarity(6309);
        // console.log("\n");
    
        //Trouver un utilisateur similaire qui pose des questions sur les sujets où l'utilisateur repond
        // console.log("Utilisateurs similaires à 6309 qui posent des questions sur les sujets auxquels il repond :");
        // await answer_similarity(6309);
        // console.log("\n");

        //Trouve les tops tags des questions d'un utilisateur
        console.log("Les 3 tops tags sur lesquels l'utilisateur pose des questions : ");
        await topTagQuestions(633440);
        console.log("\n");


        //Trouve les tops tags des réponses d'un utilisateur
        console.log("Les 3 tops tags sur lesquels l'utilisateur répond : ");
        await topTagAnswers(6309);
        console.log("\n");


        //await insert_users(allUsers);
        

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }
    */
//---------------------------------------------------------------------------------------------------------------------------------------------

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
            return readResult.records;
           
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
            
            return readResult.records;

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

            return readResult.records;

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

            return readResult.records;

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function compareSimilarityResultsForUser(userId){
        const similarityQueryList = [RATIO_SIMILARITY, COSINUS_SIMILARITY];
        for (let similarityQuery of similarityQueryList){
           await find_similar_user(userId, similarityQuery);
        }
    }


    async function topTagQuestions(idUser) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = TOP_QUESTIONS_REQUEST;

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


    async function topTagAnswers(idUser) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = TOP_ANSWERS_REQUEST;

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

//})();


module.exports = {
    cosinus_similarity, answer_similarity, question_similarity
};