const express = require("express");
const apiRouter = express.Router();

const {
    getAllProducts,
    createProduct,
    updateProducts,
    getProductById,
    getAllProductsFavorite,
    getProductByUserId
} = require('../db');
const { requireUser } = require("./utils");

apiRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products)
    } catch (error) {
        next(error)
    }
})

apiRouter.get('/all', requireUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const products = await getAllProductsFavorite(userId);
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


apiRouter.post("/createProduct", async (req, res, next) => {
    const { title, description, price, quantity, category, type, images, dimensions, features } = req.body;
    try {
        const newProduct = await createProduct({
            title,
            description,
            price,
            quantity,
            category,
            type,
            images,
            dimensions,
            features,
        });
        res.send(newProduct);
    } catch (error) {
        next(error);
    }
});

apiRouter.get("/:productId", async (req, res, next) => {
    const id = req.params.productId;
    try {
        const product = await getProductById(id);
        res.send(product);
    } catch (error) {
        next(error);
    }
});
apiRouter.get("/details/:productId", requireUser, async (req, res, next) => {
    const id = req.params.productId;
    const userId = req.user.id;

    try {
        const product = await getProductByUserId(userId, id);
        res.send(product);
    } catch (error) {
        next(error);
    }
});

apiRouter.patch("/:productId", async (req, res, next) => {
    const id = req.params.productId;
    const { title, description, price, quantity, category, type, images, dimensions, features } = req.body;
    const updatedFields = { id: id };

    if (title) {
        updatedFields.title = title;
    }
    if (description) {
        updatedFields.description = description;
    }
    if (price) {
        updatedFields.price = price;
    }
    if (quantity) {
        updatedFields.quantity = quantity;
    }
    if (category) {
        updatedFields.category = category;
    }
    if (type) {
        updatedFields.type = type;
    }
    if (images) {
        updatedFields.images = images;
    }
    if (dimensions) {
        updatedFields.dimensions = dimensions;
    }
    if (features) {
        updatedFields.features = features;
    }
    try {
        const updatedProducts = await updateProducts(updatedFields);
        res.send(updatedProducts);
    } catch (error) {
        next(error);
    }
});

apiRouter.delete("/:productId", async (req, res, next) => {
    const id = req.params.productId;
    console.log(id);
    try {
        const destroy = await deleteProduct(id);
        res.send(destroy);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter; 
