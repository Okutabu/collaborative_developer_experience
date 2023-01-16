// COSINUS SIMILARITY

/*
La similarité de cosinus est une mesure de similarité qui mesure la similarité entre deux vecteurs d'objets, Dans ce cas ci, les vecteurs sont les tags d'un utilisateur.
*/ 

export const COSINUS_SIMILARITY = `MATCH (user1:User {id:$idUser})-[data1:INTERACT]->(t:Tag)<-[data2:INTERACT]-(user2:User)
WHERE data1.ratio > 2 and data2.ratio > 5
WITH SUM(data1.ratio * data2.ratio) AS data1data2Product,
SQRT(REDUCE(data1Dot = 0.0, a IN COLLECT(data1.ratio)| data1Dot + a^2)) AS data1Length,
SQRT(REDUCE(data2Dot = 0.0, b IN COLLECT(data2.ratio)| data2Dot + b^2)) AS data2Length,
user1, user2
RETURN user1.id AS User1, user2.id AS User2, data1data2Product / (data1Length * data2Length) AS similarite
ORDER BY similarite DESC
LIMIT 5`;

//  COSINUS SIMILARITY

// POURCENTAGE D'INTERACTION AVEC LES TAGS

/**
 * 
 */

export const RATIO_SIMILARITY = `MATCH (u1:User {id:$idUser})-[r1:INTERACT]->(t:Tag)<-[r2:INTERACT]-(u2)
WHERE r1.ratio > 10 AND r2.ratio > 10
RETURN u1.id AS User1, r1.ratio AS PoidsU1, u2.id AS User2, r2.ratio AS PoidsU2, t.title AS Tag
ORDER BY PoidsU1 + PoidsU2 DESC
LIMIT 5`

//  POURCENTAGE D'INTERACTION AVEC LES TAGS