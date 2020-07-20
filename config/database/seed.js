const { MysqlConfig } = require("../environments/development").config;
const queryDb = require("../database/queries/createDb");
const { Sequelize } = require("sequelize");

const mySqlSequelize = new Sequelize(
    "",
    MysqlConfig.User,
    MysqlConfig.Password, {
    host: MysqlConfig.Host,
    dialect: MysqlConfig.Dialect,
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
            {
                type: mySqlSequelize.QueryTypes.RAW,
            }
        )
    } catch (err) {
        return console.log(err);
    }
}

const createUserTable = async () => {
    try {
        await mySqlSequelize.query(queryDb.queryCreateUserTable(),
            {
                type: mySqlSequelize.QueryTypes.RAW,
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
                type: mySqlSequelize.QueryTypes.RAW,
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
                type: mySqlSequelize.QueryTypes.RAW,
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
                type: mySqlSequelize.QueryTypes.RAW,
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

const dummyThings = async (req, res, next) => {
    try {
        await mySqlSequelize.query(
            `INSERT INTO users (name,username,password,email,phone,address,rol)
            VALUES('diego cabulo','dcabulo','1234','empanadas@gmail.com','3210987691','calle falsa 123','admin');
            INSERT INTO users(name,username,password,email,phone,address,rol)
            VALUES('gerado perez','gperez','5789','mildepan@gmail.com','311111231','calle esta con carrera esta','cliente');
            
            INSERT INTO porducts (name,img_url,description,price)
            VALUES ('chicharron','http://elmejorchicharron','chicharron carnudo','20000');
            INSERT INTO porducts (name,img_url,description,price)
            VALUES ('tipico','http://elmejortipico','tipico paisa','25000');`,
            {
                type: mySqlSequelize.QueryTypes.INSERT,
            }
        )
    } catch (err) {
        console.log(err);
    }
}

(async function () {
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
        await dummyThings()
    } catch (err) {
        return console.log(err);

    }
})