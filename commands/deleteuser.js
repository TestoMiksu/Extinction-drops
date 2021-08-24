const djs = require('discord.js')
const cfg = require('../utils/config.json')
const Drops = require('../models/drops')
const e = require('../utils/embed')

module.exports.run = async(client, msg) => {
    if (!cfg.perms.find(z => z === msg.author.id)) return 1

    let args = msg.content.split(' ')
    let id = args[1]
    
    if (id) {
        let fin = await Drops.findOne({
            userid: id
        })

        if (fin) {
            let del = await Drops.deleteOne({
                userid: id
            })

            let embed = await e({color: 'RED', desc: `Poistettu databasesta käyttäjän ${fin.username} tiedot!`})
            return msg.channel.send(embed)
        } else {
            let embed = await e({color: 'RED', desc: `Käyttäjää ei löytynyt!`})
            return msg.channel.send(embed)
        }
    }
}