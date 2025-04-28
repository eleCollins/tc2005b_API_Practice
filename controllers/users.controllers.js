import {pool} from "../db/db.js";

export const getUsers = (req, res) => {
    pool.query('SELECT * from users', function (error, results) {
    if (error){
        res.status(500).json({msg : error.message, users : [],});
        return;
    };
    res.status(200).json({msg: "OK", users : results});
  })
};

export const getUser = (req, res) => {
    const id = req.params.id;
    pool.execute('SELECT * from users where user_id = ?', [id], (error, results) => {
        if (error){
            res.status(500).json({msg : error.message, users : [],});
            return;
        };
        res.status(200).json({msg: "OK", users : results});
      }) 
};
export const postUsers = (req, res) => {
    const {name,username,password, age} = req.body;
    // console.log(req.body);
    pool.execute(
        "insert into users (name, username, password, age) values (?,?,?,?)",
        [name, username, password, age],
        (error, results) => {
            if (error){
                res.status(500).json({msg : error.message, users : [],});
                return;
            };
            res.status(200).json({msg: "OK", users : results});
        }

    )
};

export const putUsers = (req, res) => {
    const { name, username, password, age } = req.body;
    pool.execute(
        "UPDATE users SET name=?, username=?, password=?, age=? WHERE user_id=?",
        [name, username, password, age, req.params.id],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error.message, users: [] });
                return;
            }
            res.status(200).json({ msg: "OK", users: results });
        }
    );
};


export const deleteUser = (req, res) => {
    pool.execute(
        "delete from users where user_id = ?",
        [req.params.id],
        (error, results) => {
            if (error){
                res.status(500).json({msg: error, users: []});
                return;
            }
            res.status(200).json({msg: "ok", users: results});
        }
    )
};

export const login = (req, res) => {
    const { username, password } = req.body;
    pool.execute(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error.message, users: [] });
                return;
            }
            if (results.length === 0) {
                res.status(401).json({ isLogin: false, msg: "Usuario no encontrado", users: [] });
                return;
            }
            const user = results[0];
            if (user.password === password) {
                res.status(200).json({ isLogin: true, msg: "ok", users: user });
            } else {
                res.status(401).json({ isLogin: false, msg: "Credenciales inválidas", users: [] });
            }
        }
    );
};