var express = require('express');
var router = express.Router();

const db = require('../db_neo4j');

/* GET users listing. */
router.get('', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/statistics', (req, res) => {

  (async() => {
      const nbTags = await db.getNbTags();
      const nbUsers = await db.getNbUsers();
  const topTags = await db.getTopTags();
  const tab = [];

  

      //teste si le tableau est vide
      if(!nbTags.length || !nbUsers.length || !topTags){
          res.status(404).send({
              answer: "Statistics not found",
              users: [],
              error: -1
          });
      }
      else{

    for(let i = 0; i < 5; i++) {
              var title = topTags[i]._fields[0].properties.title;
              tab.push(title);
          }

          res.status(200).send({
      answer: "Statistics found",
      nbTags: nbTags[0]._fields[0].low,
      nbUsers: nbUsers[0]._fields[0].low,
      topTags: tab,
      error: 0
    });
      }
  })();
});


router.get('/users', (req, res) => {

(async() => {

  const neo4jUsers = await db.getUsers();

  if(!neo4jUsers.length){

    res.status(404).send({
              answer: "Users not found",
              users: [],
              error: -1
          });
  }
  else{

    let allUsers = [];
    //oui[2]._fields[0].properties
    for(let i = 0; i < neo4jUsers.length; i++){

      allUsers.push(neo4jUsers[i]._fields[0].properties);

    }
    res.status(200).send({
              answer: "Users found",
              users: allUsers,
              error: 0
          });
  }
})();
});


function errorParameters(attribute, desc){

isError = true;

if(attribute == "surname" || attribute == "name" || attribute == "lastInteraction"){
  isError = false;
}

if(desc === undefined || desc == "true"){
  isError = false;
}
return isError;
}

/*
attributs valide : "name", "surname", "lastInteraction"
Si on ne veut pas trié on laisse comme cela,
Sinon on rajoute ?desc=true à la fin de l'url
*/
router.get('/users/sort/:attribute', (req, res) => {

var attribute = req.params.attribute;
var desc = req.query.desc;

//traitement des erreurs
if(errorParameters(attribute, desc)){

  res.status(404).send({
    answer: "Users not found, there may be is an error in the parameters",
    users: [],
    error: -1
  });

}else{

  (async() => {

    var neo4jUsers;
    if(desc === 'true'){
      desc = "DESC";
    }else{
      desc = "";
    }

    if(attribute == "name"){
      neo4jUsers = await db.getUsersSorted(attribute, desc);
    }
    if(attribute == "surname"){
      neo4jUsers = await db.getUsersSorted(attribute, desc);
    }
    if(attribute == "lastInteraction"){
      neo4jUsers = await db.getUsersSorted(attribute, desc);
    }


    if(!neo4jUsers.length){

      res.status(404).send({
        answer: "Users not found",
        users: [],
        error: -1
      });
    }
    else{

      let allUsers = [];
      //oui[2]._fields[0].properties
      for(let i = 0; i < neo4jUsers.length; i++){

        allUsers.push(neo4jUsers[i]._fields[0].properties);

      }
      res.status(200).send({
        answer: "Users found",
        users: allUsers,
        error: 0
      });
    }
  })();
}
});

/*
requêtes GET pour la page admin :

-	users
-	lastName / Sorted croissant, decroissant
-	name / sorted croissant, decroissant
-	date / sorted croissant, decroissant


requêtes GET pour le filtrage :

-	users by name
-	users by lastname
-	users by tag

*/


module.exports = router;
