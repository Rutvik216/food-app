const JWT = require('jsonwebtoken')

module.exports = async (req, resp, next) => {
    // req.user = req.user ;
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        // console.log(token)
        JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {

            if (error) {

                console.log('error : ', error)
                return resp.status(401).send({
                    success: false,
                    message: "unauthorize"
                })
            } else {
                req.userId = decode.id
                //console.log("decode:" ,decode.id)

                next()
            }
        })


    } catch (error) {
        console.log("error in auth", error)
        resp.status(500).send({
            success: false,
            message: "error in AUTH api",
            error
        })
    }
}
