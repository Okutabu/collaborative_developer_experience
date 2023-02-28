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

    const id = parseInt(req.body.idSTOW);

    (async() => {
        const data = await db.connectUser(id);
        //teste si le tableau est vide
        if(!data.length){
            res.status(200).send({
                answer: "User not found",
                user : [],
                error: -1
            });
        }
        else{
            const user = {
                name: data[0]._fields[0].properties.name,
                surname: data[0]._fields[0].properties.surname,
                avatar: data[0]._fields[0].properties.avatar,
                pseudo: data[0]._fields[0].properties.pseudo,
                idSTOW: id
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
    const idSTOW  = req.body.idSTOW;

    
    if(!name){
        res.status(404).send({
            answer: "User not created",
            user: null,
            error: -1
        });
    }

    user = {
        name,
        surname,
        mail,
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
            res.status(200).send({
                answer: "Users not found",
                users: [],
                error: -1
            });
        }
        else{

            //on récupère tous les ids
            var ids = [];
            data.map( (elem) => {
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
Exemple de résultat pour l'utilisateur 6309 pour la requête similarity/cosinus
{
	"answer": "Users found",
	"users": [
		[
			{
				"idSTOW": 11804213
			},
			[
				{
					"techno": "reactjs",
					"ratio": 23.52941176470588
				},
				{
					"techno": "material-ui",
					"ratio": 17.647058823529413
				},
				{
					"techno": "http-live-streaming",
					"ratio": 8.823529411764707
				},
				{
					"techno": "vercel",
					"ratio": 8.823529411764707
				},
				{
					"techno": "hls.js",
					"ratio": 8.823529411764707
				}
			]
		],
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
				"idSTOW": 20864520
			},
			[
				{
					"techno": "fastapi",
					"ratio": 31.57894736842105
				},
				{
					"techno": "python",
					"ratio": 21.052631578947366
				},
				{
					"techno": "passwords",
					"ratio": 21.052631578947366
				},
				{
					"techno": "pydantic",
					"ratio": 5.263157894736842
				},
				{
					"techno": "mongodb",
					"ratio": 5.263157894736842
				}
			]
		],
		[
			{
				"idSTOW": 56541
			},
			[
				{
					"techno": "latex",
					"ratio": 18.181818181818183
				},
				{
					"techno": "git",
					"ratio": 9.090909090909092
				},
				{
					"techno": "shell",
					"ratio": 9.090909090909092
				},
				{
					"techno": "peek",
					"ratio": 9.090909090909092
				},
				{
					"techno": "git-submodules",
					"ratio": 9.090909090909092
				}
			]
		],
		[
			{
				"idSTOW": 250259
			},
			[
				{
					"techno": "php",
					"ratio": 19.444444444444446
				},
				{
					"techno": "authorize.net",
					"ratio": 11.11111111111111
				},
				{
					"techno": "python",
					"ratio": 8.333333333333332
				},
				{
					"techno": "django",
					"ratio": 5.555555555555555
				},
				{
					"techno": "foreach",
					"ratio": 5.555555555555555
				}
			]
		]
	],
	"error": 0
}
*/



app.get('/user/:idSTOW/similarity/answer', (req, res) => {

    // faire les tests avec 6309

    const idSTOW = parseInt(req.params.idSTOW);

    (async() => {
        const data = await similarity.answer_similarity(idSTOW);
        
        //teste si le tableau est vide
        if(!data.length){
            res.status(200).send({
                answer: "Users not found",
                users: [],
                error: -1
            });
        }
        else{

            //on récupère tous les ids
            var ids = [];
            data.map( (elem) => {
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
            res.status(200).send({
                answer: "Not found",
                users: [],
                error: -1
            });
        }
        else{
            
            //on récupère tous les ids
            var ids = [];
            data.map( (elem) => {
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
Exemple de résultat pour l'utilisateur 5987 pour la requête similarity/question
{
	"answer": "Users found",
	"users": [
		[
			{
				"idSTOW": 6213883
			},
			[
				{
					"techno": "python",
					"ratio": 28.735632183908045
				},
				{
					"techno": "bash",
					"ratio": 5.747126436781609
				},
				{
					"techno": "linux",
					"ratio": 4.597701149425287
				},
				{
					"techno": "google-cloud-functions",
					"ratio": 3.4482758620689653
				},
				{
					"techno": "echo",
					"ratio": 3.4482758620689653
				}
			]
		],
		[
			{
				"idSTOW": 107409
			},
			[
				{
					"techno": "python",
					"ratio": 12.121212121212121
				},
				{
					"techno": "nlp",
					"ratio": 9.090909090909092
				},
				{
					"techno": "deep-learning",
					"ratio": 9.090909090909092
				},
				{
					"techno": "keras",
					"ratio": 9.090909090909092
				},
				{
					"techno": "neural-network",
					"ratio": 9.090909090909092
				}
			]
		],
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
				"idSTOW": 11717481
			},
			[
				{
					"techno": "python",
					"ratio": 21.73913043478261
				},
				{
					"techno": "pandas",
					"ratio": 9.782608695652174
				},
				{
					"techno": "dataframe",
					"ratio": 9.782608695652174
				},
				{
					"techno": "function",
					"ratio": 6.521739130434782
				},
				{
					"techno": "loops",
					"ratio": 6.521739130434782
				}
			]
		],
		[
			{
				"idSTOW": 2840436
			},
			[
				{
					"techno": "python",
					"ratio": 27.058823529411764
				},
				{
					"techno": "amazon-sqs",
					"ratio": 5.88235294117647
				},
				{
					"techno": "boto3",
					"ratio": 5.88235294117647
				},
				{
					"techno": "python-3.x",
					"ratio": 4.705882352941177
				},
				{
					"techno": "jupyter-notebook",
					"ratio": 2.3529411764705883
				}
			]
		]
	],
	"error": 0
}
*/




app.get('/user/:idSTOW/proficiency', (req, res) => {

    // tester avec n'importe qui (6309 / 633440 / 714501)

    const idSTOW = parseInt(req.params.idSTOW);

    (async() => {

        if(!idSTOW){
            res.status(404).send({
                answer: "Profile not found",
                userProfile: null,
                error: -1
            });
        }
        else{

            const users = await db.getUserProficiency(idSTOW);
            
            res.status(200).send({
                answer: "Profile found",
                userProfile : users,
                error: 0
            });
        }

        	/* user = {
				"answer": "Profile found",
				"userProfile": [
					{
						"idSTOW": 6309,
						"pseudo": "VonC",
						"avatar": "https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1"
					},
					[
						{
							"techno": "git",
							"ratio": 17
						},
						{
							"techno": "github",
							"ratio": 16
						},
						{
							"techno": "go",
							"ratio": 8
						},
						{
							"techno": "django",
							"ratio": 6
						},
						{
							"techno": "git-history",
							"ratio": 6
						}
					]
				],
				"error": 0
			} */

        
    })();
});