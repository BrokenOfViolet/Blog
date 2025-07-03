import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async(req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({message: 'Username or password is NaN'})
        }

        const user = await User.findOne({username})
        if (!user) {
            return res.status(401).json({message: 'Username or password is incorrect'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({message: 'Username or password is incorrect'})
        }

        const token = jwt.sign(
            {userId: user._id, username: user.username},
            process.env.JWT_SECRET || 'key',
            {expiresIn: '7d'}   // token 有效期 7 day
        )
        const newUser = new User({
            username, password
        })

        const savedUser = new newUser.save()
        res.status(200).json({
            message: 'Login success',
            token,
            user: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
            }
        })
    } catch(err) {
        console.log('[ERROR] Can not login')
        res.status(500).json({message: 'Server Error'})
    }
}

export const register = async(req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({message: 'Username or password is NaN'})
        }

        const existingUser = await User.findOne({username})
        if (existingUser) {
            res.status(409).json({message: 'User is already exist'})
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds) // 哈希结果里包含了saltRounds, 所以比较时不需要手动传

        const newUser = new User({
            username,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(201).json({message: 'Register success', userId: savedUser._id})
    } catch(err) {
        console.error('[ERROR] Register fail', err)
        res.status(500).json({message: 'Server Error'})
    }
}