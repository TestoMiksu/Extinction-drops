const djs  = require('discord.js')
const cfg = require('../utils/config.json')

module.exports = async(client, message) => {
    if (!message.content.startsWith(cfg.prefix)) return
    if(message.author.bot) return
    let args = message.content.toLowerCase().split(' ')
    let command = client.commands.get(args[0].substring(cfg.prefix.length))
    if (command) command.run(client, message)
}