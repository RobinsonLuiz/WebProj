import JogoDAO from "../dao/JogoDAO";

class JogoController {
  public _jogoController: JogoDAO;

  constructor() {
    this._jogoController = new JogoDAO();
  }

  create(req, res, id: number, name: string) {
    this._jogoController
      .create(id, name)
      .then(created => {
        res.status(200).json(created);
      })
      .catch(error => {
        res.status(400).json(JSON.stringify(error));
      });
  }
}

export default new JogoController();
