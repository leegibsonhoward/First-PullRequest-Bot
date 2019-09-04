const Discord = require('discord.js');
const fetch = require('node-fetch');

require('dotenv').config();

const URL = "https://api.github.com/search/issues"
const QUERY_AUTHOR = "?q=type:pr+author:"
const SORT_AND_ORDER = "&sort=created&order=asc&per_page=1"

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
    var author = msg.content;

    // query string concatenation gets users first pull request.  
    var url = URL + QUERY_AUTHOR + author + SORT_AND_ORDER; 
    
    // fetch from api url as json.
    fetch(url)
    .then(res => res.json())
    // return body
    .then(body => {
        // prevents duplicate messages.
        if (msg.author.id !== client.user.id && msg.content){

            //destructure items array. 
            const [pr] = body.items;
            // console.log(body)  

            // send to channel as embedded message
            let embed = new Discord.RichEmbed()
            .setThumbnail(pr.user.avatar_url)
            .setAuthor(pr.title)
            .setDescription(pr.html_url + '/commits')
            
            msg.channel.send({embed: embed});  
        }
    })
    .catch(err => { console.log({error: err}) });
});


// login client using token
client.login(process.env.TOKEN);