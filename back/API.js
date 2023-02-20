//const { parseStringStyle } = require('@vue/shared');
const express = require('express');
const cors = require('cors');
const db = require('./db_neo4j');
const similarity = require('./similarityQueries');
const app = express();
const PORT = 8080;

/*
Les endpoints que l'on a besoin:

POST/ user => inscription   //pas de sécurité
GET / user => connexion     //get le user si ya le bon mdp

GET / user => profiles      //récupérer toutes les technos d'une personne

GET / userSimilaire         // sécurité, si on est connecté
                            // 3 fonctions, similaires
                                            questions similaires
                                            réponses similaires
*/


app.listen(
    PORT,
    () => console.log(`Server alive on http://localhost:${PORT}`)
);


//midleware json, tout est transformé en json après la reception
app.use(express.json());

//permet de gérer les requêtes provenant de serveurs externes
app.use(cors());

app.post('/user/login', (req, res) => {

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


app.get('/user/:idSTOW/similarity/cosinus', (req, res) => {
    // faire les tests avec 6309

    const idSTOW = parseInt(req.params.idSTOW);

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



app.get('/user/:idSTOW/similarity/answer', (req, res) => {

    // faire les tests avec 6309

    const idSTOW = parseInt(req.params.idSTOW);

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

            //on récupère tous les ids
            //var users = [];
            var ids = [];
            data.map( (elem) => {
                /*
                var user = {
                    // à remodifier quand tous les utilisateutrs auront des nom mail...
                    idSTOW: elem._fields[0].properties.id,
                    similarity: elem._fields[1]
                };
                users.push(user);
                */
               ids.push(elem._fields[0].properties.id);
            });


            //on récupère les profile de tous les 
            var users = [];

            for(const id of ids){
                var infos = await db.getUserProficiency(id);
                users.push(infos);
            }
            
            res.status(200).send({
                answer: "Users found",
                users: users,
                error: 0
            });
        }
    })();
});

/*
Exemple de résultat pour l'utilisateur 6309 pour la requête similarity/answer
{
	"answer": "Users found",
	"users": [
		[
			{
				"idSTOW": 20740880
			},
			[
				{
					"techno": "django",
					"ratio": 28.000000000000004
				},
				{
					"techno": "django-models",
					"ratio": 18
				},
				{
					"techno": "python",
					"ratio": 17
				},
				{
					"techno": "slugify",
					"ratio": 15
				},
				{
					"techno": "django-views",
					"ratio": 6
				}
			]
		],
		[
			{
				"idSTOW": 4198317
			},
			[
				{
					"techno": "docker",
					"ratio": 14.606741573033707
				},
				{
					"techno": "dockerfile",
					"ratio": 14.606741573033707
				},
				{
					"techno": "docker-compose",
					"ratio": 14.606741573033707
				},
				{
					"techno": "go",
					"ratio": 11.235955056179774
				},
				{
					"techno": "goroutine",
					"ratio": 3.3707865168539324
				}
			]
		],
		[
			{
				"idSTOW": 184546
			},
			[
				{
					"techno": "git",
					"ratio": 27.835051546391753
				},
				{
					"techno": "git-rebase",
					"ratio": 12.371134020618557
				},
				{
					"techno": "github",
					"ratio": 9.278350515463918
				},
				{
					"techno": "rebase",
					"ratio": 6.185567010309279
				},
				{
					"techno": "git-interactive-rebase",
					"ratio": 6.185567010309279
				}
			]
		]
	],
	"error": 0
}
*/


app.get('/user/:idSTOW/similarity/question', (req, res) => {

    // faire les tests avec 5987

    const idSTOW = parseInt(req.params.idSTOW);

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





app.get('/user/:idSTOW/proficiency', (req, res) => {

    // tester avec n'importe qui (6309 / 633440 / 714501)

    const idSTOW = parseInt(req.params.idSTOW);

    (async() => {

        const data = await db.getUserTopTags(idSTOW);

        if(!idSTOW){
            res.status(404).send({
                answer: "Profile not found",
                userProfile: null,
                error: -1
            });
        }
        else{
            var users = [];
            var technos = [];
            var test = {
                idSTOW : idSTOW
            }
            users.push(test)
            data.map( (elem) => {
                var title = {
                    techno: elem._fields[0].properties.title,
                    ratio: elem._fields[1]
                };
                technos.push(title);
            });

            users.push(technos)

            res.status(200).send({
                answer: "Profile found",
                userProfile : users,
                error: 0
            });
        }

        // user = {
        //     "answer": "Profile found",
        //     "userProfile": [
        //         {
        //             "idSTOW": 633440
        //         },
        //         [
        //             {
        //                 "techno": "laravel",
        //                 "ratio": 26.582278481012654
        //             },
        //             {
        //                 "techno": "laravel-9",
        //                 "ratio": 7.59493670886076
        //             },
        //             {
        //                 "techno": "laravel-mix",
        //                 "ratio": 7.59493670886076
        //             },
        //             {
        //                 "techno": "laravel-8",
        //                 "ratio": 5.063291139240507
        //             },
        //             {
        //                 "techno": "testing",
        //                 "ratio": 3.79746835443038
        //             }
        //         ]
        //     ],
        //     "error": 0
        // }

        
    })();
});