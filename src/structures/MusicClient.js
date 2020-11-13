const { Manager } = require("@lavacord/discord.js");
const { Client, Collection } = require("discord.js");
const { readdir } = require("fs/promises");
const { join } = require("path");

require("../extensions");

module.exports = class MusicClient extends Client {
    /** @param {import("discord.js").ClientOptions} [opt] */
    constructor(opt) {
        super(opt);
        this.commands = new Collection();
        this.manager = new Manager(this, [
            {
                id: "main",
                host: process.env.LAVA_HOST,
                port: process.env.LAVA_PORT,
                password: process.env.LAVA_PASS
            }
        ]);
        this.prefix = process.env.PREFIX;
    }

    build() {
        this.loadCommands();
        this.loadEventListeners();
        this.login(process.env.TOKEN);
    }

    /** @private */
    async loadCommands() {
        const commands = await readdir(join(__dirname, "..", "commands"));
        for (const commandFile of commands) {
            const command = require(`../commands/${commandFile}`);
            this.commands.set(command.name, command);
        }
    }

    /** @private */
    async loadEventListeners() {
        const listeners = await readdir(join(__dirname, "..", "listeners"));
        for (const listenerFile of listeners) {
            const listener = require(`../listeners/${listenerFile}`);
            this.on(listener.name, (...args) => listener.exec(this, ...args));
        }
    }
};