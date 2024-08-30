import { createAuthorizedRequest } from "../apis/axiosInstance";

class ExchangeService {
    constructor(httpClient = createAuthorizedRequest) {
        this.httpClient = httpClient;
        this.baseUrl = "/exchange";
    }

    async exchangeRequest(sender, receiver, senderBook, receiverBook) {
        try {
            const res = await this.httpClient.post(this.baseUrl, {
                sender:sender,
                receiver:receiver,
                senderBook:senderBook,
                receiverBook:receiverBook
            });
            return res.data; 
        } catch (err) {
            throw err; 
        }
    }
    async get() {
        try {
            const res = await this.httpClient.get(this.baseUrl);
            return res.data; 
        } catch (err) {
            throw err; 
        }
    }
   async update(id, status) {
    try {
        const url = `${this.baseUrl}/${id}`;  
        const res = await this.httpClient.put(url, { status });  
        return res.data; 
    } catch (err) {
        console.error('Error updating status:', err);
        throw new Error('Failed to update status.'); 
    }
}

}

export default ExchangeService;
