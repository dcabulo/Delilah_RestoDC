const queryUsers = {
    login: "SELECT id,username,password,rol,name FROM users WHERE username = :username OR email = :username",
    listUsers: "SELECT name FROM users",
    createUsers: `INSERT INTO users(name,username,password,email,phone,address,rol)
    VALUES (:name,:username,:password,:email,:phone,:address,:rol)`
}

module.exports = { queryUsers }




