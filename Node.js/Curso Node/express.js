    const express = require("express")
    const UserModel = require("./src/models/user.model")

    const app = express();
    app.use(express.json());

    app.set('view engine', 'ejs')
    app.set('views', 'src/views')

    // app.use((req, res, next) => {
    //     console.log(req.body)
    //     console.log(`Request type: ${req.method}`)
    //     console.log(`Content type: ${req.headers["content-type"]}`)
    //     console.log(`Date: ${new Date()}`)

    //     next();
    // })

    app.get("/views/users", async(req, res) => {
        const users = await UserModel.find({})
        res.render('index', {users})
    })

    // Para exibir utilizamos o find
    app.get("/users", async (req, res) => {
        try {
            const users = await UserModel.find({})
            res.status(200).json(users) 
        } catch (error) {
            return res.status(500).send(error.message);
        }
    });

    // Exibindo usuário por ID: findById
    app.get("/users/:id", async (req, res) => {
        try {   
            const id = req.params.id;
            const user = await UserModel.findById(id)

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    // Criando usuário: create
    app.post("/users", async (req, res) => {
        try {
            const user = await UserModel.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    // Atualizando dados do usuário: findByIdAndUpdate
    app.patch("/users/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const users = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

            return res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    app.delete("/users/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const users = await UserModel.findByIdAndDelete(id, req.body, {new: true});

            return res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    const port = 8080;
    app.listen(port, () => console.log(`Rodando com Express na porta ${port}`))