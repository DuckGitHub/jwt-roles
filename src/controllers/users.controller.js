import User from '../models/User'

export const createUser = async (req, res) => {
    const {firstName, lastName, age, imageURL } = req.body;
    const newUser = new User({firstName, lastName, age, imageURL})

    const userSave = await newUser.save()

    res.status(201).json(userSave)
}

export const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
}

export const updateUserById = async(req, res) => {
    const updatdUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
    res.status(200).json(updatdUser)
}

export const deleteUserById = async(req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json()
}