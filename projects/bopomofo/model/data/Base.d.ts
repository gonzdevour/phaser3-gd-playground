import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data';

export default Base;

declare namespace Base {

}

declare class Base {
    constructor(
        dataManager: string | LocalStorageData,
        defaultData: { [key: string]: any }
    );
    data: LocalStorageData;

    get(key: string): any;
    get(): { [key: string]: any };

    set(key: string, value: any): this;
    set(data: { [key: string]: any }): this;

    getDefaultValue(key: string): any;
    getDefaultValue(): { [key: string]: any };
}