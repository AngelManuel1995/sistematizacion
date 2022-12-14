import mongoose from 'mongoose'

export class MongooseConnection {
  
  static connect(): Promise<any> {
    const mongoUrI: string = process.env.MONGO_URI || 'mongodb://poli:poli**@127.0.0.1:37017/clase304'
    return new Promise((resolve, reject) => {
      mongoose.connection.openUri(mongoUrI, (err, res) => {
        if(err) reject(err)
        resolve('Database connected')
      })
    })
  }
}