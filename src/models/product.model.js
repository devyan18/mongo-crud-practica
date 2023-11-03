import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
});

const ProductModel = model("Product", productSchema);

export const aggregateProduct = async () => {
  try {
    await ProductModel.deleteMany({});

    await ProductModel.create({
      name: "iPhone 12",
      price: 1000,
      category: "Phones",
    });

    await ProductModel.create({
      name: "iPhone 13",
      price: 1200,
      category: "Phones",
    });

    await ProductModel.create({
      name: "iPhone 14",
      price: 1500,
      category: "Phones",
    });

    await ProductModel.create({
      name: "Macbook air",
      price: 2000,
      category: "Laptops",
    });

    await ProductModel.create({
      name: "Macbook pro",
      price: 2000,
      category: "Laptops",
    });

    const result = await ProductModel.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$price" },
          avg: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
