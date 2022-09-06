const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [ "commands" ],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle('Help Commands', ',https://cdn.discordapp.com/attachments/679761772252758076/1016638477485494293/652e68e201e0940267b5857b2d1ce870.png')
      .setDescription("Please join the Support Server By Typing `n!invite` for any support you may need! \nDo not just kick the bot when it doesn’t work, that doesn’t help anybody. Please report all issues to the support server and you will be helped!")
      .setFooter('© GiveawayNow -All Rights Reserverd', 'https://cdn.discordapp.com/attachments/679761772252758076/1016638477485494293/652e68e201e0940267b5857b2d1ce870.png')
      .addField("💬 General Commands","`help`, `invite`")
      .addField("🎁 Giveaway Commands","`create`, `delete`, `edit`, `end`, `reroll`")
      .setColor("#40E0D0");

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};