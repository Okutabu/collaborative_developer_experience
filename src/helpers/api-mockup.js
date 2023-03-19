const loadMirage = () => import("miragejs");
import { Response } from "miragejs";

const usersKey = 'exemple-key';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

export function loadMirageInDev() {
        if (import.meta.env.MODE === "development") {
            loadMirage().then(({ Server }) => {
                return new Server({
                    routes() {

                        this.namespace = `${import.meta.env.VITE_API_URL}`;

                        this.get(`${this.namespace}/admin/statistics`, () => {
                            return {
                                answer: "Statistics found",
                                nbTags: 999,
                                nbUsers: 888,
                                topTags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
                                error: 0
                            };
                        });

                        // this.post(`${this.namespace}/user/login`, (schema, request) => {
                        //     return authenticate(request);
                        // });
                        this.post(`${this.namespace}/user/login`, (schema, request) => {
                            return {
                                "answer": "User found",
                                "user": {
                                    "idSTOW": { 
                                        "low": 1234,
                                        "high": 0 
                                    },
                                    "lastInteraction": { 
                                        "low": 1234,
                                        "high": 0 
                                    },
                                    "mail": "alex@gmail.com",
                                    "surname": "Alex",
                                    "name": "Dupont"
                                    }
                                }
                            });

                        this.post(`${this.namespace}/user/register`, (schema, request) => {
                            return register(request);
                        });

                        this.get(`${this.namespace}/admin/users`, () => {
                            return getUsers();
                        });

                        this.get(`${this.namespace}/user/:id`, () => {
                            return getUserById();
                        });

                        this.put(`${this.namespace}/user/:id`, () => {
                            return updateUser(request);
                        });

                        this.delete(`${this.namespace}/user/:id`, () => {
                            return deleteUser();
                        });
                        this.get(`${this.namespace}/admin/users`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/lastInteraction`, () => {
                            return {
                                "answer": "Users found",
                                "users": [

                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/lastInteraction/desc`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/name`, () => {
                            return {
                                "answer": "Users found",
                                "users": [

                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/name/desc`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/surname`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    }
                                ]}
                        });
                        this.get(`${this.namespace}/admin/users/sort/surname/desc`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 1234,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1678487711,
                                            "high": 0
                                        },
                                        "mail": "bapt.ps3@live.fr",
                                        "surname": "Baptiste",
                                        "name": "Griva"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 20935520,
                                            "high": 0
                                        },
                                        "lastInteraction": {
                                            "low": 1673879022,
                                            "high": 0
                                        },
                                        "mail": "lologan789@gmail.com",
                                        "surname": "Logan",
                                        "name": "Goddard"
                                    }
                                ]}
                        });


                        this.get(`${this.namespace}/:idSTOW/similarity/answer`, () => {
                            return {
                                    "answer": "Users found", 
                                    "users":[ 
                                                [ {   
                                                    "idSTOW": { "low": 11804213, "high": 0 }, 
                                                    "pseudo": "AlexD", 
                                                    "avatar": "https://i.stack.imgur.com/2lm9w.jpg?s=256&g=1" },
                                                    [ 
                                                        { "techno": "VueJS", "ratio": 16.52941176470588 }, 
                                                        { "techno": "material-ui", "ratio": 17.647058823529413 }, 
                                                        { "techno": "http-live-streaming", "ratio": 8.823529411764707 }, 
                                                        { "techno": "vercel", "ratio": 8.823529411764707 }, 
                                                        { "techno": "hls.js", "ratio": 8.823529411764707 } ] ],
                                                // [ { 
                                                //     "idSTOW": { "low": 20740880, "high": 0 }, 
                                                //     "pseudo": "PolarBear", 
                                                //     "avatar": "https://www.gravatar.com/avatar/a125846e788fa0f180710a8c22942ff4?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "django", "ratio": 28.000000000000004 },
                                                //         { "techno": "django-models", "ratio": 18 }, 
                                                //         { "techno": "python", "ratio": 17 }, 
                                                //         { "techno": "slugify", "ratio": 15 }, 
                                                //         { "techno": "django-views", "ratio": 6 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 20864520, "high": 0 }, 
                                                //     "pseudo": "Kiarash Fazli", 
                                                //     "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "fastapi", "ratio": 31.57894736842105 },
                                                //         { "techno": "python", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "passwords", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "pydantic", "ratio": 5.263157894736842 }, 
                                                //         { "techno": "mongodb", "ratio": 5.263157894736842 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 56541, "high": 0 }, 
                                                //     "pseudo": "David Z", 
                                                //     "avatar": "https://i.stack.imgur.com/Wm7Xg.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "latex", "ratio": 18.181818181818183 }, 
                                                //         { "techno": "git", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "shell", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "peek", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "git-submodules", "ratio": 9.090909090909092 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 250259, "high": 0 }, 
                                                //     "pseudo": "John Conde", 
                                                //     "avatar": "https://www.gravatar.com/avatar/64839d31baaefafa58120e1a5a503d66?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "php", "ratio": 20 }, 
                                                //         { "techno": "authorize.net", "ratio": 11.428571428571429 }, 
                                                //         { "techno": "python", "ratio": 8.571428571428571 }, 
                                                //         { "techno": "django", "ratio": 5.714285714285714 }, 
                                                //         { "techno": "foreach", "ratio": 5.714285714285714 } ] ] 
                                            ], "error": 0 
                                }
                        });

                        this.get(`${this.namespace}/:idSTOW/similarity/cosinus`, () => {
                            return {
                                
                                    "answer": "Users found", 
                                    "users":[ 
                                                [ {   
                                                    "idSTOW": { "low": 11804213, "high": 0 }, 
                                                    "pseudo": "zinzinboy", 
                                                    "avatar": "https://www.gravatar.com/avatar/a125846e788fa0f180710a8c22942ff4?s=256&d=identicon&r=PG" },
                                                    [ 
                                                        { "techno": "chatgpt", "ratio": 13.52941176470588 }, 
                                                        { "techno": "material-ui", "ratio": 17.647058823529413 }, 
                                                        { "techno": "http-live-streaming", "ratio": 8.823529411764707 }, 
                                                        { "techno": "vercel", "ratio": 8.823529411764707 }, 
                                                        { "techno": "hls.js", "ratio": 8.823529411764707 } ] ],
                                                // [ { 
                                                //     "idSTOW": { "low": 20740880, "high": 0 }, 
                                                //     "pseudo": "PolarBear", 
                                                //     "avatar": "https://www.gravatar.com/avatar/a125846e788fa0f180710a8c22942ff4?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "django", "ratio": 28.000000000000004 },
                                                //         { "techno": "django-models", "ratio": 18 }, 
                                                //         { "techno": "python", "ratio": 17 }, 
                                                //         { "techno": "slugify", "ratio": 15 }, 
                                                //         { "techno": "django-views", "ratio": 6 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 20864520, "high": 0 }, 
                                                //     "pseudo": "Kiarash Fazli", 
                                                //     "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "fastapi", "ratio": 31.57894736842105 },
                                                //         { "techno": "python", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "passwords", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "pydantic", "ratio": 5.263157894736842 }, 
                                                //         { "techno": "mongodb", "ratio": 5.263157894736842 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 56541, "high": 0 }, 
                                                //     "pseudo": "David Z", 
                                                //     "avatar": "https://i.stack.imgur.com/Wm7Xg.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "latex", "ratio": 18.181818181818183 }, 
                                                //         { "techno": "git", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "shell", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "peek", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "git-submodules", "ratio": 9.090909090909092 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 250259, "high": 0 }, 
                                                //     "pseudo": "John Conde", 
                                                //     "avatar": "https://www.gravatar.com/avatar/64839d31baaefafa58120e1a5a503d66?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "php", "ratio": 20 }, 
                                                //         { "techno": "authorize.net", "ratio": 11.428571428571429 }, 
                                                //         { "techno": "python", "ratio": 8.571428571428571 }, 
                                                //         { "techno": "django", "ratio": 5.714285714285714 }, 
                                                //         { "techno": "foreach", "ratio": 5.714285714285714 } ] ] 
                                            ], "error": 0 
                                }
                        });

                        this.get(`${this.namespace}/:idSTOW/similarity/question`, () => {
                            return {
                                
                                    "answer": "Users found", 
                                    "users":[ 
                                                [ {   
                                                    "idSTOW": { "low": 11804213, "high": 0 }, 
                                                    "pseudo": "Franck", 
                                                    "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" },
                                                    [ 
                                                        { "techno": "Macmini", "ratio": 18.52941176470588 }, 
                                                        { "techno": "material-ui", "ratio": 17.647058823529413 }, 
                                                        { "techno": "http-live-streaming", "ratio": 8.823529411764707 }, 
                                                        { "techno": "vercel", "ratio": 8.823529411764707 }, 
                                                        { "techno": "hls.js", "ratio": 8.823529411764707 } ] ],
                                                // [ { 
                                                //     "idSTOW": { "low": 20740880, "high": 0 }, 
                                                //     "pseudo": "PolarBear", 
                                                //     "avatar": "https://www.gravatar.com/avatar/a125846e788fa0f180710a8c22942ff4?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "django", "ratio": 28.000000000000004 },
                                                //         { "techno": "django-models", "ratio": 18 }, 
                                                //         { "techno": "python", "ratio": 17 }, 
                                                //         { "techno": "slugify", "ratio": 15 }, 
                                                //         { "techno": "django-views", "ratio": 6 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 20864520, "high": 0 }, 
                                                //     "pseudo": "Kiarash Fazli", 
                                                //     "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "fastapi", "ratio": 31.57894736842105 },
                                                //         { "techno": "python", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "passwords", "ratio": 21.052631578947366 }, 
                                                //         { "techno": "pydantic", "ratio": 5.263157894736842 }, 
                                                //         { "techno": "mongodb", "ratio": 5.263157894736842 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 56541, "high": 0 }, 
                                                //     "pseudo": "David Z", 
                                                //     "avatar": "https://i.stack.imgur.com/Wm7Xg.png?s=256&g=1" }, 
                                                //     [ 
                                                //         { "techno": "latex", "ratio": 18.181818181818183 }, 
                                                //         { "techno": "git", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "shell", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "peek", "ratio": 9.090909090909092 }, 
                                                //         { "techno": "git-submodules", "ratio": 9.090909090909092 } ] ], 
                                                // [ { 
                                                //     "idSTOW": { "low": 250259, "high": 0 }, 
                                                //     "pseudo": "John Conde", 
                                                //     "avatar": "https://www.gravatar.com/avatar/64839d31baaefafa58120e1a5a503d66?s=256&d=identicon&r=PG" }, 
                                                //     [ 
                                                //         { "techno": "php", "ratio": 20 }, 
                                                //         { "techno": "authorize.net", "ratio": 11.428571428571429 }, 
                                                //         { "techno": "python", "ratio": 8.571428571428571 }, 
                                                //         { "techno": "django", "ratio": 5.714285714285714 }, 
                                                //         { "techno": "foreach", "ratio": 5.714285714285714 } ] ] 
                                            ], "error": 0 
                                }
                        });
                                

                        //default route
                        
                        this.passthrough(request => {
                            new Response(404, {ok: false, ...headers(), json: () => Promise.resolve(body(request))}, {error: "Route not found"});
                        }
                        )
                        

                    },
                });
            });
        }

        function authenticate(request) {
            const { idSTOW } = body(request);
            const user = users.find(x => x.idSTOW === idSTOW);

            if (!user) return error('Id is not subscribed');

            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            });
        }

        function register(request) {
            const user = body(request);
            

            if (users.find(x => x.idSTOW === user.idSTOW)) {
                return error('ID "' + user.id + '" is already registered')
            }

            user.primary_id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {

            return {
                "idSTOW": {
                    "low": 20935520,
                    "high": 0
                },
                "lastInteraction": {
                    "low": 1673879022,
                    "high": 0
                },
                "mail": "lologan789@gmail.com",
                "surname": "Logan",
                "name": "Goddard"
            }
        }

        function updateUser(request) {

            let params = body(request);

            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // if username changed check if taken
            if (params.username !== user.username && users.find(x => x.username === params.username)) {
                return error('Username "' + params.username + '" is already taken')
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions updated

        function ok(body) {
            new Response({ ok: true, ...headers(), json: () => Promise.resolve(body) })
        }

        function unauthorized() {
            new Response({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
        }

        function error(message) {
            new Response({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
        }

        function basicDetails(user) {
            const { id, mail, surname, name, idSTOW } = user;
            return { id, mail, surname, name, idSTOW };
        }

        function isAuthenticated(request) {
            return request.headers['Authorization'] === 'Bearer fake-jwt-token';
        }

        function body(request) {
            return request.requestBody && JSON.parse(request.requestBody);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function headers() {
            return {
                headers: {
                    get(key) {
                        return ['application/json'];
                    }
                }
            }
        }


}