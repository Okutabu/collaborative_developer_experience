const neo4j = require('neo4j-driver');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Request = require('./utils/Request');
const Result = require('./utils/Result');
const Utils = require('./utils/Utils');
const Data = require('./utils/Data');
const JWT = require('./utils/JWT');
const express = require('express');
const path = require('path');
const formidable = require('formidable'); 

const Neo4j = require('./utils/Neo4J');
const { runQuery, timestamp } = require('./utils/Neo4J');
const { send } = require('process');
const { randomUUID } = require('crypto');

const router = express.Router();

/*
DATA CONSTRAINTS
*/

const MIN_EMAIL = 1;
const MAX_EMAIL = 150;

const MIN_PASSWORD = 6;
const MAX_PASSWORD = 40;

const MIN_FIRSTNAME = 1;
const MAX_FIRSTNAME = 50;

const MIN_LASTNAME = 1;
const MAX_LASTNAME = 50;

const MIN_SKILLNAME = 1;
const MAX_SKILLNAME = 50;

const MIN_TECNONAME = 1;
const MAX_TECNONAME = 50;

const MIN_DESCRIPTION = 0;
const MAX_DESCRIPTION = 2000;

const MIN_NAME = 1;
const MAX_NAME = 50;

/*
ERROR JSON
*/

const JSON_NOT_FOUND = {
    status: "failed", 
    error: "not_found"
};
const JSON_WENT_WRONG = {
    status: "failed", 
    error: "went_wrong"
};
const JSON_EXIST = {
    status: "failed", 
    error: "exist"
};
const JSON_NO_PERMISSION = {
    status: "failed", 
    error: "no_permission"
};
const JSON_BAD_VALUE = {
    status: "failed", 
    error: "bad_value"
};
const JSON_WRONG_PASSWORD = {
    status: "failed", 
    error: "wrong_password"
};

/*
HASH CONST
*/
const SALT_ROUNDS = 10;

// PERMISSION
const MANAGE_PROJECT = 0;
const MANAGE_MEMBERS = 1;
const MANAGE_ROLE = 2;
const MANAGE_ACTU = 3;
const MANAGE_OFFRE = 4;

// ACTION ENUM

const IN_PROJECT = 0;
const USER_ASK_TO_PROJECT = 1;
const PROJECT_ASK_TO_USER = 2;
const USER_REFUSE_TO_PROJECT = 3;
const PEOJECT_REFUSE_TO_USER = 4;
const LEAVE = 5;
const CREATE_PROJECT = 6;

const PUBLIC_VISIBILITY = 1;
const PRIVATE_VISIBILITY = 0;

// EXEMPLE
router.post('/role/add/permission', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let id_role = Request.params(Request.POST, req, "id_role");
    let id_permission = Request.params(Request.POST, req, "id_permission");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.havePermission(
                user.id, 
                id_project, 
                MANAGE_ROLE,
                function(error){
                    res.send(JSON_NO_PERMISSION);
                },
                function(role){
                    Neo4j.runQuery(`
                            MATCH (r:Role)<-[:OWN_ROLE]-(p:Project)
                            WHERE ID(r) = $id_role AND ID(p) = $id_project
                            MATCH (pe:Permission)
                            WHERE ID(pe) = $id_permission
                            MERGE (r)-[hp:HAVE_PERMISSION]->(pe)
                            RETURN r{.*, id: ID(r), _type: head(labels(r)), have_permission:[pe{.*, id: ID(pe), _type: head(labels(pe))}]} AS p1
                        `,
                        {
                            id_project: neo4j.int(id_project),
                            id_role: neo4j.int(id_role),
                            id_permission: neo4j.int(id_permission)
                        },
                        function(error){
                            res.send(JSON_WENT_WRONG);
                        },
                        function(result){
                            if(!Result.emptyResult(result)){
                                let p1 = Result.getResultRecord(result, "p1");
                                res.send({
                                    status: "success",
                                    result: {
                                        p1: p1
                                    }
                                });
                            }
                            else {
                                res.send(JSON_WENT_WRONG);
                            }
                        }
                    );
                }
            )
        }
    );
});
router.post('/role/del/permission', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let id_role = Request.params(Request.POST, req, "id_role");
    let id_permission = Request.params(Request.POST, req, "id_permission");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.havePermission(
                user.id, 
                id_project, 
                MANAGE_ROLE,
                function(error){
                    res.send(JSON_NO_PERMISSION);
                },
                function(role){
                    Neo4j.runQuery(`
                            MATCH (r:Role)<-[:OWN_ROLE]-(p:Project)
                            WHERE ID(r) = $id_role AND ID(p) = $id_project
                            MATCH (pe:Permission)
                            WHERE ID(pe) = $id_permission
                            MATCH (r)-[hp:HAVE_PERMISSION]->(pe)
                            DELETE hp
                            RETURN r{.*, id: ID(r), _type: head(labels(r)), have_permission:[pe{.*, id_del: ID(pe), id: ID(pe), _type: head(labels(pe))}]} AS p1
                        `,
                        {
                            id_project: neo4j.int(id_project),
                            id_role: neo4j.int(id_role),
                            id_permission: neo4j.int(id_permission)
                        },
                        function(error){
                            res.send(JSON_WENT_WRONG);
                        },
                        function(result){
                            if(!Result.emptyResult(result)){
                                let p1 = Result.getResultRecord(result, "p1");
                                res.send({
                                    status: "success",
                                    result: {
                                        p1: p1
                                    }
                                });
                            }
                            else {
                                res.send(JSON_WENT_WRONG);
                            }
                        }
                    );
                }
            )
        }
    );
});
router.post('/project/delete/tecno', require("./project/delete/tecno.js"));
router.post('/project/add/role', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let name = Request.params(Request.POST, req, "name");
    if(Utils.stringBorne(name, MIN_NAME, MAX_NAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.havePermission(
                    user.id, 
                    id_project, 
                    MANAGE_ROLE,
                    function(error){
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        Neo4j.runQuery(`
                            MATCH (p:Project)
                            WHERE ID(p) = $id_project
                            CREATE (r:Role{name: $name}), path = (p)-[:OWN_ROLE]->(r)
                            WITH COLLECT(path) AS pathCollect
                            CALL apoc.convert.toTree(pathCollect) YIELD value AS p1
                            RETURN p1`, 
                            {
                                id_project: neo4j.int(id_project),
                                name: name
                            },
                            function(error){
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let p1 = Result.getResultRecord(result, "p1");
                                    res.send({
                                        status: "success",
                                        result: {
                                            p1: p1
                                        }
                                    });
                                }
                                else {
                                    res.send(JSON_WENT_WRONG);
                                }
                            }
                        );
                    }
                )
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/get/mynotif', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    JWT.checkSession(
        access_token, 
        function(err){
            console.log(err)
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH 
                    p1 = (u:User)-[b:TARGET]-(c)-[:ELEM]-(w)-[*0..1]->(g),
                    p2 = (c)-[m:BY]-(l)
                WHERE ID(u) = 9 AND c.public_notif = TRUE
                WITH COLLECT(p1) AS pathCollect, COLLECT(p2) AS path2Collect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p1, COLLECT(p2) AS p2`,
                {
                    id_user: neo4j.int(user.id)
                },
                function(error){
                    console.log(error)
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let p1 = Result.getResultRecord(result, "p1");
                        let p2 = Result.getResultRecord(result, "p2");
                        res.send({
                            status: "success",
                            result: {
                                p1: p1,
                                p2: p2
                            }
                        });
                    }
                }
            )
        }
    );
});
router.post('/user/get/notif', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_user = Request.params(Request.POST, req, "id_user");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH 
                    p1 = (u:User)-[b:TARGET]-(c)-[:ELEM]-(w)-[*0..1]->(g),
                    p2 = (c)-[m:BY]-(l)
                WHERE ID(u) = $id_user
                WITH COLLECT(p1) AS pathCollect, COLLECT(p2) AS path2Collect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p1, COLLECT(p2) AS p2`,
                {
                    id_user: neo4j.int(id_user)
                },
                function(error){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let p1 = Result.getResultRecord(result, "p1");
                        let p2 = Result.getResultRecord(result, "p2");
                        res.send({
                            status: "success",
                            result: {
                                p1: p1,
                                p2: p2
                            }
                        });
                    }
                }
            )
        }
    );
});
router.post('/project/add/user', function(req, res){
    /*let access_token = Request.params(Request.POST, req, "access_token");
    let id_user = Request.params(Request.POST, req, "id_user");
    let id_project = Request.params(Request.POST, req, "id_project");
    let description = Request.params(Request.POST, req, "description");
    if(Utils.stringBorne(description, MIN_DESCRIPTION, MAX_DESCRIPTION)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.havePermission(
                    user.id, 
                    id_project, 
                    MANAGE_MEMBERS,
                    function(error){
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        Neo4j.runQuery(`
                            MATCH (p:Project)
                            WHERE ID(p) = $id_project
                            MATCH (u:User)
                            WHERE ID(u) = $id_user
                            OPTIONAL MATCH path = (u)-[d:DO]->(a:Action)-[act:ACT]->(p)
                            RETURN 
                                p{.*, _type: head(labels(p)), id: ID(p)} AS p,
                                u{.*, _type: head(labels(u)), id: ID(u)} AS u,
                                a{.*, _type: head(labels(a)), id: ID(a)} AS a`
                                /*,
                                r{.*, _type: head(labels(r)), id: ID(r)} AS r */ /*,
                            /*{
                                id_user: neo4j.int(id_user),
                                /*id_role: neo4j.int(id_role),*/
                                /*id_project: neo4j.int(id_project)
                            },
                            function(error){
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let action = Result.getResultRecord(result, "a");
                                    let timestamp = Neo4j.timestamp();
                                    if(action.length==0){
                                        Neo4j.runQuery(`
                                        MATCH (u:User)
                                            WHERE ID(u) = $id_user
                                            MATCH (p:Project)
                                            WHERE ID(p) = $id_project
                                            MATCH (r:Role) WHERE r.name = "Membre" and (p)-[:OWN_ROLE]-(r)
                                            CREATE 
                                                path1 = (u)-[do:DO]->(a:Action{description: $description, date: $timestamp, type: $type})-[act:ACT]->(p), 
                                                path2 = (a)-[gr:GOT_ROLE]->(r)
                                            WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect, a
                                            CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                            CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                                            RETURN 
                                                p1, a{.*, id: ID(a), _type: HEAD(LABELS(a))} AS a,
                                                p2{.*, id: ID(a), _type: HEAD(LABELS(a))} AS b`, 
                                            {
                                                "id_user": neo4j.int(id_user),
                                                "id_project": neo4j.int(id_project),
                                                "description": description,
                                                "timestamp": timestamp,
                                                "type": IN_PROJECT
                                            },
                                            function(error){
                                                console.log(error)
                                                res.send(JSON_WENT_WRONG);
                                            },
                                            function(result){
                                                console.log("error1")
                                                if(!Result.emptyResult(result)){
                                                    console.log("error2")

                                                    let a = Result.getResultRecord(result, "a")[0];
                                                    Neo4j.makeNotif(id_user, a["id"], user.id, [], {"date": timestamp, "type": PROJECT_ASK_TO_USER, "description": description})

                                                    console.log("error3")
                                                    let p1 = Result.getResultRecord(result, "p1");
                                                    let p2 = Result.getResultRecord(result, "p2");
                                                    res.send({
                                                        status: "success",
                                                        result: {
                                                            p1: p1,
                                                            p2: p2
                                                        }
                                                    });
                                                }
                                                else {
                                                    res.send(JSON_WENT_WRONG);
                                                }
                                            }
                                        )
                                    } 
                                    else {
                                        let a = action[0];
                                        let type = PROJECT_ASK_TO_USER;
                                        if(a.type == USER_ASK_TO_PROJECT){
                                            type = IN_PROJECT
                                        }
                                        Neo4j.runQuery(`
                                            MATCH (u:User)
                                            WHERE ID(u) = $id_user
                                            MATCH (p:Project)
                                            WHERE ID(p) = $id_project
                                            MATCH path1 = (p)<-[act:ACT]-(a:Action)<-[do:DO]-(u)
                                            MATCH path2 = (u)-[do]->(a)-[act]->(p)
                                            SET a.date = $timestamp, a.type = $type, a.description = $description
                                            WITH path1, path2, a
                                            OPTIONAL MATCH path3 = (a)-[gr:GOT_ROLE]->(r:Role)
                                            DELETE gr
                                            WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect
                                            CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                            CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                                            RETURN p1, p2`, 
                                            {
                                                "id_user": neo4j.int(id_user),
                                                "id_project": neo4j.int(id_project),
                                                "timestamp": timestamp,
                                                "description": description,
                                                "type": type
                                            },
                                            function(error){
                                                res.send(JSON_WENT_WRONG);
                                            },
                                            function(result){
                                                if(!Result.emptyResult(result)){

                                                    Neo4j.makeNotif(id_user, a["id"], user.id, [], {"date": timestamp, "type": type, "description": description})

                                                    let p1 = Result.getResultRecord(result, "p1");
                                                    let p2 = Result.getResultRecord(result, "p2");
                                                    res.send({
                                                        status: "success",
                                                        result: {
                                                            p1: p1,
                                                            p2: p2,
                                                        }
                                                    });
                                                }
                                                else {
                                                    res.send(JSON_WENT_WRONG);
                                                }
                                            }
                                        )
                                    }
                                } 
                                else {
                                    res.send(JSON_NOT_FOUND);
                                }
                            }
                        )
                    }
                )
            }
        );
    } else {
        res.send(JSON_BAD_VALUE);
    }*/
});
router.post('/project/del/user', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let id_user = Request.params(Request.POST, req, "id_user");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            let next = function(role){
                Neo4j.runQuery(`
                    MATCH (p:Project)
                    WHERE ID(p) = $id_project
                    MATCH (u:User)
                    WHERE ID(u) = $id_user
                    OPTIONAL MATCH path = (u)-[d:DO]->(a:Action)-[act:ACT]->(p)
                    RETURN 
                        p{.*, _type: head(labels(p)), id: ID(p)} AS p,
                        u{.*, _type: head(labels(u)), id: ID(u)} AS u,
                        a{.*, _type: head(labels(a)), id: ID(a)} AS a`,
                    {
                        id_user: neo4j.int(user.id),
                        id_project: neo4j.int(id_project)
                    },
                    function(error){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let action = Result.getResultRecord(result, "a");
                            if(action.length==1&&action[0].root!=undefined&&action[0].type == IN_PROJECT){
                                let type = LEAVE;
                                Neo4j.runQuery(`
                                    MATCH (u:User)
                                    WHERE ID(u) = $id_user
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id_project
                                    MATCH path1 = (p)<-[:ACT]-(a:Action)<-[:DO]-(u)
                                    SET a.date = $timestamp, a.type = $type
                                    WITH a, path1
                                    OPTIONAL MATCH (a)-[gr:GOT_ROLE]->(r:Role)
                                    DELETE gr
                                    WITH COLLECT(path1) AS path1Collect
                                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                    RETURN p1`, 
                                    {
                                        "id_user": neo4j.int(id_user),
                                        "id_project": neo4j.int(id_project),
                                        "timestamp": Neo4j.timestamp(),
                                        "type": neo4j.int(type)
                                    },
                                    function(error){
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        if(!Result.emptyResult(result)){
                                            let p1 = Result.getResultRecord(result, "p1");
                                            res.send({
                                                status: "success",
                                                result: {
                                                    p1: p1
                                                }
                                            });
                                        }
                                        else {
                                            res.send(JSON_WENT_WRONG);
                                        }
                                    }
                                )
                            }
                            else {
                                res.send(JSON_WENT_WRONG);
                            }
                        }
                        else {
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                )
            }
            if(neo4j.int(id_user).equals(neo4j.int(user.id))){
                next();
            }
            else {
                Neo4j.havePermission(
                    user.id,
                    id_project,
                    MANAGE_MEMBERS,
                    function(error){
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        next(role);
                    }
                )
            }
        }
    )
});
router.post('/fetch/project', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");

    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                MATCH path = (p:Project)-[*0..1]-(o)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                RETURN value`,
                {},
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let project = Result.getResultRecord(result, "value");
                        res.send({
                            status: "success",
                            result: {
                                project : project
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );       
        }
    );
});
router.post('/project/add/tecno', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");
    let elem = Request.params(Request.POST, req, "elem");

    if(Utils.stringBorne(value, MIN_TECNONAME, MAX_TECNONAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.havePermission(
                    user.id,
                    elem,
                    MANAGE_PROJECT,
                    function(){
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        runQuery(`
                            MERGE (n:Tecno{name:$value}) WITH n
                            MATCH (p:Project)
                            WHERE ID(p) = $id
                            MERGE path = (p)-[r:USE]->(n)
                            WITH COLLECT(path) AS pathCollect
                            CALL apoc.convert.toTree(pathCollect) YIELD value
                            RETURN value AS p`,
                            {
                                "value": value.trim(),
                                "id": neo4j.int(elem)
                            },
                            function(err){
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let project = Result.getResultRecord(result, "p")[0];
                                    res.send({
                                        status: "success",
                                        result: {
                                            project : project
                                        }
                                    });
                                }
                                else{
                                    res.send(JSON_WENT_WRONG);
                                }
                            }
                        );      
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/project/get/action', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path1 = (p:Project)<-[:ACT]-(a:Action)<-[:DO]-(u:User)
                WHERE ID(p) = $id
                OPTIONAL MATCH path2 = (a)-[:GOT_ROLE]->(r:Role)
                WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p1, p2
                `, 
                {
                    id: neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p1 = Result.getResultRecord(result, "p1");
                    let p2 = Result.getResultRecord(result, "p2");
                    res.send({
                        status: "success",
                        result: {
                            p1: p1,
                            p2: p2
                        }
                    });
                }
            )
        }
    );
});

