import { dbconfig } from '../config/dbconfig';

export class JogoDAO {

    create(id:number, name: string) {
        return new Promise((resolve, reject) => {
          dbconfig.getConnection((err, connection) => {
                if (!err) {
                  connection.query(
                    "Insert into jogo (nome, id_usuario) VALUES (?,?)",
                    [name, id],
                    (err, created) => {
                      if (!err) {
                        resolve(created);
                        connection.release();
                      } else reject(err);
                    }
                  );
                } else reject(err);
              });
        })
    }
}


export default JogoDAO;