//const { parseStringStyle } = require('@vue/shared');
const express = require('express');
const cors = require('cors');
const db = require('./db_neo4j');
const similarity = require('./similarityQueries');
const app = express();
const PORT = 8080;

/* ------- Pour le deploiement ne marche pas encore ------
const http = require('http');
var server =  http.createServer(app);

server.listen(PORT, 'localhost');
server.on('listening', function(){
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
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
        //console.log(data)
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
               ids.push(elem._fields[0].properties.idSTOW);
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
               	ids.push(elem._fields[1].properties.idSTOW);
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
               ids.push(elem._fields[1].properties.idSTOW);
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
    })();
});


app.get('/user/:idSTOW/interactedWithMe', (req, res) => {

	const idSTOW = parseInt(req.params.idSTOW);

	(async() => {
		const users = await db.getUsersWhoInteractedWithMe(idSTOW);
		//console.log(users);
		if(!users.length){
			res.status(404).send({
                answer: "Nobody has interacted with this user",
                users: [],
                error: -1
            });
		}
		else{

			let allUsers = [];

			for(var user of users){
				//console.log(user);
				allUsers.push(user._fields[0]);
			}

			res.status(200).send({
                answer: "Users found",
                users: allUsers,
                error: 0
            });
		}
	})();
});


app.get('/user/:idSTOW/statistics', (req, res) => {

    const idSTOW = parseInt(req.params.idSTOW);

    (async() => {
        
        const dates = await db.getInteractionDatesUser(idSTOW);
		const topTags = await db.getUserTopTags(idSTOW);
        const profile = await db.getUserProficiency(idSTOW);
		const nbQuestions = await db.getNbQuestionsUser(idSTOW);
		const nbAnswers = await db.getNbAnswersUser(idSTOW);
        const nbHelped = await db.getNbUserIHelped(idSTOW);
        const nbHelper = await db.getNbUserWhoHelpedMe(idSTOW);

        //teste si le tableau est vide
        if(!dates.length || !topTags.length || !profile.length || !nbQuestions || !nbAnswers || !nbHelped || !nbHelper){
            res.status(404).send({
                answer: "Statistics not found",
                users: [],
                error: -1
            });
        }
        else{

			const tabTopTags = [];

			for(let i = 0; i < 5; i++) {
				var infos = {
					tag: topTags[i]._fields[0].properties.title,
					nbInteractions: topTags[i]._fields[1].low
				};
                tabTopTags.push(infos);
            }
		
			const tabTagsUsers = [];
			for(let i = 0; i < 5; i++){
				var infos = {
					tag: tagsWithMostUsers[i]._fields[0].properties.title,
					nbInteractions: tagsWithMostUsers[i]._fields[1].low
				};
                tabTagsUsers.push(infos);

			}
			
            res.status(200).send({
				answer: "Statistics found",
				topTags: tabTopTags,
				nbAnswers: nbAnswers[0]._fields[0].low,
				nbQuestions: nbQuestions[0]._fields[0].low,
                nbHelper: nbHelper[0]._fields[0].low,
                nbHelped: nbHelped[0]._fields[0].low,
				dates,
                profile,
				error: 0
			});
        }
    })();
});




app.get('/admin/statistics', (req, res) => {

    (async() => {
        const nbTags = await db.getNbTags();
        const nbUsers = await db.getNbUsers();
		const topTags = await db.getTopTags();
		const activeUsers = await db.getNbOfActiveUsers();
		const nbQuestions = await db.getNbQuestions();
		const nbAnswers = await db.getNbAnswers();
		const nbInteractions = await db.getNbInteractions();
		const tagsWithMostUsers = await db.getTagsWithMostUsers();
        const nbNodes = await db.getNbNodes();
        const nbRelations = await db.getNbRelations();

        //teste si le tableau est vide
        if(!nbTags.length || !nbUsers.length || !topTags || !activeUsers || !nbQuestions || !nbAnswers || !nbInteractions || !tagsWithMostUsers || !nbNodes || !nbRelations){
            res.status(404).send({
                answer: "Statistics not found",
                users: [],
                error: -1
            });
        }
        else{

			const tabTopTags = [];

			for(let i = 0; i < 5; i++) {
				var infos = {
					tag: topTags[i]._fields[0].properties.title,
					nbInteractions: topTags[i]._fields[1].low
				};
                tabTopTags.push(infos);
            }
		
			const tabTagsUsers = [];
			for(let i = 0; i < 5; i++){
				var infos = {
					tag: tagsWithMostUsers[i]._fields[0].properties.title,
					nbInteractions: tagsWithMostUsers[i]._fields[1].low
				};
                tabTagsUsers.push(infos);

			}
			
            res.status(200).send({
				answer: "Statistics found",
				nbTags: nbTags[0]._fields[0].low,
				nbUsers: nbUsers[0]._fields[0].low,
				topTags: tabTopTags,
				nbInteractions: nbInteractions[0]._fields[0].low,
				nbAnswers: nbAnswers[0]._fields[0].low,
				nbInteractions: nbInteractions[0]._fields[0].low,
				nbActiveUsers: activeUsers[0]._fields[0].low,
				tagsWithMostUsers: tabTagsUsers,
                nbNodes: nbNodes[0]._fields[0].low,
                nbRelations: nbRelations[0]._fields[0].low,
				error: 0
			});
        }
    })();
});


app.get('/admin/users', (req, res) => {

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
			let users;
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


function errorParameters(attribute){
	
	return !(attribute == "surname" || attribute == "name" || attribute == "lastInteraction");
}

/*
 attributs valide : "name", "surname"
 renvoyé dans l'ordre croissant
 */
