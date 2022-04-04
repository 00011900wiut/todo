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
// opening a add user page
exports.form = (req, res) => {
    res.render('add_user');
}

// Add new user
exports.create = (req, res) => {
    const {first_name, last_name, email, phone, comments} = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!

        let search_term = req.body.search;
        
        // User connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments],(err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                res.render('add_user', { alert: "User is added successfully."});
            } else {
                console.log(err); // problem occured!
            }

        });
    });
}

// Edit user
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!

        // User connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                res.render('edit_user', { rows })
            } else {
                console.log(err); // problem occured!
            }

        });
    });
}

// Update user
exports.update = (req, res) => {
    const {first_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!

        // User connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if(err) throw err; // problem occured!
            
                    // User connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        // Release it, when done with the connection
                        connection.release();
            
                        if (!err) {
                            res.render('edit_user', { rows, alert: `${first_name} has been updated`});
                        } else {
                            console.log(err); // problem occured!
                        }
            
                    });
                });
            } else {
                console.log(err); // problem occured!
            }

        });
    });
}

// Delete user
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // problem occured!

        // User connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // Release it, when done with the connection
            connection.release();

            if (!err) {
                res.redirect('/');
            } else {
                console.log(err); // problem occured!
            }

        });
    });
}