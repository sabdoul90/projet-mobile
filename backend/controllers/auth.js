const { hash } = require('bcryptjs');
const User = require('../models/usermodele');
const Classe = require('../models/classemodele');

exports.signup = async (req, res)=>{
    const {nom, prenom, numero,type, motdepasse} = req.body;
    try{

       const existingUser = await User.findOne({where:{numero}});
       if(existingUser){
        return res.status(401).json({success:false, message:"L'utilisateur existe déjà !"});
       }

       const pwghassed = await hash(motdepasse, 12);
       const newUser = await User.create({
        nom,
        prenom,
        numero,
        type,
        motdepasse : pwghassed,
       });

       const result = await newUser.save();
       result.password = undefined;
       res.status(201).json({
        success:true,
        message:"Utilisateur a été créé avec succès",
        data : result,
       });
       
    }catch(e){
        res.status(500).json({success:false, message:"Creation de l'utilisateur echouée !"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};

exports.signin = async (req, res)=>{
    const {numero, motdepasse} = req.body;
    try{

       const existingUser = await User.findOne({where:{numero}});
       existingUser.motdepasse = undefined;
       if(existingUser){
        return res.status(200).json(
            {
                success:true,
                data : existingUser
            });
       }else{
        return res.status(400).json(
            {
                success:false,
                message:"Mot de passe ou nom d'utilisateur incorrect",
            });
       }
       
    }catch(e){
        res.status(500).json({success:false, message:"Connexion echouée !"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};

exports.editerUSer = async (req, res)=>{
    const{id} = req.params;
    const {nom, prenom,numero, classes, profile } = req.body;
    try{

        //console.log("ids : ",id); 
        const existingUser = await User.findOne({ where: { id } });

       //console.log("Data ");
       //console.log(existingUser);

       if(existingUser){
            if (nom !== undefined) existingUser.nom = nom;
            if (prenom !== undefined) existingUser.prenom = prenom;
            if (numero !== undefined) existingUser.numero = numero;
            if (classes !== undefined) {
                console.log("First Controle");
                if (!Array.isArray(classes)) {
                    return res.status(400).json({ success: false, message: "classesIds doit être un tableau" });
                }

                console.log("2e Controle");
                if (classes.length === 0) {
                    return res.status(400).json({ success: false, message: "Veuillez définir au moins une classe" });
                }

                
                for(const idClasse of classes){
                    console.log(idClasse);
                    const idRecherc = `${idClasse}`;
                    const classeRenseigne = await Classe.findOne({ where: { id : idRecherc } });
                    if(classeRenseigne){
                        await existingUser.addClasses([classeRenseigne]);
                    }
                }
            }

            if (profile !== undefined) existingUser.profile = profile;
            
            await existingUser.save();
            existingUser.motdepasse = undefined;
            return res.status(200).json(
            {
                success:true,
                message : "Information(s) editée(s) avec succès",
                data : existingUser
            });
       }else{
        return res.status(400).json(
            {
                success:false,
                message:"Echec de la modification",
            });
       }
       
    }catch(e){
        res.status(500).json({success:false, message:"Modification echouée !"});
    }
};

exports.getUSer = async (req, res)=>{
    const {id} = req.params;
    try{

       const existingUser = await User.findOne({where:{id}});

       if(existingUser){
        existingUser.motdepasse = undefined;
        return res.status(200).json(
            {
                success:true,
                data : existingUser
            });
       }else{
        return res.status(400).json(
            {
                success:false,
                message:"Utilisateur introuvable",
            });
       }
       
    }catch(e){
        res.status(500).json({success:false, message:"Connexion echouée !"});
    }
};

exports.getUSers = async (req, res)=>{
    try{

       const users = await User.findAll();

       const finalListe = users.map(user => {
        const userData = user.toJSON();
        delete userData.motdepasse;
        return userData;
    });

       return res.status(200).json(
        {
            success:true,
            data : finalListe
        });
       
    }catch(e){
        res.status(500).json({success:false, message:"Connexion echouée !"});
    }
};