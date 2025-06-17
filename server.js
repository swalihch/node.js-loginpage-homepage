const express = require("express");
const app = express();
const session = require("express-session");
const nocache = require("nocache");

app.use(express.static('public'));
const hbs = require("hbs");
app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}));

const username = "swalih";
const password = "123";


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:true
}));

app.use(nocache());

app.get("/",(req,res)=>{

  if (req.session.user){
    res.redirect('homepage');
  }else
  {
    const message = req.query.msg;
    
    if(req.session.passwordwrong){
      req.session.passwordwrong=false;
      res.render('login',{msg:'Invalid credentials'});
    }else{
      res.render('login',{msg: message});
    }
  }
  
});

app.post("/verify",(req,res)=>{
  console.log(req.body);
  if(req.body.username === username && req.body.password === password){
    req.session.user = req.body.username;
    res.redirect('/homepage'); 

  }else{
    req.session.passwordwrong=true;
    res.redirect('/');
    
    
  }
});

app.get('/homepage',(req,res)=>{

  if (req.session.user){

    res.render('homepage');

  }else{
    if(req.session.passwordwrong){
      req.session.passwordwrong=false;
      res.render('login',{msg:'Invalid credentials'});
    }
    else{ 
      res.render('login');
    }

  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/homepage');
    }
    res.redirect('/?msg=You have been logged out.');
  });
});



app.use((req,res,next)=>{
  res.set("cache-control","no-store");
  next();
});


const PORT = process.env.PORT || 3005;
app.listen(PORT,()=> console.log(`server ${PORT}`));