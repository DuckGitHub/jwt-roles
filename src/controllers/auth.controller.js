import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async(req, res) => {
    const {username, email, password, roles} = req.body

    const newUser = new User({
        username, email, password: User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: 'user'});
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({id: savedUser._id}, config.SECRET, { expiresIn: 86400 })

    res.status(200).json({token})
}

export const signIn = async(req, res) => {
    const userFound = await (await User.findOne({email: req.body.email})).populate("roles");

    if (!userFound) {
        return req.status(400).json({message: 'user not found'})
    }

    const matchPasasword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPasasword) return res.status(401).json({token: null, message: 'invalid password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET, { expiresIn: 86400 })

    res.json({token})
}