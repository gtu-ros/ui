import jsQR from 'jsqr';
import jpeg from 'jpeg-js';
import { pipeWhileNotNil } from '../../utils';
import * as R from 'ramda';

export const compressedToUrl = (compressed) =>
  'data:image/jpeg;base64,' + compressed;

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const decodeJpegBlob = async (blob) => {
  return await new Promise((resolve, reject) => {
    const myReader = new FileReader();
    myReader.readAsArrayBuffer(blob);
    myReader.addEventListener('loadend', () => {
      const buffer = myReader.result;
      const img = jpeg.decode(buffer, {
        useTArray: true,
        formatAsRGBA: true
      });
      resolve(img);
    });
  });
};

const readQR = (img) =>
  jsQR(new Uint8ClampedArray(img.data), img.width, img.height);

export const readQRData = R.pipe(readQR, R.prop('data'));

export const decodeB64 = R.pipe(b64toBlob, decodeJpegBlob);

//   R.pipe(
//     b64toBlob,
//     decodeJpegBlob,
//     (decoder) => decoder.then(readQRData)
//   )(b64);

//   decodeJpegBlob(blob).then((img) => f(img));

//   decodeJpegBlob(blob).then((img) => {
//     const code = readQR(img);
//     console.log(code);
//   });

// const base64ImageToBlob = (str) => {
//   var pos = str.indexOf(';base64,');
//   var type = str.substring(5, pos);
//   var b64 = str.substr(pos + 8); // decode base64
//   var imageContent = atob(b64); // create an ArrayBuffer and a view (as unsigned 8-bit)
//   var buffer = new ArrayBuffer(imageContent.length);
//   var view = new Uint8Array(buffer); // fill the view, using the decoded base64
//   for (var n = 0; n < imageContent.length; n++) {
//     view[n] = imageContent.charCodeAt(n);
//   } // convert ArrayBuffer to Blob
//   var blob = new Blob([buffer], { type: type });
//   return blob;
// };

// const getQRCode = (imageBase64) => {
//   var imageBlob = base64ImageToBlob(imageBase64);

//   const html5QrCode = new Html5Qrcode('reader');
//   const imageFile = imageBlob;

//   html5QrCode
//     .scanFile(imageFile, false)
//     .then((qrCodeMessage) => {
//       console.log(qrCodeMessage);
//     })
//     .catch((err) => {
//       console.log(`Error scanning file. Reason: ${err}`);
//     });
// };
