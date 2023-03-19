import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import getMinted from '../endpoints/Minted.js';
import getSellPrice from '../endpoints/SellPrice.js';
import getCollectionInfo from '../endpoints/collectionInfo.js';
import getBuyCost from '../endpoints/buyCost.js';
import getTotaltokens from '../endpoints/TotalTokens.js';
import getTokenStats from '../endpoints/TokenStats.js';
import getRemainder from '../endpoints/Remainder.js';
import { createCanvas, Image, loadImage, GlobalFonts } from '@napi-rs/canvas'
import { request } from 'undici';
import { readFile } from 'fs/promises'
import path,{ join } from 'path';
import { isNumberObject } from 'util/types';

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
		const remaining = await getRemainder(useraddress, collectionAddress);
		
		//calculator
		const mintedSafe = (minted != Number)? `0` : `${minted}`
		const secondary = userStats.total_erc721_recieved - userStats.mint_count
		const avgSecCost = userStats.total_eth_sent/secondary
		const avgSecCostSafe = ((avgSecCost != Number) || (avgSecCost == Infinity))? `0` : `${avgSecCost}`
		const avgTotCost = userStats.total_eth_sent/userStats.total_erc721_recieved
		const avgSlePrice = userStats.total_eth_received / userStats.total_sell_qty
		const totProfRealzd = sellprice - buycost
		const buycostSafe = (buycost == 0)? 1 : buycost;
		const ROI = (totProfRealzd/buycostSafe) * 100
		const ROIsafe = (ROI != Number)? `0` : `${ROI}`
		const totalPrft = (totProfRealzd >= 0)? `⬆️ ${totProfRealzd} Ξ` : `⬇️ ${totProfRealzd} Ξ`;
		const mintedString = `${minted}`
		const mintedSlice = mintedString.slice(0 , 6);

		//formater
		const ROIstring = `${ROI}`
		const PNL = ROIstring.slice(0, 6)
		const PNLcolor = (totProfRealzd >= 0)? '#00FF00' : '#FF0000';
		// const minted = getMinted(collectionAddress, useraddress);
		const canvas = createCanvas(1500, 1500);
		const context = canvas.getContext('2d');
		
 
		const background = await readFile('./canvas.png');
		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		const __dirname = path.resolve();
        GlobalFonts.registerFromPath(join(__dirname, '.', 'GeneralSans-Bold.ttf'), 'DM-Sans')
		GlobalFonts.registerFromPath(join(__dirname, '.', 'NotoSans-Bold.ttf'), 'Noto-Sans')
		
// console.info(GlobalFonts.families)
	    // This uses the canvas dimensions to stretch the image onto the entire canvas
	    context.strokeStyle = '#0099ff00';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		context.font = '40px Noto-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${mintedSlice} Ξ`, 115, 1280);
		//ref if you ever want to use ratio in stead of pixels
		// context.fillText(`${minted}`, canvas.width / 2.5, canvas.height / 3.5);

		context.font = '40px Noto-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${sellprice} Ξ`, 450, 1280);

		context.font = '40px DM-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${userStats.total_sell_qty}`, 723, 1280);

		context.font = '65px DM-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${response.collection.primary_asset_contracts[0].name}`, 70, 1060);

		context.font = '65px DM-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${remaining} remaining`, 1060, 1060);

		context.font = '40px DM-Sans';
		context.fillStyle = `${PNLcolor}`;
		context.fillText(`${PNL}%`, 1260, 1280);

		context.font = '60px DM-Sans';
		context.fillStyle = '#ffffff';
		context.fillText(`${interaction.member.displayName}#${interaction.member.user.discriminator}`, 500, 1450);
        

// or with async/await:
        const banner = await loadImage(`${response.collection.primary_asset_contracts[0].image_url}`)
		context.drawImage(banner, 0, 0, 1500, 900);
		
		const avatar = await loadImage('crest.png')
		context.drawImage(avatar, 70, 750, 250, 250);

		const qr = await loadImage('qr.png')
		context.drawImage(qr, 1250, 50, 200, 200);


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
			{ name: '#Minted Cost', value: `${mintedSafe} Ξ` },
			{ name: '#Avg Minted Cost', value: `${mintedSafe} Ξ` },
			{ name: '#Bought secondary', value: `${secondary}` },
			{ name: '#Secondary cost', value: `${userStats.total_eth_sent} Ξ` },
			{ name: '#Avg Secondary Cost', value: `${avgSecCost} Ξ` },
			{ name: '#Total Bought', value: `${userStats.total_erc721_recieved}` },
			{ name: '#Total Cost', value: `${userStats.total_eth_sent} Ξ` },
			{ name: '#Avg Total Cost', value: `${avgTotCost} Ξ` },
			{ name: '#Sold', value: `${userStats.total_sell_qty}` },
			{ name: '#Total Revenue', value: `${sellprice} Ξ` },
			{ name: '#Total Remaining', value: `${remaining}` },
			{ name: '#Avg Sale Price', value: `${avgSlePrice} Ξ` },
			{ name: '#Total Fees', value: `2.5%` },
			{ name: '#Total Profit Realized', value: `${totalPrft}` },
			{ name: '#Current Floor Price', value: `${response.collection.stats.floor_price} Ξ` },
			{ name: '#Realized ROI', value: `${ROIsafe}%` },
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

