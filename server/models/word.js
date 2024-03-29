'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Word extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Word.hasMany(models.Definition, { foreignKey: 'wordID' });
        }
    }
    Word.init({
        word: DataTypes.STRING,
        type: DataTypes.STRING,
        phonetic: DataTypes.STRING,
        level: DataTypes.STRING,
        categories: DataTypes.STRING,
        image: DataTypes.STRING,
        synonyms: DataTypes.STRING,
        antonyms: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Word',
        tableName: 'Words',
    });
    return Word;
};