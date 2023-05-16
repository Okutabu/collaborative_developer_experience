# Projet Collaborative Developer Experience

> ## Le projet Collaborative Developer Experience permet de mettre en relation des develeppeur d'une même entreprise.

## Architecture

>Le projet est divisée en 3 trois projets nodes. Le collecteur, le front et le back. Pour chacun d'eux, il y a un projet node associé.
>
>Le collecteur permet de récupérer toutes les activcités sur la plateforme Stack Overflow et de les enregistrer dans la bdd.
>
>Le front gère l'interface utilisateur.

## Et le back est utilisé par le front pour afficher les données de la bdd et proposer des similarités.

>Toutes les dépendances sont spécifiés dans le JSON 'package' de chaque projet node. Pour les installer automatiquement il faut rentrer la commande suivante dans le repertoire du projet correspondant : **npm install** ou **npm i**

## Technologies

>- **Neo4j** est une base de donnée de type graphe utile pour répresenter des relations et faire des recommendation.
>
>- **Vue3** est une framework javascript qui permet d'organiser les composants visuels et les données pour une maintenance plus aisée du code.
>
>- **Javascript** permettra de scripter les communications avec les serveurs.