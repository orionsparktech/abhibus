const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
const multer = require("multer");
const dotenv = require("dotenv")

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const verifyToken = require('../utils/Verify');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer config — store file in memory as Buffer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'), false);
    }
    cb(null, true);
  },
});


router.post('/login', UserController.login);
router.post('/verify', UserController.verify);
router.get('/', verifyToken, UserController.getUser);
router.put('/', upload.single('image'), UserController.updateUser);

module.exports = router;
