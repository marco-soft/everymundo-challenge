module.exports = {
  DB_HOST:
    process.env.NODE_ENV === "dev" ? process.env.DB_HOST : process.env.DB_HOST,
};
