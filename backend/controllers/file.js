const multer = require('multer');
const File = require('../models/file');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // ✅ Ajout d'un timestamp pour éviter les doublons
    },
});

const enregistrer = multer({ storage });

const upload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Aucun fichier envoyé" });
        }

        const medias = await Promise.all(
            req.files.map((fichier) =>
                File.create({
                    nom: fichier.originalname,
                    url: `uploads/${fichier.filename}`,
                    type: fichier.mimetype,
                    size: fichier.size
                })
            )
        );

        res.status(200).json({ success: true, data : medias});

    } catch (error) {
        res.status(500).json({ success: false, message: `Erreur d'enregistrement ${error}` });
    }
};

const deleteFile = async (req, res)=>{
    const {id} = req.params;


    try{
       const file = await File.findOne({where :{id}});


       if(!file){
        res.status(400).json({
            success:false,
            message:"Fichier introuvable"
           });
       }

       await File.destroy({where:{id}});

       res.status(201).json({
        success:true,
        message:"Fichier a été supprimé avec succès",
       });
       
    }catch(e){
        res.status(500).json({success:false, message:"Echec de la suppression"});
        //console.log("Creation de l'utilisateur echouée ", e);
    }
};

module.exports = {
    upload,
    enregistrer,
    deleteFile
};
