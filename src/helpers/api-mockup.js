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
                                        "avatar": "https://i.stack.imgur.com/I4fiW.jpg?s=256&g=1",
                                        "lastInteraction": 1679884919
                                    },
                                    [
                                        {
                                            "techno": "git",
                                            "ratio": 0.1896551724137931
                                        },
                                        {
                                            "techno": "github",
                                            "ratio": 0.13793103448275862
                                        },
                                        {
                                            "techno": "github-actions",
                                            "ratio": 0.06896551724137931
                                        },
                                        {
                                            "techno": "gitlab",
                                            "ratio": 0.06896551724137931
                                        },
                                        {
                                            "techno": "visual-studio-code",
                                            "ratio": 0.034482758620689655
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
                                        "lastInteraction": {
                                            "low": 1679884919,
                                            "high": 0
                                        },
                                        "surname": "Smith",
                                        "topTag": "git",
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
                                        "lastInteraction": {
                                            "low": 1680076627,
                                            "high": 0
                                        },
                                        "surname": "Mendoza",
                                        "topTag": "flutter",
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
                                        "lastInteraction": {
                                            "low": 1665596398,
                                            "high": 0
                                        },
                                        "surname": "Williams",
                                        "topTag": "html",
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
                                        "topTag": "",
                                        "name": "Elizabeth",
                                        "avatar": "https://www.gravatar.com/avatar/58745021dbc7642c62e9a67eccb94ddf?s=256&d=identicon&r=PG",
                                        "pseudo": "Jaydeep Khamar"
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
                                            "low": 12950,
                                            "high": 0
                                        },
                                        "mail": "Louise.Green@email.com",
                                        "lastInteraction": {
                                            "low": 1237922848,
                                            "high": 0
                                        },
                                        "surname": "Green",
                                        "topTag": "moq",
                                        "name": "Louise",
                                        "avatar": "https://www.gravatar.com/avatar/00aa1356e6f90fca08b36fb3c8d230c5?s=256&d=identicon&r=PG",
                                        "pseudo": "tvanfosson"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 422476,
                                            "high": 0
                                        },
                                        "mail": "Elmer.Gonzales@email.com",
                                        "lastInteraction": {
                                            "low": 1286194756,
                                            "high": 0
                                        },
                                        "surname": "Gonzales",
                                        "topTag": "macos",
                                        "name": "Elmer",
                                        "avatar": "https://www.gravatar.com/avatar/d091ed042239b4eec894e2fd089868bc?s=256&d=identicon&r=PG",
                                        "pseudo": "Filip Spiridonov"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 714501,
                                            "high": 0
                                        },
                                        "mail": "Alfred.Patterson@email.com",
                                        "lastInteraction": {
                                            "low": 1328945181,
                                            "high": 0
                                        },
                                        "surname": "Patterson",
                                        "topTag": "c",
                                        "name": "Alfred",
                                        "avatar": "https://www.gravatar.com/avatar/a2090a0ffd27b055c8fa22a8e59476d0?s=256&d=identicon&r=PG",
                                        "pseudo": "cnicutar"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 201952,
                                            "high": 0
                                        },
                                        "mail": "Thomas.Brooks@email.com",
                                        "lastInteraction": {
                                            "low": 1355909200,
                                            "high": 0
                                        },
                                        "surname": "Brooks",
                                        "topTag": "node.js",
                                        "name": "Thomas",
                                        "avatar": "https://i.stack.imgur.com/4wIGc.jpg?s=256&g=1",
                                        "pseudo": "josh3736"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 1154350,
                                            "high": 0
                                        },
                                        "mail": "Edith.Walker@email.com",
                                        "lastInteraction": {
                                            "low": 1417882934,
                                            "high": 0
                                        },
                                        "surname": "Walker",
                                        "topTag": "ionic-framework",
                                        "name": "Edith",
                                        "avatar": "https://i.stack.imgur.com/baIRy.jpg?s=256&g=1",
                                        "pseudo": "Fizer Khan"
                                    }
                                ],
                                "error": 0
                            }
                        });
                        this.get(`${this.namespace}/admin/users/sort/lastInteraction/desc`, () => {
                            return {
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 3962914,
                                            "high": 0
                                        },
                                        "mail": "Cora.Hernandez@email.com",
                                        "lastInteraction": {
                                            "low": 1677837492,
                                            "high": 0
                                        },
                                        "surname": "Hernandez",
                                        "topTag": "r",
                                        "name": "Cora",
                                        "avatar": "https://i.stack.imgur.com/tGgv6.jpg?s=256&g=1",
                                        "pseudo": "Ronak Shah"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 2029983,
                                            "high": 0
                                        },
                                        "mail": "Mattie.Perez@email.com",
                                        "lastInteraction": {
                                            "low": 1680096650,
                                            "high": 0
                                        },
                                        "surname": "Perez",
                                        "topTag": "sql-server",
                                        "name": "Mattie",
                                        "avatar": "https://www.gravatar.com/avatar/0118fb43d1ce086d768e295339cf0ff4?s=256&d=identicon&r=PG",
                                        "pseudo": "Thom A"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 13431819,
                                            "high": 0
                                        },
                                        "mail": "Lawrence.Mendoza@email.com",
                                        "lastInteraction": {
                                            "low": 1680076627,
                                            "high": 0
                                        },
                                        "surname": "Mendoza",
                                        "topTag": "flutter",
                                        "name": "Lawrence",
                                        "avatar": "https://i.stack.imgur.com/tw2FU.jpg?s=256&g=1",
                                        "pseudo": "BouncyBits"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 4788546,
                                            "high": 0
                                        },
                                        "mail": "Joe.Ross@email.com",
                                        "lastInteraction": {
                                            "low": 1679574522,
                                            "high": 0
                                        },
                                        "surname": "Ross",
                                        "topTag": "python",
                                        "name": "Joe",
                                        "avatar": "https://i.stack.imgur.com/Z2jWn.jpg?s=256&g=1",
                                        "pseudo": "CristiFati"
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
                                        "lastInteraction": {
                                            "low": 1537175053,
                                            "high": 0
                                        },
                                        "surname": "Sanchez",
                                        "topTag": "java",
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
                                        "lastInteraction": {
                                            "low": 1662883454,
                                            "high": 0
                                        },
                                        "surname": "Stewart",
                                        "topTag": "r",
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
                                        "lastInteraction": {
                                            "low": 1532392288,
                                            "high": 0
                                        },
                                        "surname": "Myers",
                                        "topTag": "rust",
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
                                        "lastInteraction": {
                                            "low": 1328945181,
                                            "high": 0
                                        },
                                        "surname": "Patterson",
                                        "topTag": "c",
                                        "name": "Alfred",
                                        "avatar": "https://www.gravatar.com/avatar/a2090a0ffd27b055c8fa22a8e59476d0?s=256&d=identicon&r=PG",
                                        "pseudo": "cnicutar"
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
                                            "low": 98713,
                                            "high": 0
                                        },
                                        "mail": "Willie.Simmons@email.com",
                                        "lastInteraction": {
                                            "low": 1673582364,
                                            "high": 0
                                        },
                                        "surname": "Simmons",
                                        "topTag": "c#",
                                        "name": "Willie",
                                        "avatar": "https://www.gravatar.com/avatar/f4acdb91aba11ddf8f03d4b12453f3d5?s=256&d=identicon&r=PG",
                                        "pseudo": "Thomas Levesque"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 20785192,
                                            "high": 0
                                        },
                                        "mail": "William.Ward@email.com",
                                        "surname": "Ward",
                                        "name": "William",
                                        "avatar": "https://i.stack.imgur.com/HJPZ4.png?s=256&g=1",
                                        "pseudo": "Boots"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 3434970,
                                            "high": 0
                                        },
                                        "mail": "Will.Gutierrez@email.com",
                                        "surname": "Gutierrez",
                                        "name": "Will",
                                        "avatar": "https://i.stack.imgur.com/cWyFQ.png?s=256&g=1",
                                        "pseudo": "Shady Aziza"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 3930247,
                                            "high": 0
                                        },
                                        "mail": "Walter.Cruz@email.com",
                                        "lastInteraction": {
                                            "low": 1673594828,
                                            "high": 0
                                        },
                                        "surname": "Cruz",
                                        "topTag": "javascript",
                                        "name": "Walter",
                                        "avatar": "https://i.stack.imgur.com/zFtTQ.jpg?s=256&g=1",
                                        "pseudo": "technophyle"
                                    },
                                    {
                                        "idSTOW": {
                                            "low": 2172,
                                            "high": 0
                                        },
                                        "mail": "Tom.Kim@email.com",
                                        "surname": "Kim",
                                        "name": "Tom",
                                        "avatar": "https://www.gravatar.com/avatar/d45a34439ae17a079045a23df5131b91?s=256&d=identicon&r=PG",
                                        "pseudo": "Sander Versluys"
                                    }
                                ],
                                "error": 0
                            }
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
                                        "lastInteraction": {
                                            "low": 1668600389,
                                            "high": 0
                                        },
                                        "surname": "Adams",
                                        "topTag": "sql-server",
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
                                        "lastInteraction": {
                                            "low": 1280089493,
                                            "high": 0
                                        },
                                        "surname": "Alexander",
                                        "topTag": "java",
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
                                        "lastInteraction": {
                                            "low": 1673344431,
                                            "high": 0
                                        },
                                        "surname": "Allen",
                                        "topTag": "javascript",
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
                                        "lastInteraction": {
                                            "low": 1677487234,
                                            "high": 0
                                        },
                                        "surname": "Alvarez",
                                        "topTag": "flutter",
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
                                        "lastInteraction": {
                                            "low": 1383664560,
                                            "high": 0
                                        },
                                        "surname": "Anderson",
                                        "topTag": "c#",
                                        "name": "Clara",
                                        "avatar": "https://i.stack.imgur.com/6HADc.jpg?s=256&g=1",
                                        "pseudo": "Vivek Nuna"
                                    }
                                ],
                                "error": 0
                            }
                        });
                        this.get(`${this.namespace}/admin/users/sort/surname/desc`, () => {
                            return{
                                "answer": "Users found",
                                "users": [
                                    {
                                        "idSTOW": {
                                            "low": 2303865,
                                            "high": 0
                                        },
                                        "mail": "Catherine.Young@email.com",
                                        "lastInteraction": {
                                            "low": 1678841597,
                                            "high": 0
                                        },
                                        "surname": "Young",
                                        "topTag": "swift",
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
                                        "lastInteraction": {
                                            "low": 1679154940,
                                            "high": 0
                                        },
                                        "surname": "Wright",
                                        "topTag": "reactjs",
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
                                        "lastInteraction": {
                                            "low": 1673299558,
                                            "high": 0
                                        },
                                        "surname": "Woods",
                                        "topTag": "flutter",
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

                        this.get(`${this.namespace}/user/:idSTOW/interactedWithMe`, () => {
                            return {
                                    "answer": "Users found",
                                    "users": [
                                        {
                                            "identity": {
                                                "low": 2709,
                                                "high": 0
                                            },
                                            "labels": [
                                                "User"
                                            ],
                                            "properties": {
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
                                            "elementId": "4:bf1ff9ef-b575-4597-8457-9d61db614bf0:2709"
                                        },
                                        {
                                            "identity": {
                                                "low": 2665,
                                                "high": 0
                                            },
                                            "labels": [
                                                "User"
                                            ],
                                            "properties": {
                                                "idSTOW": {
                                                    "low": 3943312,
                                                    "high": 0
                                                },
                                                "mail": "Annie.Martinez@email.com",
                                                "surname": "Martinez",
                                                "name": "Annie",
                                                "avatar": "https://www.gravatar.com/avatar/fc00b38b94ca7b6f820622b0a8af8ded?s=256&d=identicon&r=PG",
                                                "pseudo": "Sam Varshavchik"
                                            },
                                            "elementId": "4:bf1ff9ef-b575-4597-8457-9d61db614bf0:2665"
                                        }
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