app.get('/admin/users/sort/:attribute', (req, res) => {

	var attribute = req.params.attribute;

	//traitement des erreurs
	if(errorParameters(attribute)){

		res.status(404).send({
			answer: "Users not found, there may be is an error in the parameters",
			users: [],
			error: -1
		});

	}else{

		(async() => {

			var neo4jUsers;

			if(attribute == "name"){
				neo4jUsers = await db.getUsersSorted(attribute);
			}
			if(attribute == "surname"){
				neo4jUsers = await db.getUsersSorted(attribute);
			}
			if(attribute == "lastInteraction"){
				neo4jUsers = await db.getUsersSortedByLastInteraction();
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


// renvoit la liste dans l'ordre décroissant
app.get('/admin/users/sort/:attribute/desc', (req, res) => {

	var attribute = req.params.attribute;

	//traitement des erreurs
	if(errorParameters(attribute)){

		res.status(404).send({
			answer: "Users not found, there may be is an error in the parameters",
			users: [],
			error: -1
		});

	}else{

		(async() => {

			var temp;
			var neo4jUsers;
		
			if(attribute == "name"){
				neo4jUsers = await db.getUsersSorted(attribute, "DESC");
			}
			if(attribute == "surname"){
				neo4jUsers = await db.getUsersSorted(attribute, "DESC");
			}
			if(attribute == "lastInteraction"){
				neo4jUsers = await db.getUsersSortedByLastInteraction("DESC");
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

// pour convertir un timeStamp en String
function convertTimeStampToString(intDate){

    let date = new Date(intDate * 1000).toLocaleDateString().split('/');
    let string = `${date[2]}-${date[1]}-${date[0]}T23:00:00Z`;
    return string;
}


// renvoit la liste des dates d'interactions ainsi que leur nombres
// peut être revoir le collecteur, il y a des dates d'intéraction inférieur à la date données en paramètre
app.get('/admin/InteractionDates', (req, res) => {

	(async() => {

		const dateQuestions = await db.getInteractionDates("ANSWERED");
		const dateAnswers = await db.getInteractionDates("ASKED");

		if(!dateQuestions.length && !dateAnswers.length ){

			res.status(404).send({
                answer: "Dates not found",
                dates: [],
                error: -1
            });
		}
		else{

			let allRequests = dateQuestions.concat(dateAnswers);
			let dates = [];

			//créé la liste de dates en string
			for(let res of allRequests){
				let date = convertTimeStampToString(res._fields[0].low);
				dates.push(date);	
			}

			let dicoDate = {};
			// créé un grand dictionnaire avec les dates et leurs nb d'intéraction
			for(let date of dates){

				if(dicoDate[date] == undefined){
					dicoDate[date] = 0;
				}
			}
		
			// on incrémente le nb d'intéractions par date
			for(let date of dates){
				dicoDate[date]++;
			}

			let allDates = [];

			// transformation en liste d'objet pour le composant vue
			for(let elem in dicoDate){
				let objet = {
					date : elem,
					count : dicoDate[elem]
				}
				allDates.push(objet);
			}

			res.status(200).send({
                answer: "Dates found",
                dates: allDates,
                error: 0
            });
		}
	})();
});