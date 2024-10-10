const checkPermissions = (requiredPermission) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        if (!user.permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission.' });
        }

        next(); 
    };
};


module.exports = {
    checkPermissions,
}