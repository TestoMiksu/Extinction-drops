const djs = require('discord.js')
const cfg = require('../utils/config.json')
const Drops = require('../models/drops')
const e = require('../utils/embed')

/**
 * 
 * @param {djs.Client} client 
 */

module.exports.run = async(client, msg) => {
    if (!cfg.perms.find(x => x === msg.author.id)) return 1

    let voip = msg.guild.channels.cache.find(z => z.type == "voice" && z.id === cfg.advoip)
    
    if (voip) {
        try {
            let i = 0;
            for (const user of voip.members) {
                i++
                let hasdb = await Drops.findOne({
                    userid: user[0]
                })

                if (!hasdb) {
                    let username = user[1].user.username
                    
                    let db = new Drops({userid: user[0], username: username}, { _id: true })
                    db.save()
                    console.log(`Model created for user ${user[0]}`)
                } else {
                    let doc = await Drops.findOne({
                        userid: user[0]
                    })

                    let newcount = doc.drop + 1
                    let update = await Drops.updateOne({ userid: doc.userid }, { drop: newcount})
                    
                    if (update) {
                        console.log(`Updated dropcount for user: ${user[0]}! Total drops: ${doc.drop + 1}`)
                    }
                }
            }

            let embed = await e({desc: `Droppien määrä päivitetty yhteensä ${i} pelaajalle!`})
            return msg.channel.send(embed)
        } catch(e) {
            console.error(e)
        }
    }
}