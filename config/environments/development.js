const config = {
    Port: 5500,
    ApiBaseUrl: "http://localhost:" + this.Port + "/api/v1/",
    JwtSecretKey: "kanlsdknal",
    JwtExpiresToken: 3600, // seconds
    MysqlConfig: {
        Db: "delilah_resto_DC",
        User: "delilahDC",
        Password: "12345678",
        Host: "localhost",
        Dialect: "mysql",
    },
};

module.exports = { config };