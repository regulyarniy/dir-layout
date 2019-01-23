const del = require(`del`);
const {TARGET} = require(`./config`);

const clean = () => del(`${TARGET.root}`);

module.exports = clean;
