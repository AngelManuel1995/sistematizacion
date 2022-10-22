import { DatabaseConnectionError, errorHandler, BadRequestError } from '@angelgoezg/common';
import  express, {Response, Request}  from 'express'
import { MongooseConnection } from './db/mongoose';
import 'express-async-errors'

import { User } from './models/user'

const app = express()

app.get('/api/signup', async (req: Request, res:Response) => {
    try {
        const user = new User(        {
            name: "Angel Manuel Góez Giraldo",
            pwd: "12345",
            username: "amgoezg",
            email: "amgoez@gmai.com",
            userType: "ADMIN"
        })
        await user.save()
        res.status(201).send({user})
    } catch (error:any) {
      throw new BadRequestError(error.message)  
    }
})

app.get('/api/signup/:document', (req: Request, res:Response) => {
    const document = req.params.document
    const database:any = {
        "123": "Yordan", 
        "234": "Leisy"
    }
    res.send(`<h1>Hola mundo, ${database[document]}</h1>`)
})


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
