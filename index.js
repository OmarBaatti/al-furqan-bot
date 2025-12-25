const {
  Client,
  GatewayIntentBits,
  Events,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
  console.log(`Member updated: ${newMember.user.tag}`);
  const addedRoles = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id));
  addedRoles.forEach(role => {
    console.log(`Role added: ${role.id} to member ${newMember.user.tag}`);
    const roleInfo = roles[role.id];
    if (roleInfo) {
      console.log(`Welcoming new ${roleInfo.male?"brother":"sister"}: ${newMember.user.tag} assigned role ${role.id}`);
      newMember.guild.channels.cache.get(roleInfo.channelID)?.send(`Give salam to our new ${roleInfo.male?"brother":"sister"} <@${newMember.id}>!`);
    }
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);