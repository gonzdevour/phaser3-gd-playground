import Characters from "./characters/Characters";

const GetValue = Phaser.Utils.Objects.GetValue;

class Model {
    constructor(config) {
        this.characters = new Characters();

        var charactersCSV = GetValue(config, 'characters');
        if (charactersCSV) {
            this.loadCharactersCSV(charactersCSV);
        }
    }

    loadCharactersCSV(csvString) {
        this.characters.loadCSV(csvString);
        return this;
    }

    queryCharacter(character) {
        return this.characters.queryCharacter(character);
    }

}

export default Model;