import {Router} from 'express'

import * as productsCtrl from '../controllers/products.controller'
import {authJwt} from '../middleware'

const router = Router()

router.get('/', productsCtrl.getProducts)
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)
router.get('/:productId', productsCtrl.getProductById)
router.put('/:producId',  [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById)
router.delete('/:productId',  [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)

export default router