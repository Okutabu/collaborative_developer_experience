import random
import scipy as sp

user_list = []
nb_votes_range = (0, 100)

list_of_tags = []
for i in range(1, 16):
    list_of_tags.append('tag' + str(i))

categorie_of_interest = []
for i in range(1, 6):
    categorie_of_interest.append('tag' + str(10+i))



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
