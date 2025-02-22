const express = require("express");
const cors = require("cors");
const axios = require('axios');
const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URI
// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://e-commerce-mern-cr8k.vercel.app/"],
    credentials: true,
}));
app.use(express.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected Locally"))
    .catch(err => console.log(err));

app.post("/addProducts", async (req, res) => {
    try {
        data = req.body
        const newProduct = new Product(data)
        await newProduct.save();
        console.log("Inserted Successfully")
        res.status(201).json({ message: "Product added", product: newProduct });
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({ error: error.message });
    }
})

app.post("/addCategory", async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const newCategory = new Category(data);
        await newCategory.save();
        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding category" });
    }
});

app.get("/getCategories", async (req, res) => {
    try {

        const categories = await Category.find({}, "_id name"); // Fetch only _id and name
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
});


app.get("/getProducts", async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching Products:", error);
        res.status(500).json({ message: "Failed to fetch Products" });
    }
})
app.delete("/deleteProducts", async (req, res) => {
    try {
        const { productId } = req.query;
        const products = await Product.findByIdAndDelete(productId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching Products:", error);
        res.status(500).json({ message: "Failed to fetch Products" });
    }
})


app.get("/getProductByCategory", async (req, res) => {
    try {
        const { categoryType } = req.query;
        const category = await Category.findOne({ name: categoryType });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await Product.find({ category: category._id });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching Products:", error);
        res.status(500).json({ message: "Failed to fetch Products" });
    }
})

app.post("/addtocart", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        // Find product and validate
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart
        let cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            cart = new Cart({
                items: [],
                totalPrice: 0
            });
        }

        // Update or add item
        const existingItemIndex = cart.items.findIndex(
            item => item.productId?._id.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update existing item
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                productId,
                quantity
            });
        }

        // Populate product details for price calculation
        await cart.populate('items.productId');

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            if (item.productId) {
                return total + (item.productId.price * item.quantity);
            }
            return total;
        }, 0);

        // Save cart
        await cart.save();

        // Return response with populated cart
        const populatedCart = await Cart.findById(cart._id).populate('items.productId');

        res.status(201).json({
            message: "Added to cart successfully",
            cart: populatedCart
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            message: "Internal server error while adding to cart",
            error: error.message
        });
    }
});


app.get("/product/:id", async (req, res) => {
    const productID = req.params.id;
    console.log(productID);
    try {
        const product = await Product.findById(productID).populate("category");
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching Product:", error);
        res.status(500).json({ message: "Failed to fetch Product" });
    }
})


app.get("/getCartItems", async (req, res) => {
    try {

        const cart = await Cart.findOne()
            .populate({
                path: 'items.productId',
                select: 'name price image '
            });

        if (!cart) {
            return res.status(200).json({
                items: [],
                totalPrice: 0,
                itemCount: 0
            });
        }

        const formattedCart = {
            items: cart.items.map(item => ({
                id: item._id,
                product: {
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    image: item.productId.image,
                    description: item.productId.description
                },
                quantity: item.quantity,
                subtotal: item.quantity * item.productId.price
            })),
            totalPrice: cart.totalPrice,
            itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
        };

        res.status(200).json(formattedCart);

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({
            message: "Error fetching cart items",
            error: error.message
        });
    }
});

app.delete("/deleteCartItem", async (req, res) => {
    try {

        const { productId } = req.query;
        // console.log(productId.toString())
        // Find the cart
        let cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter(item =>
            item._id.toString() !== productId.toString()
        );

        // Updating the price
        console.log("Index Deleted")
        let newTotal = 0;
        for (let item of cart.items) {
            if (item.productId) {
                newTotal += item.productId.price * item.quantity;
            }
        }
        cart.totalPrice = newTotal;
        console.log(cart);
        await cart.save();

        // Response with populated cart
        const populatedCart = await Cart.findById(cart._id).populate('items.productId');

        res.status(200).json({
            message: "Item removed from cart successfully",
            cart: populatedCart
        });

    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({
            message: "Internal server error while removing from cart",
            error: error.message
        });
    }
});

app.post("/khaltiPayment", async (req, res) => {
    const paymentUrl = process.env.KHALTI_PAYMENT_URL;
    const secret = process.env.KHALTI_SECRET_KEY
    const { amount, orderID } = req.body
    const payload = {
        return_url: process.env.KHALTI_SUCCESS_URL,
        website_url: process.env.WEBSITE_URL,
        amount: amount * 100,
        purchase_order_id: orderID,
        purchase_order_name: "Product Order",
    }
    console.log(payload)
    const khaltiResponse = await axios.post(paymentUrl, payload, {
        headers: {
            Authorization: `Key ${secret}`,
            "Content-Type": "application/json",
        },
    });

    console.log("Khalti Response:", khaltiResponse.data);

    res.status(200).json({
        url: khaltiResponse.data
    });
})

app.delete("/clearCart", async (req, res) => {
    try {
        const result = await Cart.deleteMany({});
        if (result.deletedCount === 0) {
            console.log("Entered here")
            return res.status(200).json({
                success: true,
                message: "No carts found to clear"
            });
        }
    } catch (error) {
        console.error("Clearing cart:", error);
        res.status(500).json({
            message: "Internal server error while clearing from cart",
            error: error.message
        });
    }
})

app.put("/updateProduct", async (req, res) => {
    const productData = req.body
    const { productId } = req.query
    console.log(productData)
    console.log(productId)
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: productData }, // Updates only provided values
            { new: true } // Returns the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(updatedProduct)
        return res.status(200).json({
            success: true,
            message: "Product Updated"
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
})


app.put("/updateCart", async (req, res) => {
    try {
        const data = req.body;
        console.log("Received data:", data);
        for (const item of data) {
            const result = await Cart.updateOne(
                { "items._id": item.id },
                { $set: { "items.$.quantity": item.quantity } }
            );
            console.log("Update Result:", result);
        }
        ///after updating, manually updating total price
        let cart = await Cart.findOne().populate('items.productId');
        let newTotal = 0;
        for (let item of cart.items) {
            if (item.productId) {
                newTotal += item.productId.price * item.quantity;
            }
        }
        cart.totalPrice = newTotal;
        await cart.save();
        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Failed to update cart." });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
