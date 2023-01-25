// COSINUS SIMILARITY

/*
La similarité de cosinus est une mesure de similarité qui mesure la similarité entre deux vecteurs d'objets, Dans ce cas ci, les vecteurs sont les tags d'un utilisateur.
*/ 

const COSINUS_SIMILARITY = `MATCH (user1:User {id:$idUser})-[data1:INTERACT]->(t:Tag)<-[data2:INTERACT]-(user2:User)
                            WHERE data1.ratio > 5 and data2.ratio > 5
                            WITH SUM(data1.ratio * data2.ratio) AS data1data2Product,
                            SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(data1.ratio)| data1Dot + a^2)) AS data1Length,
                            SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(data2.ratio)| data2Dot + b^2)) AS data2Length,
                            user1, user2
                            RETURN user1.id AS User1, user2.id AS User2, data1data2Product / (data1Length * data2Length) AS similarite
                            ORDER BY similarite DESC
                            LIMIT 5`;

exports.COSINUS_SIMILARITY = COSINUS_SIMILARITY;

//  COSINUS SIMILARITY

// POURCENTAGE D'INTERACTION AVEC LES TAGS

/**
 * 
 */

const RATIO_SIMILARITY = `MATCH (u1:User {id:$idUser})-[r1:INTERACT]->(t:Tag)<-[r2:INTERACT]-(u2)
                            WHERE r1.ratio > 10 AND r2.ratio > 10
                            RETURN u1.id AS User1, r1.ratio AS PoidsU1, u2.id AS User2, r2.ratio AS PoidsU2, t.title AS Tag
                            ORDER BY PoidsU1 + PoidsU2 DESC
                            LIMIT 5`

exports.RATIO_SIMILARITY = RATIO_SIMILARITY;


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
                            RETURN DISTINCT user1.id AS User1, user2.id AS User2, data1data2Product / (data1Length * data2Length) AS similarite
                            ORDER BY similarite DESC
                            LIMIT 5`

exports.ANSWER_SIMILARITY = ANSWER_SIMILARITY;


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
                                RETURN DISTINCT user1.id AS User1, user2.id AS User2, data1data2Product / (data1Length * data2Length) AS similarite
                                ORDER BY similarite DESC
                                LIMIT 5`

exports.QUESTION_SIMILARITY = QUESTION_SIMILARITY;

