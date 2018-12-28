import Discord, { Channel } from 'discord.js'
import cheerio from 'cheerio'

async function fetchTwitter() {
    return await require('isomorphic-fetch')('https://twitter.com/game_knives_out').then((resp: any) => resp.text())
}

function toStrFromTweet($ : CheerioStatic, elm: CheerioElement) {
    if(elm.type == "text") {
        return elm.data
    }else{
        if(elm.tagName == "a" && elm.attribs["class"].includes("twitter-hashtag pretty-link")){
            return ` [${ $("s", elm).text() + $("b", elm).text() }](${ elm.attribs["href"] }) `
        }else if(elm.tagName == "a" && elm.attribs["class"].includes("twitter-timeline-link") && !elm.attribs["class"].includes("u-hidden")){
            return `[${ $(".js-display-url", elm).text() }](${ elm.attribs["href"] })`
        }
    }
}

function getMedia($: CheerioStatic, tweetElm : CheerioElement) {
    const photoElement = $(".AdaptiveMedia-photoContainer img", tweetElm)
    let photoUrlProp = photoElement.length != 0 ? { photoUrl : photoElement.attr("src") } : {}

    // SSRではvideoタグがレンダリングされないのでかわりにサムネイルを取得する
    const videoElement = $(".AdaptiveMedia-videoContainer .PlayableMedia-player", tweetElm)
    let videoUrlProp = videoElement.length != 0 ? { photoUrl : videoElement.css("background-image").replace("url('", "").replace("')", "") } : {}

    return {
        ...photoUrlProp,
        ...videoUrlProp
    }

}

async function* fetchTweets() {
    const html = await fetchTwitter()
    const $ = cheerio.load(html)

    for(const tweetElm of Array.from($(".tweet"))){
        const tweetId = tweetElm.attribs["data-tweet-id"]
        
        const tweetTextElm = $(".tweet-text", tweetElm)[0]
        const tweetText = tweetTextElm.children.map(e => toStrFromTweet($, e)).join("")
        const tweetMedia = getMedia($, tweetElm)

        yield {
            id : tweetId,
            text : tweetText,
            ...tweetMedia
        }
    }
}

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})


const tweetDictionary = new Map<string, string>()

function sendAllTextChannels(message : any){
  for(const ch of Array.from(client.channels.values())) {
    if(ch instanceof Discord.TextChannel){
      ch.send({ embed: message  })
    }
  }
}

client.on('message', msg => {
  if (msg.content === '/test') {
      for(const key of Array.from(tweetDictionary.keys())) {
          sendAllTextChannels(tweetDictionary.get(key))
          return
      }
  }
})


function richEmbedFromTweet(tweet : any) {
  const imageProp  = tweet.imageUrl != undefined ? { "image": { "url" : tweet.photoUrl } } : { }
  const videoProp  = tweet.videoUrl != undefined ? { "video": { "url" : tweet.videoUrl } } : { }
  return {
    "username": "荒野行動-『KNIVES OUT』公式 Twitter",
    "avatar_url": "https://pbs.twimg.com/profile_images/933161515602997248/ulIvWXEC_400x400.jpg",
    "embeds": [
      {
        "title": "@GAME_KNIVES_OUT",
        "description": tweet.text,
        "color": 8754107,
        ...imageProp,
        ...videoProp,
        "footer": {
            "text": "荒野行動-『KNIVES OUT』Twitterより",
            "icon_url": "https://pbs.twimg.com/profile_images/933161515602997248/ulIvWXEC_400x400.jpg"
        }
      }
    ]
  }
}

setInterval(async () => {
  let wasInit = 0 < tweetDictionary.size

  for await (const tweet of fetchTweets()) {
    if(!wasInit){
      tweetDictionary.set(tweet.id, tweet.text)
    }else if(!tweetDictionary.has(tweet.id)){
      sendAllTextChannels(richEmbedFromTweet(tweet))
      tweetDictionary.set(tweet.id, tweet.text)
    }
  }
} , 1000 * 60)

client.login(process.env["DISCORD_BOT_TOKEN"])