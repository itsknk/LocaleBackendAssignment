const dbQuery = require('../db/dbQuery');
const {successMesg, errorMesg, status} = require('../helpers/status');

//posting new user data
const createUserData = async(req,res) => {
    const{id, user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation
    } = req.body;

    if(user_id == null){
        errorMesg.error = 'User ID Required';
        return res.status(status.bad).send(errorMesg);
    }
    //inserting new user data
    const createUserDataQuery = `INSERT INTO public."xridesData" (id, user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, "Car_Cancellation") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) returning *`; 
    const values = [id, user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation];
    try
    {
        const { rows } = await dbQuery.query(createUserDataQuery, values);
        const dbResponse = rows[0];
        successMesg.data = dbResponse;
        return res.status(status.created).send(successMesg);
    }
    catch (error)
    {
        if(error.routine === '_bt_check_unique')
        {
        errorMesg.error = 'User Data Already Exists';
        return res.status(status.conflict).send(errorMesg);
        }
        errorMesg.error = "Cannot create new User Data";
        return res.status(status.error).send(errorMesg);
    }
};

//get user data
const getUserData = async(req,res) => {
    const id = req.params.id;
    if(id != null)
    {
        //get a specific user data by ID
        const getUserDataByID = 'SELECT * FROM public."xridesData" WHERE id = $1';
        try
        {
            const { rows } = await dbQuery.query(getUserDataByID, [id]);
            const dbResponse = rows;
            if(dbResponse[0] === undefined)
            {
                errorMesg.error = "No user data";
                return res.status(status.bad).send(errorMesg);
            }
            successMesg.data = dbResponse;
            //console.log(dbResponse);
            return res.status(status.success).send(successMesg);
        }
    
        catch(error)
        {
            errorMesg.error  = "An Error Occured";
            return res.status(status.error).send(errorMesg);
        }
    }
    //get the data of all the users 
    const getAllUserData = 'SELECT * FROM public."xridesData" ORDER BY id ASC';
    try
    {
        const { rows } = await dbQuery.query(getAllUserData);
        const dbResponse = rows;
        if(dbResponse[0] === undefined)
        {
            errorMesg.error = "No user data";
            return res.status(status.bad).send(errorMesg);
        }
        successMesg.data = dbResponse;
        //console.log(dbResponse);
        return res.status(status.success).send(successMesg);
        }
    
    catch(error)
    {
        errorMesg.error  = "An Error Occured";
        return res.status(status.error).send(errorMesg);
    }
};

//delete a specific user data
const deleteUserData = async(req, res) => {
    const id = req.params.id;
    const deleteUserByID = 'DELETE FROM public."xridesData" WHERE id=$1 returning *';
    try
    {
        const { rows } = await dbQuery.query(deleteUserByID, [id]);
        const dbResponse = rows[0];
        if(!dbResponse)
        {
            errorMesg.error = "No such user to delete";
            return res.status(status.notfound).send(errorMesg);
        }
        successMesg.data = {};
        successMesg.data.message = "Successfully deleted the user";
        return res.status(status.success).send(successMesg);
    }
    catch(error)
    {
        return res.status(status.error).send(error);
    }
};

//update an existing user data
const updateUserData = async(req, res) => {
    const id = req.params.id;
    const {user_id} = req.body
    if(id == null)
    {
        errorMesg.error = "ID required";
        return res.status(status.bad).send(errorMesg);
    }
    const updateUserByID = 'UPDATE public."xridesData" SET user_id = $1 where id = $2';
    try
    {
        const { rows } = await dbQuery.query(updateUserByID, [user_id], [id]);
        const dbResponse = rows[0];
        if(!dbResponse)
        {
            errorMesg.error = "No such user to update";
            return res.status(status.notfound).send(errorMesg);
        }
        successMesg.data = dbResponse;
        return res.status(status.success).send(successMesg);
    }
    catch(error)
    {
        if(error.routine === '_bt_check_unique')
        {
            errorMesg.error = "User already exists";
            return res.status(status.conflict).send(errorMesg);
        }
        errorMesg.error = "An Error occurred";
        return res.status(status.error).send(errorMesg);
    }
}


module.exports = {createUserData, getUserData, deleteUserData, updateUserData};