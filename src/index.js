const Discord = require('discord.js');
const fetch = require('node-fetch');

require('dotenv').config();

// new client
const client = new Discord.Client();

// message to client.
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

// check for messages.
// enter github username and get users first pull request.

client.on('message', msg => {
    
    // github username sent as message
    var userName = msg.content;

    // this long url query string gets users first pull request.  
    var url = "https://api.github.com/search/issues?q=type:pr+author:" + userName + "&sort=created&order=asc&per_page=1";    
    
    // fetch from api url as json.
    fetch(url)
    .then(res => res.json())
    // return body
    .then(body => {
        // prevents duplicate messages.
        if (msg.author.id !== client.user.id && msg.content){

            //destructure items array. 
            const [pr] = body.items;
            console.log(pr)  
        }
    })
    .catch(err => { console.log({error: err}) });
});

// login client using token
client.login(process.env.TOKEN);