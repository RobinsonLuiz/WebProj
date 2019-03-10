import Helpers from "../helpers/Helpers";
import ScenarioDAO from "../dao/ScenarioDAO";
import { Usuario } from "../models/Usuario";
import * as uuidv1 from "uuid";
import UsuarioController from "../controllers/UsuarioController";
import ScenarioController from "../controllers/ScenarioController";
import { URLSearchParams } from "url";

class IndexRoute {
  constructor(app) {
    this.routes(app);
  }

  painel(req: any, res: any) {
    if (!req.session.administrador) return res.render("403");
    ScenarioController.buscaDados(req, res, req.session.administrador);
  }

  index(req: any, res: any) {
    const hour = 3000000;
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
    if (req.session.administrador) res.redirect("painel");
    else res.render("index", { administrador: false });
  }

  register(req: any, res: any) {
    let user = req.body as Usuario;
    let uuid = uuidv1().split("-");
    user.senha = uuid[0];
    user.ativado = 0;
    user.token = uuid[0];
    UsuarioController.create(req, res, user);
  }

  session(req: any, res: any) {
    let user = JSON.parse(req.params.user);
    req.session.administrador = user;
    res.redirect("/");
  }

  login(req: any, res: any) {
    let user = req.body as Usuario;
    UsuarioController.login(req, res, user);
  }

  confirmarRegistro(req: any, res: any) {
    let user = req.body as Usuario;
    UsuarioController.confirmarRegistro(req, res, user);
  }

  pageConfirmar(req: any, res: any) {
    const { uuid } = req.params;
    UsuarioController.pageRegistro(req, res, uuid);
  }

  private routes(app: any) {
    app.route("/").get(this.index);
    app.route("/painel").get(this.painel);
    app.route("/verifica").post(this.register);
    app.route("/login").post(this.login);
    app.route("/administrador/session/:user").get(this.session);
    app.route("/administrador/confirmar/:uuid").get(this.pageConfirmar);
    app.route("/administrador/ativar").post(this.confirmarRegistro);
  }
}

export default IndexRoute;
