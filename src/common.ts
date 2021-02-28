import * as https from 'https';
import { boneshatterId, materialIds } from './constants.js'

export function dataGetter(_url: string, onEnd: (data: any) => any): Promise<any> {
    return new Promise((_resolve, _reject) => {
        https.get(_url, (resp: any) => {
                let data = '';

                resp.on('data', (chunk: any) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    const jsonData = JSON.parse(data);
                    const processed = onEnd(jsonData) || jsonData;
                    _resolve(processed)
                });
            })
            .on('error', (err: any) => _reject(`ERROR: ${err.message}`));
    });
}

export function filterAuctions(auctions: any[]) {
    const itemMap: { [id: string]: string } = {
        [boneshatterId]: 'boneshatter',
    };
    const items: { [item: string]: any[] } = {
        boneshatter: [],
    };
    Object.keys(materialIds).forEach(mat => {
        itemMap[materialIds[mat]] = mat;
        items[mat] = [];
    });

    return auctions.reduce((_items, auc) => {
        const itemId = auc.item?.id;
        const item = itemMap[itemId];
        if (item) {
           _items[item].push(auc);
        }
        return _items;
    }, items);
}

export function lowestPrice(list: any[]) {
    let lowest = 0;
    list.forEach(item => {
        if (item.item.context && item.item.context !== 66) {
            return;
        }
        const price = (item.unit_price || item.buyout) / 10000;
        if (price < lowest || !lowest) {
            lowest = price;
        }
    });
    return lowest;
}
