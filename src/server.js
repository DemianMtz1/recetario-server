const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');
const measuresRouter = require('./routers/measure');
const recipesRouter = require('./routers/recipes');

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/categories', categoriesRouter);
app.use('/measures', measuresRouter);
app.use('/recipes', recipesRouter);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'default root',
        data: null
    })
})

module.exports = app;