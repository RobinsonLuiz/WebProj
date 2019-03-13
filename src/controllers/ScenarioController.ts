import ScenarioDAO from "../dao/ScenarioDAO";
import { Usuario } from "../models/Usuario";

class ScenarioController {
  public _scenarioDAO: ScenarioDAO;

  constructor() {
    this._scenarioDAO = new ScenarioDAO();
  }

  busca(req, res, id: number) {
    this._scenarioDAO
      .busca(id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).json(JSON.stringify(error));
      });
  }

  buscaDados(req, res, usuario: any) {
    this._scenarioDAO
      .buscaDados(usuario)
      .then(result => {
        res.status(200).render("painel", {
          scenarios: result["scenarios"],
          games: result["games"],
          administrador: req.session.administrador
        });
      })
      .catch(error => {
        res.status(400).json(JSON.stringify(error));
      });
  }

  atualiza(req, res, id: number, scene: string) {
    this._scenarioDAO
      .atualiza(id, scene)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).json(JSON.stringify(error));
      });
  }

  create(req, res, id: number, name: string) {
    this._scenarioDAO
      .create(id, name)
      .then(created => {
        res.status(200).json(created);
      })
      .catch(error => {
        res.status(400).json(JSON.stringify(error));
      });
  }
}

export default new ScenarioController();
