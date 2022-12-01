const Obj = {
    "data": {
        "minted": "how many tokens of the collection passed the address has",
        /*api: 'https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=address&count=100&offset=0&type=all&withMetadata=true'
         nameapi: Retrieve Collections Owned
         params: address, metadata?
         get: response.data an array, for loop to return tokenOwned property for address that is equal to the address of the nft at collection slug
        */
        "minted_cost": "How much eth the address used to mint",
        /*api: 'https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=address&count=100&offset=0&type=all&withMetadata=true'
         nameapi: Retrieve User Trading History (BETA)
         params: address, metadata?
         get: in_price_eth,
        */
        "average_mint_cost": "minted cost/minted",
        "bought_secondary": "how many tokens they bought on secondary manrket places like opensea",
        /*api: 'https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=address&count=100&offset=0&type=all&withMetadata=true'
         nameapi: Retrieve User Trading History (BETA)
         params: address, metadata?
         get: check for in_type property if transfer,
        */
        "secondary_cost": "how much they bought it on the secondary market",
        "average_sec_cost": "secondary_cost/bought_secondary",
        "total_bought": "minted + bought_secondary",
        "total_cost": "minted_cost + secondary_cost",
        "average_total_cost": "total_cost/total_bought",
        "sold": "how many they sold",
        "total_revenue": "sold * price at sale",
        "avg_sale_price": "total_revenue/sold",
        "total_fees": "total gas fees",
        "total_fees_realized": "total_revenue - total_cost",
        "realized_roi": "(total_cost/total_revenue) * 100"

    }
}