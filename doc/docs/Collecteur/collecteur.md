# Le collecteur

>En quelques mots, il récupère les données StackOverflow nécessaires sur 3 mois d'utilisation de chaque utilisateur enregistré sur notre plateforme, s'occupe de calculer toutes les similarités entre les utilisateurs puis de créer les noeuds et relations correspondants sur Neo4j.

# Execution

>Notre collecteur a besoin d'être lancé manuellement via la commande :
>
    Node launch_collector.js
>
>La marge de temps sur laquelle sont récupérés les données de StackOverflow est modifiable dans **launch_collecteur.js** de la ligne 15 à la ligne 17.