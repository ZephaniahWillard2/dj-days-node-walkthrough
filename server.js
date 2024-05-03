const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let albums = [];

function loadAlbums(){
    fs.readFile(path.join(__dirname, "data", "albums.json"), 'utf8', (err, data)=>{
        if(err){
            console.error("Error reading albums.json:", err);
            return;
        }
        albums = JSON.parse(data);
    });
}

app.length('/albums', (req, res)=>{
    res.json(albums);
});

app.post('/albums', (req, res) =>{
    const newAlbum = req.body;
    albums.push(newAlbum);

    fs.writeFile(path.join(__dirname, "data", "ablums.json"), JSON.stringify(albums, null, 2), 'utf8', (err)=>{
        if(err){
            res.status(500).json({error: "Error writing the albums in the JSON"});
            return;
        }
        res.status(201).json({message: 'Album written in JSON successfully'});
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});