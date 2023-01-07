(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://47c2d019.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'iUqo1cQ1GZr0w1Am5Uy68kslIxkdk9zS62yDmlHjsdc';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    

    try {
        const person1Name = 'Alice';
        const person2Name = 'David';

        //await createFriendship(driver, person1Name, person2Name);

        //await findPerson(driver, person1Name);
        //await findPerson(driver, person2Name);
        //await test("TagName");
        await makeApiCall();

    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }

    async function createFriendship (driver, person1Name, person2Name) {

        // To learn more about sessions: https://neo4j.com/docs/javascript-manual/current/session-api/
        const session = driver.session({ database: 'neo4j' });

        try {
            // To learn more about the Cypher syntax, see: https://neo4j.com/docs/cypher-manual/current/
            // The Reference Card is also a good resource for keywords: https://neo4j.com/docs/cypher-refcard/current/
            const writeQuery = `MERGE (p1:Person { name: $person1Name })
                                MERGE (p2:Person { name: $person2Name })
                                MERGE (p1)-[:KNOWS]->(p2)
                                RETURN p1, p2`;

            // Write transactions allow the driver to handle retries and transient errors.
            const writeResult = await session.executeWrite(tx =>
                tx.run(writeQuery, { person1Name, person2Name })
            );

            // Check the write results.
            writeResult.records.forEach(record => {
                const person1Node = record.get('p1');
                const person2Node = record.get('p2');
                console.info(`Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`);
            });

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Close down the session if you're not using it anymore.
            await session.close();
        }
    }

    async function findPerson(driver, personName) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = `MATCH (p:Person)
                            WHERE p.name = $personName
                            RETURN p.name AS name`;
            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { personName })
            );

            readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function test(title) {

        const session = driver.session({ database: 'neo4j' });
    
        try {
            const requete = `MERGE (t:Tags { title: $title })`;
            
            const writeResult = await session.executeWrite(tx =>
                tx.run(requete, { title })
            );
    
            writeResult.records.forEach(record => {
                console.log(`Found tag: ${record.get('tag')}`)
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }

    async function makeApiCall(){
        const URL = 'https://api.stackexchange.com/2.3/users/3741589/timeline?fromdate=1656979200&todate=1672876800&site=stackoverflow&filter=!4-q5axL*s.NyACS38';
        const result = await fetch(URL)
        result.json().then(data=>{
            for (i in data.items){
                //console.log(data.items[i].post_type)
                if(data.items[i].post_type == "answer"){
                    makeApiCall3(data.items[i].post_id, data.items[i].post_type);
                } else {
                    makeApiCall2(data.items[i].post_id, data.items[i].post_type);
                }
            }
        })
    }

    async function makeApiCall2(postid, posttype){
        const URL2 = 'https://api.stackexchange.com/2.3/questions/'+postid+'?order=desc&sort=activity&site=stackoverflow'
        const result = await fetch(URL2)
        result.json().then(data=>{
            console.log("\n")
            console.log(posttype)
            console.log("\n")
            for (i in data.items[0].tags){
                console.log(data.items[0].tags[i]);
                test(data.items[0].tags[i]);
            };
            
        })
    }

    async function makeApiCall3(postid, posttype){
        const URL3 = 'https://api.stackexchange.com/2.3/answers/'+postid+'?order=desc&sort=activity&site=stackoverflow'
        const result = await fetch(URL3)
        result.json().then(data=>{
            makeApiCall2(data.items[0].question_id, posttype)
        })
    }

})();




    

