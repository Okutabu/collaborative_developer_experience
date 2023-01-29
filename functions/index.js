const ifunctions = require("./STOWrequests");
const dbfunctions = require("./similarityQueries");

const functions = require("firebase-functions");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

 exports.stow = functions.https.onRequest((req, res)=>{
  res.send(ifunctions.get_users_tags_async("1673130000","1673136000"));

 });

 exports.similarities = functions.https.onRequest((req, res) => {
  res.send(dbfunctions.cosinus_similarity(6309))
 });