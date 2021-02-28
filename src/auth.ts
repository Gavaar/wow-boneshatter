import * as https from 'https';

export default async (client_id: string, client_secret: string): Promise<any> => {
    return new Promise((_resolve, _reject) => {
        const options = {
            hostname: 'us.battle.net',
            port: 443,
            path: `/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const req = https.request(options, res => {
            console.log(`AUTH statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                _resolve(JSON.parse(d));
            })
        });
        
        req.on('error', error => {
            _reject(error);
        });
        
        req.end()
    });
}
