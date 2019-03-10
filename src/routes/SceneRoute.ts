import Helpers from "../helpers/Helpers";
import ScenarioDAO from "../dao/ScenarioDAO";
import { Usuario } from "../models/Usuario";
import ScenarioController from "../controllers/ScenarioController";

class SceneRoute {
  constructor(app) {
    this.routes(app);
  }

  busca(req, res) {
    if (!req.session.administrador) res.render("403");
    const { id } = req.params;
    ScenarioController.busca(req, res, id);
  }

  atualiza(req, res) {
    if (!req.session.administrador) res.render("403");
    const { id } = req.params;
    const scene = req.body["scene"];
    ScenarioController.atualiza(req, res, id, scene);
  }

  cria(req, res) {
    if (!req.session.administrador) res.render("403");
    ScenarioController.create(req, res, req.body["id"], req.body["name"]);
  }

  private routes(app: any) {
    app.route("/scenarios/:id").get(this.busca);
    app.route("/scenarios/:id").put(this.atualiza);
    app.route("/scenarios/create").post(this.cria);
  }
}

export default SceneRoute;
