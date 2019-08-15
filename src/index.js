const Discord = require('discord.js');
require('dotenv').config();

// new client
const client = new Discord.Client();

// message to client.
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

// check for messages.
client.on('message', msg => {
    // send reply when certain command is entered by a user.
    if (msg.content === 'hello') {
        msg.reply('Welcome to the server!');
    } 
});

// login client using token
client.login(process.env.TOKEN);