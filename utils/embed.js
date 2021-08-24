const { MessageEmbed } = require('discord.js') 

/**
* @param {Object} p
*/

function GenEmbed(p) {
    return new Promise(res => {
        let embed = new MessageEmbed()
        .setAuthor(p.author || 'Greencamo')
        .setDescription(p.desc || '')
        .setTimestamp()
        .setTitle(p.title || '')
        .setColor(p.color || 'GREEN')

        res(embed)
    })
}

module.exports = GenEmbed