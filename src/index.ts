import auth from './auth.js';
import secret from './secret.js';
import auctionHouse from './auction_house.js';
import profitabilityCalculator from './boneshatter.js';
import { filterAuctions, lowestPrice } from './common.js';

(async () => {
    console.log('Getting auth token');
    const { access_token }: { access_token: string } = await auth(secret.id, secret.secret);
    console.log('Getting auctions');
    const auctions = await auctionHouse(access_token);
    console.log('Filtering auctions');
    const filteredAuctions = filterAuctions(auctions);
    console.log('Auctions filtered');
    console.log('Calculating lowest prices');
    console.log('----------------------------');

    const {
        boneshatter, desolateLeather, heavyDesolateLeather,
        callousHide, heavyCallousHide, pallidBone,
        enchantedHide, orborealShard
    } = filteredAuctions;
    const lowest = {} as { [item: string]: number };
    lowest.boneshatter = lowestPrice(boneshatter);
    lowest.desolateLeather = lowestPrice(desolateLeather);
    lowest.heavyDesolateLeather = lowestPrice(heavyDesolateLeather);
    lowest.lowestCallousHide = lowestPrice(callousHide);
    lowest.heavyCallousHide = lowestPrice(heavyCallousHide);
    lowest.orborealShard = lowestPrice(orborealShard);
    lowest.pallidBone = lowestPrice(pallidBone);
    lowest.enchantedHide = lowestPrice(enchantedHide);

    Object.keys(lowest).forEach(item => console.log(`lowest ${item}: ${lowest[item]}`));

    console.log('----------------------------');
    const profitability = profitabilityCalculator(lowest);
    console.log(new Date().toLocaleString());
    console.log(`boneshatter profitability: ${profitability}`);
})();
