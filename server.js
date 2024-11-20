const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const ItemSchema = new mongoose.Schema({ name: String, quantity: Number });
const Item = mongoose.model('Item', ItemSchema);

app.get('/items', async (req, res) => res.json(await Item.find()));
app.post('/items', async (req, res) => res.json(await Item.create(req.body)));
app.put('/items/:id', async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/items/:id', async (req, res) => res.json(await Item.findByIdAndDelete(req.params.id)));

app.listen(3000, () => console.log('Server running on port 3000'));

