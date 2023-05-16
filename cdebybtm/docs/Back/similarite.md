# Calcul de Similarité

>Le fichier **similarityQueries.js** contient tous les calculs de similarités permettant d'obtenir les recommandations les plus pertinentes.

>Voici la liste des recommandations : 

>- **Similarité Cosinus** : La similarité de cosinus est une mesure de similarité qui mesure la similarité entre deux vecteurs d'objets, Dans ce cas ci, les vecteurs sont les tags d'un utilisateur.

>- **Similarité sur les Réponses** : Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags) puis récupère les utilisateurs qui posent des questions sur les sujets auxquels l'utilisateur principal répond

>- **Similarité sur les Questions** : Récupère les utilisateurs similaires à l'aide de cosinus (qui interagissent sur les même tags) puis récupère les utilisateurs qui répondent aux questions sur le sujet sur lequel l'utilisateur principal pose des questions