module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        this.client.user.setActivity(`Giveaways for Life! 🎉`, {
            type: "WATCHING"
        });
    }
}