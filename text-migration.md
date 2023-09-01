npx sequelize-cli model:generate --name Review --attributes comments:string
npx sequelize-cli model:generate --name UserDetail --attributes fname:string,lname:string,age:integer,address:string

npx sequelize-cli migration:generate --name add-unique-username
npx sequelize-cli migration:generate --name add-unique-email
npx sequelize-cli migration:generate --name add-fk-reviews-userid
npx sequelize-cli migration:generate --name add-fk-reviews-gamestoreId

