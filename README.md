# RestApi
RestApi for login and crud Operation using product

Register > signUp page where  we check if user has unique email id if yes create a new account else  ask for unique email id 

Login > based on registered detail  we can login that gives us 2 Token one for acess Token which logs out every 2 min and then session Token that changes every few sec now we have taken care of security so no one can login using session Token 
 jws Token sets encryption is been used 
 
 who am i > with access Token we can check all detail of the user if user is logged in 
 
 Refresh Token > so as said our concern is always security so refresh token which is saved in server or database end is unique and chnages over time or time of logot so new token is generated 
 
 Logout > so finally logout using refresh Token that will make access Token invalid 
 
 
 Note : every issue has been setup different error so its easy to understand and we have kept development and production phase so every error is different if ytour on development of production phase > make changes in .env file (DEBUG_MODE=TRUE) so enable Development mode On or off 
 
 
 
best part of project > Product Crud Operations 

so manually making changes in role part of database as every user will login as customer so if you need special previlage you need admin access so to make crud changes in product

only for admin users previlage


add a product > adding a product to our project 

make changes or update > update the product based on id of the database 

check a single product > using a praticular id you can check all the saved content 

check all product > now we can check all the product saved in our database 

delete he product > so delete the product based on id 

so for all this function you have to be logged in and as a admin user > check middleware section for a brief














finally please note i am in learning phase so any mistake please let me know and i am eager and happy to take suggestion and learn new things 
