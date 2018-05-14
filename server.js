let express = require("express");
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let port = process.env.PORT || 8000;
app.use(bodyParser.json());

// app.post("/create", function(req, res){
//   let user = req.body.user;
//   res.json('user.name');
// })

app.post('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8')
  let parData = JSON.parse(data);
  parData.push(req.body);
  fs.writeFileSync('./storage.json', JSON.stringify(parData));
  res.send('BOOM');
});

 app.get('/users', function(req, res) {
let data = fs.readFileSync('./storage.json', 'utf-8')
let parData = JSON.parse(data);
  res.json(parData);
});
app.get('/users/:name', function(req, res) {
let data = fs.readFileSync('./storage.json', 'utf-8')
let parData = JSON.parse(data);
let name = parData.filter(n =>{ n.name === req.params.name});

res.json(name[0]);
});

app.put('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8')
  let parData = JSON.parse(data);
  let upDate = parData.map(user =>{
    if(user.name === req.params.name){
      return req.body;
    }else{
      return user;
    }
  });
  fs.writeFileSync('./storage.json', JSON.stringify(upDate));
  res.send('Done');
});

app.delete('/users/:first_name', function(req, res) {
  let data = fs.readFileSync('./storage.json', 'utf-8')
  let parData = JSON.parse(data);
  let fillterded = parData.filter((i)=>{
    return i.name !==req.params.name;
  })
  fs.writeFileSync('./storage.json', JSON.stringify(fillterded));
  res.send('Delete');
});

app.listen(port, function() {
  console.log('Listening on', port);
});
