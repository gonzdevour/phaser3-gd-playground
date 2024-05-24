import mustache from 'mustache';
import shortcuts from './shortcuts';
import DialogDefault from '../gdk/modaldialog/dialogs/DialogDefault';
//GAS
import GetDocsFromGoogleDriveFolder from 'gdkPlugins/utils/gas/GetDocsFromGoogleDriveFolder.js';
import CreateModalThrobber from '../gdk/templates/CreateModalThrobber';

var postTemplate = function(mainTemplate){
    return mustache.render(mainTemplate, shortcuts, {}, ['<<', '>>'])
}

var GetMdsSheetsFromGoogleDriveFolder = async function(scene, ifShowThrobber){

    if (ifShowThrobber){
        //throbber
        var throbber = CreateModalThrobber(scene, {
            spinnerName: 'los',
            text:'資料傳輸中',
        })
        ._locate({
            layerName: "system",
            vpx: 0.5,
            vpy: 0.5,
        })
    }

    try {
        var data = await GetDocsFromGoogleDriveFolder({
            folderId: "1Lnj1LAug-aZCGiOvjhwZ-JABuqa-XYgg",
            url: "https://script.google.com/macros/s/AKfycbzWebO96vZCKbVUL0dMemnZm852WgyzYtT8zzlMKFzik5IT7rsFKBA8_sUf51NiMoyoHA/exec",
        })

        if (throbber){
            throbber.emit('close');
        }
        var parsedData = JSON.parse(data); //將string轉回array
        var result = parsedData.map(item => { //重構content
            return {
                ...item,
                content: postTemplate(item.content),
            };
        });

        return result

    } catch (error) {
        console.error('Error during gasReq mdsSheets:\n', error);
        DialogDefault(scene, {
            title: lo.loc('loading-error-title'), 
            content: lo.loc('loading-error-content',{ filename: "mdvn_scripts" }),
            extraConfig: {
                width: scene.viewport.displayWidth-50,
                space: { left: 60, right: 60, top: 60, bottom: 60, item: 60, },
            }
        })
    }
}

var GetMdsSheetsFromLocal = function(scene){
    let jsonArray = [];
    scene.cache.text.getKeys().forEach(key => {
        if (key.startsWith('mdsSheets_')) {
            let parts = key.split('_');
            if (parts.length === 3) {
                let groupName = parts[1];
                let scriptName = parts[2];
                let content = scene.cache.text.get(key);
                jsonArray.push({
                    groupName: groupName,
                    scriptName: scriptName,
                    content: postTemplate(content),
                });
            }
            //console.log(key)
        }
    });
    return jsonArray;
}

var GetMdsSheets = async function(scene, from, ifShowThrobber){
    if (from == 'online'){
        return GetMdsSheetsFromGoogleDriveFolder(scene, ifShowThrobber); //線上取得
    } else if (from == 'local'){
        return GetMdsSheetsFromLocal(scene); //本地取得
    } else {
        return [];
    }
}

export default GetMdsSheets;