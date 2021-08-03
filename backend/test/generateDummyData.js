var crypto = require("crypto");
const accountQueries = require('../controllers/accounts/queries');
const mentorQueries = require('../controllers/mentors/queries');
const pathwayQueries = require('../controllers/pathways/queries');

function randomString(strLen = 6){
    return crypto.randomBytes(strLen).toString('hex');
}
function flip(){
    return Math.random().toFixed(2) < .50;
}

async function generateDummyUsers(recordCount){
    for(let i = 0; i < recordCount; i++){
        let randString = randomString(); 
        let password = randString;
        let user = {
            "first_name": randString,
            "last_name": randString,
            "username": randString,
            "email": randString +"@foo.com"
        };
        try {
            let newUser = await accountQueries.createUser(user, password);
            console.log("\n\n\n\n\n\n\n\n" + newUser.id + "\n\n\n\n\n\n\n\n");
            if (flip()){
                await mentorQueries.setAsMentor( newUser.id)
            }
        } catch (err) {
            console.log(err);
        }
    }
}


async function generateDummyPathways(recordCount){
    for(let i = 0; i < recordCount; i++){
        let pathway = {
            "title": randomString(),
            "description": randomString(45),
        };
        let tasks = [];
        for(let j = 0; j < i + 1; j++){
            tasks.push({
                "title": randomString(),
                "sequence": j,
                "requires_review": flip(),
                "description": randomString(50)
            });
        }
        try {
            await pathwayQueries.createPathwayWithTasks(pathway, tasks);
        } catch (error) {
            console.log(error);
        }
    }
}

async  function generateDummyData(recordCount) {
    await generateDummyUsers(recordCount);
    await generateDummyPathways(recordCount);

}

module.exports.generateDummyData = generateDummyData;
