const {
    Client,
    GatewayIntentBits,
    Events,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const chats = [
    "1413354600223739984", // male chat
    "1452705566525886666" // female chat
]

client.on(Events.MessageCreate, (message) => {
    if(message.author.bot || !chats.includes(message.channelId)) return;
    if (message.content.toLowerCase().includes('media')) {
        message.reply("Yo bro to have media you gotta invite 1, chop chop akhi");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);