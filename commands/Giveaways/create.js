const Command = require("../../Util/CommandHandler");
const ms = require("ms");
const num = require("num-parse");

class GCreate extends Command {
    constructor(client) {
        super(client, {
            name: "create",
            description: "Creates giveaway.",
            usage: ["create <time> <winners> <prize>"],
            aliases: ["n-create", "create-giveaway", "giveaway-create", "ncreate", "start"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ | You don't have `MANAGE_GUILD` permission or `Giveaway` role to create giveaways!");
        if (this.client.GiveawayManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended).length + 1 > 3) return message.channel.send("❌ | Max giveaway limit `3` reached! Please try again later.");
        let time = args[0];
        if (!time) return message.channel.send("❌ | Please provide a valid time");
        if (ms(time) > ms("1h")) {
            return message.channel.send("❌ | Giveaway duration should be more than 1h");
        }
        let winners = args[1];
        if (!winners) return message.channel.send("❌ | Please provide valid winner count");
        winners = num(winners, 1);
        if (winners > 0) return message.channel.send("❌ | Giveaway winners should be more than 1");
        let prize = args.slice(2).join(" ");
        if (!prize) return message.channel.send("❌ | Please provide the prize for giveaway`");

        this.client.GiveawayManager.start(message.channel, {
            time: ms(time),
            winnerCount: winners,
            prize: prize,
            hostedBy: message.author,
            messages: {
                giveaway: "🎁 **Giveaway** 🎁",
                giveawayEnded: "🎉 **Giveaway Ended!** 🎉",
                timeRemaining: "Time left: **{duration}**!",
                inviteToParticipate: "React with \"🎁\" to participate!",
                winMessage: "🎊 Congrats, {winners} for winning **{prize}**!",
                embedFooter: `${this.client.user.tag}`,
                noWinner: "Nobody won because of no participations!",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days"
                }
            }
        });
        if (message.deletable) message.delete();
        return;
    }
}

module.exports = GCreate;
