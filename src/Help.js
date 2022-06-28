const crypto = require('crypto')
 
class Encrypt{
    //hash 算法有 md5、sha256、sha512
    // md5 加密
    md5(content) {
        let md5 = crypto.createHash('md5')
        return md5.update(content).digest('hex')
    }

    sha256(content){
        let sha256 = crypto.createHash('sha256')
        return sha256.update(content).digest("hex")
    }

    sha512(content){
        let sha512 = crypto.createHash('sha512')
        return sha512.update(content).digest("hex")
    }

    //Hmac算法也是一种哈希算法，它可以利用 MD5 或 SHA256 等哈希算法，不同的是，Hmac 还需要一个密钥（俗称加盐）
    hmac(content, secret){
        let hmac = crypto.createHmac("md5", content).update(secret).digest("hex");
        return hmac
    }


    //对称加密
    // 生成符合规范长度的密钥
    genkey(secret, length = 32) {
        return crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, length);
    }
  
    // 加密字符串
    encryptByAes256(content, secretkey, iv) {
        const cipher = crypto.createCipheriv('aes-256-cbc', genkey(secretkey), genkey(iv, 16));
        let enc = cipher.update(content, 'utf8', 'hex');
        enc += cipher.final('hex');
        return enc;
    }
    
    // 解密字符串
    decryptByAes256(content, secretkey, iv) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', genkey(secretkey), genkey(iv, 16));
        let dec = decipher.update(content, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }


    //获取用户真实ip
    async getClientIP(req){
        return (req.headers['x-forwarded-for'] ||   //判断是否有反向代理
            req.connection.remoteAddress ||  //判断connection的远程ip
            req.socket.remoteAddress ||    //判断后端的 socket 的IP
            req.connection.socket.remoteAddress).replace(/::ffff:/, ''); 
    }
  
}

const encrypt = new Encrypt();
exports.Help = {
    Encrypt: encrypt
}
