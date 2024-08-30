import { publicRequest } from '../apis/axiosInstance'

class UserAuthentication {
    constructor(httpClient = publicRequest) {
        this.httpClient = httpClient;
        this.baseUrl = "/users";
    }

    async register(userData) {
        try {
            const response = await this.httpClient.post( `${this.baseUrl}/register`,userData);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login(userData) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/login`,userData);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserAuthentication;
