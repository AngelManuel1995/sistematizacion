import { Schema, model, Types } from 'mongoose'

const ProdutcSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    required: true,
    default: 0,
    type: Number,
    min: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
})

const Produtc = model("Product", ProdutcSchema)

export default Produtc