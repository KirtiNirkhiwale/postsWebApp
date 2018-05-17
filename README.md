# postsWebApp

> Clone the repository

#Setup Node js backend-

> open terminal inside backend folder and run below commonds -
> Run mongoDB - sudo service mongod start
> npm install
> node app.js
> Update the URL in setHeader in app.js for allowing you react app - 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

#Setup React JS front end -

> open terminal inside frontend and run below commonds -
> npm install
> npm start
> site will be opened on 3000 port
> Update the URL in actions/index.js send app request to node - 
    const API_URL = 'http://localhost:8080'

