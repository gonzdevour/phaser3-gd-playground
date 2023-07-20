export default GetRepeatedPattern;

declare namespace GetRepeatedPattern {
    interface IConfig {
        property: string,
        returnDetail?: boolean,
    }
}

declare function GetRepeatedPattern(
    cards: Object[],
    config: GetRepeatedPattern.IConfig
): string;