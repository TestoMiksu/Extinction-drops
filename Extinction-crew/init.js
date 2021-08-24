const Bot = require('discord.js')
const Database = require('mongoose')
require('dotenv').config()
const fs = require('fs')

//utils
const GenEmbed = require('./utils/embed')
const client = new Bot.Client()
const cfg = require('./utils/config.json')
const drops = require('./utils/drops.json')

//database
let uri = process.env.DB

try {
    Database.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch(e) {
    console.error(e)
} finally {
    console.log("[DB] Authorized \n" + new Date())
}

//command handler
client.commands = new Bot.Collection()

fs.readdir(`${__dirname}/commands/`, (err, files) => {
    if (err) return console.error(err)
    files.forEach(z => {
        if (z.endsWith('.js' || '.ts')) {
            let command = require(`${__dirname}/commands/${z}`)
            let cmd = z.split('.')[0]

            client.commands.set(cmd, command)
            console.log(`[BOT] ${cmd}`)
        }
    })
})

//events

fs.readdir(`${__dirname}/events`, (err, files) => {
    if (err) return console.error(err)

    files.forEach(f => {
        if (f.endsWith('.js')) {
            let event = require(`${__dirname}/events/${f}`)
            let name = f.split('.')[0]
            console.log(`[EVENT] ${name}`)
            client.on(name, event.bind(null, client))
        }
    })
})

//cron

const { CronJob } = require('cron')

let job = new CronJob('15,45 * * * *', async() => {
    let current = new Date()
    console.log(`${current.getHours()}.${current.getMinutes()}`)
    if (drops.dropit.find(x => x == `${current.getHours()}.${current.getMinutes()}`)) {
        let guild = client.guilds.cache.find(x => x.id === cfg.guild)
        let channel = guild.channels.cache.find(z => z.id === cfg.dropnotify)

        let embed = await GenEmbed({color: 'GREEN', desc: 'Airdrop tulossa 15 minuutin kuluttua!', author: 'Ilmoitus!'})
        channel.send(embed)
        return channel.send(`@here`)
    }
}, null, true, "Europe/Helsinki")

job.start()

//login

client
    .login(process.env.TOKEN)
    .then(() => {
        client.user.setActivity(`Developer: fait#2101`, {type: "WATCHING"})
        console.log("[BOT] Authorized")
    })