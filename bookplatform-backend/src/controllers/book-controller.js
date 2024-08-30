const { bookManager , responseManager }  = require('../services')


const create = async (request,response) => {
    try{
        const result = await bookManager.create(request.body ,request.user)
        return responseManager.sendSuccessResponse(response,result,'Book created successfully')
     }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}

const update = async ( request,response) => {
    try{
        const result = await bookManager.update(request.body,request.params,request.user)
        return responseManager.sendSuccessResponse(response,result,"Book updated successfully")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}

const deleteOne = async (request , response ) => {
    try{
        const result = await bookManager.deleteOne(request.params,request.user)
        return responseManager.sendSuccessResponse(response,result,"Book deleted successfully")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}


const get = async (request , response ) => {
    try{
        const result = await bookManager.get(request.user)
        return responseManager.sendSuccessResponse(response,result,"Book fetched successfully")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}
const getAll = async (request , response ) => {

    try{
        const result = await bookManager.getAll(request.user)
        return responseManager.sendSuccessResponse(response,result,"All book fetched successfully")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}

const search = async (request, response) => {
    try {
        const result = await bookManager.search(request.query); 
        if (result.length === 0) {
            return responseManager.sendErrorResponse(response, { message: "No books found", statusCode: 404 });
        }
        return responseManager.sendSuccessResponse(response, result, "Books fetched successfully");
    } catch (err) {
        return responseManager.sendErrorResponse(response, err);
    }
};

module.exports = { create , deleteOne , getAll ,get , update , search }