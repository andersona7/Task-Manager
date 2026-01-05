require('dotenv').config();
const express = require("express");
const app = express();
const pageRoutes = require("./routes/pageRouters");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const User = require("./models/user.js");
const session = require("express-session");

connectDB();

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.use(session({
  secret:process.env.SESSIONSECRET,
  resave:false,
  saveUninitialized:false,
  cookie: {
        maxAge: 10 * 60 * 1000
    }
}));

app.use(async (req,res,next)=>{
  const user = await User.findById(req.session.userId);
  res.locals.user = user;
  next();
})

app.use(express.json());

app.use("/",authRoutes);

app.use("/",pageRoutes);

app.use("/",taskRoutes);

app.listen(3000,()=>{
    console.log("Server started running in port 3000")
});