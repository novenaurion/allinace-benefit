const multer = require('multer');
const photoPath = require('os').homedir + "/Alliance/wedding benefit attachment/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(photoPath);
        cb(null, photoPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var upload = multer({ storage: storage })

module.exports = upload;