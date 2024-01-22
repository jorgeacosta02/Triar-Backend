import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/triar')
    .then(() => console.log('Connected to triarDB'))
    .catch((err) => console.log('Error en triarDB'))

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(('TriarDB once open'))
});