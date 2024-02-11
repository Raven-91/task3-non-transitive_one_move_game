import crypto from "crypto";
const {
    randomBytes,
} = await import('node:crypto');
export class Hmac {

    static generateSecretKey() {
        return randomBytes(32).toString('hex');
    }
    static createHmac(computerMove, secretKey) {
        if (!computerMove) {
            throw Error("Cannot create HMAC because it is not a computer move");
        }
        const hmacKey = crypto.createHmac('sha256', secretKey)
            .update(computerMove)
            .digest('hex');
        return hmacKey;
    }
}

