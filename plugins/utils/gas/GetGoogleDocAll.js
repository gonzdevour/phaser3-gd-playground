import GetGoogleDoc from './GetGoogleDoc.js'

async function GetGoogleDocAll(requestConfigs) {
    try {
        const results = await Promise.all(requestConfigs.map(config => GetGoogleDoc(config)));
        return results;
    } catch (error) {
        console.log('Failed to get google docs all');
        throw error;
    }
}

export default GetGoogleDocAll;