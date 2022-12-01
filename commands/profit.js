import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import getMinted from '../endpoints/Minted.js';
import getSellPrice from '../endpoints/SellPrice.js';
import getBuyCost from '../endpoints/buyCost.js';
import getTotaltokens from '../endpoints/TotalTokens.js';
import getTokenStats from '../endpoints/TokenStats.js';
import { createCanvas, loadImage } from 'canvas'
import { request } from 'undici';

export default {
	data: new SlashCommandBuilder()
		.setName('profit')
		.setDescription('Returns the profit on an nft collection slug')
		.addStringOption(option =>
			option.setName('collection_slug')
				.setDescription('Enter the collection slug')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(2000).setRequired(true))
		.addStringOption(option =>
			option.setName('address')
				.setDescription('Enter address')
						// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(42).setRequired(true)),
	

	
	async execute(interaction) {
		


		const input = interaction.options.getString('collection_slug');
		const useraddress = interaction.options.getString('address');
		
		const {
			body
		  }= await request(`https://api.opensea.io/api/v1/collection/${input}`);
		  //get api endpoint with erc adrress here
		  //populate the adsress with the json
		  //remove picture
		const response = await body.json();

		const collectionAddress = response.collection.primary_asset_contracts[0].address
		const minted = await getMinted(useraddress, collectionAddress);
		const buycost = await getBuyCost(useraddress, collectionAddress);
		const sellprice = await getSellPrice(useraddress, collectionAddress);
		const totaltoken = await getTotaltokens(useraddress, collectionAddress);
		const userStats = await getTokenStats(useraddress, collectionAddress);
		//calculator
		const secondary = userStats.total_erc721_recieved - userStats.mint_count
		const avgSecCost = userStats.total_eth_sent/secondary
		const avgTotCost = userStats.total_eth_sent/userStats.total_erc721_recieved
		const avgSlePrice = userStats.total_eth_received / userStats.total_sell_qty
		const totProfRealzd = sellprice - buycost
		const ROI = (totProfRealzd/buycost) * 100
		const totalPrft = (totProfRealzd >= 0)? `⬆️ ${totProfRealzd}Ξ` : `⬇️ ${totProfRealzd}Ξ`;
		
		// const minted = getMinted(collectionAddress, useraddress);
		const canvas = createCanvas(200, 200)
        const ctx = canvas.getContext('2d')



// Draw cat with lime helmet
loadImage('canvas.png').then((image) => {
  ctx.drawImage(image, 0, 0, 200, 200)
  ctx.fillStyle = 'white'
  ctx.font = "10px Calibri";
  ctx.fillText("My TEXT!", 0, 160);
  ctx.fillText("My TEXT!", 0, 50);

//   console.log('<img src="' + canvas.toDataURL() + '" />')
})


		// const response = getCollection(`${input}`)
        //  console.log(response)
        // const message = await body.text();
		// const result = message.slice(0, 180);
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`Collection name : ${response.collection.slug}`)
		.setURL(`https://opensea.io/collection/${input}`)
		
		.setDescription(`${response.collection.description}`)
		.setThumbnail(`${response?.collection.image_url}`)
		.addFields(
			{ name: '#Minted', value: `${userStats.mint_count}` },
			{ name: '#Minted Cost', value: `${minted}` },
			{ name: '#Avg Minted Cost', value: `${userStats.average_mint_max_prio_fee}Ξ` },
			{ name: '#Bought secondary', value: `${secondary}` },
			{ name: '#Secondary cost', value: `${userStats.total_eth_sent}Ξ` },
			{ name: '#Avg Secondary Cost', value: `${avgSecCost}Ξ` },
			{ name: '#Total Bought', value: `${userStats.total_erc721_recieved}` },
			{ name: '#Total Cost', value: `${userStats.total_eth_sent}` },
			{ name: '#Avg Total Cost', value: `${avgTotCost}` },
			{ name: '#Sold', value: `${userStats.total_sell_qty}` },
			{ name: '#Total Revenue', value: `${sellprice}` },
			{ name: '#Avg Sale Price', value: `${avgSlePrice}` },
			{ name: '#Total Fees', value: `2.5%` },
			{ name: '#Total Profit Realized', value: `${totalPrft}` },
			{ name: '#Realized ROI', value: `${ROI}%` },
		)
		//{ name: '\u200B', value: '\u200B' },
		// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		// .setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Curated by Crest DAO'});

		const file = new AttachmentBuilder(canvas.toBuffer(), 'example');




		// const Result = await request(`https://api.opensea.io/api/v1/collection/${collection_slug}`);
        // const { file } = await Result.body.json();
		

		await interaction.reply({ files: [file], embeds: [exampleEmbed]  });
	},
};

