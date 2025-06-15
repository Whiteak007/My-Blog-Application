
import jwt from 'jsonwebtoken'
import { handleError } from '../helpers/handleError.js'

export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(handleError(403, 'Unauthorized - No token provided'))
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        
        if (decodeToken.role !== 'admin') {
            return next(handleError(403, 'Unauthorized - Admin access required'))
        }
        
        req.user = decodeToken
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(handleError(403, 'Invalid token'))
        }
        if (error.name === 'TokenExpiredError') {
            return next(handleError(403, 'Token expired'))
        }
        next(handleError(500, error.message))
    }
}