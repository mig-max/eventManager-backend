
const isOwner = (req, res, next) => {
    const userId = req.params._id; 
    if (req.user && req.user._id === userId) {

        next();
    } else {
      
        res.status(403).json({ message: "Unauthorized access" });
    }
};

module.exports = { isOwner };
