//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;
 
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/malupi',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});
 
 
//criando a model/collection do seu projeto - começo da model usuario cadastrado
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String, required : true}
});
 
 
const Usuario = mongoose.model("usuario", UsuarioSchema);
 
 
//configurando os roteamentos da model usuario
app.post("/usuariocadastrado", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha
 
    //testando se todos os campos foram preenchidos
    if(email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
 
    //como fica no postman pra add
    const usuario = new Usuario({
        email : email,
        senha : senha
    })
 
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Login ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});

// fim da model usuario
 
 
// começo da model de cadastro novo usuario
const novousuarioSchema = new mongoose.Schema({
    nome : {type : String, required : true},
    sobrenome : {type : String, required : true},
    nomeUser : {type : String, required : true},
    email2 : {type : String, required : true},
    senha2 : {type : String, required : true}
});
 
 
const Novousuario = mongoose.model("novousuario", novousuarioSchema);
 
 
//configurando os roteamentos da model cadastro novo usuario
app.post("/cadastronovousuario", async(req, res)=>{
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const nomeUser = req.body.nomeUser;
    const email2 = req.body.email2;
    const senha2 = req.body.senha2

    //teste mais importante da ac
    const emailExiste2 = await Novousuario.findOne({email2:email2});
 
    if(emailExiste2){
        return res.status(400).json({error : "Esse email já está registrado no sistema. Faça login."});
    }

    //testando se todos os campos foram preenchidos
    if(nome == null || sobrenome == null || nomeUser == null || email2 == null || senha2 == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
    //como fica no postman pra add
    const novousuario = new Novousuario({
        nome : nome,
        sobrenome : sobrenome,
        nomeUser : nomeUser,
        email2 : email2,
        senha2 : senha2
    })
 
 
    try{
        const newNovousuario = await novousuario.save();
        res.json({error : null, msg : "Cadastro ok", novousuarioId : newNovousuario._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});

//fim model cadastro novo usario

//criando a model triagem
const TriagemSchema = new mongoose.Schema({
    emailTriagem : {type : String, required : true}
});
 
 
const Triagem = mongoose.model("triagem", TriagemSchema);
 
 
//configurando os roteamentos da model triagem
app.post("/recebidosTriagem", async(req, res)=>{
    const emailTriagem = req.body.emailTriagem
 
    //testando se todos os campos foram preenchidos
    if(emailTriagem == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
    //teste mais importante da ac
    const emailExiste2 = await Novousuario.findOne({email2:email2});
 
    if(emailExiste2){
        return res.status(400).json({error : "Esse email já está registrado no sistema. Faça login."});
    }
 
    //como fica no postman pra add
    const triagem = new Triagem({
        emailTriagem : emailTriagem
    })
 
 
    try{
        const newTriagem = await triagem.save();
        res.json({error : null, msg : "Recebido", triagemId : newTriagem._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});
// fim da model triagem


//criando a model voluntários
const VoluntariosSchema = new mongoose.Schema({
    nomeV : {type : String, required : true},
    emailV: {type : String, required : true},
    vaga : {type : String, required : true},
    recado : {type : String, required : true}
});
 
const Voluntarios = mongoose.model("voluntarios", VoluntariosSchema);
 
 
//configurando os roteamentos da model voluntários
app.post("/voluntariosTriagem", async(req, res)=>{
    const nomeV = req.body.nomeV;
    const emailV = req.body.emailV;
    const vaga = req.body.vaga;
    const recado = req.body.recado

 
    //testando se todos os campos foram preenchidos
    if(nomeV == null || emailV == null || vaga == null || recado == null){
        return res.status(400).json({error : "Preencher todos os campos"});
    }
 
    //teste mais importante da ac
    const emailExiste2 = await Voluntarios.findOne({emailV:emailV});
 
    if(emailExiste2){
        return res.status(400).json({error : "Esse email já está registrado no sistema. Faça login."});
    }

    //como fica no postman pra add
    const voluntarios = new Voluntarios({
        nomeV : nomeV,
        emailV : emailV,
        vaga : vaga,
        recado : recado
    })
 
 
    try{
        const newVoluntarios = await voluntarios.save();
        res.json({error : null, msg : "Recebido", voluntariosId : newVoluntarios._id});
    } catch(error){
        res.status(400).json({error});
    }
 
});

app.get("/usuariocadastrado", async(req, res)=> {
    res.sendFile(__dirname+"/usuariocadastrado.html");
});

app.get("/cadastronovousuario", async(req, res)=> {
    res.sendFile(__dirname+"/cadastronovousuario.html");
});

app.get("/recebidosTriagem", async(req, res)=> {
    res.sendFile(__dirname+"/index.html");
});
 
app.get("/voluntariosTriagem", async(req, res)=> {
    res.sendFile(__dirname+"/contact.html");
});

//rota gerais
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});


//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});