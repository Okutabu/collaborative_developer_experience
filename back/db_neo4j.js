const neo4j = require("neo4j-driver");

const uri = "neo4j+s://47c2d019.databases.neo4j.io";
const user = "neo4j";
const password = "iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc";

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createUser(member) {
  const name = member.name;
  const surname = member.surname;
  const mail = member.mail;
  const idSTOW = member.idSTOW;

  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MERGE (u:User { name: $name, surname: $surname, mail: $mail, idSTOW: toInteger($idSTOW) })`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { name, surname, mail, idSTOW })
    );
  } catch (error) {
    console.error(
      `Something went wrong, User could not be inserted : ${error}`
    );
  } finally {
    await session.close();
  }
}

async function connectUser(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `Match (u:User{idSTOW: $idSTOW})
        return u`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong, wrong mail or password : ${error}`);
  } finally {
    await session.close();
  }
}

async function getUserTopTags(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User{idSTOW: $idSTOW})-[]-()-[h:HAS_TOPIC]-(t:Tag)
                            WITH u,t, count(h) as nbRelations
                            MATCH (u)-[]-()-[i]-()
                            RETURN u as utilisateur ,t as tags ,nbRelations, count(i) as alltags
                            ORDER BY nbRelations DESC
                            LIMIT 5`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong, wrong mail or password : ${error}`);
  } finally {
    await session.close();
  }
}

async function getUserLastInteraction(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User{idSTOW:$idSTOW})-[i]-(q:Question)
                            WITH collect(i.dateInteraction) as lastInteraction , u
                            RETURN u,lastInteraction[0] ORDER BY lastInteraction`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Erreur getUserLastInteraction : ${error}`);
  } finally {
    await session.close();
  }
}

async function getUserProficiency(idSTOW) {
  var res = null;
  const data = await getUserTopTags(idSTOW);
  const lastInteraction = await getUserLastInteraction(idSTOW);

  if (data.lenght != 0) {
    var users = [];
    var technos = [];

    var user = {
      idSTOW: data[0]._fields[0].properties.idSTOW.low,
      pseudo: data[0]._fields[0].properties.pseudo,
      avatar: data[0]._fields[0].properties.avatar,
      lastInteraction:
        lastInteraction[0]._fields[0].properties.lastInteraction.low,
    };
    users.push(user);
    data.map((elem) => {
      var title = {
        techno: elem._fields[1].properties.title,
        ratio: elem._fields[2].low / elem._fields[3].low,
      };
      technos.push(title);
    });

    users.push(technos);

    res = users;
  }
  return res;
}

async function getNbUsers() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(u:User)
                            RETURN count(u) as nbUsers`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong :  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbTags() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(t:Tag)                            
                            RETURN count(t) as nbTags`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong :  ${error}`);
  } finally {
    await session.close();
  }
}

async function getTopTags() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[i]-()-[]-(t:Tag)
                            WITH count(i) AS interactions, t AS topTags
                            RETURN topTags, interactions
                            ORDER BY interactions DESC
                            LIMIT 5`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getTopTags ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbOfActiveUsers() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)
                            WHERE (u)--()
                            RETURN COUNT(u) as nbActive`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbOfActiveUsers ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbQuestions() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[a:ASKED]-()
                            RETURN count(a) as nbQuestions`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbQuestions ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbAnswers() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[a:ANSWERED]-()
                            RETURN count(a) as nbAnswers`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbAnswers ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbInteractions() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[a:ANSWERED]-()
                            WITH count (a) as nbAnswered
                            MATCH (u:User)-[a:ASKED]-()
                            WITH nbAnswered, count(a) as nbAsked
                            RETURN (nbAnswered + nbAsked) as interactions`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbInteractions ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getTagsWithMostUsers() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[i]-()-[]-(t:Tag)
                            WITH COUNT( DISTINCT u) AS nbUsers, t AS tag
                            RETURN tag, nbUsers
                            ORDER BY nbUsers DESC
                            LIMIT 5`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getTagsWithMostUsers ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getUsers() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(u:User)  
                            WHERE u.name IS NOT NULL                           
                            RETURN u`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`[ getUsers ] Something went wrong :  ${error}`);
  } finally {
    await session.close();
  }
}

async function getTagAdmin(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(u:User{idSTOW: $idSTOW})-[i:INTERACT]-(t:Tag)
                            WITH i.ratio as topTags, t, u 
                            RETURN t ORDER BY topTags DESC
                            LIMIT 1`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong, wrong mail or password : ${error}`);
  } finally {
    await session.close();
  }
}

/**
 * @param ATTRIBUTE String, "lastInteraction", "name" or "surname", "name" by default
 * @param DESC String, "DESC" or nothing
 */
