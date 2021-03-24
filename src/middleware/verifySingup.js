import {ROLES} from '../models/Role'
import User from '../models/User'

export const checkRolesExisted = (req,res,next)=>{
    if(req.body.roles) {
        for (i=0;i<req.body.roles.length;i++){
            if (!ROLES.indlues(req.body.roles[i])){
                res.status(400).json({message:`Role ${req.body.roles[i]} does not exist`})
            }
        }
    }

    next()
}

export const checkExistUserOrEmail = async (req,res,next) => {
    const user = await User.findOne({username: req.body.username})
    
    if (user) return res.status(400).json({message: 'User already exist'})
    
    const userEmai = await User.findOne({email: req.body.email})

    if (userEmail) return res.status(400).json({message: 'Email already exist'})

    next()
} 