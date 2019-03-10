import { Usuario } from "../models/Usuario";
import * as uuidv1 from "uuid";
import ScenarioController from "../controllers/ScenarioController";
import { Request, Response } from 'express';

class IndexRoute {

  constructor() {
  }

  /**
   * Renderização do painel do usuário
   * @param req - Request
   * @param res - Response
   */
  painel(req: Request, res: Response) {
    if (!req['session'].administrador) return res.render("403");
    ScenarioController.buscaDados(req, res, req['session'].administrador);
  }


  /**
   * Renderização da página inicial
   * @param req - Request
   * @param res - Response
   */
  index(req: Request, res: Response) {
    const hour = 3000000;
    req['session'].cookie.expires = new Date(Date.now() + hour);
    req['session'].cookie.maxAge = hour;
    if (req['session'].administrador) res.redirect("painel");
    else res.render("index", { administrador: false });
  }

  /**
   * Rotas
   * @param app - express encapsulado
   */
  public routes(app: any) {
    app.route("/").get(this.index);
    app.route("/painel").get(this.painel);
  }
}

export default new IndexRoute();
