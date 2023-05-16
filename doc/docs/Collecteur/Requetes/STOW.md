# Requêtes StackOverflow

>Contient les requêtes à l'API StackExchange de Stack OverFlow. On commence tout d'abord par récupérer les id des utilisateurs contenu dans un autre fichier
puis on vient récupèrer la liste d'activité de chaque utilisateur dans une tranche de temps donnée. A partir de cette liste d'activité, on accède à chaque
réponse et question posé par un utilisateur et on récupère les tags liés à ceux-ci.

>Le fichie renvoie plusieurs informations sur les questions et réponses posées par un utilisateur. On a donc les informations suivantes:

>## Users :
>>
    typePost: "answer",
    question: { "idQuestion": 75131252, "title": "Comment faire du go sur github avec gopath ?"  }, 
    dateInteraction: 1673848584,
    tags: [ 'go', 'github', 'path', 'oh-my-zsh', 'gopath' ]

>## Tags Réponses :

>## Tags Questions :

>## Tags Users :
>
>>Renvoie toute la liste d'activité d'un utilisateur