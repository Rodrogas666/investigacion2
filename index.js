// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulando una base de datos en memoria
let items = [
  { id: 1, name: 'Item 1', description: 'Este es el item 1' },
  { id: 2, name: 'Item 2', description: 'Este es el item 2' },
];

// GET: Obtener todos los items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET: Obtener un item por ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// POST: Crear un nuevo item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    description: req.body.description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Actualizar un item por ID
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item no encontrado');

  item.name = req.body.name;
  item.description = req.body.description;
  res.json(item);
});

// DELETE: Eliminar un item por ID
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item no encontrado');

  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en el puerto http://localhost:${port}`);
});
