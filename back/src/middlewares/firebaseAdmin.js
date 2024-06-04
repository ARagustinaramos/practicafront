// config/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/computech-log-firebase-adminsdk-o39oe-e1da83234a.json'); // Ajusta la ruta según donde hayas guardado el archivo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

const disableFirebaseUser = async (uid) => {
  await admin.auth().updateUser(uid, { disabled: true });
};

const enableFirebaseUser = async (uid) => {
  await admin.auth().updateUser(uid, { disabled: false });
};

module.exports = { auth, disableFirebaseUser, enableFirebaseUser };
