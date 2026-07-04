// services/storage.service.js
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, filename) {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
        throw new Error('A valid file buffer is required for upload.');
    }

    try {
        const file = await toFile(fileBuffer, filename)
        
        const response = await imageKit.files.upload({
            file,
            fileName: filename,
            folder: "cohort-ai-social"

        });
        return response;
    } catch (err) {
        console.error('ImageKit upload failed:', err?.message || err);
        throw new Error(`ImageKit upload failed: ${err?.message || 'Unknown error'}`);
    }
}

module.exports = { uploadFile };