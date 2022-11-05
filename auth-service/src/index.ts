import { DatabaseConnectionError, errorHandler, BadRequestError } from '@angelgoezg/common';
import  express, {Response, Request}  from 'express'
import { MongooseConnection } from './db/mongoose';
import 'express-async-errors'

import { User } from './models/user'
import { productRouter } from './routes/product-routes';

const app = express()

app.use(express.json())

app.post('/api/signup', async (req: Request, res:Response) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({user})
    } catch (error:any) {
      throw new BadRequestError(error.message)  
    }
})

app.post('/api/signin', async (req: Request, res:Response) => {
    const { email, pwd } = req.body
    try {
      const user = await User.findUserByCredentials(email, pwd)
      const token = await user.generateAuthToken()
      res.send({token})
    } catch (error:any) {
      throw new BadRequestError(error.message)  
    }
})

app.post('/api/signup/:document', (req: Request, res:Response) => {
    const document = req.params.document
    const database:any = {
        "123": "Yordan", 
        "234": "Leisy"
    }
    res.send(`<h1>Hola mundo, ${database[document]}</h1>`)
})

app.use('/products', productRouter)

app.use(errorHandler);

app.listen(8080, async () => {
    try {
        const connection = await MongooseConnection.connect()
        console.log(connection)
        console.log("auth-service is up and running on port 8080")
    } catch (error) {
        throw new DatabaseConnectionError()
    }
    
})
