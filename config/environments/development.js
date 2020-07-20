const config = {
    Port: 5500,
    ApiBaseUrl: "http://localhost:" + this.Port + "/api/v1/",
    JwtSecretKey: "fPqGcA^GDBk4-3*H#kEjc4kwY#n#W3@mDJ^QjQtK",
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