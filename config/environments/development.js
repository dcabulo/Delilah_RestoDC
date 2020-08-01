const config = {
    Port: 5500,
    ApiBaseUrl: "/api/v1/dalilah/",
    JwtSecretKey: "fPqGcA^GDBk4-3*H#kEjc4kwY#n#W3@mDJ^QjQtK",
    JwtExpiresToken: 3600,
    MysqlConfig: {
        Db: "delilah_resto_dc",
        User: "delilahDC",
        Password: "12345678",
        Host: "localhost",
        Dialect: "mysql",
    },
};

module.exports = { config };