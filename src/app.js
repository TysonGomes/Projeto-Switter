const express = require("express");
const morgan= require("morgan");
const cors =require("cors");
const bcrypt= require("bcrypt");
const  mongoose =require ("mongoose");
require("dotenv").config();
const User = require("../src/models/User");
const app = express();
app.use(express.json());
app.use(morgan("common"));

app.use(
    cors({
        origin:"http://localhost:3000"
    })
);
app.get("/",(req,res)=> {
    res.send("deu certo ok 222")
})
const PORT=3333;
app.listen(PORT,()=>{
    console.log (`server na porta :${PORT}`);
    
})




mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,    
    useUnifiedTopology: true  
    },  () => console.log("Conectou top!"))

// Criar usuário
app.post("/register", async (req, res, next) => {
    try {
      const { username, password } = req.body;
 // Verificar se username é valido
 const userExists = await User.findOne({username});
 
 if (userExists) return res.status(400).send({error: "Username already in use."});
 
 // Criptografar a senha
 const salt = await bcrypt.genSalt(10);
 const hash = await bcrypt.hash(`${password}`, salt);
 //Criar novo usuário no banco
 const user = await User.create({
   username,
   password: hash
 })
 
 res.status(201).send({
   id: user.id,
   username: user.username
 });    
 } catch (err) {       
      res.status(400)
      next(err);
    }
  });
  app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
      res.status(404);
      next(error);
    });
    app.use((error, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.statusCode = statusCode;
        res.json({
          message: error.message,
          stack: process.env.NODE_ENV === "production" ? "=X" : error.stack  });
      });



/*
app.use(function(req,res,next){
    console.time("duração")
    next();
})
app.use("/time",function(req,res){
    const duração=console.timeEnd("duração")
    res.send (duração)
})*/
/*
app.use((req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error)
});
app.use((error,req,res,next)=>{
    const statusCode= res.statusCode ===200? 500: res.statusCode
    res.statusCode=statusCode;
    res.json({
        message:error.message,
        stack: process.env.NODE_ENV === "production" ? "deu ruim" : error.stack
    });
    require("dotenv").config();
    console.log(process.env.DB_URL);
});*/