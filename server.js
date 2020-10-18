const express = require('express');
const app = express();
const chalk = require('chalk')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())

const auth = {
    login: "trigognight@gmail.com",
    password: "password"
}

app.post('/login', ((req, res) => {
    console.log("Request body: ", req.body)
    const {email, password} = req.body;
    if (email === auth.login && password === auth.password) {
        res.status(500)
        console.log("Всё верно!!!")
        res.send({
            data: "FAILED AUTH"
        })
    }
}))

// app.get(`/error?status=500`, ((req, res) => {
//     console.log('500')
// }))





app.listen(9000, () => {
    console.log(chalk.white("Сервер для production версии запущен на: ") + chalk.blue("http://localhost:9000"))
});