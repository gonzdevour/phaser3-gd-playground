import Card from './card';

export default Common;

declare namespace Common {
    interface IConfig {
        property: string,
        returnDetail?: boolean,
        wildcard?: string
    }

    interface IOutput {
        property: string,
        result: boolean,
        catch: null | Card.ICardBase[]
    }
}