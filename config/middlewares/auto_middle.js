const jwt = require("jsonwebtoken")
const { config } = require("../environments/development")

const validateJWt = (req, res, next) => {
    const jwtTokenring = req.headers["authorization"];
    if (!jwtTokenring) {
        return res.status(401).json({ message: "Unable to access please retry" })
    }
    const jwtClientRing = jwtTokenring.split(" ")[1];
    jwt.verify(jwtClientRing, config.JwtSecretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "token expired login again" })
        }
        res.decoded = decoded
        next()
    })
}

const validateAdmin = (req, res, next) => {
    const jwtToken = req.headers["authorization"]
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized sorry for you" })
    }
    const jwtClient = jwtToken.split(" ")[1];
    const decoded = jwt.verify(jwtClient, config.JwtSecretKey)
    if (decoded.user_rol != "admin") {
        return res.status(401).json({ message: "Unauthorized access" })
    } else {
        next()
    }
}

module.exports = {
    validateJWt,
    validateAdmin,
}


