const djs = require('discord.js')
const cfg = require('../utils/config.json')
const Drops = require('../models/drops')
const e = require('../utils/embed')

module.exports.run = async(client, msg) => {
    let id = msg.author.id

    try {
        let cur = await Drops.findOne({
            userid: id
        })

        if (cur) {
            let embed = await e({desc: `Olet käynyt yhteensä **${cur.drop}** dropilla!`})
            return msg.channel.send(embed)
        } else {
            let embed = await e({color: 'RED', desc: `Et ole käynyt yhdelläkään leaderin leadaamalla dropilla, joka olisi päätetty komennolla !dropend`})
            return msg.channel.send(embed)
        }
    } catch(e) {
        console.error(e)
    }
}