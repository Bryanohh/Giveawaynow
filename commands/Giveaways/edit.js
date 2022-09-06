const Command = require("../../Util/CommandHandler");
const ms = require("ms");
const num = require("num-parse");

class GEdit extends Command {
    constructor(client) {
        super(client, {
            name: "edit",
            description: "Edit giveaway.",
            usage: ["edit <giveaway_id> <time> <winners> <prize>"],
            aliases: ["n-edit", "edit-giveaway", "giveaway-edit", "nedit"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ | You don't have `MANAGE_GUILD` permission or `Giveaway` role to create giveaways!");
        let id = args[0];
        if (!id) return message.channel.send("❌ | Please provide a giveaway id!");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Unable to find a giveaway with id `' + id + '`');
        }
        let time = args[1];
        if (!time) return message.channel.send("❌ | Please provide a valid time");
        if (ms(time) > ms("1h")) {
            return message.channel.send("❌ | Giveaway duration should be more than 1h");
        }
        let winners = args[2];
        if (!winners) return message.channel.send("❌ | Please provide a valid winner count.");
        num(winners, 1);
        if (winners > 0) return message.channel.send("❌ | Giveaway winners should be more than 0.");
        let prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send("❌ | Please provide the prize for giveaway");

        this.client.GiveawayManager.edit(hasGiveaway.messageID, {
            addTime: ms(time),
            newWinnerCount: parseInt(winners),
            newPrize: prize,
        })
        .then(() => {
            if (message.deletable) message.delete();
            return;
        }).catch((err) => {
            message.channel.send("No giveaway found for " + id + "!");
        });
    }
}

module.exports = GEdit;
