import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verifySingup} from '../middleware'

router.post('/sigUp', verifySingup.checkExistUserOrEmail, authCtrl.signUp)
router.post('/sigin', authCtrl.signIn)

export default router