import ScenarioController from "../controllers/ScenarioController";
import { Request, Response } from 'express';

class SceneRoute {

  constructor(app) {
    this.routes(app);
  }

  /**
   * Busca os cenários dos jogos do usuário
   * @param req - Request
   * @param res - Response
   */
  busca(req: Request, res: Response) {
    if (!req['session'].administrador) res.render("403");
    const { id } = req.params;
    ScenarioController.busca(req, res, id);
  }

  /**
   * Atualiza um cenário
   * @param req - Request
   * @param res - Response
   */
  atualiza(req: Request, res: Response) {
    if (!req['session'].administrador) res.render("403");
    const { id } = req.params;
    const scene = req.body["scene"];
    ScenarioController.atualiza(req, res, id, scene);
  }

  /**
   * Rotas
   * @param app - express encapsulado
   */
  cria(req: Request, res: Response) {
    if (!req['session'].administrador) res.render("403");
    ScenarioController.create(req, res, req.body["id"], req.body["name"]);
  }

  private routes(app: any) {
    app.route("/scenarios/:id").get(this.busca);
    app.route("/scenarios/:id").put(this.atualiza);
    app.route("/scenarios/create").post(this.cria);
  }
}

export default SceneRoute;
