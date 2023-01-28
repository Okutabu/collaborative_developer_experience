import random
#TODO: Affiner le script qui génère des données de test: 100000 utilisateurs
#TODO: Ajouter les contraintes sur les données générées
#TODO: Ajouter le calcul de proximité entre les tags
#TODO: Donner une unité de mesure à la distance pour chaque métrique
#TODO: supprimer les lignes qui calculent les ratios et remplacer par une boucle

user_list = []
nb_votes_range = (0, 100)
#1 il faut des tags favoris pour les gens qui ont beaucoup de tags
#2 il faut une distribution statistique des tags les plus utilisés (https://minimaxir.com/2018/02/stack-overflow-questions/)
#3 le nombre de tags ne doit pas exceder le nombre de tags par question (1-5) multiplié par le nombre de questions
#4 les gens peuvent poser des questions sur des tags et repondre sur d'autres meme si c'est rare (supposition)
#5 les gens peuvent commenter des questions et des reponses meme si c'est rare (supposition)


for i in range(100000):
    user = {}
    user['id'] = i
    user['nb_votes_up'] = random.randint(*nb_votes_range)
    user['nb_votes_down'] = random.randint(*nb_votes_range)
    user['nb_votes'] = user['nb_votes_up'] + user['nb_votes_down']
    user['nb_tags'] = random.randint(0, 10000)
    user['nb_questions'] = random.randint(0, 20)
    user['nb_answers'] = random.randint(0, 20)
    user['nb_comments'] = random.randint(0, 40)
    user['nb_answers_accepted'] = random.randint(0, user['nb_answers'])
    user['nb_answers_upvoted'] = random.randint(0, user['nb_answers'])
    user['nb_answers_downvoted'] = random.randint(0, user['nb_answers'])
    user['nb_questions_upvoted'] = random.randint(0, user['nb_questions'])
    user['nb_questions_downvoted'] = random.randint(0, user['nb_questions'])
    user['nb_comments_upvoted'] = random.randint(0, user['nb_comments'])
    user['nb_comments_downvoted'] = random.randint(0, user['nb_comments'])
    user['nb_answers_per_question'] = user['nb_answers'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_comments_per_question'] = user['nb_comments'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_comments_per_answer'] = user['nb_comments'] / user['nb_answers'] if user['nb_answers'] else 0
    user['nb_answers_accepted_per_question'] = user['nb_answers_accepted'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_answers_upvoted_per_answer'] = user['nb_answers_upvoted'] / user['nb_answers'] if user['nb_answers'] else 0
    user['nb_answers_downvoted_per_answer'] = user['nb_answers_downvoted'] / user['nb_answers'] if user['nb_answers'] else 0
    user['nb_questions_upvoted_per_question'] = user['nb_questions_upvoted'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_questions_downvoted_per_question'] = user['nb_questions_downvoted'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_comments_upvoted_per_comment'] = user['nb_comments_upvoted'] / user['nb_comments'] if user['nb_comments'] else 0
    user['nb_comments_downvoted_per_comment'] = user['nb_comments_downvoted'] / user['nb_comments'] if user['nb_comments'] else 0
    user['nb_votes_up_per_vote'] = user['nb_votes_up'] / user['nb_votes'] if user['nb_votes'] else 0
    user['nb_votes_down_per_vote'] = user['nb_votes_down'] / user['nb_votes'] if user['nb_votes'] else 0
    user['nb_tags_per_question'] = user['nb_tags'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_tags_per_answer'] = user['nb_tags'] / user['nb_answers'] if user['nb_answers'] else 0
    user['nb_tags_per_comment'] = user['nb_tags'] / user['nb_comments'] if user['nb_comments'] else 0
    user['nb_votes_per_question'] = user['nb_votes'] / user['nb_questions'] if user['nb_questions'] else 0
    user['nb_votes_per_answer'] = user['nb_votes'] / user['nb_answers'] if user['nb_answers'] else 0
    user['nb_votes_per_comment'] = user['nb_votes'] / user['nb_comments'] if user['nb_comments'] else 0
    user['nb_votes_per_tag'] = user['nb_votes'] / user['nb_tags'] if user['nb_tags'] else 0
    nb_jetons_answers = user['nb_answers']
    nb_jetons_questions = user['nb_questions']
    nb_jetons_comments = user['nb_comments']
    nb_jetons_answer_accepted = user['nb_answers_accepted']
    nb_jetons_answer_upvoted = user['nb_answers_upvoted']
    nb_jetons_answer_downvoted = user['nb_answers_downvoted']
    nb_jetons_question_upvoted = user['nb_questions_upvoted']
    nb_jetons_question_downvoted = user['nb_questions_downvoted']

    for i in range(user['nb_tags']):
        probability_this_tag_was_used = (1/user['nb_tags'])
        while(nb_jetons_answers > 0 and random.random() <= probability_this_tag_was_used):
            nb_answers = random.randint(0, nb_jetons_answers)
            nb_answers_accepted = random.randint(0, nb_jetons_answer_accepted)
            nb_answers_upvoted = random.randint(0, nb_jetons_answer_upvoted)
            nb_answers_downvoted = random.randint(0, nb_jetons_answer_downvoted)
            # a finir / transformer en fonction
            #user['answer_tag_{}'.format(i)] = nb_answers 

#Pour recommender les utilisateurs les plus similaires à un utilisateur donné on peut utiliser la similarité cosinus
#Parcequ'elle fait abstraction de la magnitude/norme des vecteurs

