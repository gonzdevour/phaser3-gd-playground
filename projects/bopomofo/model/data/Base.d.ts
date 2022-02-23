import Model from '../Model';
import LocalStorageData from '../../../../../phaser3-rex-notes/plugins/localstorage-data';

export default Base;

declare namespace Base {

}

declare class Base {
    constructor(
        model: Model,
        dataManager: LocalStorageData,
        defaultData: { [key: string]: unknown }
    );

    get(key: string): unknown;
    get(): { [key: string]: unknown };

    set(key: string, value: unknown): this;
    set(data: { [key: string]: unknown }): this;
}