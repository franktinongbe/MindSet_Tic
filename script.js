// Import des bibliothèques nécessaires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sert les fichiers statiques (frontend)

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/startupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
  .catch((error) => console.error("Erreur de connexion :", error));

// Modèle MongoDB
const Service = mongoose.model('Service', {
    name: String,
    description: String
});

// API backend
app.get('/services', async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

app.post('/services', async (req, res) => {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
});

// Route principale pour servir la page HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
app.listen(5000, () => {
    console.log('Serveur démarré sur http://localhost:5000');
});
 