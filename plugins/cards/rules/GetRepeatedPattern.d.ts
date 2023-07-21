export default GetRepeatedPattern;

declare namespace GetRepeatedPattern {
    interface IConfig {
        property: string,
        secondProperty: string,
        returnDetail?: boolean,
    }
}

declare function GetRepeatedPattern(
    cards: Object[],
    config: GetRepeatedPattern.IConfig
): string;