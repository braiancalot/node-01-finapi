import express from "express";
import { v4 as uuid } from "uuid";

const app = express();

app.use(express.json());
app.listen(3333);

const costumers = [];

app.post("/account", (request, response) => {
    const {cpf, name} = request.body;

    const custumerAlreadyExistis = costumers.some((costumer) => costumer.cpf === cpf);

    if(custumerAlreadyExistis){
        return response.status(400).json({error: "Costumer already exists!"});
    }

    costumers.push({
        cpf,
        name,
        id: uuid(),
        statment: []
    })

    return response.status(201).send();
})

app.get("/statement/:cpf", (request, response) => {
    const { cpf } = request.params;

    const costumer = costumers.find((costumer) => costumer.cpf === cpf);

    response.json(costumer.statment);
})