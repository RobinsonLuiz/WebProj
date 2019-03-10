import Helpers from "../helpers/Helpers";
import JogoController from '../controllers/JogoController';

class GameRoute {

  constructor(app) {
    this.routes(app);
  }

  /**
   * Função que cria um novo joga para determinado usuario
   * @param req - Request
   * @param res - Response
   */
  cria(req: any, res: any) {
    JogoController
      .create(req, res, req.session.administrador.id, req.body["name"]);
  }
  
  /**
   * Invoca as rotas do game
   * @param app - Express encapsulado
   */
  private routes(app: any) {
    app.route("/games/create").post(this.cria);
  }
  
}

export default GameRoute;
