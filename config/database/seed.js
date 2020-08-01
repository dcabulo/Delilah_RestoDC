const { MysqlConfig } = require("../environments/development").config;
const queryDb = require("../database/queries/createDb");
const { Sequelize } = require("sequelize");

const mySqlSequelize = new Sequelize(
    MysqlConfig.Db,
    MysqlConfig.User,
    MysqlConfig.Password, {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
    port:3306,
}
)

const checkDb = async () => {
    try {
        return await mySqlSequelize.query(queryDb.queryCheckDb(),
            {
                type: mySqlSequelize.QueryTypes.SELECT,
            })
    } catch (err) {
        console.log(err);
        return err
    }
}

const setDb = async () => {
    try {
        return await mySqlSequelize.query(queryDb.querySetDb(),
 
        )
    } catch (err) {
        return console.log(err);
    }
}

const createUserTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateUserTable(),
        {
            type:mySqlSequelize.QueryTypes.RAW,
        }
        )
    } catch (err) {
        console.log(err);
    }
}

const createProductTable = async () => {
    try {
        return await mySqlSequelize.query(queryDb.queryCreateProductTable(),
        {
            type:mySqlSequelize.QueryTypes.RAW,
        }
        )
    } catch (err) {
        console.log(err);
    }
}

const createOrderTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateOrdersTable(),
        {
            type:mySqlSequelize.QueryTypes.RAW,
        }
        )
    } catch (err) {
        console.log(err);
    }
}

const createProductByOrderTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateProductByOrder(),
        {
            type:mySqlSequelize.QueryTypes.RAW,
        }
        )
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyOrders = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('orders', 'FK_ORDER_USER', 'id_user', 'users(id)'),
            {
                type: mySqlSequelize.QueryTypes.FOREIGNKEYS,
            }
        )
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyProducstByOrders = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('products_by_orders', 'FK_PRODUCTBY_ORDER', 'id_order', 'orders(id)'),
            {
                type: mySqlSequelize.QueryTypes.FOREIGNKEYS,
            }
        )
    } catch (err) {
        console.log(err);
    }
}

const addForeingKeyProducstByProducts = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryForeignKey('products_by_orders', 'FK_PRODUCTBY_PRODUCTS', 'id_product', 'products(id)'),
            {
                type: mySqlSequelize.QueryTypes.FOREIGNKEYS,
            }
        )
    } catch (err) {
        console.log(err);
    }
}

const dummyThings1 = async () => {
    try {
        await mySqlSequelize.query(
            `INSERT INTO users (name,username,password,email,phone,address,rol)
            VALUES
            ('diego cabulo','dcabulo','1234','empanadas@gmail.com','3210987691','calle falsa 123','admin'),
            ('gerardo perez','gcabulo','5678','mildepan@gmail.com','3210981234','carrera con calle','cliente');`,
            {
                type: mySqlSequelize.QueryTypes.INSERT,
            }
        )
        console.log("added data to database");
    } catch (err) {
        console.log(err);
    }
}


const dummyThings2 = async () => {
    try {
        await mySqlSequelize.query(
            `INSERT INTO products (name,img_url,description,price)
            VALUES 
            ('chicharron','http://elmejorchicharron','chicharron carnudo','20000'),
            ('tipico','http://elmejortipico','tipico paisa','25000')`,
            {
                type: mySqlSequelize.QueryTypes.INSERT,
            }
        )
        console.log("added data to database");
    } catch (err) {
        console.log(err);
    }
}


async function iniciarDb () {
    try {
        let check = await checkDb()
        if (check && checkDb.length > 0) {
            console.log("Database Already exists");
            return
        }
        await setDb()
        await createUserTable()
        await createProductTable()
        await createOrderTable()
        await createProductByOrderTable()
        await addForeingKeyOrders()
        await addForeingKeyProducstByOrders()
        await addForeingKeyProducstByProducts()
        await dummyThings1()
        await dummyThings2()
    } catch (err) {
        console.log(err);

    }
}

iniciarDb();