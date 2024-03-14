// authorizationMiddleware.js

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = { authorizeAdmin };
