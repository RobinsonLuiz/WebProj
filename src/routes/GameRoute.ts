import Helpers from "../helpers/Helpers";
import JogoController from '../controllers/JogoController';

class GameRoute {
  constructor(app) {
    this.routes(app);
  }

  cria(req: any, res: any) {
    JogoController
      .create(req, res, req.session.administrador.id, req.body["name"]);
  }
  
  private routes(app: any) {
    app.route("/games/create").post(this.cria);
  }
}

export default GameRoute;
