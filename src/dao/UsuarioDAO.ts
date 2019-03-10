import { dbconfig } from "../config/dbconfig";
import { Usuario } from "../models/Usuario";
import { resolve } from "path";
import { rejects } from "assert";

export default class UsuarioDAO {
  create(user: Usuario) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        connection.query(
          "select * from usuario where email = ?",
          [user.email],
          (err, inserted) => {
            if (!err && inserted.length == 0) {
              connection.query(
                "Insert into usuario (nome, email, telefone, senha, ativado, token) VALUES (?,?,?,md5(?),?,?)",
                [
                  user.nome,
                  user.email,
                  user.telefone,
                  user.senha,
                  user.ativado,
                  user.token
                ],
                (err, created) => {
                  console.log(err);
                  if (!err) {
                    resolve({ register: "OK" });
                    connection.release();
                  } else reject({ register: false });
                }
              );
            } else reject({ register: "cadastrado" });
          }
        );
      });
    });
  }

  login(user: Usuario) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        connection.query(
          "select * from usuario where email = ? and senha = md5(?)",
          [user.email, user.senha],
          (err, inserted) => {
            if (!err && inserted.length > 0) {
              resolve(inserted);
            } else reject(err);
          }
        );
      });
    });
  }

  confirmRegister(user: Usuario) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        connection.query(
          "update usuario set ativado = 1, senha = md5(?), token = '' where id = ?",
          [user.senha, user.id],
          (err, inserted) => {
            if (!err && inserted.changedRows > 0) {
              resolve(inserted);
            } else reject(err);
          }
        );
      });
    });
  }

  searchRegister(uuid) {
    return new Promise((resolve, reject) => {
      dbconfig.getConnection((err, connection) => {
        connection.query(
          "select id, email from usuario where token = ?",
          [uuid],
          (err, uuidExist) => {
            if (!err && uuidExist.length > 0) {
              resolve(uuidExist[0]);
            } else reject(err);
          }
        );
      });
    });
  }
}
