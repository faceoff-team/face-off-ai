const crypto = require('crypto');
const fs = require('fs');

/**
 * @description This function creates an RSA256 public private key pair. It then 
 * puts it into two seperate files. 
 */

function genKeyPair() {
    //Generate a key pair.
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });

    //Write the keys to files.
    fs.writeFileSync(`${__dirname}/keys/id_rsa_pub.pem`, keyPair.publicKey);

    fs.writeFileSync(`${__dirname}/keys/id_rsa_priv.pem`, keyPair.privateKey);
}

genKeyPair();