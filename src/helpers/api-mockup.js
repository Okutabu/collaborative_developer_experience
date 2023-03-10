const loadMirage = () => import("miragejs");
import { Response } from "miragejs";

const usersKey = 'exemple-key';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

export function loadMirageInDev() {

  if (process.env.NODE_ENV === "development") {
    loadMirage().then(({ Server }) => {
      return new Server({
        routes() {
          this.namespace = "http://mockapi:1234";

          this.get("/admin/statistics", () => {
            return [{
				answer: "Statistics found",
				nbTags: 999,
				nbUsers: 888,
				topTags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
				error: 0
			}];
          });
          
        },
      });
    });
  }
  
  

        if (import.meta.env.MODE === "development") {
            loadMirage().then(({ Server }) => {
                return new Server({
                    routes() {

                        this.namespace = `${import.meta.env.VITE_API_URL}`;

                        this.get(`${this.namespace}/admin/statistics`, () => {
                            return [{
                                answer: "Statistics found",
                                nbTags: 999,
                                nbUsers: 888,
                                topTags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
                                error: 0
                            }];
                        });

                        this.post(`${this.namespace}/user/login`, (schema, request) => {
                            return authenticate(request);
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

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
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