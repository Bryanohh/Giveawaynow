module.exports = {
  name: "invite",
  aliases: [ "support" ],
  description: "Send bot invite link",
  execute(message) {
    return message.channel
      .send(
        `**__Add GiveawayNow to your server__**
Main Bot: <https://discord.com/oauth2/authorize?client_id=912049454452985876&scope=bot+applications.commands&permissions=37088600>
    `
      )
      .catch(console.error);
  }
};