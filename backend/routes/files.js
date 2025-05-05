const {upload, enregistrer, deleteFile} = require("../controllers/file");
const express = require('express');

const filesRouter = express.Router();

filesRouter.post('/uploads', enregistrer.array("files", 5),upload);
filesRouter.delete('/delete/:id',deleteFile);

module.exports = filesRouter;