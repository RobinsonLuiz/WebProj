import UsuarioDAO from "../dao/UsuarioDAO";
import { Usuario } from "../models/Usuario";

class UsuarioController {
  public _usuarioDAO: UsuarioDAO;

  constructor() {
    this._usuarioDAO = new UsuarioDAO();
  }

  create(req, res, user: Usuario) {
    this._usuarioDAO
      .create(user)
      .then(insert => {
        res.send(insert);
      })
      .catch(error => {
        res.send(error);
      });
  }

  confirmarRegistro(req, res, user: Usuario) {
    this._usuarioDAO
      .confirmRegister(user)
      .then(updated => {
        res.redirect("/");
      })
      .catch(error => {
        res.render("404");
      });
  }

  pageRegistro(req, res, uuid) {
    console.log(uuid);
    this._usuarioDAO
      .searchRegister(uuid)
      .then(result => {
        res.render("confirmar", { administrador: result });
      })
      .catch(error => {
        res.render("404", { error });
      });
  }

  login(req, res, user: Usuario) {
    this._usuarioDAO
      .login(user)
      .then((results: any) => {
        if (results && results.length > 0) {
          if (results[0].ativado == 1) {
            req.session.administrador = results[0];
            res.send(
              JSON.stringify({
                OK: {
                  id: results[0].id,
                  email: results[0].email,
                  nome: results[0].nome
                }
              })
            );
          } else {
            res.send(JSON.stringify({ OK: "desatived" }));
          }
        }
      })
      .catch(err => res.send(JSON.stringify({ OK: false })));
  }
}

export default new UsuarioController();
