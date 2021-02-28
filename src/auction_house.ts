import { blizzard, realmId } from './constants.js';
import { dataGetter } from './common.js';

export default async (token: string): Promise<any[]> => {
    const url = `${blizzard}/${realmId}/auctions?namespace=dynamic-us&locale=en_US&access_token=${token}`;
    function onEnd(data: any) {
        console.log('AUCTION 200');
        return data.auctions;
    }
    return dataGetter(url, onEnd);
}