async function getUsersSorted(ATTRIBUTE, DESC = "") {
  // mettre "DESC" en paramètre si on veut classer de manière décroissante
  // Les différents types disponnible pour TypeSort

  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(u:User)                             
        WHERE u.${ATTRIBUTE} IS NOT NULL
        RETURN u
        ORDER BY u.${ATTRIBUTE} ${DESC}`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(
      `[ getUsersByLastActivity ] Something went wrong :  ${error}`
    );
  } finally {
    await session.close();
  }
}

async function getInteractionDates(type) {
  // type est soit ANSWERED ou ASKED

  if (type == "ANSWERED" || type == "ASKED") {
    const session = driver.session({ database: "neo4j" });

    try {
      const requete = `MATCH (u:User)-[i:${type}]-(q:Question)
            RETURN i.dateInteraction as dates`;

      const readResult = await session.executeRead((tx) => tx.run(requete));
      return readResult.records;
    } catch (error) {
      console.error(`[ getInteractionDates ] Something went wrong :  ${error}`);
    } finally {
      await session.close();
    }
  } else {
    console.log(
      `[ getInteractionDates ] Something went wrong : bad parameters.`
    );
  }
}

async function getUsersWhoInteractedWithMe(myIdSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u1:User { idSTOW: $myIdSTOW })--(q:Question)--(u2:User)
        WHERE u1 <> u2
        RETURN u2 AS InteractedWith`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { myIdSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(
      `[ getUsersWhoInteractedWithMe ] Something went wrong :  ${error}`
    );
  } finally {
    await session.close();
  }
}

async function getUsersSortedByLastInteraction(DESC = "") {
  // mettre "DESC" en paramètre si on veut classer de manière décroissante
  // Les différents types disponnible pour TypeSort

  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)
                      WHERE u.lastInteraction IS NOT NULL
                      return u 
                      ORDER BY u.lastInteraction ${DESC}`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(
      `[ getUsersSortedByLastInteraction ] Something went wrong :  ${error}`
    );
  } finally {
    await session.close();
  }
}

async function getNbNodes() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u) RETURN COUNT(u) as nbNodes`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbNodes ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbRelations() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH ()-[i]-() RETURN count( DISTINCT i) as nbRelations`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbRelations ]:  ${error}`);
  } finally {
    await session.close();
  }
}

// retourne 1 si un noeud a été supprimé, zéro si rien n'a été supprimé
async function deleteUser(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User { idSTOW: toInteger($idSTOW) }) DETACH DELETE u`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idSTOW })
    );

    return writeResult.summary.counters._stats.nodesDeleted;
  } catch (error) {
    console.error(`Something went wrong [ deleteUser ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function modifyUser(idSTOW, name, surname, email, newIDSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH(u:User {idSTOW: $idSTOW}) 
                            SET 
                            u.idSTOW = $newIDSTOW,
                            u.mail = $email,
                            u.name = $name,
                            u.surname = $surname
                            `;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idSTOW, name, surname, email, newIDSTOW })
    );

    return writeResult.summary.counters._stats.nodesDeleted;
  } catch (error) {
    console.error(`Something went wrong [ deleteUser ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getQuestionsUserToHelp(idSTOW) {
  const session = driver.session({ database: "neo4j" });
  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW})-[:ASKED]-(q)--(t)
                             WITH q, collect(t.title) AS tags
                             RETURN q, tags
                             LIMIT 5`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getQuestionsUserToHelp ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getInteractionDatesUser(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW})-[r]-(q)
                             RETURN r.dateInteraction`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(
      `Something went wrong [ getInteractionDatesUser ]:  ${error}`
    );
  } finally {
    await session.close();
  }
}

async function getNbQuestionsUser(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW})-[r:ASKED]-(q)
                             RETURN count(r) as nbQuestions`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbQuestionsUser ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbAnswersUser(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW})-[r:ANSWERED]-(q)
                             RETURN count(r) as nbQuestions`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbAnswersUser ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbUserIHelped(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW })-[:ANSWERED]-(q:Question)-[:ASKED]-(u2:User)
                             WHERE u <> u2
                             RETURN COUNT(u2) as nbUsers`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbUserIHelped ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function getNbUserWhoHelpedMe(idSTOW) {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User {idSTOW:$idSTOW })-[:ASKED]-(q:Question)-[:ANSWERED]-(u2:User)
                             WHERE u <> u2
                             RETURN COUNT(u2) as nbUsers`;

    const readResult = await session.executeRead((tx) =>
      tx.run(requete, { idSTOW })
    );
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ getNbUserWhoHelpedMe ]:  ${error}`);
  } finally {
    await session.close();
  }
}

async function lastQuestions() {
  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User)-[i]-(q:Question)
                      RETURN q ORDER BY i.dateInteraction
                      DESC LIMIT 5`;

    const readResult = await session.executeRead((tx) => tx.run(requete));
    return readResult.records;
  } catch (error) {
    console.error(`Something went wrong [ lastQuestions ]:  ${error}`);
  } finally {
    await session.close();
  }
}

module.exports = {
  createUser,
  connectUser,
  getUserTopTags,
  getUserProficiency,
  getNbTags,
  getNbUsers,
  getTopTags,
  getUsers,
  getUsersSorted,
  getNbOfActiveUsers,
  getNbQuestions,
  getNbAnswers,
  getNbInteractions,
  getTagsWithMostUsers,
  getTagAdmin,
  getInteractionDates,
  getUsersWhoInteractedWithMe,
  getUsersSortedByLastInteraction,
  getNbNodes,
  getNbRelations,
  getInteractionDatesUser,
  getNbQuestionsUser,
  getNbAnswersUser,
  getNbUserIHelped,
  getNbUserWhoHelpedMe,
  getQuestionsUserToHelp,
  deleteUser,
  modifyUser,
  lastQuestions,
};
