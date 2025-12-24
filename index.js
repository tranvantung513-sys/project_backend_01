const express = require("express");
const path = require("path");
var methodOverride = require("method-override");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const flash = require("express-flash");
const moment = require("moment"); //fasfdsafdas
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
// end flash
// tinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// end tinyMCE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
const port = process.env.PORT;

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment; //fasfdsafdas

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