router.post('/request/refuse', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.refuse = true, r.pinned = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/unrefuse', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.refuse = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/refuse_user', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.refuse_user = true, r.pinned_user = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/unrefuse_user', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.refuse_user = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/get/offre', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path = (a:Actu)-[:FOR_REGIE|FOR_ROLE|FOR_COMP*0..1]->(o)-[:DO|HAVE_ACTU*0..1]-(z)
                OPTIONAL MATCH path1 = (a)-[:ACTU_REQ]->(:Request)-[:REQ_USER]->(u:User)
                WHERE ID(u) = $id_user
                WITH COLLECT(path) AS pathCollect, COLLECT(path1) AS path1Collect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                RETURN p, p1`, 
                {
                    id_user: neo4j.int(user.id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let p1 = Result.getResultRecord(result, "p1");
                        let p = Result.getResultRecord(result, "p");
                        res.send({
                            status: "success",
                            result: {
                                p: p,
                                p1: p1
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/accept', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                MATCH (r)<-[:ACTU_REQ]-(a:Actu)
                RETURN 
                    r{.*, id: ID(r), _type: head(labels(r))} AS r,
                    a{.*, id: ID(a), _type: head(labels(a))} AS a`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    console.log(err)
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let request = Result.getResultRecord(result, "r")[0];
                    let actu = Result.getResultRecord(result, "a")[0];
                    let end = actu.end;
                    if(request.end!=undefined&&request.end!=0){
                        end = request.end;
                    }
                    if(end==undefined){
                        end = 0;
                    }
                    let start = actu.start;
                    if(request.start!=undefined&&request.start!=0){
                        start = request.start;
                    }
                    if(start==undefined){
                        start = 0;
                    }
                    let price = actu.price;
                    if(request.price!=undefined&&request.price!=0){
                        price = request.price;
                    }
                    if(price==undefined){
                        price = 0;
                    }
                    let heure = actu.heure;
                    if(request.heure!=undefined&&request.heure!=0){
                        heure = request.heure;
                    }
                    if(heure==undefined){
                        heure = 0;
                    }
                    Neo4j.runQuery(`
                        MATCH (r:Request)
                        WHERE ID(r) = $id_request
                        SET r.accept = true
                        WITH r
                        MATCH path1 = (r)-[:REQ_USER]->(u:User)
                        MATCH path2 = (r)<-[:ACTU_REQ]-(a:Actu)<-[:HAVE_ACTU]-(p:Project)
                        WITH r, a, u, p, path1, path2
                        MERGE pathCreate0 = (u)-[:DO]->(action:Action{type: 0, date: $date})-[:ACT]->(p)
                        WITH action, r, a, u, p, path1, path2, pathCreate0
                        SET 
                            action.end = $end, 
                            action.start = $start, 
                            action.price = $price, 
                            action.heure = $heure
                        WITH action, r, a, u, p, path1, path2, pathCreate0
                        OPTIONAL MATCH (action)-[gr:GOT_ROLE]-(old_role)
                        DELETE gr
                        WITH action, r, a, u, p, path1, path2, pathCreate0
                        MATCH path3 = (a)-[:FOR_ROLE]->(role:Role)
                        CREATE pathCreate1 = (action)-[:GOT_ROLE]->(role)
                        WITH action, r, a, u, p, path1, path2, pathCreate0, pathCreate1
                        MATCH path4 = (a)-[:FOR_COMP]->(comp:Skill)
                        CREATE pathCreate2 = (action)-[:GOT_COMP]->(comp)
                        WITH a, r, COLLECT(pathCreate0) AS pathCreate0Collect, COLLECT(pathCreate1) AS pathCreate1Collect, COLLECT(pathCreate2) AS pathCreate2Collect
                        CALL apoc.convert.toTree(pathCreate0Collect) YIELD value AS p0
                        CALL apoc.convert.toTree(pathCreate1Collect) YIELD value AS p1
                        CALL apoc.convert.toTree(pathCreate2Collect) YIELD value AS p2
                        RETURN p0, p1, p2, r{.*, id: ID(r), _type: head(labels(r))} AS r, a{.*, id: ID(a), _type: head(labels(a))} AS a`,
                        {
                            id_request: neo4j.int(id_request),
                            date: Neo4j.timestamp(),
                            end: neo4j.int(end),
                            start: neo4j.int(start),
                            price: neo4j.int(price),
                            heure: neo4j.int(heure)
                        },
                        function(err){
                            console.log(err)
                            res.send(JSON_WENT_WRONG);
                        },
                        function(result){
                            if(!Result.emptyResult(result)){
                                let p0 = Result.getResultRecord(result, "p0");
                                let p1 = Result.getResultRecord(result, "p1");
                                let p2 = Result.getResultRecord(result, "p2");
                                let r = Result.getResultRecord(result, "r");
                                let a = Result.getResultRecord(result, "a");
                                res.send({
                                    status: "success",
                                    result: {
                                        p0: p0,
                                        p1: p1,
                                        p2: p2,
                                        r: r,
                                        a: a
                                    }
                                });
                            }
                            else {
                                res.send(JSON_WENT_WRONG);
                            }
                        }
                    );
                }
            );
        }
    );
});
router.post('/actu/fermer', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_actu = Request.params(Request.POST, req, "id_actu");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Actu)
                WHERE ID(r) = $id_actu
                SET r.fermer = true
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_actu: neo4j.int(id_actu)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/pin', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.pinned = true
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/unpin', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.pinned = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});

