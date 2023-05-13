const db = require("./neo4j_request");
const requete = require("./STOWrequests");
const users = require("./users/users");
const profil = require("./calculateur");

/*
const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
const user = 'neo4j';
const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
*/
// fonction pour récupérer automatiquement la date du jour, et celle 12 semaines avant
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;
const NB_WEEKS = 12;

const END = Math.floor(Date.now() / 1000);
const START = Math.floor((Date.now() - NB_WEEKS * WEEK) / 1000);
const END_STR = END.toString();
const START_STR = START.toString();

async function start_collector_first_time() {
  // récupération des données d'un utilisateurs + insertion (id, avatar, pseudo)
  console.log("Step 1");
  const infos = await requete.get_users(users.list_id, START_STR, END_STR);

  console.log("Step 2");
  await db.add_all_names_pictures_lastInteractions(infos);

  //erreur insertion tag
  //Something went wrong, Tags could not be inserted : Neo4jError: Expected parameter(s): id

  // récupère tous les données d'interactions (questions, réponses)
  console.log("Step 3");
  const allProfiles = await profil.get_users_profils(START_STR, END_STR);

  console.log("Step 4");
  await db.insert_profils(allProfiles);
}

async function create_links(profils) {
  for (let profil of profils) {
    let id = profil.id;

    console.log(`[ Creating relations ] [ user ] : ${id}`);

    for (let activity of profil.activities) {
      if (activity.question.idQuestion != undefined) {
        let typePost = activity.typePost;

        if (typePost == "answer") {
          await db.create_answered_link(
            id,
            activity.question.idQuestion,
            activity.dateInteraction
          );
        }
        if (typePost == "question") {
          await db.create_asked_link(
            id,
            activity.question.idQuestion,
            activity.dateInteraction
          );
        }
        await db.create_has_topic_link(
          activity.tags,
          activity.question.idQuestion
        );
      }
    }
  }
}

async function new_db() {
  console.log("+-------------------------------------------------------+");
  console.log("|      STEP 1 - Récupération des données STOW           |");
  console.log("+-------------------------------------------------------+");
  let profiles = await requete.get_users_tags_async(START_STR, END_STR);

  console.log("+-------------------------------------------------------+");
  console.log("|         STEP 2 - Création des noeuds                  |");
  console.log("+-------------------------------------------------------+");
  let nodes = requete.get_users_tags_questions(profiles);

  console.log("+-------------------------------------------------------+");
  console.log("|   STEP 3 - Insertion de tous les noeuds dans la BDD   |");
  console.log("+-------------------------------------------------------+");

  await db.insert_nodes_user_question_tag(nodes);

  console.log("+-------------------------------------------------------+");
  console.log("| STEP 4 - Création de toutes les relations dans la BDD |");
  console.log("+-------------------------------------------------------+");
  await create_links(profiles);
}

async function update_db() {
  console.log("Step 1");
  const infos = await requete.get_users(users.list_id);

  console.log("Step 2");
  await db.add_all_names_pictures_lastInteractions(infos);
}

async function setNamesSurnamesMails() {
  let devs = users.createUsers();
  let ids = users.list_id;

  for (let i = 0; i < ids.length; i++) {
    await db.set_name_surname_mail(ids[i], devs[i]);
  }
}

(async () => {
  console.log(
    "Collecting from ",
    new Date(START * 1000),
    " to ",
    new Date(END * 1000)
  );
  //await start_collector_first_time();

  console.log("Récupération de tous les éléments et insertion dans la DB");
  await new_db();

  console.log("Récupération des pseudo et avatar");
  await update_db();

  console.log("Ajout des noms et prénoms");
  await setNamesSurnamesMails();
  await db.setAllTopTags(users.list_id);
  await db.setAllInteractions(users.list_id);

  await db.driver.close();
})();
