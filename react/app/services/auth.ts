// * Define your services here

import BaseServices, { type ServicesConfig } from "./base";

export interface AuthService {
    // function here
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const authService: AuthService = {
    signIn: async () => { console.log('signIn'); },
    signOut: async () => { console.log('signOut'); },
}

export class AuthServices extends BaseServices {
    constructor(config: ServicesConfig) {
        super(config);
    }

    async signIn() {
        console.log('signIn');
    }

    async signOut() {
        console.log('signOut');
    }
}