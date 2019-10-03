const speakeasy = require('speakeasy');
const { NTPClient } = require('ntpclient');

function sleep(s) {
    return new Promise(resolve => setTimeout(() => resolve(), s * 1000));
}

const ntp = new NTPClient();

module.exports = async function generateTOTP(args) {
    const threshold = args.threshold || 5;
    if (threshold >= 20) {
        throw new Error('Invalid threshold.');
    }
    const date = await ntp.getNetworkTime();
    let dateObj = new Date(date);
    const seconds = dateObj.getSeconds();
    if (seconds >= 30 - threshold && seconds <= 30) {
        await sleep(31 - seconds);
        const date = await ntp.getNetworkTime();
        dateObj = new Date(date);
    }
    if (seconds >= 60 - threshold && seconds <= 60) {
        await sleep(61 - seconds);
        const date = await ntp.getNetworkTime();
        dateObj = new Date(date);
    }
    return speakeasy.totp({
        secret: args.secret,
        encoding: args.encoding || 'base32',
        time: dateObj.getTime() / 1000
    });
};
