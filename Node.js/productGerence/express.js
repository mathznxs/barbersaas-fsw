const express = require("express")
const ProductModel = require("./src/models/product.model")
const UserModel = require("./src/models/user.model")

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Página Incial
app.get("/", async(req, res) => {
    const products = await ProductModel.find({})
    const users = await UserModel.find({})
    res.render("index", {products})
})

app.get("/products/new", async(req, res) => {
    const products = await ProductModel.find({})
    res.render("create-product", {products})
})

app.post("/products/new", async(req, res) => {
    try {
        const products = await ProductModel.create(req.body);
        res.redirect("/")
        res.status(201).json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/products/:id/edit", async(req, res) => {
    const products = await ProductModel.findById(req.params.id);
    res.render("edit-product", {products});
})
app.post("/products/:id/edit", async(req, res) => {
    try {
            await ProductModel.findByIdAndUpdate(req.params.id, req.body)
            res.redirect("/")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/products/:id/delete", async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.redirect("/");

    } catch (error) {
        res.status(500).send(error.message);
    }
});
// Postman
app.get("/postman/products", async(req, res) => {
    try {
        const product = await ProductModel.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.post("/postman/products", async(req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.patch("/postman/products/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const products = await ProductModel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.delete("/postman/products/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const products = await ProductModel.findByIdAndDelete(id, req.body, {new: true});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

const port = 8000;
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));