const { exchangeManager , responseManager } = require("../services");

const exchangeRequest = async(request,response) => {
    try{
        const result = await exchangeManager.sendExchange(request.body)
        return responseManager.sendSuccessResponse(response,result,"Exchange Request sent successfully");
    }catch(err){
        return responseManager.sendErrorResponse(response,err)
    }
}

const responseToRequest = async(request,response) => {
    try{
        const result = await exchangeManager.respondToExchange(request.params)
        return responseManager.sendSuccessResponse(response,result,"Response Sent Successfully");
    }catch(err){
        return responseManager.sendErrorResponse(response,err)
    }
}

const updateStatus = async(request,response) => {
    try{
        const result = await exchangeManager.exchangeStatus(request.params,request.body)
        return responseManager.sendSuccessResponse(response,result,'Book Updated Successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err)
    }
}

const get = async(request,response) => {
    try{
        const result = await exchangeManager.get(request.user)
        return responseManager.sendSuccessResponse(response,result,"Response Fetched Successfully");
    }catch(err){
        return responseManager.sendErrorResponse(response,err)
    }
}

module.exports = { exchangeRequest , responseToRequest , get , updateStatus }