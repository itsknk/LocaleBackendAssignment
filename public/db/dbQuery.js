const pool = require('./pool');
module.exports = {
    query(quertText, params){
        return new Promise((resolve, reject) => {
            //console.log(quertText);
            pool.query(quertText, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
};