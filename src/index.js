const Discord = require('discord.js');
require('dotenv').config();

// new client
const client = new Discord.Client();

// message to client.
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

// check for messages.

// login client using token
client.login(process.env.TOKEN);