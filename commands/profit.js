const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('profit')
		.setDescription('Returns the profit on an nft collection slug')
		.addStringOption(option =>
			option.setName('collection_slug')
				.setDescription('Enter the collection slug')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(2000)),
	
	async execute(interaction) {
		// const exampleEmbed = new EmbedBuilder()
	    // .setColor(0x0099FF)
    	// .setTitle('Some title')
    	// .setURL('https://discord.js.org/');

		// const Result = await request(`https://api.opensea.io/api/v1/collection/${collection_slug}`);
        // const { file } = await Result.body.json();
		const input = interaction.options.getString('collection_slug')
		const Result = await request(`https://api.opensea.io/api/v1/collection/${input}`);
        const  file  = await Result.body.json();
		await interaction.reply(file)
	},
};