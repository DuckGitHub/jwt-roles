import {Router} from 'express'

import * as usersCtrl from '../controllers/users.controller'
import { authJwt, verifySingup } from '../middleware'

const router = Router()

router.post('/',[authJwt.verifyToken, authJwt.isAdmin, verifySingup.checkRolesExisted, verifySingup.checkExistUserOrEmail], usersCtrl.createUser)
router.get('/',usersCtrl.getUsers)
router.get('/:userId',usersCtrl.getUserById)
router.put('/:userId',usersCtrl.updateUserById)
router.delete('/:userId',usersCtrl.deleteUserById)

export default router