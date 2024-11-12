const multer = require('multer');

const FILE_TYPES = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/webp':'webp',
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let isValid = FILE_TYPES[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid){
            uploadError = null;
        }

        cb(uploadError, 'public/images');
    },
    filename: function(req, file, cb) {
        const filename = file.originalname.split(' ').join('-');
        const extension = FILE_TYPES[file.mimetype];
        cb(null, `${filename}-${Date.now()}.${extension}`)
    }
})

uploads = multer({storage: storage});

module.exports = uploads;