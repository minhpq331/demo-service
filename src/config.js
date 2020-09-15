if (!process.env.PORT) {
    console.log('Missing environment PORT');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    console.log('Missing environment MONGODB_URI');
    process.exit(1);
}

module.exports = {
    PORT: parseInt(process.env.PORT, 10),
    MONGODB_URI: process.env.MONGODB_URI,
};
