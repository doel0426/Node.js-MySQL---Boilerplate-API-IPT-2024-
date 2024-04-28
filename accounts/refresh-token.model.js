const { date } = require('joi');
const{DataTypes, STRING} = require('sequelize')

module.exports = model;

function model(sequelize){
    const attributes = {
        token: { type: DataTypes.STRING},
        expires: {type: DataTypes.DATE},
        created: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        createdByIp:{type: DataTypes.STRING},
        revoked:{type: DataTypes.STRING},
        revokedByID:{type:DataTypes.STRING},
        revokelaceBytoken: {type: DataTypes.STRING},
        isExpired:{
            type:DataTypes.VIRTUAL,
            get(){
                return Date.now()>= this.expires;
            }
        },
        isActive:{
            type: DataTypes.VIRTUAL,
            get(){return !this.revoked && !this.isExpired; }
        }

    };
    const options = {
        timestamps: false
    };
    return sequelize.define('refreshToken', attributes,options);   
}