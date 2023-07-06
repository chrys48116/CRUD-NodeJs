// Importar módulos necessários
const express = require('express');
const bodyParser = require('body-parser');

// Criar aplicação Express
const app = express();

// Configurar o body-parser para lidar com requisições JSON
app.use(bodyParser.json());

// Definir uma classe para representar um objeto no CRUD
class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Criar um array para armazenar os objetos
let items = [];

// Rotas para o CRUD

// Listar todos os objetos
app.get('/items', (req, res) => {
  res.json(items);
});

// Obter um objeto por ID
app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  const item = items.find(item => item.id === id);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Criar um novo objeto
app.post('/items', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  const newItem = new Item(id, name);
  items.push(newItem);

  res.status(201).json(newItem);
});

// Atualizar um objeto existente
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const item = items.find(item => item.id === id);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    item.name = name;
    res.json(item);
  }
});

// Deletar um objeto
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;

  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const deletedItem = items.splice(index, 1)[0];
    res.json(deletedItem);
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
