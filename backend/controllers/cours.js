const Cours = require('../models/coursmodele');
const Classe = require('../models/classemodele');
const User = require('../models/usermodele');

exports.ajouterCours = async (req, res) => {
    try {
      const { titre, description, fichier, statut, periode, professeurId, classeId } = req.body;
  
      const cours = await Cours.create({
        titre,
        description,
        fichier,
        statut,
        periode,
        professeurId,
        classeId
      });
  
      res.status(201).json(cours);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du cours', error });
    }
  };
  
  // Modifier un cours
  exports.modifierCours = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Cours.update(req.body, {
        where: { id }
      });
  
      if (updated[0] === 0) {
        return res.status(404).json({ message: "Cours non trouvé" });
      }
  
      res.json({ message: "Cours mis à jour avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour", error });
    }
  };


exports.getCoursParClasse = async (req, res) => {
  try {
    const { classeId } = req.params;

    // Étape 1 : Récupérer tous les cours de cette classe
    const cours = await Cours.findAll({
      where: { classeId : classeId }
    });

    // Étape 2 : Récupérer les élèves une seule fois
    const classe = await Classe.findOne({
      where: { id: classeId },
      include: {
        model: User,
        as: 'membres',
        where: { type: 'eleve' },
        attributes: ['id', 'nom', 'prenom', 'numero'],
        through: { attributes: [] }
      }
    });

    console.log(classe);

    if (!classe) {
      return res.status(404).json({ message: 'Classe introuvable' });
    }

    const eleves = classe.membres;
    console.log(eleves);

    // Étape 3 : Pour chaque cours, récupérer son professeur
    const coursAvecInfos = await Promise.all(cours.map(async (c) => {
      const professeur = await User.findOne({
        where: { id: c.professeurId },
        attributes: ['id', 'nom', 'prenom', 'numero']
      });

      return {
        ...c.toJSON(),
        professeur: professeur || null,
        participants: eleves
      };
    }));

    return res.status(200).json(coursAvecInfos);
  } catch (error) {
    console.error("Erreur dans getCoursParClasse :", error);
    return res.status(500).json({
      message: "Erreur lors de la récupération des cours",
      error: error.message
    });
  }
};

  
  
  
  