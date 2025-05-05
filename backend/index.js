const express = require('express');
const cors = require("cors")
const dbconfiguration = require('./config/database')
const filerouter = require('./routes/files');
const authrouter = require('./routes/auth');
const classerouter = require('./routes/classe');
const coursRoutes = require('./routes/cours');

async function LancerServeur(){
    try{
        dbconfiguration.authenticate();
        console.log("Connexion etablie avec la base de donnée !");
    
        await dbconfiguration.sync({force:false});
        console.log("Donnée synchronisées !");
    
        app.listen(process.env.PORT, ()=>{
            console.log("Le serveur ecoute sur le port : ", process.env.PORT);
            console.log(`Serveur accessible via http://localhost:${process.env.PORT}`);
        });
    }catch (e){
        console.error('Erreur de connexion à la base de données !', e)
    }
}

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static("uploads"));
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api/files',filerouter);
app.use('/api/auth',authrouter);
app.use('/api/classes',classerouter);
app.use('/api/cours', coursRoutes);

LancerServeur();