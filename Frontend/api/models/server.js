const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieparser = require('cookie-parser');
const session = require('express-session')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

class Server {
      constructor () {
            this.app = express();
            this.PORT = process.env.PORT || 3000;
            this.paths = {
                  auth: '/api/auth',
                  teacher: '/api/teacher',
                  coment: '/api/coment',
                  tag: '/api/tag',
            }
            //DB connection
            // this.dbConnection()
            //Middlewares
            //    Aquellos que se ejecutan siempre que se levanta el servidor
            this.middlewares()
            //Rutas de la aplicacion
            this.routes();
            //Sockets Configuration
            // this.sockets()
      }

      async dbConnection () {
            await dbConnection();
      }

      middlewares () {
            const sessionConfig = {
                  name: "session",
                  secret: "tunas",
                  cookie: {
                        maxAge: 1000 * 60 * 60,
                        secure: false,
                        httpOnly: true
                  },
                  resave: false,
                  saveUninitialized: true
            }

            //RateLimit
            const limiter = rateLimit({
                  windowMs: 10 * 60 * 1000,//10mins,
                  max: 4
            })
            this.app.use(limiter);
            this.app.set('trust proxy', 1)

            //CORS
            //CORS
            this.app.use(cors({
                  origin: true,
                  credentials: true
            }));
            //Lecture and parsing from the body
            this.app.use(express.json())
            //Nos permite recibir los URL search params por medio de una petición fetch
            this.app.use(bodyparser.urlencoded({ extended: true }))
            //Configurando sesiones
            this.app.use(session(sessionConfig))
            //Permite realizar la lecutra de las cookies
            this.app.use(cookieparser())
            //PUBLIC DIRECTORY
            this.app.use(express.static('public'));
            //File Uploader
            this.app.use(fileUpload({
                  useTempFiles: true,
                  tempFileDir: '/tmp/',
                  createParentPath: true
            }));
      }

      routes () {
            this.app.use(this.paths.authPath, require('../routes/user'));
            this.app.use(this.paths.coment, require('../routes/comment'));
            this.app.use(this.paths.tag, require('../routes/tag'));
            this.app.use(this.paths.teacher, require('../routes/teacher'));

      };

      start () {
            this.app.listen(this.PORT, () => {
                  console.log('Listening from port number : ', this.PORT);
            })
      }
}

module.exports = Server;