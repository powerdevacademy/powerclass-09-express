var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev')); // log de acessos
app.use(express.json()); // parser de requests JSON
app.use(express.text()); // parser de requests text
app.use(express.raw()); // parser de requests como Buffer
app.use(express.urlencoded({ extended: false })); //parse de query string
app.use(cookieParser()); // parse de Cookies
app.use(cors()); // habilitação de CORS


app.use(express.static(path.join(__dirname, 'public')));


app.route('/livro')
  .all ((req, res, next) => {
    res.send('Este é um middleware!');
    next();
  })
  .get((req, res) => {
    res.send('Retorna um livro');
  })
  .post((req, res) => {
    res.send('Adiciona um livro');
  })
  .put((req, res) => {
    res.send('Atualiza um livro');
  });


  var router = express.Router();
  
  // middleware específico para esse roteador
  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
  router.get('/', (req, res) => res.send('Lista de discos'));
  router.get('/sobre', (req, res) => res.send('Sobre os discos'));
  
  module.exports = router;
  
  // Em seguida, inclua esse roteador no app raiz 
  var discos = require('./discos');
  app.use('/discos', discos);



app.use('/', indexRouter);
app.use('/users', usersRouter);


const func1 = (req, res, next) => console.log('Passando por func1');
const func2 = (req, res, next) => console.log('Passando por func2');
const funcN = (req, res, next) => console.log('Passando por funcN');


// OU
app.get('/minha/rota', [func1, func2, funcN], (req, res) => {
    res.send('Passou por Todos os middlewares na sequência e agora chegou aqui!');
  });
// OU AINDA 
app.get('/minha/rota', (req, res, next) => {
    console.log('aqui a gente só está processando a rota ...');
    next();
  }, (req, res) => {
    res.send('Agora sim a reposta é enviada!');
  });


module.exports = app;
