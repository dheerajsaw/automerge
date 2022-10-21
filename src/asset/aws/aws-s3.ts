const AWS = require("aws-sdk")

AWS.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKey: "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",
    region: "ap-south-1"
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const uploadFilesInAWS = async (file: any, assetId: string, orgId: string) => {
    return new Promise(function (resolve, reject) {
        const uploadParams = {
            Bucket: "classroom-training-bucket",//`assets-${orgId}`, // i have to update it later
            Key: `asset/${assetId}`,
            Body: file.buffer
        };
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                // console.log(err);
                return reject({ "Error": err })
            }
            return resolve(data.Location)
        })
    });
};

const getAwsFile = async (assetId: string, orgId: string, fileName: any) => {
    const signedUrl = await s3.getSignedUrl('getObject', {
        Bucket: "classroom-training-bucket",//for later `assets-${orgId}`,
        Key: `asset/${assetId}/${fileName}`, //filename
        Expires: 100 //time to expire in seconds
    });
    return signedUrl;
};


const putAwsFile = async (assetId: string, fileName: any) => {
    const signedPutUrl = s3.getSignedUrl('putObject', {
        Bucket: "classroom-training-bucket",
        Key: `asset/${assetId}/${fileName}`, //filename
        Expires: 100 //time to expire in seconds
    });
    return signedPutUrl
}
module.exports = { uploadFilesInAWS, getAwsFile }