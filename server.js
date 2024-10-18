require('dotenv').config();
const cors = require('cors');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const express = require('express');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true // é so remover esse useFindAndModify //useFindAndModify foi descontinuada e o comportamento padrão foi alterado para false. I
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log("Error: ", error.message)
})

const server = express();
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(fileupload());

server.use(express.static(__dirname+'/public'))

server.use('/', apiRoutes);

server.listen(process.env.PORT, ()=>{
    console.log("Rodando no endereço: "+process.env.BASE)
})
