const express = require('express');
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
app.get('/user', (req, res) => {
    res.status(200).send(
        {
            name: 'AlexOS',
            password: 'argtjkahg'
        }
    );
});

//post User
app.post('/user', (req, res) => {

    //const { id } = req.params;
    const { name } = "oui";
    const { surname } = req.body.surname;
    const { mail } = req.body.mail;
    const { password } = req.body.password;
    const { idSTOW } = req.body.idSTOW;

    
    if(!name){
        res.status(403).send({message: "ça marche pas"});
    }

    user = {
        name,
        surname,
        mail,
        password,
        idSTOW
    }

    res.send({
        message : "new user created",
        user
    });

});