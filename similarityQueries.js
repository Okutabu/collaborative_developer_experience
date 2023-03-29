// COSINUS SIMILARITY


// La similarité de cosinus est une mesure de similarité qui mesure la similarité entre deux vecteurs d'objets, Dans ce cas ci, 
// les vecteurs sont les tags d'un utilisateur.
const COSINUS_SIMILARITY = `MATCH (u:User{idSTOW:$idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                            WITH u,t, count(h) as data1
                            MATCH (u2:User)-[]-()-[h2:HAS_TOPIC]-(t)
                            WHERE u2.idSTOW <> $idSTOW
                            WITH u, u2, t, data1, count(h2) as data2
                            MATCH (u)-[]-()-[i]-()
                            WITH u, u2, t, toFloat(data1) as data1, toFloat(data2) as data2, count(i) as alltagsU1
                            MATCH (u2)-[]-()-[i]-()
                            WITH u, u2, t, data1, data2, alltagsU1,count(i) as alltagsU2
                            WITH SUM(alltagsU1/data1 * alltagsU2/data2) AS data1data2Product,
                            SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(alltagsU1/data1)| data1Dot + a^2)) AS data1Length,
                            SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(alltagsU2/data2)| data2Dot + b^2)) AS data2Length,
                            u, u2, data1, data2, alltagsU1, alltagsU2
                            RETURN DISTINCT u2, data1data2Product / (data1Length * data2Length) AS similarite
                            ORDER BY similarite DESC
                            LIMIT 5`;


//  COSINUS SIMILARITY
// POURCENTAGE D'INTERACTION AVEC LES TAGS
const RATIO_SIMILARITY = `MATCH (u:User{idSTOW:$idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                            WITH u,t, count(h) as data1
                            MATCH (u2:User)-[]-()-[h2:HAS_TOPIC]-(t)
                            WHERE u2.idSTOW <> $idSTOW
                            WITH u, u2, t, data1, count(h2) as data2
                            MATCH (u)-[]-()-[i]-()
                            WITH u, u2, t, toFloat(data1) as data1, toFloat(data2) as data2, count(i) as alltagsU1
                            MATCH (u2)-[]-()-[i]-()
                            WITH u, u2, t, data1, data2, alltagsU1,count(i) as alltagsU2
                            WHERE alltagsU1/data1 > 10 AND alltagsU2/data2 > 10
                            RETURN alltagsU1/data1 AS PoidsU1, u2, alltagsU2/data2 AS PoidsU2, t.title AS Tag
                            ORDER BY PoidsU1 + PoidsU2 DESC
                            LIMIT 5`;




//ANSWER_SIMILARITY
//Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags)
// puis récupère les utilisateurs qui posent des questions sur les sujets auxquels l'utilisateur principal répond
const ANSWER_SIMILARITY = `MATCH (u:User{idSTOW:$idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                            WITH u,t, count(h) as data1
                            MATCH (u2:User)-[]-()-[h2:HAS_TOPIC]-(t)
                            WHERE u2.idSTOW <> $idSTOW
                            WITH u, u2, t, data1, count(h2) as data2
                            MATCH (u)-[]-()-[i1]-()
                            WITH u, u2, t, toFloat(data1) as data1, toFloat(data2) as data2, count(i1) as alltagsU1
                            MATCH (u2)-[]-()-[i2]-()
                            WITH u, u2, t, data1, data2, alltagsU1,count(i2) as alltagsU2
                            WITH SUM(alltagsU1/data1 * alltagsU2/data2) AS data1data2Product,
                            SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(alltagsU1/data1)| data1Dot + a^2)) AS data1Length,
                            SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(alltagsU2/data2)| data2Dot + b^2)) AS data2Length,
                            u, u2, t
                            WHERE data1data2Product / (data1Length * data2Length) > 0.2
                            MATCH (u)-[a:ANSWERED]-()-[h:HAS_TOPIC]-(t)
                            WITH u,t, count(DISTINCT h) as nbAnswered
                            MATCH (u2:User)-[a2:ASKED]-()-[h2:HAS_TOPIC]-(t)
                            WHERE u2.idSTOW <> u.idSTOW
                            WITH u, u2, t, nbAnswered, count(h2) as nbAsked
                            RETURN DISTINCT u,u2,t.title, nbAnswered, nbAsked
                            ORDER BY (nbAsked+nbAnswered)  DESC
                            LIMIT 5`;




//QUESTION_SIMILARITY
//Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags)
// puis récupère les utilisateurs qui répondent aux questions sur le sujet sur lequel l'utilisateur principal pose des questions

const QUESTION_SIMILARITY = `MATCH (u:User{idSTOW:$idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                                WITH u,t, count(h) as data1
                                MATCH (u2:User)-[]-()-[h2:HAS_TOPIC]-(t)
                                WHERE u2.idSTOW <> $idSTOW
                                WITH u, u2, t, data1, count(h2) as data2
                                MATCH (u)-[]-()-[i1]-()
                                WITH u, u2, t, toFloat(data1) as data1, toFloat(data2) as data2, count(i1) as alltagsU1
                                MATCH (u2)-[]-()-[i2]-()
                                WITH u, u2, t, data1, data2, alltagsU1,count(i2) as alltagsU2
                                WITH SUM(alltagsU1/data1 * alltagsU2/data2) AS data1data2Product,
                                SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(alltagsU1/data1)| data1Dot + a^2)) AS data1Length,
                                SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(alltagsU2/data2)| data2Dot + b^2)) AS data2Length,
                                u, u2, t
                                WHERE data1data2Product / (data1Length * data2Length) > 0.2
                                MATCH (u)-[a:ASKED]-()-[h:HAS_TOPIC]-(t)
                                WITH u,t, count(DISTINCT h) as nbAsked
                                MATCH (u2:User)-[a2:ANSWERED]-()-[h2:HAS_TOPIC]-(t)
                                WHERE u2.idSTOW <> u.idSTOW
                                WITH u, u2, t, nbAsked, count(h2) as nbAnswered
                                RETURN DISTINCT u,u2,t.title, nbAsked, nbAnswered
                                ORDER BY (nbAsked+nbAnswered)  DESC
                                LIMIT 5`;


//TOP_QUESTIONS_REQUEST
//Récupère les tags sur lesquels l'utilisateur a répondu à des questions.
//Renvoi les 3 tops tags

const TOP_QUESTIONS_REQUEST = `MATCH (u:User{idSTOW: $idUser})-[i:INTERACT]->(t:Tag)
                                RETURN u.id as utilisateur, t.title as tag, toFloat(i.nbQuestions) as nbQuestions
                                ORDER BY nbQuestions DESC
                                LIMIT 3`;


//TOP_ANSWERS_REQUEST
//Récupère les tags sur lesquels l'utilisateur a posé  des questions.
//Renvoi les 3 tops tags

const TOP_ANSWERS_REQUEST = `MATCH (u:User{idSTOW: $idUser})-[i:INTERACT]->(t:Tag)
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

    async function find_similar_user(idSTOW, query) {
        
        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = query;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idSTOW })
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

    async function cosinus_similarity(idSTOW) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = COSINUS_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idSTOW })
            );
            
            return readResult.records;

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }


    async function question_similarity(idSTOW) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = QUESTION_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idSTOW })
            );

            return readResult.records;

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }
    

    async function answer_similarity(idSTOW) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = ANSWER_SIMILARITY;

            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { idSTOW })
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
    cosinus_similarity, question_similarity, answer_similarity
};