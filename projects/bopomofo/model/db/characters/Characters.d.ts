import Character from './Character';

export default Characters;

declare namespace Characters {
    type SortMode = 'none' | 0 | 'bopomofo' | 1 | 'freq' | 2
}

declare class Characters {
    query(
        filter: Object,
        sortMode?: Characters.SortMode
    ): Character[];

    queryCharacter(
        character: string
    ): Character[];

    queryRandomCharacter(
    ): Character;

    queryByID(
        id: string
    ): Character;

    queryByBopomofo(
        bopomofo: string
    ): Character[];

    getAll(
        sortMode?: Characters.SortMode
    ): Character[];
}