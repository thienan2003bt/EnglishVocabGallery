'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Definition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Definition.belongsTo(models.Word, { foreignKey: 'wordID' });
            Definition.belongsTo(models.User, { foreignKey: 'author' });
        }
    }
    Definition.init({
        content: DataTypes.STRING,
        wordID: DataTypes.INTEGER,
        upVotes: DataTypes.INTEGER,
        downVotes: DataTypes.INTEGER,
        author: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Definition',
        tableName: 'Definitions',
    });
    return Definition;
};