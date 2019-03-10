import { Env_Variables } from './config/Env_Variables';
import App from './App';
import "reflect-metadata";

App.express.listen(Env_Variables.PORT, () => console.log(`server rodando na porta ${Env_Variables.PORT}`));