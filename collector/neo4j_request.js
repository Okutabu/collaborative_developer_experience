var requete = require("./STOWrequests");
var profil = require("./calculateur");

const neo4j = require("neo4j-driver");

const uri = "neo4j+s://47c2d019.databases.neo4j.io";
const user = "neo4j";
const password = "iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

async function insert_tags(allTags) {
  const session = driver.session({ database: "neo4j" });
  try {
    for (let tag of allTags) {
      const requete = `MERGE (t:Tag { title: $tag })`;

      const writeResult = await session.executeWrite((tx) =>
        tx.run(requete, { tag })
      );
    }
  } catch (error) {
    console.error(`Error function insert_tag : ${error}`);
  } finally {
    await session.close();
  }
}

async function insert_users(allUsers) {
  const session = driver.session({ database: "neo4j" });

  try {
    for (let userInfo of allUsers) {
      const requete = `MERGE (u:User { idSTOW: toInteger($userInfo)} )`;

      const writeResult = await session.executeWrite((tx) =>
        tx.run(requete, { userInfo })
      );
    }
  } catch (error) {
    console.error(`Erreur function insert_users : ${error}`);
  } finally {
    await session.close();
  }
}

async function insert_questions(allQuestions) {
  const session = driver.session({ database: "neo4j" });

  try {
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i] != undefined) {
        let id = allQuestions[i].idQuestion;
        let title = allQuestions[i].title;

        const requete = `MERGE (q:Question { idQuestion: toInteger($id), title:$title } )`;

        const writeResult = await session.executeWrite((tx) =>
          tx.run(requete, { id, title })
        );
      }
    }
  } catch (error) {
    console.error(`Erreur function insert_questions : ${error}`);
  } finally {
    await session.close();
  }
}

async function create_answered_link(idUser, idQuestion, date) {
  const session = driver.session({ database: "neo4j" });
  try {
    const requete = `MATCH (u:User {idSTOW:$idUser}), (q:Question {idQuestion: $idQuestion})
                          MERGE (u)-[a:ANSWERED]->(q)
                          SET a.dateInteraction = toInteger($date)`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idUser, idQuestion, date })
    );
  } catch (error) {
    console.error(`Erreur function create_answered_link : ${error}`);
  } finally {
    await session.close();
  }
}

async function create_asked_link(idUser, idQuestion, date) {
  const session = driver.session({ database: "neo4j" });
  try {
    const requete = `MATCH (u:User {idSTOW:$idUser}), (q:Question {idQuestion: $idQuestion})
                          MERGE (u)-[a:ASKED]->(q)
                          SET a.dateInteraction = toInteger($date)`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idUser, idQuestion, date })
    );
  } catch (error) {
    console.error(`Erreur function create_asked_link : ${error}`);
  } finally {
    await session.close();
  }
}

async function create_has_topic_link(tags, idQuestion) {
  const session = driver.session({ database: "neo4j" });
  try {
    for (let tag of tags) {
      const requete = `MATCH (q:Question {idQuestion: $idQuestion}), (t:Tag {title: $tag})
                              MERGE (q)-[h:HAS_TOPIC]->(t)`;

      const writeResult = await session.executeWrite((tx) =>
        tx.run(requete, { idQuestion, tag })
      );
    }
  } catch (error) {
    console.error(`Erreur function create_has_topic_link : ${error}`);
  } finally {
    await session.close();
  }
}

//permet d'inserer tous les utilisateurs, tous les tags, et de créer les relations
async function insert_nodes_user_question_tag(allProfils) {
  const session = driver.session({ database: "neo4j" });

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

async function add_name_picture_lastInteraction(userInfo) {
  const id = userInfo.idSTOW;
  const pseudo = userInfo.pseudo;
  const avatar = userInfo.avatar;
  const lastInteraction = userInfo.lastInteraction;

  const session = driver.session({ database: "neo4j" });

  try {
    const requete = `MATCH (u:User { idSTOW: toInteger($id)})
                         SET u.pseudo = $pseudo,
                             u.avatar = $avatar`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { id, pseudo, avatar, lastInteraction })
    );
  } catch (error) {
    console.error(`Error function add_name_and_picture : ${error}`);
  } finally {
    await session.close();
  }
}

async function add_all_names_pictures_lastInteractions(usersInfo) {
  const session = driver.session({ database: "neo4j" });

  try {
    for (info of usersInfo) {
      console.log(`Inserting user : ${info.idSTOW}`);
      await add_name_picture_lastInteraction(info);
    }
  } catch (error) {
    console.error(`Error add_all_names_and_pictures : ${error}`);
  } finally {
    await session.close();
  }
}

async function set_name_surname_mail(id, objUser) {
  const session = driver.session({ database: "neo4j" });

  const mail = objUser.mail;
  const name = objUser.name;
  const surname = objUser.surname;

  try {
    console.log(`Adding Name Surname and Mail to user : ${id}`);

    const requete = `MATCH (u:User { idSTOW: $id})
                         SET u.mail = $mail,
                             u.name = $name,
                             u.surname = $surname`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { id, mail, name, surname })
    );
  } catch (error) {
    console.error(`Error set_name_surname_mai : ${error}`);
  } finally {
    await session.close();
  }
}

async function setTopTag(idSTOW) {
  const session = driver.session({ database: "neo4j" });
  try {
    const requete = `MATCH(u:User{idSTOW: $idSTOW})-[i]-(q)-[h]-(t:Tag)
                            WITH count(h) as topTags, u, t 
                            ORDER BY count(h) DESC LIMIT 1
                            set u.topTag = t.title`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idSTOW })
    );
  } catch (error) {
    console.error(`Erreur function create_answered_link : ${error}`);
  } finally {
    await session.close();
  }
}

async function setAllTopTags(allUsers) {
  const session = driver.session({ database: "neo4j" });

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

async function setLastInteraction(idSTOW) {
  const session = driver.session({ database: "neo4j" });
  try {
    const requete = `MATCH (u:User{idSTOW:$idSTOW})-[i]-(q:Question)
                            WITH collect(i.dateInteraction) as lastInteraction , u ORDER BY lastInteraction
                            set u.lastInteraction = lastInteraction[0]`;

    const writeResult = await session.executeWrite((tx) =>
      tx.run(requete, { idSTOW })
    );
  } catch (error) {
    console.error(`Erreur function create_answered_link : ${error}`);
  } finally {
    await session.close();
  }
}

async function setAllInteractions(allUsers) {
  const session = driver.session({ database: "neo4j" });

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
  driver,
  add_all_names_pictures_lastInteractions,
  insert_users,
  insert_nodes_user_question_tag,
  create_asked_link,
  create_has_topic_link,
  create_answered_link,
  set_name_surname_mail,
  setAllTopTags,
  setAllInteractions,
};
