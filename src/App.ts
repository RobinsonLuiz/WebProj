import * as express from "express";
import * as bodyParser from "body-parser";
import IndexRoute from "./routes/IndexRoute";
import UsuarioRoute from "./routes/UsuarioRoute";
import SceneRoute from "./routes/SceneRoute";
import GameRoute from "./routes/GameRoute";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import Helpers from "../src/helpers/Helpers";


class App {
  
  private _express: any;
  private _session: any;
  private _store: any;
  private _cookie: any;

  constructor() {
    this._express = express();
    this.middlewares();
    this.routes();
  }


  /**
   * Express load
   */
  getExpress() {
    return this._express;
  }

  /**
   * Middlewares para funcionamento do express
   */
  middlewares() {
    this._express.set("view engine", "ejs");
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: true }));
    this._express.use(express.static(__dirname + "/public"));
    this._express.set("views", __dirname + "\\public\\views");
    this._session = Helpers.hashCode("session-storage-rbn") + "-session-rbn";
    this._store = new session.MemoryStore();
    this._cookie = cookieParser(this._session);
    this._express.use(this._cookie);
    this._express.set('trust proxy', 1);
    this._express.use(
      session({
        name: "session-storage",
        secret: String(this._session),
        resave: true,
        store: this._store,
        saveUninitialized: true
      })
    );
  }

  /**
   * Rotas da aplicação
   */
  routes() {
    IndexRoute.routes(this._express);
    SceneRoute.routes(this._express);
    GameRoute.routes(this._express);
    UsuarioRoute.routes(this._express);
    this._express.use((req, res) => {
      res.status(404).render('404');
    });
    this._express.use((req, res) => {
      res.status(403).render('403');
    });
  }
}

export default new App();
