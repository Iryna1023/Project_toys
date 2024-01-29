const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

app.options('*', cors());

app.post('/update-products', (req, res) => {
    const newProduct = req.body;

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const products = JSON.parse(data);

        if (!products[newProduct.category]) {
            products[newProduct.category] = {};
        }

        products[newProduct.category][newProduct.number] = newProduct;

        fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Product updated successfully');
        });
    });
});

app.delete('/delete-product', (req, res) => {
    const { category, number } = req.body;

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const products = JSON.parse(data);

        if (products[category] && products[category][number]) {
            delete products[category][number];

            fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.status(200).send('Product deleted successfully');
            });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;
