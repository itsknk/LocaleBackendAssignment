const successMesg = { status: 'success' };
const errorMesg = { status: 'error' };
const status = {
    success: 200,
    error: 500,
    bad: 400,
    notfound: 404,
    nocontent: 204,
    created: 201,
    conflict: 409
};
module.exports = {successMesg, errorMesg, status};