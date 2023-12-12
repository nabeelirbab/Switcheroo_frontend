import { useState } from 'react';
import { S3 } from 'aws-sdk';
import { Image } from 'react-native-compressor';

const getFileExtension = (uri) => {
  const match = /\.([a-zA-Z]+)$/.exec(uri);
  if (match !== null) {
    return match[1];
  }
  return '';
};

const getMimeType = (extension) => {
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return `image/${extension}`;
  }
};

const s3 = new S3({
  accessKeyId: 'AKIA6EM2LZWU3ULXZ32E',
  secretAccessKey: 'skgJAOA7bXo6aWe74nuP1UZuCbyO4UVB7t4zMei9',
  region: 'EUNorth1'  // for example, 'us-west-1'
});

const uploadToS3 = async (info) => {

  const result = await Image.compress(info.path);


  console.log('resultresult', result, info.path);
  const extension = getFileExtension(result);
  const mimeType = getMimeType(extension);

  const response = await fetch(result);
  const blob = await response.blob();

  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const uniqueKey = `photo_${timestamp}.${extension}`;

  const file = {
    Body: blob,
    Bucket: 'switcheroofiles',
    Key: uniqueKey,
    ContentType: mimeType
  };

  const upload = s3.upload(file);

  return new Promise((resolve, reject) => {
    upload.on('httpUploadProgress', (progress) => {
      const percentUploaded = Math.round((progress.loaded / progress.total) * 100);


    });

    upload.promise()
      .then(result => {
        resolve(result.Location);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default uploadToS3;
