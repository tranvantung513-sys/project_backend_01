const express = require("express");
var methodOverride = require("method-override");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const flash = require("express-flash");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();
const app = express();
// flash
app.use(cookieParser("tung"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
const port = process.env.PORT;

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
