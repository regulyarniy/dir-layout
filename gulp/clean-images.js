const del = require(`del`);
const {SOURCE} = require(`./config`);

const cleanImages = () => del(`${SOURCE.images}/*.{png,jpg,jpeg,webp,svg}`);

module.exports = cleanImages;
