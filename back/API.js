//const { parseStringStyle } = require('@vue/shared');
const express = require('express');
const db = require('./db_neo4j');
const similarity = require('./similarityQueries');
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
    () => console.log(`Server alive on http://localhost:${PORT}`)
);

//midleware json
app.use(express.json());


app.get('/user/login', (req, res) => {

    const mail = req.body.mail;
    const password = req.body.password;

    (async() => {
        const data = await db.connectUser(mail, password);

        //teste si le tableau est vide
        if(!data.length){
            res.status(404).send({
                answer: "User not found",
                user : null,
                error: -1
            });
        }
        else{
            const user = {
                name: data[0]._fields[0].properties.name,
                surname: data[0]._fields[0].properties.surname,
                mail: data[0]._fields[0].properties.mail,
                password: data[0]._fields[0].properties.password,
                idSTOW: data[0]._fields[0].properties.idSTOW.low
            }
        
            res.status(200).send({
                answer: "User found",
                user : user,
                error: 0
            });
        }
    })();
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
        res.status(403).send({
            answer: "User not created",
            user: null,
            error: -1
        });
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
        answer: `${name} was created successfuly`,
        user: user,
        error: 0
    });
});


app.get('/user/similarity/cosinus', (req, res) => {

    const idSTOW = req.body.idSTOW;

    (async() => {
        const data = await similarity.cosinus_similarity(idSTOW);
        
        //teste si le tableau est vide
        if(!data.length){
            res.status(404).send({
                answer: "Users not found",
                users: null,
                error: -1
            });
        }
        else{

            var users = [];
            data.map( (elem) => {
                var user = {
                    // à remodifier quand tous les utilisateutrs auront des nom mail...
                    idSTOW: elem._fields[0].properties.id,
                    similarity: elem._fields[1]
                };
                users.push(user);
            });
        
            res.status(200).send({
                answer: "Users found",
                users: users,
                error: 0
            });
        }
    })();
});



app.get('/user/similarity/answer', (req, res) => {

    const idSTOW = req.body.idSTOW;

    (async() => {
        const data = await similarity.answer_similarity(idSTOW);
        
        //teste si le tableau est vide
        if(!data.length){
            res.status(404).send({
                answer: "Users not found",
                users: null,
                error: -1
            });
        }
        else{

            
            var users = [];
            data.map( (elem) => {
                var user = {
                    // à remodifier quand tous les utilisateutrs auront des nom mail...
                    idSTOW: elem._fields[0].properties.id,
                    similarity: elem._fields[1]
                };
                users.push(user);
            });

            res.status(200).send({
                answer: "Users found",
                users: users,
                error: 0
            });
        }
    })();
});


app.get('/user/similarity/question', (req, res) => {

    const idSTOW = req.body.idSTOW;

    (async() => {
        const data = await similarity.question_similarity(idSTOW);
        
        //teste si le tableau est vide
        if(!data.length){
            res.status(404).send({
                answer: "Not found",
                users: null,
                error: -1
            });
        }
        else{
            
            // à remodifier quand tous les utilisateutrs auront des nom mail...
            var users = [];
            data.map( (elem) => {
                var user = {
                    idSTOW: elem._fields[0].properties.id,
                    similarity: elem._fields[1]
                };
                users.push(user);
            });
            
            res.status(200).send({
                answer: "Users found",
                users: users,
                error: 0
            });
        }
    })();
});


app.get('/user/proficiency', (req, res) => {

    const idSTOW = req.body.idSTOW;

    if(!idSTOW){
        res.status(404).send({
            answer: "Profile not found",
            userProfile: null,
            error: -1
        });
    }

    user = {
        idSTOW: 9875,
        technos: [
            {python: 42.1},
            {java: 4.2},
            {"c++": 2},
            {caml: 34.1},
            {git: 5.4}
        ]
    }

    res.status(200).send({
        answer: "Profile found",
        userProfile : user,
        error: 0
    });
});

