import { dbconfig } from "../config/dbconfig";
import { Usuario } from "../models/Usuario";
import { Env_Variables } from '../config/Env_Variables';

export default class ScenarioDAO {
  constructor() {}

  busca(id: number) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        if (!err) {
          connection.query(
            "SELECT * FROM scenario where id = ?",
            [id],
            (err, scenarios) => {
              if (!err) resolve(scenarios);
              else reject(err);
              connection.release();
            }
          );
        } else reject(err);
      });
    });
  }

  buscaDados(usuario: any) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        if (!err) {
          connection.query(
            `select j.nome as nomeJogo, j.id from jogo j 
            inner join usuario u on j.id_usuario = u.id where u.email = ?`,
            [usuario.email],
            (err, games) => {
              if (!err) {
                connection.query(
                  `select s.nome as sceneJogo, s.scene, s.id, j.id as idJogo from jogo j 
            inner join usuario u on j.id_usuario = u.id 
            left join scenario s on j.id = s.id_jogo where u.email = ?`,
                  [usuario.email],
                  (err, scenarios) => {
                    if (!err) resolve({scenarios: scenarios, games: games });
                    else reject(err);
                    connection.release();
                  }
                );
              } else {
                reject(err);
              }
            }
          );
        } else reject(err);
      });
    });
  }

  atualiza(id: number, scene: string) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        if (!err) {
          connection.query(
            "Update scenario set scene = ? where id = ?",
            [scene, id],
            (err, update) => {
              if (!err) {
                resolve(update);
                connection.release();
              } else reject(err);
            }
          );
        } else reject(err);
      });
    });
  }

  create(id:number, name:string) {
    let json = Env_Variables.JSON;
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        if (!err) {
          connection.query(
            "Insert into scenario (nome, scene, id_jogo) VALUES (?,?,?)",
            [name, json, id],
            (err, created) => {
              if (!err) {
                resolve(created);
                connection.release();
              } else reject(err);
            }
          );
        } else reject(err);
      });
    });
  }
}
