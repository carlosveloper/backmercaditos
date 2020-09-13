// ====================
// PUERTO
// ====================
process.env.PORT = process.env.PORT || '5000';

// ====================
// ENTORNO
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// BASE DE DATOS
// ====================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost/Mercaditos';
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// 'mongodb://<username>:<password>@mongo.mlab.com:<port>/<database_name>';
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

// ====================
// VENCIMIENTO DEL TOKEN
// ====================
//60 SEGUNDO
//60 MINUTOS
//24 HORAS
//30 DIAS
process.env.CADUCIDAD_TOKEN = '' + (60 * 60 * 24 * 30);

// ====================
// SEED AUTENTICACIÓN
// ====================
process.env.SEED = process.env.SEED || 'seed-desarrollo';

export default process;
