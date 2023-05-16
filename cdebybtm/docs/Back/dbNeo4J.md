# Neo4J

>Dans cette partie, nous avons créés toutes les requêtes servant à la récupération des données de notre base de donnée Neo4J.

>Dans **uri** est contenu l'adresse de connexion à la BDD.

>Dans **user** est contenu le nom d'utilisateur nécessaire à l'accès de la BDD.

>Dans **password** est contenu la clé nécessaire à l'accès de la BDD.

>Voici la liste de toute les requêtes et ce qu'elles récupérent :

>- **createUser** : Insère un nouvel utilisateur dans la bdd
>- **connectUser** : Retourne un utilisateur
>- **getUserTopTags** : Retourne les 5 meilleurs tags de l'utilisateur
>- **getUserProficiency** : Retourne tous les éléments nécessaires à la création de la User Card
>- **getNbTags** : Retourne le nombre de Tags total
>- **getNbUsers** : Retourne le nombre d'Utilisateurs total
>- **getTopTags** : Retourne les 5 Tags les plus récurrents
>- **getUsers** : Retourne tous les utilisateurs
>- **getUsersSorted** : Retourne tous les utilisateurs triés selon l'attribut passé en paramètre
>- **getNbOfActiveUsers** : Retourne le nombre d'utilisateurs qui ont au moins 1 activité
>- **getNbQuestions** : Retourne le nombre total de questions
>- **getNbAnswers** : Retourne le nombre total de réponses
>- **getNbInteractions** : Retourne le nombre total d'intéractions
>- **getTagsWithMostUsers** : Retourne les tags utilisés par le plus grand nombre d'utilisateurs
>- **getInteractionDates** : Retourne toutes les interactions de tous les utilisateurs
>- **getUsersWhoInteractedWithMe** : Retourne tous les utilisateurs qui ont déjà intéragit avec mon utilisateur
>- **getUsersSortedByLastInteraction** : Retourne tous les utilisateurs triés par leur dernière interaction
>- **getNbNodes** : Retourne le nombre total de noeuds
>- **getNbRelations** : Retourne le nombre total de relations
>- **getInteractionDatesUser** : Retourne toutes les interactions d'un utilisateur
>- **getNbQuestionsUser** : Retourne le nombre de questions d'un utilisateur
>- **getNbAnswersUser** : Retourne le nombre de réponses d'un utilisateur
>- **getNbUserIHelped** : Retourne le nombre d'utilisateur que j'ai aidé
>- **getNbUserWhoHelpedMe** : Retourne le nombre d'utilisateur qui m'ont aidé
>- **getQuestionsUserToHelp** : Retourne les questions pour lesquels je peux aider l'utilisateur
>- **deleteUser** : Supprime un utilisateur de la bdd
>- **modifyUser** : Modifie les données d'un utilisateur de la bdd
>- **lastQuestions** : Retourne les 5 dernières questions qui ont été posé