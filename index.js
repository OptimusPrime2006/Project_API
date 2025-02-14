const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let items = [
    {
        "id": 1,
        "name": "name",
        "opis": "opis"
    }
];
let idCounter = 1;

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = {
        id: idCounter++,
        name: req.body.name,
        description: req.body.opis
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.patch('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    Object.assign(item, req.body);
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items.splice(index, 1);
    res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