router.post('/request/pin_user', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.pinned_user = true
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/request/unpin_user', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                SET r.pinned_user = false
                RETURN r{.*, id: ID(r), _type: head(labels(r))} AS r`,
                {
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let r = Result.getResultRecord(result, "r");
                        res.send({
                            status: "success",
                            result: {
                                r: r
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});router.post('/request/accept', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_request = Request.params(Request.POST, req, "id_request");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (r:Request)
                WHERE ID(r) = $id_request
                MATCH (r)-[]-(user:User)
                MATCH (r)-[]-(a:Actu)-[]-(p:Project)
                MATCH (a)-[]-(role:Role)
                WITH r, role, user, p, a
                MERGE path1 = (p)<-[:ACT]-(action:Action)<-[:DO]-(user)
                WITH path1, r, role, user, a, action, p
                SET action.type = 0, action.date = $timestamp
                WITH path1, r, role, user, a, action, p
                CREATE path2 = (action)-[:GOT_ROLE]->(role)
                WITH path1, path2, r, role, user, a, action, p
                SET r.valid = TRUE, a.end = TRUE
                WITH path1, path2, r, role, user, a, action, p
                WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p1, p2
                `,
                {
                    timestamp: Neo4j.timestamp(),
                    id_request: neo4j.int(id_request)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let p = Result.getResultRecord(result, "p");
                        res.send({
                            status: "success",
                            result: {
                                p: p
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/actu/postuler', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_actu = Request.params(Request.POST, req, "id_actu");
    let message = Request.params(Request.POST, req, "message");
    let price = Request.params(Request.POST, req, "price");
    let start = Request.params(Request.POST, req, "start");
    let end = Request.params(Request.POST, req, "end");
    let heure = Request.params(Request.POST, req, "heure");
    if(price==undefined){
        price = -1;
    }
    if(message==undefined){
        message = "";
    }
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (a:Actu)
                WHERE ID(a) = $id_actu
                MATCH (u:User)
                WHERE ID(u) = $id_user
                CREATE path = (a)-[:ACTU_REQ]->(:Request{
                    date: $date, 
                    message: $message, 
                    price: $price,
                    start: $start,
                    end: $end,
                    heure: $heure
                })-[:REQ_USER]->(u)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p
                RETURN p`,
                {
                    id_actu: neo4j.int(id_actu),
                    message: message,
                    price: neo4j.int(price),
                    end: neo4j.int(end),
                    start: neo4j.int(start),
                    heure: neo4j.int(heure),
                    id_user: neo4j.int(user.id),
                    date: Neo4j.timestamp()
                },
                function(error){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let p = Result.getResultRecord(result, "p");
                        res.send({
                            status: "success",
                            result: {
                                p: p
                            }
                        });
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post("/user/get/offre", function(req, res){
    let id = Request.params(Request.POST, req, "id");
    Neo4j.runQuery(`
        MATCH path = (u:User)<-[:REQ_USER]-(r:Request)<-[:ACTU_REQ]-(a:Actu)-[*0..1]-(w)-[:DO*0..1]-(z)-[:ACT*0..1]-(h)
        WHERE ID(u) = $id
        WITH COLLECT(path) AS pathCollect
        CALL apoc.convert.toTree(pathCollect) YIELD value AS p
        RETURN p`, 
        {
            id: neo4j.int(id)
        },
        function(error){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let p = Result.getResultRecord(result, "p");
            res.send({
                status: "success",
                result: {
                    p: p
                }
            });
        }
    ); 
})
router.post('/project/get/actu', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path = (p:Project)-[:HAVE_ACTU]->(a:Actu)-[:FOR_REGIE|FOR_ROLE|FOR_COMP*0..1]->(o)-[:DO*0..1]-(z)
                WHERE ID(p) = $id_project
                OPTIONAL MATCH path1 = (a)-[:ACTU_REQ]->(:Request)-[:REQ_USER]->(u:User)
                WHERE ID(u) = $id_user
                WITH COLLECT(path) AS pathCollect, COLLECT(path1) AS path1Collect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                RETURN p, p1`, 
                {
                    id_project: neo4j.int(id),
                    id_user: neo4j.int(user.id)
                },
                function(error){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p = Result.getResultRecord(result, "p");
                    let p1 = Result.getResultRecord(result, "p1");
                    res.send({
                        status: "success",
                        result: {
                            p: p,
                            p1: p1
                        }
                    });
                }
            );
        }
    );
});
router.post("/actu/get", function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path1 = (a:Actu)-[:FOR_ROLE|FOR_COMP|FOR_REGIE*0..1]-(r)-[:DO*0..1]-(z)
                WHERE ID(a) = $id
                WITH COLLECT(path1) AS path1Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p2
                RETURN p2
                `, 
                {
                    id: neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p2 = Result.getResultRecord(result, "p2");
                    res.send({
                        status: "success",
                        result: {
                            p2: p2
                        }
                    });
                }
            )
        }
    );
});
router.post("/actu/get/request", function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
            MATCH path1 = (a:Actu)-[:ACTU_REQ|FOR_REGIE*0..1]->(r)-[:REQ_USER|LOCAL_CONV]->(u)-[*0..1]-(o)-[*0..1]-(h)-[:SEND_COMMENT|IS_FROM*0..1]-(z)
            WHERE ID(a) = $id AND (h:Skill OR h:Commentaire)
            WITH COLLECT(path1) AS path1Collect
            CALL apoc.convert.toTree(path1Collect) YIELD value AS p2
            RETURN p2
                `, 
                {
                    id: neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p2 = Result.getResultRecord(result, "p2");
                    res.send({
                        status: "success",
                        result: {
                            p2: p2
                        }
                    });
                }
            )
        }
    );
});
router.post("/user/get/history", function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    Neo4j.runQuery(`
        MATCH path = (u)-[:HISTORY]->(h:History)-[*0..1]->(o) 
        WHERE ID(u) = $id_user
        WITH COLLECT(path) AS path1Collect
        CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
        RETURN p1`,
        {
            id_user: neo4j.int(id)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let p1 = Result.getResultRecord(result, "p1");
            res.send({
                status: "success",
                result: {
                    p1: p1
                }
            });
        }
    );
});
router.post("/user/create/history", function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let name = Request.params(Request.POST, req, "name");
    let descriptionProject = Request.params(Request.POST, req, "descriptionProject");
    let role = Request.params(Request.POST, req, "role");
    let description = Request.params(Request.POST, req, "description");
    let price = Request.params(Request.POST, req, "price");
    let heure = Request.params(Request.POST, req, "heure");
    let start = Request.params(Request.POST, req, "start");
    let end = Request.params(Request.POST, req, "end");
    let comp_list = Request.params(Request.POST, req, "comp_list");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            let where = "";
            for(let i = 0; i < comp_list.length; i++){
                if(i==0){
                    where += " ID(s) = " + comp_list[i]
                }
                else {
                    where += " OR ID(s) = " + comp_list[i]
                }
            }
            Neo4j.runQuery(`
                MATCH (u:User)
                WHERE ID(u) = $id_user
                CREATE path = (u)-[:HISTORY]->(h:History{
                    name: $name,
                    descriptionProject: $descriptionProject,
                    role: $role,
                    description: $description,
                    price: $price,
                    heure: $heure,
                    start: $start,
                    end: $end,
                    date: $date
                })
                WITH h, u, COLLECT(path) AS path1Collect
                MATCH (s:Skill)
                WHERE `+where+`
                CREATE path2 = (h)-[:FOR_COMP]->(s)
                WITH h, u, s
                MATCH path3 = (u)-[:HISTORY]->(h)-[:FOR_COMP]->(s)
                WITH COLLECT(path3) AS path3Collect
                CALL apoc.convert.toTree(path3Collect) YIELD value AS p3
                RETURN p3`,
                {
                    id_user: neo4j.int(user.id),
                    name: name,
                    descriptionProject: descriptionProject,
                    role: role,
                    description: description,
                    price: price,
                    heure: heure,
                    start: start,
                    end: end,
                    date: Neo4j.timestamp()
                },
                function(err){
                    console.log(err)
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p3 = Result.getResultRecord(result, "p3");
                    res.send({
                        status: "success",
                        result: {
                            p3: p3
                        }
                    });
                }
            );
        }
    );
});
router.post('/project/create/actu', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    let description = Request.params(Request.POST, req, "description");
    let price = Request.params(Request.POST, req, "price");
    let heure = Request.params(Request.POST, req, "heure");
    let start = Request.params(Request.POST, req, "start");
    let end = Request.params(Request.POST, req, "end");
    if(end==""||end==undefined){
        end = 0;
    }
    let role = Request.params(Request.POST, req, "role");
    let comp_list = Request.params(Request.POST, req, "comp_list");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            console.log("project/create/actu1")
            Neo4j.havePermission(
                user.id,
                id,
                MANAGE_OFFRE,
                function(err){
                    console.log("project/create/actu2")
                    console.log(err)
                    res.send(JSON_NO_PERMISSION);
                },
                function(my_role){
                    console.log("project/create/actu3")
                    Neo4j.runQuery(`
                        MATCH (p:Project)-[:OWN_ROLE]->(r:Role)
                        WHERE ID(p) = $id_project AND ID(r) = $id_role
                        RETURN r`, 
                        {
                            id_project: neo4j.int(id),
                            id_role: neo4j.int(role)
                        },
                        function(error){
                            console.log("project/create/actu4")
                            console.log(error)
                            res.send(JSON_WENT_WRONG);
                        },
                        function(result){
                            console.log("project/create/actu5")
                            if(!Result.emptyResult(result)){
                                console.log("project/create/actu6")
                                let where = "";
                                for(let i = 0; i < comp_list.length; i++){
                                    if(i==0){
                                        where += " ID(c) = " + comp_list[i]
                                    }
                                    else {
                                        where += " OR ID(c) = " + comp_list[i]
                                    }
                                }
                                console.log( {
                                    id_moi: neo4j.int(user.id),
                                    id_project: neo4j.int(id),
                                    id_role: neo4j.int(role),
                                    description: description,
                                    price: price,
                                    heure: heure,
                                    start: neo4j.int(start),
                                    end: neo4j.int(end),
                                    date: Neo4j.timestamp()
                                })
                                Neo4j.runQuery(`
                                    MATCH (moi:User)
                                    WHERE ID(moi) = $id_moi
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id_project
                                    MATCH (moi)-[:DO]->(my_action:Action)-[:ACT]->(p)
                                    MATCH (r:Role)
                                    WHERE ID(r) = $id_role
                                    CREATE path = (p)-[:HAVE_ACTU]->(a:Actu{
                                        description: $description,
                                        price: $price,
                                        heure: $heure,
                                        start: $start,
                                        end: $end,
                                        date: $date
                                    })-[:FOR_ROLE]->(r)
                                    CREATE path2 = (a)-[:FOR_REGIE]->(my_action)
                                    WITH path, path2, a
                                    MATCH (c:Skill)
                                    WHERE ` + where + `
                                    CREATE path1 = (a)-[:FOR_COMP]->(c)
                                    WITH COLLECT(path) AS pathCollect, COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect
                                    CALL apoc.convert.toTree(pathCollect) YIELD value AS p
                                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                    CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                                    RETURN p, p1, p2`, 
                                    {
                                        id_moi: neo4j.int(user.id),
                                        id_project: neo4j.int(id),
                                        id_role: neo4j.int(role),
                                        description: description,
                                        price: price,
                                        heure: heure,
                                        start: neo4j.int(start),
                                        end: neo4j.int(end),
                                        date: Neo4j.timestamp()
                                    },
                                    function(error){
                                        console.log(error)
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        let p = Result.getResultRecord(result, "p");
                                        let p1 = Result.getResultRecord(result, "p1");
                                        let p2 = Result.getResultRecord(result, "p2");
                                        res.send({
                                            status: "success",
                                            result: {
                                                p: p,
                                                p1: p1,
                                                p2: p2
                                            }
                                        });
                                    }
                                );
                            }
                            else {
                                res.send(JSON_WENT_WRONG);
                            }
                        }
                    );
                }
            );
        }
    );
});
router.post('/project/search/role', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    let name = Request.params(Request.POST, req, "name");
    
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path1 = (p:Project)-[:OWN_ROLE]->(r:Role)
                WHERE ID(p) = $id AND apoc.text.clean(r.name) =~ '.*'+apoc.text.clean($name)+'.*'
                OPTIONAL MATCH path2 = (r)-[:HAVE_PERMISSION]->(per:Permission)
                WITH COLLECT(path2) AS path2Collect, r
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p2, r{.*, id: ID(r), _type: 'Role'} AS role
                `, 
                {
                    id: neo4j.int(id),
                    name: name
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p2 = Result.getResultRecord(result, "p2");
                    let role = Result.getResultRecord(result, "role");
                    res.send({
                        status: "success",
                        result: {
                            p2: p2,
                            role: role
                        }
                    });
                }
            )
        }
    );
});
router.post('/action/user/set/role', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let id_user = Request.params(Request.POST, req, "id_user");
    let id_role = Request.params(Request.POST, req, "id_role");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
            console.log("1");
            console.log(err);
        },
        function(user){
            runQuery(`
                MATCH (p:Project)-[]-(a:Action)-[]-(u:User)
                WHERE ID(u) = $id_user AND ID(p) = $id_project
                OPTIONAL MATCH path1 = (a)-[gr:GOT_ROLE]-(old_r:Role)
                DELETE gr
                WITH path1, a
                MATCH(new_r:Role) WHERE ID(new_r) = $id_role 
                CREATE path2 = (a)-[:GOT_ROLE]->(new_r)
                WITH COLLECT(path2) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                    RETURN value AS u
                `, 
                {
                    "id_project": neo4j.int(id_project),
                    "id_user": neo4j.int(id_user),
                    "id_role": neo4j.int(id_role)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                    console.log("2");
                    console.log(err);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let user = Result.getResultRecord(result, "u")[0];
                        res.send({
                            status: "success",
                            result: {
                                user: user
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }

                });
                    
                
            }
        )
});
router.post('/project/get/role', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH path1 = (p:Project)-[:OWN_ROLE]->(r:Role)
                WHERE ID(p) = $id
                OPTIONAL MATCH path2 = (r)-[:HAVE_PERMISSION]->(per:Permission)
                WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                RETURN p1, p2
                `, 
                {
                    id: neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p1 = Result.getResultRecord(result, "p1");
                    let p2 = Result.getResultRecord(result, "p2");
                    res.send({
                        status: "success",
                        result: {
                            p1: p1,
                            p2: p2
                        }
                    });
                }
            )
        }
    );
});
router.post('/permission/get', function(req, res){
    Neo4j.runQuery(`
        MATCH (p:Permission)
        RETURN p{.*, id: ID(p), _type: head(labels(p))} AS p 
        `, 
        {

        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let p = Result.getResultRecord(result, "p");
            res.send({
                status: "success",
                result: {
                    p: p
                }
            });
        }
    )
});
router.post('/project/get', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (p:Project)<-[:ACT]-(a:Action)<-[:DO]-(u:User)
                WHERE ID(p) = $id AND ID(u) = $id_user
                MATCH path1 = (a)<-[]-(u)
                OPTIONAL MATCH path2 = (a)-[:GOT_ROLE]->(r:Role)
                OPTIONAL MATCH path3 = (r)-[:HAVE_PERMISSION]->(pe:Permission)
                WITH p, COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect, COLLECT(path3) AS path3Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                CALL apoc.convert.toTree(path3Collect) YIELD value AS p3
                RETURN p{.*, id: ID(p), _type: head(labels(p)), me: [p1]} AS p1, p2, p3
                `, 
                {
                    id: neo4j.int(id),
                    id_user: neo4j.int(user.id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let p1 = Result.getResultRecord(result, "p1");
                    let p2 = Result.getResultRecord(result, "p2");
                    let p3 = Result.getResultRecord(result, "p3");
                    res.send({
                        status: "success",
                        result: {
                            p1: p1,
                            p2: p2,
                            p3: p3
                        }
                    });
                }
            )
        }
    );
});
router.post('/project/add/user/search', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let name = Request.params(Request.POST, req, "name");
    let id_project = Request.params(Request.POST, req, "id_project");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (u:User)
                WHERE 
                    apoc.text.clean(u.firstname) =~ '.*'+apoc.text.clean($name)+'.*' OR
                    apoc.text.clean(u.lastname) =~ '.*'+apoc.text.clean($name)+'.*'
                OPTIONAL MATCH path = (u)-[:DO]->(a:Action)-[:ACT]->(p:Project)
                WHERE ID(p) = $id_project
                WITH u, a, p
                RETURN u{.*, _type: head(labels(u)), id: ID(u), do:[a{.*, _type: head(labels(a)), id: ID(a)}]} AS search
                `, 
                {
                    id_project: neo4j.int(id_project),
                    name: name
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let search = Result.getResultRecord(result, "search");
                    res.send({
                        status: "success",
                        result: {
                            search: search
                        }
                    });
                }
            )
        }
    );
});
router.post('/project/create', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let name = Request.params(Request.POST, req, "name");
    let description = Request.params(Request.POST, req, "description");
    if(Utils.stringBorne(name, MIN_NAME, MAX_NAME)&&
    Utils.stringBorne(description, MIN_DESCRIPTION, MAX_DESCRIPTION)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.runQuery(`
                    MATCH (p:Project)
                    WHERE p.name = $name
                    RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                    {
                        name: name
                    },
                    function(error){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(Result.emptyResult(result)){
                            Neo4j.runQuery(`
                                MATCH (u:User)
                                WHERE ID(u) = $id
                                MATCH (perm_member:Permission)
                                WHERE 
                                    perm_member.type = `+MANAGE_PROJECT+` 
                                CREATE 
                                    path1 = (u)-[do:DO]->(a:Action{date: $timestamp, type: $type, root: true})-[gr:GOT_ROLE]->(r:Role{name:"Chef de projet"}), 
                                    path2 = (a)-[act:ACT]->(p:Project{name: $name, description: $description, date: $timestamp, visibility: $visibility, isFinish: false}),
                                    path3 = (p)-[:OWN_ROLE]->(r),
                                    path4 = (p)-[:OWN_ROLE]->(r2:Role{name:"Membre", default: true}),
                                    path5 = (r2)-[:HAVE_PERMISSION]->(perm_member),
                                    path7 = (p)<-[:BELONG_TO]-(c:Conversation)
                                WITH r, path1, path2, path3, path4, path5, path7
                                MATCH (per:Permission)
                                CREATE path6 = (r)-[:HAVE_PERMISSION]->(per)
                                WITH 
                                    COLLECT(path1) AS path1Collect, 
                                    COLLECT(path2) AS path2Collect, 
                                    COLLECT(path3) AS path3Collect, 
                                    COLLECT(path4) AS path4Collect, 
                                    COLLECT(path5) AS path5Collect, 
                                    COLLECT(path6) AS path6Collect,
                                    COLLECT(path7) AS path7Collect
                                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                                CALL apoc.convert.toTree(path3Collect) YIELD value AS p3
                                CALL apoc.convert.toTree(path4Collect) YIELD value AS p4
                                CALL apoc.convert.toTree(path5Collect) YIELD value AS p5
                                CALL apoc.convert.toTree(path6Collect) YIELD value AS p6
                                CALL apoc.convert.toTree(path7Collect) YIELD value AS p7
                                RETURN p1, p2, p3, p4, p5, p6, p7
                            `,
                                {
                                    "id": neo4j.int(user.id),
                                    "name": name,
                                    "description": description,
                                    "timestamp": Neo4j.timestamp(),
                                    "type": IN_PROJECT,
                                    "visibility": PUBLIC_VISIBILITY
                                },
                                function(error){
                                    console.log(error)
                                    res.send(JSON_WENT_WRONG);
                                },
                                function(result){
                                    console.log(result);
                                    if(!Result.emptyResult(result)){
                                        let p1 = Result.getResultRecord(result, "p1");
                                        let p2 = Result.getResultRecord(result, "p2");
                                        let p3 = Result.getResultRecord(result, "p3");
                                        let p4 = Result.getResultRecord(result, "p4");
                                        let p5 = Result.getResultRecord(result, "p5");
                                        let p6 = Result.getResultRecord(result, "p6");
                                        let p7 = Result.getResultRecord(result, "p7");
                                        //Neo4j.makeNotif(user.id, p3[0]["id"], user.id, [], {"type": CREATE_PROJECT}, true)
                                        res.send({
                                            status: "success",
                                            result: {
                                                p1: p1,
                                                p2: p2,
                                                p3: p3,
                                                p4: p4,
                                                p5: p5,
                                                p6: p6,
                                                p7: p7
                                            }
                                        });
                                    }
                                    else {
                                        res.send(JSON_EXIST);
                                    }
                                }
                            );
                        }
                        else {
                            res.send(JSON_EXIST);
                        }
                    }
                );
            }
        );   
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/project/del', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");

    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                    MATCH (p:Project) 
                        WHERE ID(p) = $id_project
                        MATCH path = ()-[]-(p)-[]-()
                        detach delete path
                    `,
                {
                    "id_project": neo4j.int(id_project)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        res.send({
                            status: "success"
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/project/end', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");

    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                    MATCH (p:Project) 
                        WHERE ID(p) = $id_project
                        SET p.isFinish = true;
                    `,
                {
                    "id_project": neo4j.int(id_project)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        res.send({
                            status: "success"
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/project/get/tecno', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                MATCH (p:Project)
                WHERE ID(p) = $id
                MATCH path = (p)-[:USE]->(t:Tecno)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                RETURN value AS tecno`,
                {
                    "id": neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let tecno = Result.getResultRecord(result, "tecno");
                        res.send({
                            status: "success",
                            result: {
                                tecno: tecno
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/search/tecno', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    let elem = Request.params(Request.POST, req , "elem");
    
    if(Utils.isString(name)){
        runQuery(`
            MATCH (t:Tecno)
            MATCH (p:Project)
            WHERE ID(p) = $elem AND NOT EXISTS((t)-[:USE]-(p)) AND apoc.text.clean(t.name) =~ '.*'+apoc.text.clean($name)+'.*'
            RETURN t{.*, id: ID(t), _type: head(labels(t))} AS tecno`,
            {
                "name": name,
                "elem" : neo4j.int(elem)
            },
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                let tecno = Result.getResultRecord(result, "tecno");
                res.send({
                    status: "success",
                    result: {
                        tecno : tecno
                    }
                });
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/skill/get', function(req, res){
    runQuery(`
        MATCH (s:Skill)
        RETURN s{.*, id: ID(s), _type: head(labels(s))} AS skill`,
        {},
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let skillList = Result.getResultRecord(result, "skill");
                res.send({
                    status: "success",
                    result: {
                        skill: skillList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/project', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                MATCH (u:User)
                WHERE ID(u) = $id
                MATCH path1 = (u)-[:DO]->(a:Action)-[:ACT|GOT_ROLE]->(p)
                WITH COLLECT(path1) AS path1Collect
                CALL apoc.convert.toTree(path1Collect) YIELD value AS projectList
                RETURN projectList`,
                {
                    "id": neo4j.int(id)
                },
                function(err){
                    console.log(err)
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let projectList = Result.getResultRecord(result, "projectList");
                        res.send({
                            status: "success",
                            result: {
                                projectList: projectList
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/user/get', function(req, res){
    let id = Request.params(Request.POST, req, "id");
    runQuery(`
        MATCH (u:User)
        WHERE ID(u) = $id
        RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS user`,
        {
            "id": neo4j.int(id)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let user = Result.getResultRecord(result, "user");
            res.send({
                status: "success",
                result: {
                    user: user
                }
            });
        }
    );
});
router.post('/user/get/skill', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                MATCH (u:User)
                WHERE ID(u) = $id
                MATCH path = (u)-[:GOT_SKILL]->(s:Skill)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                RETURN value AS skill`,
                {
                    "id": neo4j.int(id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    let skill = Result.getResultRecord(result, "skill");
                    res.send({
                        status: "success",
                        result: {
                            skill: skill
                        }
                    });
                }
            );
        }
    );
});
router.post('/search/element', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    if(Utils.isString(name)){
        runQuery(`
        MATCH (p)-[:GOT_SKILL|FOR_COMP|USE*0..1]->(s)
        WHERE ( 
            p:User OR p:Actu OR p:Project ) AND ( apoc.text.clean(p.firstname) =~ '.*'+apoc.text.clean($name)+'.*' OR
            apoc.text.clean(p.lastname) =~ '.*'+apoc.text.clean($name)+'.*' OR
            apoc.text.clean(s.name) =~ '.*'+apoc.text.clean($name) +'.*' OR
            apoc.text.clean(s.name) =~ '.*'+apoc.text.clean($name) +'.*' 
        )
        OPTIONAL MATCH path = (p)-[ic:IS_COMMENT|ACTU_REQ|GOT_SKILL|USE|FOR_COMP|FOR_ROLE*0..1]-(c)-[:SEND_COMMENT|REQ_USER*0..1]-(a)
        WITH COLLECT(path) as pathCollect
        CALL apoc.convert.toTree(pathCollect) YIELD value 
        RETURN value`,
            {
                "name": name,
            },
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                let value = Result.getResultRecord(result, "value");
                res.send({
                    status: "success",
                    result: {
                        value: value
                    }
                });
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post("/actu/invite", function(req, res){
    let user_id = Request.params(Request.POST, req, "user_id");
    let actu_id = Request.params(Request.POST, req, "actu_id");
    runQuery(`
        MATCH (u:User)
        WHERE ID(u) = $user_id
        MATCH (a:Actu)
        WHERE ID(a) = $actu_id
        MERGE path1 = (a)-[:ACTU_REQ]->(r:Request)-[:REQ_USER]->(u)
        WITH path1, a, r, u
        SET r.date = $date, r.invited = TRUE
        WITH r, path1
        MATCH path2 = (a)-[:ACTU_REQ]->(r)-[:REQ_USER|LOCAL_CONV]->(u)-[*0..1]-(o)-[*0..1]-(h)-[:SEND_COMMENT|IS_FROM*0..1]-(z)
        WITH COLLECT(path2) AS path2Collect
        CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
        RETURN p2`,
        {
            "user_id": neo4j.int(user_id),
            "actu_id": neo4j.int(actu_id),
            "date": Neo4j.timestamp()
        },
        function(err){
            console.log(err)
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let p1 = Result.getResultRecord(result, "p1");
            let p2 = Result.getResultRecord(result, "p2");
            console.log("ALOA")
            res.send({
                status: "success",
                result: {
                    p1: p1,
                    p2: p2
                }
            });
        }
    );
});
router.post('/search/user', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    if(Utils.isString(name)){
        runQuery(`
            MATCH (p)
            WHERE 
            ( p:User AND
                ( 
                    apoc.text.clean(p.firstname) =~ '.*'+apoc.text.clean($name)+'.*' OR
                    apoc.text.clean(p.lastname) =~ '.*'+apoc.text.clean($name)+'.*'
                )  
            )
            RETURN p{.*, id: ID(p), _type: head(labels(p))} AS project`,
            {
                "name": name,
            },
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                let project = Result.getResultRecord(result, "project");
                res.send({
                    status: "success",
                    result: {
                        project: project
                    }
                });
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/del/project', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            Neo4j.runQuery(`
                MATCH (p:Project)
                WHERE ID(p) = $id_project
                MATCH (u:User)
                WHERE ID(u) = $id_user
                OPTIONAL MATCH path = (u)-[d:DO]->(a:Action)-[act:ACT]->(p)
                RETURN 
                    p{.*, _type: head(labels(p)), id: ID(p)} AS p,
                    u{.*, _type: head(labels(u)), id: ID(u)} AS u,
                    a{.*, _type: head(labels(a)), id: ID(a)} AS a`,
                {
                    id_user: neo4j.int(user.id),
                    id_project: neo4j.int(id_project)
                },
                function(error){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let action = Result.getResultRecord(result, "a");
                        if(action.length==1){
                            let type = LEAVE;
                            if(action[0].type == PROJECT_ASK_TO_USER){
                                type = PROJECT_ASK_TO_USER + 2;
                            }
                            Neo4j.runQuery(`
                                MATCH (u:User)
                                WHERE ID(u) = $id_user
                                MATCH (p:Project)
                                WHERE ID(p) = $id_project
                                MATCH path1 = (u)-[do:DO]->(a:Action)-[act:ACT]->(p)
                                SET a.date = $timestamp, a.type = $type
                                WITH COLLECT(path1) AS path1Collect
                                CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                RETURN p1`, 
                                {
                                    "id_user": neo4j.int(user.id),
                                    "id_project": neo4j.int(id_project),
                                    "timestamp": Neo4j.timestamp(),
                                    "type": neo4j.int(type)
                                },
                                function(error){
                                    res.send(JSON_WENT_WRONG);
                                },
                                function(result){
                                    if(!Result.emptyResult(result)){
                                        let p1 = Result.getResultRecord(result, "p1");
                                        res.send({
                                            status: "success",
                                            result: {
                                                p1: p1
                                            }
                                        });
                                    }
                                    else {
                                        res.send(JSON_WENT_WRONG);
                                    }
                                }
                            )
                        }
                        else {
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                    else {
                        res.send(JSON_WENT_WRONG);
                    }
                }
            )
        }
    )
});
router.post('/user/add/project', function(req, res){
    /*let access_token = Request.params(Request.POST, req, "access_token");
    let id_project = Request.params(Request.POST, req, "id_project");
    let description = Request.params(Request.POST, req, "description");
    if(Utils.stringBorne(description, MIN_DESCRIPTION, MAX_DESCRIPTION)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.runQuery(`
                    MATCH (p:Project)
                    WHERE ID(p) = $id_project
                    MATCH (u:User)
                    WHERE ID(u) = $id_user
                    OPTIONAL MATCH path = (u)-[d:DO]->(a:Action)-[act:ACT]->(p)
                    RETURN 
                        p{.*, _type: head(labels(p)), id: ID(p)} AS p,
                        u{.*, _type: head(labels(u)), id: ID(u)} AS u,
                        a{.*, _type: head(labels(a)), id: ID(a)} AS a`,
                    {
                        id_user: neo4j.int(user.id),
                        id_project: neo4j.int(id_project)
                    },
                    function(error){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let action = Result.getResultRecord(result, "a");
                            let timestamp = Neo4j.timestamp();
                            if(action.length==0){
                                Neo4j.runQuery(`
                                    MATCH (u:User)
                                    WHERE ID(u) = $id_user
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id_project
                                    CREATE 
                                        path1 = (u)-[do:DO]->(a:Action{description: $description, date: $timestamp, type: $type})-[act:ACT]->(p)
                                    WITH COLLECT(path1) AS path1Collect, u, do, a, act, p
                                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                    RETURN 
                                        p{.*, _type: head(labels(p)), id: ID(p), me:[a{.*, _type: head(labels(a)), id: ID(a)}]} AS p0, 
                                        p1`, 
                                    {
                                        "id_user": neo4j.int(user.id),
                                        "id_project": neo4j.int(id_project),
                                        "description": description,
                                        "timestamp": timestamp,
                                        "type": USER_ASK_TO_PROJECT
                                    },
                                    function(error){
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        if(!Result.emptyResult(result)){
                                            let p0 = Result.getResultRecord(result, "p0");
                                            let p1 = Result.getResultRecord(result, "p1");
                                            Neo4j.makeNotif(user.id, p0[0]["do"][0]["id"], user.id, [], {"date": timestamp, "type": USER_ASK_TO_PROJECT}, true)
                                            res.send({
                                                status: "success",
                                                result: {
                                                    p0: p0,
                                                    p1: p1
                                                }
                                            });
                                        }
                                        else {
                                            res.send(JSON_WENT_WRONG);
                                        }
                                    }
                                )
                            }
                            else {
                                let a = action[0];
                                let type = USER_ASK_TO_PROJECT;
                                if(a.type == PROJECT_ASK_TO_USER){
                                    type = IN_PROJECT;
                                    Neo4j.makeFinalNotif(a["id"], user.id, {"type": PROJECT_ASK_TO_USER}, {"type": IN_PROJECT});
                                }
                                Neo4j.runQuery(`
                                    MATCH (u:User)
                                    WHERE ID(u) = $id_user
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id_project
                                    MATCH path1 = (u)-[do:DO]->(a:Action)-[act:ACT]->(p)
                                    MATCH path2 = (p)<-[act]-(a)<-[do]-(u)
                                    SET a.date = $timestamp, a.type = $type, a.description = $description
                                    WITH a, p, act, do, u, path1, path2
                                    OPTIONAL MATCH (a)-[gr:GOT_ROLE]->(r:Role)
                                    DELETE gr
                                    WITH COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect, a, p, act, do, u
                                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                                    CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                                    RETURN 
                                        p{.*, _type: head(labels(p)), id: ID(p), me:[a{.*, _type: head(labels(a)), id: ID(a)}]} AS p0, 
                                        p1, 
                                        p2`, 
                                    {
                                        "id_user": neo4j.int(user.id),
                                        "id_project": neo4j.int(id_project),
                                        "timestamp": timestamp,
                                        "type": type,
                                        "description": description
                                    },
                                    function(error){
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        if(!Result.emptyResult(result)){
                                            let p0 = Result.getResultRecord(result, "p0");
                                            let p1 = Result.getResultRecord(result, "p1");
                                            let p2 = Result.getResultRecord(result, "p2");
                                            Neo4j.makeNotif(user.id, a["id"], user.id, [], {"date": timestamp, "type": type})
                                            res.send({
                                                status: "success",
                                                result: {
                                                    p0: p0,
                                                    p1: p1,
                                                    p2: p2
                                                }
                                            });
                                        }
                                        else {
                                            res.send(JSON_WENT_WRONG);
                                        }
                                    }
                                )
                            }
                        } 
                        else {
                            res.send(JSON_NOT_FOUND);
                        }
                    }
                )
            }
        );
    } else {
        res.send(JSON_BAD_VALUE);
    }*/
});
router.post('/search/skill', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    let elem = Request.params(Request.POST, req , "elem");
    runQuery(
        `
        MATCH (s:Skill)
        MATCH (u:User)
        WHERE ID(u) = $elem AND NOT EXISTS((s)-[:GOT_SKILL]-(u)) AND apoc.text.clean(s.name) =~ '.*'+apoc.text.clean($name)+'.*'
        RETURN s{.*, id: ID(s), _type: head(labels(s))} AS skill
        `,
        {
            "name": name,
            "elem" : neo4j.int(elem)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let skill = Result.getResultRecord(result, "skill");
            res.send({
                status: "success",
                result: {
                    skill: skill
                }
            });
        }
    );
});
router.post('/empty/search/skill', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    let elem = Request.params(Request.POST, req , "elem");
    runQuery(
        `
        MATCH (s:Skill)
        WHERE apoc.text.clean(s.name) =~ '.*'+apoc.text.clean($name)+'.*'
        RETURN s{.*, id: ID(s), _type: head(labels(s))} AS skill
        `,
        {
            "name": name
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let skill = Result.getResultRecord(result, "skill");
            res.send({
                status: "success",
                result: {
                    skill: skill
                }
            });
        }
    );
});
router.post('/empty/search/tecno', function(req, res){
    let name = Request.params(Request.POST, req, "name");
    let elem = Request.params(Request.POST, req , "elem");
    runQuery(
        `
        MATCH (s:Tecno)
        WHERE apoc.text.clean(s.name) =~ '.*'+apoc.text.clean($name)+'.*'
        RETURN s{.*, id: ID(s), _type: head(labels(s))} AS skill
        `,
        {
            "name": name
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            let skill = Result.getResultRecord(result, "skill");
            res.send({
                status: "success",
                result: {
                    skill: skill
                }
            });
        }
    );
});

router.post('/user/set/description', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");

    if(Utils.stringBorne(value, MIN_DESCRIPTION, MAX_DESCRIPTION)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                runQuery(`
                    MATCH (u:User)
                    WHERE ID(u) = $id
                    SET u.description = $value
                    RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
                    {
                        "value": value.trim(),
                        "id": neo4j.int(user.id)
                    },
                    function(err){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let user = Result.getResultRecord(result, "u")[0];
                            res.send({
                                status: "success",
                                result: {
                                    user: user
                                }
                            });
                        }
                        else{
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/set/firstname', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");

    if(Utils.stringBorne(value, MIN_FIRSTNAME, MAX_FIRSTNAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                runQuery(`
                    MATCH (u:User)
                    WHERE ID(u) = $id
                    SET u.firstname = $value
                    RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
                    {
                        "value": value.trim(),
                        "id": neo4j.int(user.id)
                    },
                    function(err){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let user = Result.getResultRecord(result, "u")[0];
                            res.send({
                                status: "success",
                                result: {
                                    user: user
                                }
                            });
                        }
                        else{
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/set/lastname', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");

    if(Utils.stringBorne(value, MIN_LASTNAME, MAX_LASTNAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                runQuery(`
                    MATCH (u:User)
                    WHERE ID(u) = $id
                    SET u.lastname = $value
                    RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
                    {
                        "value": value.trim(),
                        "id": neo4j.int(user.id)
                    },
                    function(err){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let user = Result.getResultRecord(result, "u")[0];
                            res.send({
                                status: "success",
                                result: {
                                    user: user
                                }
                            });
                        }
                        else{
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/add/skill', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");

    if(Utils.stringBorne(value, MIN_SKILLNAME, MAX_SKILLNAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                runQuery(`
                    MERGE (n:Skill{name:$value}) WITH n
                    MATCH (a:User)
                    WHERE ID(a) = $id
                    MERGE path = (a)-[r:GOT_SKILL]->(n)
                    WITH COLLECT(path) AS pathCollect
                    CALL apoc.convert.toTree(pathCollect) YIELD value
                    RETURN value AS u`,
                {
                    "value": value.trim(),
                    "id": neo4j.int(user.id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let user = Result.getResultRecord(result, "u")[0];
                        res.send({
                            status: "success",
                            result: {
                                user: user
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                });
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/delete/skill', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let elem = Request.params(Request.POST, req, "elem");
    let elem_del = Request.params(Request.POST, req, "elem_del");

    JWT.checkSession(
        access_token, 
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(user){
            runQuery(`
                    MATCH (u) 
                    WHERE ID(u) = $id
                    MATCH (u)-[r:GOT_SKILL]-(s)
                    WHERE ID(s) = $elem_del
                    DELETE r
                    RETURN u{.*, id: ID(u), _type:head(labels(u)), got_skill:[
                        s{.*, id: ID(s), id_del: ID(s), _type:head(labels(s))}
                    ]}
                    `,
                {
                    "elem_del": neo4j.int(elem_del),
                    "id": neo4j.int(user.id)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(!Result.emptyResult(result)){
                        let user = Result.getResultRecord(result, "u")[0];
                        res.send({
                            status: "success",
                            result: {
                                user: user
                            }
                        });
                    }
                    else{
                        res.send(JSON_WENT_WRONG);
                    }
                }
            );
        }
    );
});
router.post('/user/register', function(req, res){

    let firstname = Request.params(Request.POST, req, "firstname");
    let lastname = Request.params(Request.POST, req, "lastname");
    let email = Request.params(Request.POST, req, "email");
    let password = Request.params(Request.POST, req, "password");
    let birth = Request.params(Request.POST, req, "birth");

    if(Utils.stringBorne(firstname, MIN_FIRSTNAME, MAX_FIRSTNAME)
    &&Utils.stringBorne(lastname, MIN_LASTNAME, MAX_LASTNAME)
    &&Utils.stringBorne(email, MIN_EMAIL, MAX_EMAIL)
    &&Utils.validateEmail(email)
    &&Utils.stringBorne(password, MIN_PASSWORD, MAX_PASSWORD)){
        Neo4j.runQuery(`
            MATCH (u:User)
            WHERE u.email = $email
            RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
            {
                email: email
            },
            function(error){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                if(Result.emptyResult(result)){
                    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
                        if(err){
                            res.send(JSON_WENT_WRONG);
                        }
                        else {
                            Neo4j.runQuery(`
                                CREATE (u:User{email: $email, lastname: $lastname, firstname: $firstname, password: $password, birth: $birth, date: $date})
                                RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
                                {
                                    email: email,
                                    lastname: lastname,
                                    firstname: firstname,
                                    password: hash,
                                    birth: neo4j.int(birth),
                                    date: Neo4j.timestamp()
                                },
                                function(error){
                                    res.send(JSON_WENT_WRONG);
                                },
                                function(result){
                                    if(Result.emptyResult(result)){
                                        res.send(JSON_NOT_FOUND);
                                    }
                                    else {
                                        let user = Result.getResultRecord(result, "u")[0];
                                        login(user, res);
                                    }
                                }
                            );
                        }
                    });
                }
                else {
                    res.send(JSON_EXIST);
                }
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/login_token', function(req, res){

    let refresh_token = Request.params(Request.POST, req, "refresh_token");

    JWT.checkSession(
        refresh_token, 
        function(error){
            res.send(JSON_WENT_WRONG);
        }, 
        function(user){
            Neo4j.runQuery(`
                MATCH (u:User)
                WHERE ID(u) = $id
                RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
                {
                    id: neo4j.int(user.id_str)
                },
                function(err){
                    res.send(JSON_WENT_WRONG);
                },
                function(result){
                    if(Result.emptyResult(result)){
                        res.send(JSON_NOT_FOUND);
                    }
                    else {
                        let user = Result.getResultRecord(result, "u")[0];
                        login(user, res);
                    }
                }
            )
        }
    );
});
router.post('/user/login', function(req, res){

    let email = Request.params(Request.POST, req, "email");
    let password = Request.params(Request.POST, req, "password");

    if(Utils.stringBorne(email, MIN_EMAIL, MAX_EMAIL)
    &&Utils.validateEmail(email)
    &&Utils.stringBorne(password, MIN_PASSWORD, MAX_PASSWORD)){
        Neo4j.runQuery(`
            MATCH (u:User)
            WHERE u.email = $email
            RETURN u{.*, _type: head(labels(u)), id: ID(u)} AS u`,
            {
                email: email
            },
            function(error){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                if(Result.emptyResult(result)){
                    res.send(JSON_NOT_FOUND);
                }
                else {
                    let user = Result.getResultRecord(result, "u")[0];
                    bcrypt.compare(password, user.password, function(err, goodPassword) {
                        if(goodPassword===true){
                            login(user, res);
                        }
                        else {
                            res.send(JSON_WRONG_PASSWORD);
                        }
                    });
                }
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});
router.post('/user/create/conversation', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let senderId = Request.params(Request.POST, req, "senderId");
    let receiverId = Request.params(Request.POST, req, "receiverId");
    let request = Request.params(Request.POST, req, "request");
    
    let quetyStr = "";
    if(request!=undefined){
        quetyStr = `
            CREATE (c:Conversation) WITH c
            MATCH (a:User) 
            MATCH (b:User)
            MATCH (r:Request)
            WHERE ID(a) = $senderId AND ID(b) = $receiverId AND ID(r) = $request
            CREATE path0 = (r)-[:LOCAL_CONV]->(c)
            CREATE path1 = (c)<-[:IS_MEMBER]-(a)
            CREATE path2 = (c)<-[:IS_MEMBER]-(b)
            WITH COLLECT(path0) AS path0Collect, COLLECT(path1) AS path1Collect, COLLECT(path2) AS path2Collect 
            CALL apoc.convert.toTree(path0Collect) YIELD value AS p0
            CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
            CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
            RETURN p0,p1,p2
        `;
        request = neo4j.int(request);
    }
    else {
        quetyStr = `
            CREATE (c:Conversation) WITH c
            MATCH (a:User) 
            MATCH (b:User)
            WHERE ID(a) = $senderId AND ID(b) = $receiverId
            CREATE path1 = (a)-[:IS_MEMBER]->(c)
            CREATE path2 = (b)-[:IS_MEMBER]->(c)
            WITH COLLECT(path1) AS path1Collect,COLLECT(path2) AS path2Collect 
            CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
            CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
            RETURN 0 AS p0, p1, p2
        `; 
    }
    Neo4j.runQuery(
        quetyStr,
        {
            senderId: neo4j.int(senderId),
            receiverId: neo4j.int(receiverId),
            request: request
        },
        function(error){
            console.log(error);
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let member0 = Result.getResultRecord(result, "p0");
                let member1 = Result.getResultRecord(result, "p1");
                let member2 = Result.getResultRecord(result, "p2");
                res.send({
                    status: "success",
                    result: {
                        member0: member0,
                        member1: member1,
                        member2: member2
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/projectMembers', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idProject = Request.params(Request.POST, req, "idProject");
    runQuery(`
            MATCH (p:Project) WHERE ID(p) = $idProject
                MATCH path = (p)-[:ACT]-(a:Action)-[:DO]-(u:User)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p1
                RETURN p1`,
        {
            "idProject": neo4j.int(idProject)
        },  
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let userFriendsList = Result.getResultRecord(result, "p1");
                res.send({
                    status: "success",
                    result: {
                        members: userFriendsList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/add/conversationUser', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let senderId = Request.params(Request.POST, req, "senderId");
    let conversationId = Request.params(Request.POST, req, "conversationId");
    
    Neo4j.runQuery(`
        MATCH (u:User) WHERE ID(u) = $senderId
        MATCH (c:Conversation) WHERE ID(c) = $conversationId
        CREATE path = (u)-[r:IS_MEMBER]->(c)
        WITH COLLECT(path) AS path1Collect
        CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
        RETURN p1`,
    {
        senderId: neo4j.int(senderId),
        conversationId: neo4j.int(conversationId)
    },
    function(error){
        res.send(JSON_WENT_WRONG);
    },
    function(result){
        if(!Result.emptyResult(result)){
            let member1 = Result.getResultRecord(result, "p1");
            res.send({
                status: "success",
                result: {
                    member: member1,
                }
            });
        }
        else{
            res.send(JSON_WENT_WRONG);
        }
    }

);
});
router.post('/user/get/conversationProject', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idProject = Request.params(Request.POST, req, "idProject");
    runQuery(`
            MATCH (p:Project)  
                WHERE ID(p) = $idProject
                MATCH path = (p)-[:BELONG_TO]-(c:Conversation)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                RETURN value AS c`,
        {
            "idProject": neo4j.int(idProject)
        },  
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let conversation = Result.getResultRecord(result, "c");
                res.send({
                    status: "success",
                    result: {
                        conv: conversation
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/conversation', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    runQuery(`
        MATCH (a:User)
            WHERE ID(a) = $id
            MATCH path = (a)-[r:IS_MEMBER]->(c:Conversation)
            WITH COLLECT(path) AS pathCollect
            CALL apoc.convert.toTree(pathCollect) YIELD value
            RETURN value AS c`,
        {
            "id": neo4j.int(id)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let conversationList = Result.getResultRecord(result, "c");
                res.send({
                    status: "success",
                    result: {
                        conversation_list: conversationList,
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/conversationWithFriend', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let id = Request.params(Request.POST, req, "id");
    let id_friend = Request.params(Request.POST, req, "id_friend");
    runQuery(`
            MATCH (a:User)
            WHERE ID(a) = $id
            MATCH (b:User) 
            WHERE ID(b) = $id_friend
                MATCH path = (a)-[:IS_MEMBER]->(c:Conversation)<-[:IS_MEMBER]-(b)
                WITH COLLECT(path) AS pathCollect
                CALL apoc.convert.toTree(pathCollect) YIELD value
                RETURN value AS c`,
        {
            "id": neo4j.int(id),
            "id_friend": neo4j.int(id_friend)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let conversation = Result.getResultRecord(result, "c");
                res.send({
                    status: "success",
                    result: {
                        conversation: conversation,
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/message', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idConv = Request.params(Request.POST, req, "idConv");
    runQuery(`
        MATCH (c:Conversation)
            WHERE ID(c) = $idConv
            MATCH path0 = (c)<-[r:IS_MSG]-(m:Message)<-[g:SEND_MSG]-(u:User)
            WITH COLLECT(path0) AS path0Collect
            CALL apoc.convert.toTree(path0Collect) YIELD value
            RETURN value`,
        {
            "idConv": neo4j.int(idConv)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let messageList = Result.getResultRecord(result, "value");
                res.send({
                    status: "success",
                    result: {
                        message_list: messageList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/create/message', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let senderId = Request.params(Request.POST, req, "senderId");
    let conversation_id = Request.params(Request.POST, req, "conversationId");
    let message = Request.params(Request.POST, req, "message");


    JWT.checkSession(
        access_token,
        function(error){
            res.send(JSON_WENT_WRONG);
        }, 
        function(user){
            Neo4j.runQuery(`
                CREATE (m:Message{text: $message, date: $date}) WITH m
                    MATCH (a:User) 
                    MATCH (c:Conversation)
                    WHERE ID(a) = $sender_id AND ID(c) = $conversation_id
                    CREATE path1 = (m)<-[r:SEND_MSG]-(a)
                    CREATE path2 = (c)<-[s:IS_MSG]-(m)
                    WITH COLLECT(path1) AS path1Collect,COLLECT(path2) AS path2Collect 
                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                    CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                    RETURN p1,p2`,
            {
                sender_id: neo4j.int(user.id),
                conversation_id: neo4j.int(conversation_id),
                message: message,
                date: Neo4j.timestamp()
            },
            function(error){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                if(!Result.emptyResult(result)){
                    let member1 = Result.getResultRecord(result, "p1");
                    let conv = Result.getResultRecord(result, "p2");
                    res.send({
                        status: "success",
                        result: {
                            conv: conv,
                            member1: member1
                        }
                    });
                }
                else{
                    res.send(JSON_WENT_WRONG);
                }
            })
        }
    );
});
router.post('/user/create/commentaire', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let senderId = Request.params(Request.POST, req, "senderId");
    let receiverId = Request.params(Request.POST, req, "receiverId");
    let commentaire = Request.params(Request.POST, req, "commentaire");
    let projectId = Request.params(Request.POST, req, "projectId");
    let note = Request.params(Request.POST, req, "note");

    JWT.checkSession(
        access_token,
        function(error){
            res.send(JSON_WENT_WRONG);
        }, 
        function(user){
            Neo4j.runQuery(`
                CREATE (c:Commentaire{note: $note, text: $commentaire, date: $date}) WITH c
                    MATCH (a:User) 
                    MATCH (u:User)
                    MATCH (p:Project)
                    WHERE ID(a) = $senderId AND ID(u) = $receiverId AND ID(p) = $projectId
                    CREATE 
                        path1 = (c)<-[sd:SEND_COMMENT]-(a),
                        path2 = (u)<-[ic:IS_COMMENT]-(c),
                        path3 = (c)<-[if:IS_FROM]-(p)
                    WITH COLLECT(path1) AS path1Collect,COLLECT(path2) AS path2Collect,COLLECT(path3) AS path3Collect
                    CALL apoc.convert.toTree(path1Collect) YIELD value AS p1
                    CALL apoc.convert.toTree(path2Collect) YIELD value AS p2
                    CALL apoc.convert.toTree(path3Collect) YIELD value AS p3
                    RETURN p1,p2,p3`,
            {
                "senderId": neo4j.int(user.id_str),
                "receiverId": neo4j.int(receiverId),
                "commentaire": commentaire,
                "note": note,
                "projectId": neo4j.int(projectId),
                "date": Neo4j.timestamp(),
            },
            function(error){
                res.send(JSON_WENT_WRONG);
            },
            function(result){
                if(!Result.emptyResult(result)){
                    let member1 = Result.getResultRecord(result, "p1");
                    let member2 = Result.getResultRecord(result, "p2");
                    let projet = Result.getResultRecord(result, "p3");
                    res.send({
                        status: "success",
                        result: {
                            member1: member1,
                            member2: member2,
                            projet: projet
                        }
                    });
                }
                else{
                    res.send(JSON_WENT_WRONG);
                }
            })
        }
    );
});
router.post('/user/get/members', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idConv = Request.params(Request.POST, req, "idConv");
    runQuery(`
        MATCH (c:Conversation)
            WHERE ID(c) = $idConv
            MATCH path = (c)<-[r:IS_MEMBER]-(u:User)
            WITH COLLECT(path) AS pathCollect
            CALL apoc.convert.toTree(pathCollect) YIELD value
            RETURN value AS c`,
        {
            "idConv": neo4j.int(idConv)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let memberList = Result.getResultRecord(result, "c");
                res.send({
                    status: "success",
                    result: {
                        members: memberList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/commentaires', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let sender_id = Request.params(Request.POST, req, "sender_id");
    runQuery(`
            MATCH (u:User)
                WHERE ID(u) = $sender_id
                MATCH path = (u)<-[ic:IS_COMMENT]-(c:Commentaire)<-[sc:SEND_COMMENT]-(a:User),
                    path2 = (c)<-[IS_FROM]-(p:Project)
                WITH COLLECT(path) AS pathCollect,COLLECT(path2) AS pathCollect2
                CALL apoc.convert.toTree(pathCollect) YIELD value AS p1
                CALL apoc.convert.toTree(pathCollect2) YIELD value AS p2
                RETURN p1,p2`,
        {
            "sender_id": neo4j.int(sender_id)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let commentList = Result.getResultRecord(result, "p1");
                let projectList = Result.getResultRecord(result, "p2");
                res.send({
                    status: "success",
                    result: {
                        commentaires: commentList,
                        project_list: projectList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/moyenneNotes', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let sender_id = Request.params(Request.POST, req, "sender_id");
    runQuery(`
            MATCH (u:User)
                WHERE ID(u) = $sender_id
                MATCH path = (u)<-[ic:IS_COMMENT]-(c:Commentaire)<-[sc:SEND_COMMENT]-(a:User)
                return u{.*, _id: ID(u), _type: "User", moyenne: avg(c.note)} AS u`,
        {
            "sender_id": neo4j.int(sender_id)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let moyenne = Result.getResultRecord(result, "u");
                res.send({
                    status: "success",
                    result: {
                        moyenne_notes : moyenne
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/messageWriter', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idMessage = Request.params(Request.POST, req, "idMessage");
    runQuery(`
        Match (m:Message)
            WHERE ID(m) = $idMessage
            MATCH path = (u:User)-[r:SEND_MSG]->(m)
            WITH COLLECT(path) AS pathCollect
            CALL apoc.convert.toTree(pathCollect) YIELD value
            RETURN value AS c`,
        {
            "idMessage": neo4j.int(idMessage)
        },
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let member = Result.getResultRecord(result, "c");
                res.send({
                    status: "success",
                    result: {
                        member: member
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.post('/user/get/userFriends', function(req, res){
    let access_token = Request.params(Request.POST, req, "access_token");
    let idUser = Request.params(Request.POST, req, "idUser");
    runQuery(`
            MATCH path = (u_my:User)-[:IS_MEMBER]->(c:Conversation)<-[:IS_MEMBER]-(u_other:User)
                WHERE ID(u_my) = $idUser
                WITH COLLECT(ID(u_other)) AS not_id
                MATCH (u_not:User)
                WHERE NOT ID(u_not) IN not_id
                RETURN u_not{.*, _id: ID(u_not), _type: "User"} as value`,
        {
            "idUser": neo4j.int(idUser)
        },  
        function(err){
            res.send(JSON_WENT_WRONG);
        },
        function(result){
            if(!Result.emptyResult(result)){
                let userFriendsList = Result.getResultRecord(result, "value");
                res.send({
                    status: "success",
                    result: {
                        friends: userFriendsList
                    }
                });
            }
            else{
                res.send(JSON_WENT_WRONG);
            }
        }
    );
});
router.get('/', function(req, res){
    res.send({"message":"Hello world !!!"})
});
router.post('/project/set/profile', function(req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        let access_token = fields.access_token;
        let id = fields.id;
        JWT.checkSession(
            access_token, 
            function(err){
                fs.unlinkSync(files.file.filepath);
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.havePermission(
                    user.id,
                    id,
                    MANAGE_PROJECT,
                    function(err){
                        fs.unlinkSync(files.file.filepath);
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        let ext = files.file.originalFilename.split('.').pop();
                        let name = randomUUID() + '.' + ext
                        let newpath = '/home/l2_info_9/Projet_info-405/image/' + name;
                        fs.rename(files.file.filepath, newpath, function(err) {
                            if (err) {
                                fs.unlinkSync(newpath);
                                res.send(JSON_WENT_WRONG);
                            }
                            else {
                                runQuery(`
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id
                                    SET p.profile = $name
                                    RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                                    {
                                        "name": name,
                                        "id": neo4j.int(id)
                                    },
                                    function(err){
                                        fs.unlinkSync(newpath);
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        if(!Result.emptyResult(result)){
                                            let project = Result.getResultRecord(result, "p")[0];
                                            res.send({
                                                status: "success",
                                                result: {
                                                    project: project
                                                }
                                            });
                                        }
                                        else{
                                            fs.unlinkSync(newpath);
                                            res.send(JSON_WENT_WRONG);
                                        }
                                    }
                                );
                            }
                        });
                    }
                );
            }
        );
    });
});
router.post('/project/set/banner', function(req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        let access_token = fields.access_token;
        let id = fields.id;
        JWT.checkSession(
            access_token, 
            function(err){
                fs.unlinkSync(files.file.filepath);
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                Neo4j.havePermission(
                    user.id,
                    id,
                    MANAGE_PROJECT,
                    function(){
                        fs.unlinkSync(files.file.filepath);
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(role){
                        let ext = files.file.originalFilename.split('.').pop();
                        let name = randomUUID() + '.' + ext
                        let newpath = '/home/l2_info_9/Projet_info-405/image/' + name;
                        fs.rename(files.file.filepath, newpath, function(err) {
                            if (err) {
                                fs.unlinkSync(newpath);
                                res.send(JSON_WENT_WRONG);
                            }
                            else {
                                runQuery(`
                                    MATCH (p:Project)
                                    WHERE ID(p) = $id
                                    SET p.banner = $name
                                    RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                                    {
                                        "name": name,
                                        "id": neo4j.int(id)
                                    },
                                    function(err){
                                        fs.unlinkSync(newpath);
                                        res.send(JSON_WENT_WRONG);
                                    },
                                    function(result){
                                        if(!Result.emptyResult(result)){
                                            let project = Result.getResultRecord(result, "p")[0];
                                            res.send({
                                                status: "success",
                                                result: {
                                                    project: project
                                                }
                                            });
                                        }
                                        else{
                                            fs.unlinkSync(newpath);
                                            res.send(JSON_WENT_WRONG);
                                        }
                                    }
                                );
                            }
                        });
                    }
                );
            }
        );
    });
});
router.post('/user/set/profile', function(req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        let access_token = fields.access_token;
        JWT.checkSession(
            access_token, 
            function(err){
                fs.unlinkSync(files.file.filepath);
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                let ext = files.file.originalFilename.split('.').pop();
                let name = randomUUID() + '.' + ext
                let newpath = '/home/l2_info_9/Projet_info-405/image/' + name;
                fs.rename(files.file.filepath, newpath, function(err) {
                    if (err) {
                        fs.unlinkSync(newpath);
                        res.send(JSON_WENT_WRONG);
                    }
                    else {
                        runQuery(`
                            MATCH (p:User)
                            WHERE ID(p) = $id
                            SET p.profile = $name
                            RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                            {
                                "name": name,
                                "id": neo4j.int(user.id)
                            },
                            function(err){
                                fs.unlinkSync(newpath);
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let project = Result.getResultRecord(result, "p")[0];
                                    res.send({
                                        status: "success",
                                        result: {
                                            project: project
                                        }
                                    });
                                }
                                else{
                                    fs.unlinkSync(newpath);
                                    res.send(JSON_WENT_WRONG);
                                }
                            }
                        );
                    }
                });
            }
        );
    });
});
router.post('/user/set/banner', function(req, res){
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        let access_token = fields.access_token;
        let id = fields.id;
        JWT.checkSession(
            access_token, 
            function(err){
                fs.unlinkSync(files.file.filepath);
                res.send(JSON_WENT_WRONG);
            },
            function(user){
                let ext = files.file.originalFilename.split('.').pop();
                let name = randomUUID() + '.' + ext
                let newpath = '/home/l2_info_9/Projet_info-405/image/' + name;
                fs.rename(files.file.filepath, newpath, function(err) {
                    if (err) {
                        fs.unlinkSync(newpath);
                        res.send(JSON_WENT_WRONG);
                    }
                    else {
                        runQuery(`
                            MATCH (p:User)
                            WHERE ID(p) = $id
                            SET p.banner = $name
                            RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                            {
                                "name": name,
                                "id": neo4j.int(user.id)
                            },
                            function(err){
                                fs.unlinkSync(newpath);
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let project = Result.getResultRecord(result, "p")[0];
                                    res.send({
                                        status: "success",
                                        result: {
                                            project: project
                                        }
                                    });
                                }
                                else{
                                    fs.unlinkSync(newpath);
                                    res.send(JSON_WENT_WRONG);
                                }
                            }
                        );
                    }
                });
            }
        );
    });
});
router.post('/project/set/description', function(req, res){

    // let id = Request.params(Request.POST, req, "id");
    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");
    let id = Request.params(Request.POST, req, "id");

    if(Utils.stringBorne(value, MIN_DESCRIPTION, MAX_DESCRIPTION)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(project){
                Neo4j.havePermission(
                    project.id,
                    id,
                    MANAGE_PROJECT,
                    function(){
                        res.send(JSON_NO_PERMISSION);
                    },
                    function(project){
                        runQuery(`
                            MATCH (p:Project)
                            WHERE ID(p) = $id
                            SET p.description = $value
                            RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                            {
                                "value": value.trim(),
                                "id": neo4j.int(id)
                            },
                            function(err){
                                res.send(JSON_WENT_WRONG);
                            },
                            function(result){
                                if(!Result.emptyResult(result)){
                                    let project = Result.getResultRecord(result, "p")[0];
                                    res.send({
                                        status: "success",
                                        result: {
                                            project: project
                                        }
                                    });
                                }
                                else{
                                    res.send(JSON_WENT_WRONG);
                                }
                            }
                        );
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});

router.post('/project/set/name', function(req, res){

    let access_token = Request.params(Request.POST, req, "access_token");
    let value = Request.params(Request.POST, req, "value");
    let id = Request.params(Request.POST, req, "id");

    if(Utils.stringBorne(value, MIN_FIRSTNAME, MAX_FIRSTNAME)){
        JWT.checkSession(
            access_token, 
            function(err){
                res.send(JSON_WENT_WRONG);
            },
            function(project){
                runQuery(`
                    MATCH (p:Project)
                    WHERE ID(p) = $id
                    SET p.name = $value
                    RETURN p{.*, _type: head(labels(p)), id: ID(p)} AS p`,
                    {
                        "value": value.trim(),
                        "id": neo4j.int(id)
                    },
                    function(err){
                        res.send(JSON_WENT_WRONG);
                    },
                    function(result){
                        if(!Result.emptyResult(result)){
                            let project = Result.getResultRecord(result, "p")[0];
                            res.send({
                                status: "success",
                                result: {
                                    project: project
                                }
                            });
                        }
                        else{
                            res.send(JSON_WENT_WRONG);
                        }
                    }
                );
            }
        );
    }
    else {
        res.send(JSON_BAD_VALUE);
    }
});

function login(user, res){
    Data.toPublic(user);
    let jsonUser = Data.convertJSON(user);
    JWT.createAccessToken(
        jsonUser, 
        function(err){
            res.send(JSON_WENT_WRONG);
        }, 
        function(access_token){
            JWT.createRefreshToken(
                jsonUser, 
                function(){
                    res.send(JSON_WENT_WRONG);
                }, 
                function(refresh_token){
                    res.send({
                        status: "success",
                        result: {
                            access_token: access_token,
                            refresh_token: refresh_token,
                            user: user
                        }
                    });
                }
            );
        }
    );
}

function getAction(id_user, id_project, callback){
    Neo4j.runQuery(`
            MATCH (p:Project)<-[:ACT]-(a:Action)<-[:DO]-(u:User)
            WHERE ID(p) = $id_project AND ID(u) = $id_user
            RETURN a{.*, _type: head(labels(a)), id: ID(a)} AS a
        `,
        {
            "id_user": neo4j.int(id_user),
            "id_project": neo4j.int(id_project)
        },
        function(error){
            callback(undefined);
        },
        function(result){
            if(Result.emptyResult(result)){
                callback(undefined);
            }
            else {
                callback(Result.getResultRecord(result, "a"));
            }
        }
    );
}


module.exports = router;