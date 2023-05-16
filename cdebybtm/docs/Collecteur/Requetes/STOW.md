# Requêtes StackOverflow

>Contient les requêtes à l'API StackExchange de Stack OverFlow. On commence tout d'abord par récupérer les id des utilisateurs contenu dans un autre fichier
puis on vient récupèrer la liste d'activité de chaque utilisateur dans une tranche de temps donnée. Plus précisément, les données récupérés de cette liste d'activités sont:

>- L'id de la question
>- Le type de l'activité (question/réponse)
>- Le titre du poste
>- La date de l'interaction
>- Les tags liés au poste

>A partir de cette liste d'activité, on accède à chaque
réponse et question posé par un utilisateur et on récupère les tags liés à ceux-ci.

>Le fichie renvoie plusieurs informations sur les questions et réponses posées par un utilisateur. On a donc les informations suivantes:

>## Users :
>>
>>Renvoie toute la liste d'activité d'un utilisateur
>>
    users : [
            {
                "id": 12345,
                "activities": [
                    {
                        "typePost": "answer",
                        "idQuestion": 75131252,
                        "dateInteraction": 1673848584,
                        "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                    },
                    {
                        "typePost": "question",
                        "idQuestion": 75131252,
                        "dateInteraction": 1673848584,
                        "tags": [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]
                    }
                ]
            }
    ]
