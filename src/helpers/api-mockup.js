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
                                "answer": "Statistics found",
                                "nbTags": 1626,
                                "nbUsers": 137,
                                "topTags": [
                                    {
                                        "tag": "python",
                                        "nbInteractions": 125
                                    },
                                    {
                                        "tag": "javascript",
                                        "nbInteractions": 59
                                    },
                                    {
                                        "tag": "flutter",
                                        "nbInteractions": 59
                                    },
                                    {
                                        "tag": "java",
                                        "nbInteractions": 54
                                    },
                                    {
                                        "tag": "android",
                                        "nbInteractions": 41
                                    }
                                ],
                                "nbInteractions": 871,
                                "nbAnswers": 863,
                                "nbActiveUsers": 871,
                                "tagsWithMostUsers": [
                                    {
                                        "tag": "python",
                                        "nbInteractions": 125
                                    },
                                    {
                                        "tag": "javascript",
                                        "nbInteractions": 59
                                    },
                                    {
                                        "tag": "flutter",
                                        "nbInteractions": 59
                                    },
                                    {
                                        "tag": "java",
                                        "nbInteractions": 54
                                    },
                                    {
                                        "tag": "android",
                                        "nbInteractions": 41
                                    }
                                ],
                                "error": 0
                            }
                        });

                        // this.post(`${this.namespace}/user/login`, (schema, request) => {
                        //     return authenticate(request);
                        // });
                        this.post(`${this.namespace}/user/login`, (schema, request) => {
                            return {
                                "answer": "User found",
                                "user": {
                                    "name": "Mary",
                                    "surname": "Smith",
                                    "avatar": "https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1",
                                    "pseudo": "VonC",
                                    "idSTOW": 6309
                                },
                                "error": 0
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
                        
                        this.get(`${this.namespace}/user/:idSTOW/proficiency`, () => {
                            return {
                                "answer": "Profile found",
                                "userProfile": [
                                    {
                                        "idSTOW": 6309,
                                        "pseudo": "VonC",
                                        "avatar": "https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1"
                                    },
                                    [
                                        {
                                            "techno": "git",
                                            "ratio": 0.24444444444444444
                                        },
                                        {
                                            "techno": "github",
                                            "ratio": 0.15555555555555556
                                        },
                                        {
                                            "techno": "github-api",
                                            "ratio": 0.044444444444444446
                                        },
                                        {
                                            "techno": "hook",
                                            "ratio": 0.044444444444444446
                                        },
                                        {
                                            "techno": "github-actions",
                                            "ratio": 0.044444444444444446
                                        }
                                    ]
                                ],
                                "error": 0
                            }
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
                                            "low": 6309,
                                            "high": 0
                                        },
                                        "mail": "Mary.Smith@email.com",
                                        "surname": "Smith",
                                        "name": "Mary",
                                        "avatar": "https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1",
                                        "pseudo": "VonC"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 13431819,
                                            "high": 0
                                        },
                                        "mail": "Lawrence.Mendoza@email.com",
                                        "surname": "Mendoza",
                                        "name": "Lawrence",
                                        "avatar": "https://i.stack.imgur.com/tw2FU.jpg?s=256&g=1",
                                        "pseudo": "BouncyBits"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 6392120,
                                            "high": 0
                                        },
                                        "mail": "Emma.Williams@email.com",
                                        "surname": "Williams",
                                        "name": "Emma",
                                        "avatar": "https://i.stack.imgur.com/Jnudv.jpg?s=256&g=1",
                                        "pseudo": "xbass540"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 654730,
                                            "high": 0
                                        },
                                        "mail": "Elizabeth.Brown@email.com",
                                        "surname": "Brown",
                                        "name": "Elizabeth",
                                        "avatar": "https://www.gravatar.com/avatar/58745021dbc7642c62e9a67eccb94ddf?s=256&d=identicon&r=PG",
                                        "pseudo": "Jaydeep Khamar"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 12439119,
                                            "high": 0
                                        },
                                        "mail": "Minnie.Jones@email.com",
                                        "surname": "Jones",
                                        "name": "Minnie",
                                        "avatar": "https://www.gravatar.com/avatar/158a3ae1466f740f8b74e5522260dabf?s=256&d=identicon&r=PG",
                                        "pseudo": "Alexander L. Hayes"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 7297700,
                                            "high": 0
                                        },
                                        "mail": "Margaret.Miller@email.com",
                                        "surname": "Miller",
                                        "name": "Margaret",
                                        "avatar": "https://i.stack.imgur.com/FkQhS.png?s=256&g=1",
                                        "pseudo": "David Browne - Microsoft"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 2772584,
                                            "high": 0
                                        },
                                        "mail": "Ida.Davis@email.com",
                                        "surname": "Davis",
                                        "name": "Ida",
                                        "avatar": "https://www.gravatar.com/avatar/6564ff71c6813f28cb51fe8b4720b61b?s=256&d=identicon&r=PG&f=1",
                                        "pseudo": "zombi_man"
                                    }
                                ],
                                "error": 0
                            }
                        });
                        this.get(`${this.namespace}/admin/users/sort/lastInteraction`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 905,
                                            "high": 0
                                        },
                                        "mail": "Lillian.Allen@email.com",
                                        "surname": "Allen",
                                        "name": "Lillian",
                                        "avatar": "https://www.gravatar.com/avatar/130b8a67fd029b2e6b5e56e7aad04952?s=256&d=identicon&r=PG",
                                        "pseudo": "Keith"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 12950,
                                            "high": 0
                                        },
                                        "mail": "Louise.Green@email.com",
                                        "surname": "Green",
                                        "name": "Louise",
                                        "avatar": "https://www.gravatar.com/avatar/00aa1356e6f90fca08b36fb3c8d230c5?s=256&d=identicon&r=PG",
                                        "pseudo": "tvanfosson"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 250259,
                                            "high": 0
                                        },
                                        "mail": "Herman.Hayes@email.com",
                                        "surname": "Hayes",
                                        "name": "Herman",
                                        "avatar": "https://www.gravatar.com/avatar/64839d31baaefafa58120e1a5a503d66?s=256&d=identicon&r=PG",
                                        "pseudo": "John Conde"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 6527049,
                                            "high": 0
                                        },
                                        "mail": "Clara.Anderson@email.com",
                                        "surname": "Anderson",
                                        "name": "Clara",
                                        "avatar": "https://i.stack.imgur.com/6HADc.jpg?s=256&g=1",
                                        "pseudo": "Vivek Nuna"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 238704,
                                            "high": 0
                                        },
                                        "mail": "Marie.Flores@email.com",
                                        "surname": "Flores",
                                        "name": "Marie",
                                        "avatar": "https://i.stack.imgur.com/VgOZI.png?s=256&g=1",
                                        "pseudo": "President James K. Polk"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 34088,
                                            "high": 0
                                        },
                                        "mail": "Mabel.Lee@email.com",
                                        "surname": "Lee",
                                        "name": "Mabel",
                                        "avatar": "https://www.gravatar.com/avatar/8a4d6f03a8879432d8563aefbf48e787?s=256&d=identicon&r=PG",
                                        "pseudo": "Aaron Digulla"
                                    }
                                ],
                                    "error": 0
                            }
                        });
                        this.get(`${this.namespace}/admin/users/sort/name`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 1426227,
                                            "high": 0
                                        },
                                        "mail": "Ada.Sanchez@email.com",
                                        "surname": "Sanchez",
                                        "name": "Ada",
                                        "avatar": "https://i.stack.imgur.com/ElYch.jpg?s=256&g=1",
                                        "pseudo": "cassiomolin"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 17959618,
                                            "high": 0
                                        },
                                        "mail": "Agnes.Stewart@email.com",
                                        "surname": "Stewart",
                                        "name": "Agnes",
                                        "avatar": "https://lh3.googleusercontent.com/a/AATXAJyYkyQZyVsqUULsjnZOkcdYfaMSNmt9V61q7Fh3=k-s256",
                                        "pseudo": "PTS390"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 234590,
                                            "high": 0
                                        },
                                        "mail": "Albert.Myers@email.com",
                                        "surname": "Myers",
                                        "name": "Albert",
                                        "avatar": "https://www.gravatar.com/avatar/463c0219a51a5d1fd08e1fa280811b57?s=256&d=identicon&r=PG",
                                        "pseudo": "Francis Gagn&#233;"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 714501,
                                            "high": 0
                                        },
                                        "mail": "Alfred.Patterson@email.com",
                                        "surname": "Patterson",
                                        "name": "Alfred",
                                        "avatar": "https://www.gravatar.com/avatar/a2090a0ffd27b055c8fa22a8e59476d0?s=256&d=identicon&r=PG",
                                        "pseudo": "cnicutar"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 2257564,
                                            "high": 0
                                        },
                                        "mail": "Alice.Garcia@email.com",
                                        "surname": "Garcia",
                                        "name": "Alice",
                                        "avatar": "https://www.gravatar.com/avatar/eb78ad434c7af64f1fb6d3d35297b0f6?s=256&d=identicon&r=PG",
                                        "pseudo": "user2257564"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 1420701,
                                            "high": 0
                                        },
                                        "mail": "Andrew.Russell@email.com",
                                        "surname": "Russell",
                                        "name": "Andrew",
                                        "avatar": "https://www.gravatar.com/avatar/ac859ce59977be80cb188d3ffdeea1f8?s=256&d=identicon&r=PG",
                                        "pseudo": "augsteyer"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 3943312,
                                            "high": 0
                                        },
                                        "mail": "Annie.Martinez@email.com",
                                        "surname": "Martinez",
                                        "name": "Annie",
                                        "avatar": "https://www.gravatar.com/avatar/fc00b38b94ca7b6f820622b0a8af8ded?s=256&d=identicon&r=PG",
                                        "pseudo": "Sam Varshavchik"
                                    }
                                ],
                                "error": 0
                            }
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
                                            "low": 14172808,
                                            "high": 0
                                        },
                                        "mail": "Lula.Adams@email.com",
                                        "surname": "Adams",
                                        "name": "Lula",
                                        "avatar": "https://www.gravatar.com/avatar/8ee2c5646c5ab45082023c8da7e66020?s=256&d=identicon&r=PG&f=1",
                                        "pseudo": "RaPtiLE"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 16475264,
                                            "high": 0
                                        },
                                        "mail": "Carl.Alexander@email.com",
                                        "surname": "Alexander",
                                        "name": "Carl",
                                        "avatar": "https://i.stack.imgur.com/QsIVA.png?s=256&g=1",
                                        "pseudo": "Vikrant Pandey"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 905,
                                            "high": 0
                                        },
                                        "mail": "Lillian.Allen@email.com",
                                        "surname": "Allen",
                                        "name": "Lillian",
                                        "avatar": "https://www.gravatar.com/avatar/130b8a67fd029b2e6b5e56e7aad04952?s=256&d=identicon&r=PG",
                                        "pseudo": "Keith"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 5425860,
                                            "high": 0
                                        },
                                        "mail": "Otto.Alvarez@email.com",
                                        "surname": "Alvarez",
                                        "name": "Otto",
                                        "avatar": "https://i.stack.imgur.com/d6fgg.jpg?s=256&g=1",
                                        "pseudo": "Faiz Ahmad Dae"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 6527049,
                                            "high": 0
                                        },
                                        "mail": "Clara.Anderson@email.com",
                                        "surname": "Anderson",
                                        "name": "Clara",
                                        "avatar": "https://i.stack.imgur.com/6HADc.jpg?s=256&g=1",
                                        "pseudo": "Vivek Nuna"
                                    }
                                ],
                                "error": 0
                            }
                        });
                        this.get(`${this.namespace}/admin/users/sort/surname/desc`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 2303865,
                                            "high": 0
                                        },
                                        "mail": "Catherine.Young@email.com",
                                        "surname": "Young",
                                        "name": "Catherine",
                                        "avatar": "https://i.stack.imgur.com/varL9.jpg?s=256&g=1",
                                        "pseudo": "Leo Dabus"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 954940,
                                            "high": 0
                                        },
                                        "mail": "Lillie.Wright@email.com",
                                        "surname": "Wright",
                                        "name": "Lillie",
                                        "avatar": "https://i.stack.imgur.com/8VrIO.jpg?s=256&g=1",
                                        "pseudo": "Adam Jenkins"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 12349734,
                                            "high": 0
                                        },
                                        "mail": "Luther.Woods@email.com",
                                        "surname": "Woods",
                                        "name": "Luther",
                                        "avatar": "https://www.gravatar.com/avatar/43d5578dec3745c33be38236b05566b3?s=256&d=identicon&r=PG&f=1",
                                        "pseudo": "MendelG"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 825,
                                            "high": 0
                                        },
                                        "mail": "Frank.Wood@email.com",
                                        "surname": "Wood",
                                        "name": "Frank",
                                        "avatar": "https://www.gravatar.com/avatar/8cff0e19c525c987e7fe10a3e3aef350?s=256&d=identicon&r=PG",
                                        "pseudo": "Pat Notz"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 564406,
                                            "high": 0
                                        },
                                        "mail": "Sarah.Wilson@email.com",
                                        "surname": "Wilson",
                                        "name": "Sarah",
                                        "avatar": "https://www.gravatar.com/avatar/ebb844b75738159b0888db4ce91be0d3?s=256&d=identicon&r=PG",
                                        "pseudo": "David"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 6392120,
                                            "high": 0
                                        },
                                        "mail": "Emma.Williams@email.com",
                                        "surname": "Williams",
                                        "name": "Emma",
                                        "avatar": "https://i.stack.imgur.com/Jnudv.jpg?s=256&g=1",
                                        "pseudo": "xbass540"
                                    }
                                ],
                                "error": 0
                            }
                        });


                        this.get(`${this.namespace}/user/:idSTOW/similarity/answer`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    [
                                        {
                                            "idSTOW": 20790167,
                                            "pseudo": "James Goetz",
                                            "avatar": "https://graph.facebook.com/10208621294004014/picture?type=large"
                                        },
                                        [
                                            {
                                                "techno": "flutter-routes",
                                                "ratio": 0.14285714285714285
                                            },
                                            {
                                                "techno": "flutter-go-router",
                                                "ratio": 0.14285714285714285
                                            },
                                            {
                                                "techno": "flutter",
                                                "ratio": 0.14285714285714285
                                            },
                                            {
                                                "techno": "android",
                                                "ratio": 0.14285714285714285
                                            },
                                            {
                                                "techno": "git",
                                                "ratio": 0.14285714285714285
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 3962914,
                                            "pseudo": "Ronak Shah",
                                            "avatar": "https://i.stack.imgur.com/tGgv6.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "r",
                                                "ratio": 0.3584905660377358
                                            },
                                            {
                                                "techno": "dplyr",
                                                "ratio": 0.09433962264150944
                                            },
                                            {
                                                "techno": "dataframe",
                                                "ratio": 0.07547169811320754
                                            },
                                            {
                                                "techno": "tidyverse",
                                                "ratio": 0.05660377358490566
                                            },
                                            {
                                                "techno": "git-blame",
                                                "ratio": 0.018867924528301886
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 3962914,
                                            "pseudo": "Ronak Shah",
                                            "avatar": "https://i.stack.imgur.com/tGgv6.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "r",
                                                "ratio": 0.3584905660377358
                                            },
                                            {
                                                "techno": "dplyr",
                                                "ratio": 0.09433962264150944
                                            },
                                            {
                                                "techno": "dataframe",
                                                "ratio": 0.07547169811320754
                                            },
                                            {
                                                "techno": "tidyverse",
                                                "ratio": 0.05660377358490566
                                            },
                                            {
                                                "techno": "git-blame",
                                                "ratio": 0.018867924528301886
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 3962914,
                                            "pseudo": "Ronak Shah",
                                            "avatar": "https://i.stack.imgur.com/tGgv6.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "r",
                                                "ratio": 0.3584905660377358
                                            },
                                            {
                                                "techno": "dplyr",
                                                "ratio": 0.09433962264150944
                                            },
                                            {
                                                "techno": "dataframe",
                                                "ratio": 0.07547169811320754
                                            },
                                            {
                                                "techno": "tidyverse",
                                                "ratio": 0.05660377358490566
                                            },
                                            {
                                                "techno": "git-blame",
                                                "ratio": 0.018867924528301886
                                            }
                                        ]
                                    ]
                                ],
                                "error": 0
                            }
                        });

                        this.get(`${this.namespace}/user/:idSTOW/similarity/cosinus`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    [
                                        {
                                            "idSTOW": 3288890,
                                            "pseudo": "Adiii",
                                            "avatar": "https://i.stack.imgur.com/sSQpx.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "docker",
                                                "ratio": 0.20689655172413793
                                            },
                                            {
                                                "techno": "docker-compose",
                                                "ratio": 0.08620689655172414
                                            },
                                            {
                                                "techno": "amazon-web-services",
                                                "ratio": 0.06896551724137931
                                            },
                                            {
                                                "techno": "amazon-ec2",
                                                "ratio": 0.05172413793103448
                                            },
                                            {
                                                "techno": "node.js",
                                                "ratio": 0.05172413793103448
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 14853666,
                                            "pseudo": "Anjan Talatam",
                                            "avatar": "https://i.stack.imgur.com/5NSkZ.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "javascript",
                                                "ratio": 0.12244897959183673
                                            },
                                            {
                                                "techno": "reactjs",
                                                "ratio": 0.10204081632653061
                                            },
                                            {
                                                "techno": "typescript",
                                                "ratio": 0.10204081632653061
                                            },
                                            {
                                                "techno": "node.js",
                                                "ratio": 0.061224489795918366
                                            },
                                            {
                                                "techno": "css",
                                                "ratio": 0.04081632653061224
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 56541,
                                            "pseudo": "David Z",
                                            "avatar": "https://i.stack.imgur.com/Wm7Xg.png?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "git",
                                                "ratio": 0.3333333333333333
                                            },
                                            {
                                                "techno": "calendar",
                                                "ratio": 0.16666666666666666
                                            },
                                            {
                                                "techno": "datetime",
                                                "ratio": 0.16666666666666666
                                            },
                                            {
                                                "techno": "python",
                                                "ratio": 0.16666666666666666
                                            },
                                            {
                                                "techno": "bash",
                                                "ratio": 0.16666666666666666
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 947357,
                                            "pseudo": "A.H.",
                                            "avatar": "https://i.stack.imgur.com/wW1C6.png?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "git",
                                                "ratio": 0.5
                                            },
                                            {
                                                "techno": "version-control",
                                                "ratio": 0.25
                                            },
                                            {
                                                "techno": "svn",
                                                "ratio": 0.25
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 107409,
                                            "pseudo": "Contango",
                                            "avatar": "https://i.stack.imgur.com/lGv9q.png?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "python",
                                                "ratio": 0.2
                                            },
                                            {
                                                "techno": "tensorflow",
                                                "ratio": 0.05
                                            },
                                            {
                                                "techno": "keras",
                                                "ratio": 0.03333333333333333
                                            },
                                            {
                                                "techno": "nfs",
                                                "ratio": 0.03333333333333333
                                            },
                                            {
                                                "techno": "git",
                                                "ratio": 0.03333333333333333
                                            }
                                        ]
                                    ]
                                ],
                                "error": 0
                            }
                        });

                        this.get(`${this.namespace}/user/:idSTOW/similarity/question`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    [
                                        {
                                            "idSTOW": 2016562,
                                            "pseudo": "Gabriele Mariotti",
                                            "avatar": "https://www.gravatar.com/avatar/2433495de6d2b99746f8e25344209fa7?s=256&d=identicon&r=PG"
                                        },
                                        [
                                            {
                                                "techno": "android-jetpack-compose",
                                                "ratio": 0.26153846153846155
                                            },
                                            {
                                                "techno": "android",
                                                "ratio": 0.26153846153846155
                                            },
                                            {
                                                "techno": "kotlin",
                                                "ratio": 0.06153846153846154
                                            },
                                            {
                                                "techno": "android-jetpack",
                                                "ratio": 0.046153846153846156
                                            },
                                            {
                                                "techno": "android-compose-textfield",
                                                "ratio": 0.03076923076923077
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 8951377,
                                            "pseudo": "ppotaczek",
                                            "avatar": "https://i.stack.imgur.com/2MYqI.jpg?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "highcharts",
                                                "ratio": 0.3137254901960784
                                            },
                                            {
                                                "techno": "reactjs",
                                                "ratio": 0.09803921568627451
                                            },
                                            {
                                                "techno": "javascript",
                                                "ratio": 0.09803921568627451
                                            },
                                            {
                                                "techno": "typescript",
                                                "ratio": 0.0784313725490196
                                            },
                                            {
                                                "techno": "angular",
                                                "ratio": 0.058823529411764705
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 20774099,
                                            "pseudo": "Nams",
                                            "avatar": "https://www.gravatar.com/avatar/0e305ba2866f3f44b45795e9210830be?s=256&d=identicon&r=PG"
                                        },
                                        [
                                            {
                                                "techno": "flutter",
                                                "ratio": 0.3870967741935484
                                            },
                                            {
                                                "techno": "android",
                                                "ratio": 0.12903225806451613
                                            },
                                            {
                                                "techno": "dart",
                                                "ratio": 0.06451612903225806
                                            },
                                            {
                                                "techno": "mobile-development",
                                                "ratio": 0.03225806451612903
                                            },
                                            {
                                                "techno": "mobile",
                                                "ratio": 0.03225806451612903
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 107409,
                                            "pseudo": "Contango",
                                            "avatar": "https://i.stack.imgur.com/lGv9q.png?s=256&g=1"
                                        },
                                        [
                                            {
                                                "techno": "python",
                                                "ratio": 0.2
                                            },
                                            {
                                                "techno": "tensorflow",
                                                "ratio": 0.05
                                            },
                                            {
                                                "techno": "keras",
                                                "ratio": 0.03333333333333333
                                            },
                                            {
                                                "techno": "nfs",
                                                "ratio": 0.03333333333333333
                                            },
                                            {
                                                "techno": "git",
                                                "ratio": 0.03333333333333333
                                            }
                                        ]
                                    ],
                                    [
                                        {
                                            "idSTOW": 12349734,
                                            "pseudo": "MendelG",
                                            "avatar": "https://www.gravatar.com/avatar/43d5578dec3745c33be38236b05566b3?s=256&d=identicon&r=PG&f=1"
                                        },
                                        [
                                            {
                                                "techno": "flutter",
                                                "ratio": 0.3333333333333333
                                            },
                                            {
                                                "techno": "dart",
                                                "ratio": 0.1388888888888889
                                            },
                                            {
                                                "techno": "android",
                                                "ratio": 0.05555555555555555
                                            },
                                            {
                                                "techno": "beautifulsoup",
                                                "ratio": 0.027777777777777776
                                            },
                                            {
                                                "techno": "web-scraping",
                                                "ratio": 0.027777777777777776
                                            }
                                        ]
                                    ]
                                ],
                                "error": 0
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