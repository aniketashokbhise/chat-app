import { message } from "statuses";
import User from "../models/User";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils";


export const signup = async () => {
    const { fullName, email, password, bio } = req.body;
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Message Details" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Message Details" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullName, email, password: hashedPassword, bio })

        const token = generateToken(newUser_id)

        res.json({ success: true, userData: newUser, token, message: "Account created successfully" })

    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

// Controller login

export const login = async (req, res) => {
    try {
        const { email, password, bio } = req.body;
        const userData = await User.findOne({ email })

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = generateToken(userData_id)

        res.json({ success: true, userData: newUser, token, message: "Login successfully" })

    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


