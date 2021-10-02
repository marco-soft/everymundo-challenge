module.exports = {
  DB_HOST:
    process.env.NODE_ENV === "dev"
      ? "mongodb+srv://root:jLOQCcttXynZL4tt@everymundochallenge.pdwhu.mongodb.net/everyMundoTest?retryWrites=true&w=majority"
      : process.env.DB_HOST,
};
