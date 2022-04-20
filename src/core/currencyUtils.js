module.exports.prettyMoney = amount => {
    return (amount < 0 ? '-' : '') + "$"+Math.abs(amount).toLocaleString();
}
