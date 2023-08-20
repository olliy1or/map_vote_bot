const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../botconfig.json');
const fs = require("fs")
const path = require("path");
const mapsdir = __dirname + "/util/maps"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildIntegrations
  ]
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

function read_conf(file) {
  const envContent = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  obj = {}

  for (const line of envContent.split('\n')) {
    if (line && !line.startsWith('#')) {
      let [ key, val ] = line.split('=');
      key = key.trim()
      x = val || ''
      x = x.trim().replaceAll('"', '').replaceAll("'", "");
      obj[key] = val;
    }
  }

  return obj
}

function create_vote(channel) {
  fs.readdir(mapsdir, function(err, obj) {
    obj.forEach(function(file, i, arr) {
        let fp = path.join(mapsdir, arr[i])
        fs.stat(fp, function(err, stat) {
          if (stat.isDirectory()) {
            fs.readdir(fp, async function(err, files) {
              let content = read_conf(fp+"/map.conf")
              let text = ".\n.\n.\n.\n.\n**" + content["name"] + "**"

              message = await channel.send({content: text, files: [{attachment: fp+"/screenshot.png", name: "screenshot.png"}]})
              message.react("1️⃣")
              message.react("2️⃣")
              message.react("3️⃣")
              message.react("4️⃣")
              message.react("5️⃣")
            })
          }
        })
    })
  })
}

client.on("interactionCreate", async (interaction) => {
  if (interaction.commandName === "create_vote") {
    create_vote(interaction.channel)
  }
})

client.login(token);