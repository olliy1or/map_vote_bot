const { token, serverID, clientID } = require("../botconfig.json");
const { REST, Routes } = require('discord.js');

const commands = [
	{
		name: "create_vote",
		description: "creates maps vote",
	},
];

const rest = new REST ({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientID, serverID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();