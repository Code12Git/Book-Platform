const { userManager, responseManager } = require('../services')

const register = async(request,response) => {
    try{
        const result = await userManager.register(request.body)
        return responseManager.sendSuccessResponse(response,result,"Registeration Successfull")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}


const login = async(request,response) => {
    try{
        const result = await userManager.login(request.body)
        return responseManager.sendSuccessResponse(response,result,"Login Successfull")
    }catch(err){
        return responseManager.sendErrorResponse(response, err);
    }
}

module.exports = { register , login }