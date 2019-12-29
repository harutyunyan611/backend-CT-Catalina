/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const Product = require("../models/Product");

module.exports = {
  list: async function (req, res) {
    const products = await Product.find({
      sort: 'createdAt ASC'
    });
    res.end(JSON.stringify(products));
  },
  create: async function (req, res){
    await Product.create({
      code: req.body.code,
      price: req.body.price,
      quantity: req.body.quantity,
      picture: req.body.picture
    });
    res.status(201).end([]);
  },
  sell: async function (req, res){
    console.log(req.params);
    const product = await Product.find({
      code: req.params.code
    });
    const { quantity } = product[0];
    console.log(quantity);
    await Product.updateOne({ code:req.params.code })
      .set({
        quantity: quantity - req.body.quantity
      });
    res.status(204).end([]);
  }
};

