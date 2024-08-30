import { createAuthorizedRequest } from "../apis/axiosInstance";

class BookService {
    constructor(httpClient = createAuthorizedRequest) {
        this.httpClient = httpClient;
        this.baseUrl = "/books";
    }

    async create(userData) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}`,userData);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id){
        try{
            const response = await this.httpClient.delete(`${this.baseUrl}/${id}`)
            return response;
        }catch(error){
            throw error;
        }
    }

    async update(id,credentials){
         try{
            const response = await this.httpClient.put(`${this.baseUrl}/${id}`,credentials)
            return response;
        }catch(error){
            throw error;
        }
    }

    async get() {
        try {
            const response = await this.httpClient.get(`${this.baseUrl}/book`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.httpClient.get(`${this.baseUrl}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async search({ title, author, genre }) {
    try {
        const query = {
            title: title ? title.trim() : undefined,
            author: author ? author.trim() : undefined,
            genre: genre ? genre.trim() : undefined
        };
        const params = Object.fromEntries(
            Object.entries(query).filter(([_, value]) => value !== undefined)
        );

        const queryString = new URLSearchParams(params).toString();
        const response = await this.httpClient.get(`${this.baseUrl}/search?${queryString}`);

        return response.data;
    } catch (error) {
        console.error('Search Error:', error);
        throw error;
    }
}

}

export default BookService;