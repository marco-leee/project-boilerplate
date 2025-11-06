import BaseServices, { type ServicesConfig } from "./base";

export interface UserService {
    getUser: () => Promise<void>;
}

export const userService: UserService = {
    getUser: async () => { console.log('getUser'); }
}

export class UserServices extends BaseServices {
    constructor(config: ServicesConfig) {
        super(config);
    }

    async getUser() {
        console.log('getUser');
    }
}