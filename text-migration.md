npx sequelize-cli model:generate --name User --attributes username:string,password:string,email:string,role:string

npx sequelize-cli migration:generate --name add-unique-username
npx sequelize-cli migration:generate --name add-unique-email