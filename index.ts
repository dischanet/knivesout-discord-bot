import Discord from 'discord.js'
import process from 'process'
import SSM from 'aws-sdk'

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('ぽん！')
  }
})

const ssm = new SSM.SSM({ region: 'ap-northeast-1' })

ssm.getParameter({ Name : 'KNIVESOUT_DISCORD_BOT_SECRET' }, (err, data) => {
  if (err) {
    console.log(err, err.stack)
  }else if(data.Parameter)
    client.login(data.Parameter["Value"])
})