import jwt from "jsonwebtoken"

export async function generateToken(user, res) {
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60  * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true
    })
    return token
}