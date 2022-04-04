const mySql = require('mysql')

// Connection port
const pool = mySql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

// View users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!
        console.log('Successfully connected as ID ' + connection.threadId);

        // User connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err); // problem occured!
            }

        });
    });
};

// Search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!

        let search_term = req.body.search;
        
        // User connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? AND status = "active" OR last_name LIKE ? AND status = "active"', ['%' + search_term + '%', '%' + search_term + '%'], (err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err); // problem occured!
            }

        });
    });
}