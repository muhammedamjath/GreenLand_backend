
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client , DeleteObjectCommand } = require('@aws-sdk/client-s3')
s3 =new S3Client({
    region: process.env.AWS_REGION, // Optional, if your bucket is in a specific region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});


exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+ '' +file.originalname)
    }
  })
})

exports.deleteImageFromS3=async(bucketName, objectKey)=> {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    await s3.send(deleteCommand);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}




