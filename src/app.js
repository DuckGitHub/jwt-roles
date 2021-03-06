import express from 'express';
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles } from './libs/initialSetups'

import productsRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express ()
createRoles()

app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    const { name, description, version } = app.get('pkg')

    res.json({name, description, version })
})


app.use('/api/products',productsRoutes)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

export default app