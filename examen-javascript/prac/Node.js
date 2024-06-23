const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', sexo: 'Masculino' },
  { id: 2, nombre: 'María', apellido: 'González', sexo: 'Femenino' },
  { id: 3, nombre: 'Carlos', apellido: 'Martínez', sexo: 'Masculino' },
  { id: 4, nombre: 'Laura', apellido: 'Rodríguez', sexo: 'Femenino' },
  { id: 5, nombre: 'Ana', apellido: 'López', sexo: 'Femenino' },
];


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.post('/api/users', (req, res) => {
  const { nombre, apellido, sexo } = req.body;
  const newUser = {
    id: users.length + 1,
    nombre,
    apellido,
    sexo,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

