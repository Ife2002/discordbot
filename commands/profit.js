import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
// import getCollection from '../controllers/test.js';
import { request } from 'undici';

export default {
	data: new SlashCommandBuilder()
		.setName('profit')
		.setDescription('Returns the profit on an nft collection slug')
		.addStringOption(option =>
			option.setName('collection_slug')
				.setDescription('Enter the collection slug')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(2000).setRequired(true)),
	

	
	async execute(interaction) {
		


		const input = interaction.options.getString('collection_slug')
		const {
			statusCode,
			headers,
			trailers,
			body
		  }= await request(`https://api.opensea.io/api/v1/collection/${input}`);
		  //get api endpoint with erc adrress here
		  //populate the adsress with the json
		  //remove picture
		const response = await body.json();
		// const response = getCollection(`${input}`)
         console.log(response)
        // const message = await body.text();
		// const result = message.slice(0, 180);
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`Collection name : ${response.collection.slug}`)
		.setURL(`https://opensea.io/collection/${input}`)
		.setAuthor({ name: 'Crest Bot', url: `https://opensea.io/collection/${input}` })
		.setDescription(`${response.collection.description}`)
		.setThumbnail(`${response?.collection.image_url}`)
		.addFields(
			{ name: '#Minted', value: `${response.collection.stats.count}` },
			{ name: '#Minted Cost', value: 'Some value here' },
			{ name: '#Avg Minted Cost', value: `${response.collection.stats.average_price}Ξ` },
			{ name: '#Total Bought', value: `${response.collection.stats.total_sales}` },
			{ name: '#Total Cost', value: 'Some value here' },
			{ name: '#Avg Total Cost', value: 'Some value here' },
			{ name: '#Sold', value: 'Some value here' },
			{ name: '#Total Revenue', value: 'Some value here' },
			{ name: '#Avg Sale Price', value: 'Some value here' },
			{ name: '#Total Fees', value: 'Some value here' },
			{ name: '#Total Profit Realized', value: '⬇️/⬆️' },
			{ name: '#Realized ROI', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Regular field title', value: 'Some value here' },
		)
		// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Curated by crest', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		// const Result = await request(`https://api.opensea.io/api/v1/collection/${collection_slug}`);
        // const { file } = await Result.body.json();
		

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};

