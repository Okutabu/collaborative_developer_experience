const { parseStringStyle } = require('@vue/shared');
const express = require('express');
const db = require('./db_neo4j');
const app = express();
const PORT = 8080;

/*
Les endpoints que l'on a besoin:

POST/ user => inscription   //pas de sécurité
GET / user => connexion     //get le user si ya le bon mdp


GET / userSimilaire         // sécurité, si on est connecté
                            // 3 fonctions, similaires
                                            questions similaires
                                            réponses similaires
*/


app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

//midleware json
app.use(express.json());

//exemple
app.get('/user/login', (req, res) => {

    const mail = req.body.mail;
    const password = req.body.password;
    var user;

    ( async () => {
        user = await db.connectUser(mail, password);
        console.log(user);
    });

    res.status(200).send(
        user
    );
});

//post User
app.post('/user/register', (req, res) => {

    //const { id } = req.params;
    const name = req.body.name;
    const surname = req.body.surname;
    const mail = req.body.mail;
    const password = req.body.password;
    const idSTOW  = req.body.idSTOW;

    
    if(!name){
        res.status(403).send({message: name});
    }

    user = {
        name,
        surname,
        mail,
        password,
        idSTOW
    }
    
    db.createUser(user);

    res.send({
        message: `${name} was created successfuly`
    });
});