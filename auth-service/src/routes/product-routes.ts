import { Router, Request, Response } from 'express'
import { BadRequestError } from '@angelgoezg/common';
import Product from '../models/produc'
import Produtc from '../models/produc';
import { auth } from '../middlewares/auth';

const productRouter = Router()

productRouter.post('/', auth, async (req: Request, res: Response) => {
  try {
    const product = new Product({...req.body, createdBy: req.user?._id})
    await product.save()
    res.status(201).send({product})
  } catch (error: any) {
    throw new BadRequestError(error.message)
  }
})

productRouter.get('/', auth, async (req: Request, res: Response) => {
  try {
    const products = await Produtc.find().populate('createdBy', 'name username email')
    res.send({products})
  } catch (error: any) {
    throw new BadRequestError(error.message)
  }
})

export { productRouter }