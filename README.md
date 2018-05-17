# postsWebApp

> Clone the repository <br /> <br />

#Setup Node js backend-

> open terminal inside backend folder and run below commonds - <br />
> Run mongoDB - sudo service mongod start <br />
> npm install <br />
> node app.js <br />
> Update the URL in setHeader in app.js for allowing you react app - <br />
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

#Setup React JS front end -

> open terminal inside frontend and run below commonds - <br />
> npm install <br />
> npm start <br />
> site will be opened on 3000 port <br />
> Update the URL in actions/index.js send app request to node - <br />
    const API_URL = 'http://localhost:8080'

