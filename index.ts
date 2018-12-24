import Discord, { Channel } from 'discord.js'
import process from 'process'
import cheerio from 'cheerio'

async function fetchTwitter() {
    return await require('isomorphic-fetch')('https://twitter.com/game_knives_out').then((resp: any) => resp.text())
}

function toStrFromTweet($ : CheerioStatic, elm: CheerioElement) {
    if(elm.type == "text") {
        return elm.data
    }else{
        if(elm.tagName == "a"){
            return $("s", elm).text() + $("b", elm).text()
        }
    }
}

async function* fetchTweets() {
    const html = await fetchTwitter()
    const $ = cheerio.load(html)

    for(const tweetElm of Array.from($(".tweet"))){
        const tweetId = tweetElm.attribs["data-tweet-id"]
        
        const tweetTextElm = $(".tweet-text", tweetElm)[0]
        const tweetText = tweetTextElm.children.map(e => toStrFromTweet($, e)).join("")

        yield {
            id : tweetId,
            text : tweetText
        }
    }
}

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

const tweetDictionary : Map<string, string> = new Map()

function sendAllTextChannels(text : string){
  for(const ch of Array.from(client.channels.values())) {
    if(ch instanceof Discord.TextChannel){
      ch.send(text)
    }
  }
}

setInterval(async () => {
  for await (const tweet of fetchTweets()) {
    if(tweetDictionary.size == 0){
      sendAllTextChannels(tweet.text)
      break
    }

    if(!tweetDictionary.has(tweet.id)){
      sendAllTextChannels(tweet.text)
      tweetDictionary.set(tweet.id, tweet.text)
    }
  }
} , 1000 * 60)

client.login(process.env["DISCORD_BOT_TOKEN"])