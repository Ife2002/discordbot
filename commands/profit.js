import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import getMinted from '../endpoints/Minted.js';
import getSellPrice from '../endpoints/SellPrice.js';
import getBuyCost from '../endpoints/buyCost.js';
import getTotaltokens from '../endpoints/TotalTokens.js';
import getTokenStats from '../endpoints/TokenStats.js';
import getUrl from '../endpoints/banner.js';
import { createCanvas, Image } from '@napi-rs/canvas'
import { request } from 'undici';
import { readFile } from 'fs/promises'

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
		const totalPrft = (totProfRealzd >= 0)? `⬆️ ${totProfRealzd} Ξ` : `⬇️ ${totProfRealzd} Ξ`;

		//formater
		const ROIstring = `${ROI}`
		const PNL = ROIstring.slice(0, 6)
		const PNLcolor = (totProfRealzd >= 0)? '#00FF00' : 'FF0000';
		// const minted = getMinted(collectionAddress, useraddress);
		const canvas = createCanvas(1000, 1000);
		const context = canvas.getContext('2d');

		const background = await readFile('./canvas.png');
		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		

	    // This uses the canvas dimensions to stretch the image onto the entire canvas
	    context.strokeStyle = '#0099ff00';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		context.font = '24px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText(`${minted} Ξ`, 72, 795);
		//ref if you ever want to use ratio in stead of pixels
		// context.fillText(`${minted}`, canvas.width / 2.5, canvas.height / 3.5);

		context.font = '24px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText(`${sellprice} Ξ`, 317, 795);

		context.font = '24px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText(`${userStats.total_sell_qty}`, 518, 795);

		context.font = '20px sans-serif';
		context.fillStyle = `${PNLcolor}`;
		context.fillText(`${PNL}%`, 850, 795);

		context.font = '40px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText(`${interaction.member.displayName}#${interaction.member.user.discriminator}`, 320, 930);

		// const avatar = await readFile('crest.png');
		// const avatarImage = new Image()
		// avatarImage.src = avatar;
		// context.drawImage(avatarImage, 25, 0, 200, 200);
        
		
       


// Draw cat with lime helmet
// loadImage('canvas.png').then((image) => {
//   ctx.drawImage(image, 0, 0, 200, 200)
//   ctx.fillStyle = 'white'
//   ctx.font = "10px Calibri";
//   ctx.fillText("My TEXT!", 0, 160);
//   ctx.fillText("My TEXT!", 0, 50);

//   console.log('<img src="' + canvas.toDataURL() + '" />')
// })


		// const response = getCollection(`${input}`)
        //  console.log(response)
        // const message = await body.text();
		// const result = message.slice(0, 180);
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`Collection name : ${response.collection.primary_asset_contracts[0].name}`)
		.setURL(`https://opensea.io/collection/${input}`)
		
		.setDescription(`${response.collection.description}`)
		.setThumbnail(`${response?.collection.image_url}`)
		.addFields(
			{ name: '#Minted', value: `${userStats.mint_count}` },
			{ name: '#Minted Cost', value: `${minted} Ξ` },
			{ name: '#Avg Minted Cost', value: `${minted} Ξ` },
			{ name: '#Bought secondary', value: `${secondary}` },
			{ name: '#Secondary cost', value: `${userStats.total_eth_sent} Ξ` },
			{ name: '#Avg Secondary Cost', value: `${avgSecCost} Ξ` },
			{ name: '#Total Bought', value: `${userStats.total_erc721_recieved}` },
			{ name: '#Total Cost', value: `${userStats.total_eth_sent} Ξ` },
			{ name: '#Avg Total Cost', value: `${avgTotCost} Ξ` },
			{ name: '#Sold', value: `${userStats.total_sell_qty}` },
			{ name: '#Total Revenue', value: `${sellprice} Ξ` },
			{ name: '#Avg Sale Price', value: `${avgSlePrice} Ξ` },
			{ name: '#Total Fees', value: `2.5%` },
			{ name: '#Total Profit Realized', value: `${totalPrft}` },
			{ name: '#Realized ROI', value: `${ROI}%` },
		)
		//{ name: '\u200B', value: '\u200B' },
		// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		// .setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Curated by Crest DAO'});

	

        // let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
        // await sleep(3000)
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'image.png' });

		// const Result = await request(`https://api.opensea.io/api/v1/collection/${collection_slug}`);
        // const { file } = await Result.body.json();
		

		await interaction.reply({ embeds: [exampleEmbed] });

		await interaction.followUp({ files: [attachment] });
	},
};

