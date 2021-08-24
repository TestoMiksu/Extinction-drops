const djs = require('discord.js')
const cfg = require('../utils/config.json')
const Drops = require('../models/drops')
const e = require('../utils/embed')

module.exports.run = async(client, msg) => {
    if (!cfg.perms.find(z => z === msg.author.id)) return 1

    let drops = await Drops.find({})

    if (drops) {
        let out = '';

        for (const user of drops) {
            out += `${user.username}: ${user.drop}\n`
        }

        let embed = await e({color: 'BLUE', title: 'Crewin jäsenien dropit!\n', desc: out})
        return msg.channel.send(embed)
    }
}