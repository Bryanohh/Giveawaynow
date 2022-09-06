const Command = require("../../Util/CommandHandler");
const ms = require("ms");

class Reroll extends Command {
    constructor(client) {
        super(client, {
            name: "reroll",
            description: "Re-roll the giveaway.",
            usage: ["reroll <giveaway_id>"],
            aliases: ["n-reroll", "reroll-giveaway", "giveaway-reroll", "nreroll"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ | You don't have `MANAGE_GUILD` permission or `Giveaway` role to manage giveaways!");
        let id = args[0];
        if (!id) return message.channel.send("❌ | Please provide a giveaway id");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Unable to find a giveaway with id `' + id + '`');
        }
        this.client.GiveawayManager.reroll(hasGiveaway.messageID, {
            messages: {
                congrat: "🎊 New winner(s) : {winners}! 🎊",
                error: "❌ No participations!"
            }
        })
            .then(() => {
                if (message.deletable) message.delete();
            })
            .catch((e) => {
                message.channel.send("❌ | Invalid giveaway id!");
            });
    }
}

module.exports = Reroll;
