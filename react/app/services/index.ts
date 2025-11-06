import { UserServices } from './user';
import { AuthServices } from './auth';
import { type ServicesConfig } from './base';
export * from './auth';
export * from './user';

export default class AllInOneServices {
    public user: UserServices;
    public auth: AuthServices;

    constructor(config: ServicesConfig) {
        this.user = new UserServices(config);
        this.auth = new AuthServices(config);
    }
}