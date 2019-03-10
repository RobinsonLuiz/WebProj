import { Usuario } from "../models/Usuario";
import * as uuidv1 from "uuid";
import UsuarioController from "../controllers/UsuarioController";
import { Request, Response } from 'express';

class UsuarioRoute {

  constructor() {
  }

  /**
   * Rota de registro de um usuário
   * @param req - Request
   * @param res - Response
   */
  register(req: Request, res: Response) {
    let user = req.body as Usuario;
    let uuid = uuidv1().split("-");
    user.senha = uuid[0];
    user.ativado = 0;
    user.token = uuid[0];
    UsuarioController.create(req, res, user);
  }

  /**
   * Verificação da sessão do usuário
   * @param req - Request
   * @param res - Response
   */
  session(req: Request, res: Response) {
    let user = JSON.parse(req.params.user);
    req['session'].administrador = user;
    res.redirect("/");
  }

  /**
   * Login do usuário
   * @param req - Request
   * @param res - Response
   */
  login(req: Request, res: Response) {
    let user = req.body as Usuario;
    UsuarioController.login(req, res, user);
  }

  /**
   * Confirma registro do usuário
   * @param req - Request
   * @param res - Response
   */
  confirmarRegistro(req: Request, res: Response) {
    let user = req.body as Usuario;
    UsuarioController.confirmarRegistro(req, res, user);
  }

  /**
   * Pagina de confirmação de senha
   * @param req - Request
   * @param res - Response
   */
  pageConfirmar(req: Request, res: Response) {
    const { uuid } = req.params;
    UsuarioController.pageRegistro(req, res, uuid);
  }

  /**
   * Rotas
   * @param app - express encapsulado
   */
  public routes(app: any) {
    app.route("/verifica").post(this.register);
    app.route("/login").post(this.login);
    app.route("/administrador/session/:user").get(this.session);
    app.route("/administrador/confirmar/:uuid").get(this.pageConfirmar);
    app.route("/administrador/ativar").post(this.confirmarRegistro);
  }
}

export default new UsuarioRoute();
