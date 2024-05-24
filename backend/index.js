import express from 'express'
import cors from 'cors'
import { finalChain } from './chatbot.js';
import { config } from 'dotenv'

config();


const app = express();

app.use(cors({origin: '*'}))
app.use(express.json({limit: "5mb", extended: true}))
app.use(express.urlencoded({limit: "5mb", extended: true}))


const PORT = process.env.PORT || 5000;

app.post('/', (req, res) => {
    const message = req.body.message

    if (typeof message !== "string") {
        res.status(200).send({message: "Invalid Message"})
    }
    else {
        try {
            finalChain.invoke({question: message}).then((value) => {
                res.status(200).send({message: value})
            });
        } catch (error) {
            res.status(200).send({message: "Some internal error occured. Try again."})
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});