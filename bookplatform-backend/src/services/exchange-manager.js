const { exchangeModel } = require('../models')
const { NOT_FOUND, BAD_REQUEST } = require('../utils/errors')
const {AppError} = require('../utils')
const _ = require('lodash')



const sendExchange = async (body) => {
    const { sender, receiver, senderBook, receiverBook } = body;
    try{
        const exchangeRequest = await exchangeModel.create({
            sender,
            receiver ,
            senderBook ,
            receiverBook
        })
        await exchangeRequest.save()
        return exchangeRequest
    }catch(err){
        throw err;
    }
}


const respondToExchange = async (request, response) => {
    try {
        const exchangeRequest = await exchangeModel.findById(request);
        
        if (!exchangeRequest) {
            const error = NOT_FOUND
            error.message = 'Exchange request not found'
            throw new AppError(error.code, error.message,error.statusCode)
        }

        exchangeRequest.status = response; 
        await exchangeRequest.save();

        return exchangeRequest;
    } catch (err) {
        throw err;
    }
};


const exchangeStatus = async (params, body) => {
    const { status } = body;
    const { requestId } = params;

    try {
        if (_.isEmpty(status)) {
            const error = BAD_REQUEST;
            error.message = "Please fill status field";
            throw new AppError(error.code, error.message, error.statusCode);
        }
        const updatedRequest = await exchangeModel.findByIdAndUpdate(
            requestId,
            { $set: { status: status } },
            { new: true }
        );
        if (!updatedRequest) {
            const error = NOT_FOUND;
            error.message = "Exchange request not found";
            throw new AppError(error.code, error.message, error.statusCode);
        }
        return updatedRequest;
    } catch (err) {
        throw err;
    }
};



const get = async (user) => {
    try {
        const exchangeRequests = await exchangeModel.find({
            $or: [{ sender: user }, { receiver: user }]
        })
        .populate('sender', 'name email')   
        .populate('receiver', 'name email')   
        .populate('senderBook', 'title author')  
        .populate('receiverBook', 'title author');  

        if (!exchangeRequests || exchangeRequests.length === 0) {
            const error = NOT_FOUND;
            error.message = 'No exchange requests found for this user';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        return exchangeRequests;
    } catch (err) {
        throw err;
    }
};


module.exports = { sendExchange , respondToExchange,get,exchangeStatus }