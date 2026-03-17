const express = require('express');
const app = express();
const Path = require('path');
const fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        console.log(files);
        res.render('index',{files:files});
    })
    
});
app.post('/add', (req, res) => {
    fs.writeFile(`./files/${req.bbody.tittle.split(' ').join()}.txt`,req.body.details,function (params) {
        res.redirect("/")
    })
})
app.listen(3000);
