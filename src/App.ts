import * as express from "express";
import * as bodyParser from "body-parser";
import IndexRoute from "./routes/IndexRoute";
import SceneRoute from "./routes/SceneRoute";
import GameRoute from "./routes/GameRoute";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import Helpers from "../src/helpers/Helpers";


class App {
  
  public express: any;
  private _session: any;
  private _store: any;
  private _cookie: any;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  /**
   * Middlewares para funcionamento do express
   */
  middlewares() {
    this.express.set("view engine", "ejs");
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(__dirname + "/public"));
    this.express.set("views", __dirname + "\\public\\views");
    this._session = Helpers.hashCode("session-storage-rbn") + "-session-rbn";
    this._store = new session.MemoryStore();
    this._cookie = cookieParser(this._session);
    this.express.use(this._cookie);
    this.express.set('trust proxy', 1);
    this.express.use(
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
    new IndexRoute(this.express);
    new SceneRoute(this.express);
    new GameRoute(this.express);
  }
}

export default new App();
