const Classe = require('../models/classemodele');
const User = require('../models/usermodele');

exports.addClasse = async (req, res)=>{
    const {nom, description} = req.body;
    try{
       const classe = await Classe.create({
        nom,
        description
       });

       res.status(201).json({
        success:true,
        message:"La classe a été créée avec succès",
        data : classe,
       });
       
    }catch(e){
        res.status(500).json({success:false, message:"Creation de la classe echouée !"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};

exports.deleteClasse = async (req, res)=>{
    const {id} = req.body;
    try{
       const newClasse = await Classe.findOne({where :{id}});
       if(!newClasse){
        res.status(400).json({
            success:false,
            message:"La classe est introuvable",
           });
       }

       Classe.destroy(id);
       res.status(201).json({
        success:true,
        message:"La classe a été supprimée avec succès",
       });
       
    }catch(e){
        res.status(500).json({success:false, message:"Echec de la suppression de la classe"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};

exports.editerClasse = async (req, res)=>{
    const {id, nom, description } = req.body;

    try {
        const classe = await Classe.findOne({ where : id});
        if (!classe) {
            return res.status(404).json({ message: "Classe non trouvée" });
        }

        // Mettre à jour uniquement les champs fournis
        if (nom !== undefined) classe.nom = nom;
        if (description !== undefined) classe.description = description;

        await classe.save();

        return res.status(200).json({ message: "Classe mise à jour avec succès", classe });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la classe :", error);
        return res.status(500).json({ message: "Une erreur est survenue", error });
    }
};

exports.getAllClasses = async (req, res)=>{

    try {
        const classes = await Classe.findAll();
    
        return res.status(200).json({ 
            success : true,
            data : classes });
    } catch (error) {
        console.error("Erreur du serveur :", error);
        return res.status(500).json({ message: "Une erreur est survenue", error });
    }
};

exports.finBydIDClasse = async (req, res)=>{
    const {id} = req.body;

    try {
        const classe = await Classe.findOne({ where : id});

        if (!classe) {
            return res.status(400).json({
                success : true,
                 message: "Classe non trouvée",
                });
        }

        return res.status(200).json({
            success : true,
             data : classe
            });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la classe :", error);
        return res.status(500).json({ message: "Une erreur est survenue", error });
    }
};

exports.finBydIdUser = async (req, res)=>{
    const {id} = req.params;


    try {

        const user = await User.findOne({ where : {id}});

        if(!user){
            return res.status(404).json(
                {
                    success:false,
                    message:"Utilisateur introuvable",
                });
        }

        //'eleve', 'professeur'
        if(user.type == 'eleve'){
            const eleve = await User.findOne({
                where :{id},
                include: {
                    model: Classe,
                    as: 'classes', 
                    through: { attributes: [] },
                    include: {
                        model: User,
                        as: 'membres', 
                        through: { attributes: [] }, 
                        attributes: { exclude: ['motdepasse'] }
                    }
                }
            });

            
            res.status(200).json({
                success : true,
                 data : eleve.classe
                });

        }else{
            const prof = await User.findOne({
                where :{id},
                include: {
                    model: Classe,
                    as: 'classes', 
                    through: { attributes: [] },
                    include: {
                        model: User,
                        as: 'membres', 
                        through: { attributes: [] }, 
                        attributes: { exclude: ['motdepasse'] }
                    }
                }
            });

            res.status(200).json({
                success : true,
                 data : prof.classes
                });
        }

    } catch (error) {
        //console.error("Erreur lors de la mise à jour de la classe :", error);
        return res.status(500).json({ 
            success:false,
            message: "Une erreur est survenue", error });
    }
};