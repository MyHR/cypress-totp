const speakeasy = require('speakeasy');

function sleep(s) {
    return new Promise(resolve => setTimeout(() => resolve(), s * 1000));
}

module.exports = async function generateTOTP(args) {
    const threshold = args.threshold || 5;
    const seconds = new Date().getSeconds();
    if (seconds >= 30 - threshold && seconds <= 30) {
        await sleep(31 - seconds);
    }
    if (seconds >= 60 - threshold && seconds <= 60) {
        await sleep(61 - seconds);
    }
    return speakeasy.totp({
        secret: args.secret,
        encoding: args.encoding || 'base32'
    });
};
