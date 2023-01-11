const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
var cors = require('cors');

require('dotenv').config()

const app = express();
app.use(cors());

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post('/login', async (req, res) => {
    // create token
    const token = jwt.sign({
        name: req.body.name,
        id: req.body.id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        token: token
    })
})

app.get("/request", async (req, res) => {
    // create token
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) =>{
        let response = {
            decoded: decoded
        }
        if(err){
            response = {
                error: true,
                decoded: null
            }
        }
        res.json(response);
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor running on: ${PORT}`)
})