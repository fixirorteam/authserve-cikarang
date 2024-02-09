const express = require("express")
const cors = require('cors');
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')
require('dotenv').config();
const bodyParser = require('body-parser');

//import components
const sequlizeConfig = require('./config/Sequlize')
const createUserRoute = require('./routes/CreateUserRoute')


const app = express()
const port = process.env.APP_PORT || 5000
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: sequlizeConfig
})

//membuat table
//sequlizeConfig.sync()
  //.then(() => {
    //console.log('Database and tables synced');
  //})
  //.catch((error) => {
    //console.error('Error syncing database:', error);
  //});

  //definisi hak API
  app.use(express.json());
  app.use(
    session({
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Update this configuration for production
    })
  );
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));

  //definisi router
  app.use(createUserRoute)

  //store.sync();


app.listen(port, () => {
    console.log(`API Server Running On Port ${port}`)
})