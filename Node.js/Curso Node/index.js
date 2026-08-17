const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect")

dotenv.config();
connectToDatabase();
// const path = require ("./modules/path")
// const fs = require("./modules/fs")

// const http = require("./modules/http")
 
require("./express")
