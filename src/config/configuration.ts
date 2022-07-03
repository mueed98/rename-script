

/* eslint-disable */
require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {
    }

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    public serverPort() {
        return this.getValue('PORT', false) || 3000;
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getMoralisConfigurations() {
        return {
            serverUrl: this.getValue("SERVER_URL"),
            appId: this.getValue("APP_ID"),
            masterKey: this.getValue("MASTER_KEY")
        }
    }

    public getAdmins() {
        const _values = this.getValue('ADMIN_ADDRESS');
        return _values.split(",");
    }

    public getMaxWhitelistCount(): number{
        return parseInt(this.getValue('WHITELIST_COUNT')) || 0;
    }

    public inputValidationValues() {
        return {
            postTitle: parseInt(this.getValue("postTitle")),
            postContent: parseInt(this.getValue("postContent")),
            tags: parseInt(this.getValue("tags")),
            postMediaFiles:parseInt(this.getValue("postMediaFiles")),

            nftShortName: parseInt(this.getValue("nftShortName")),
            nftDescription: parseInt(this.getValue("nftDescription")),

            userName: parseInt(this.getValue("userName")),
            userEmail: parseInt(this.getValue("userEmail")),
            userBio:parseInt(this.getValue("userBio")),
            userLinks: parseInt(this.getValue("userLinks")),
            userFiles: parseInt(this.getValue("userFiles")),
        }
    }

}

const requiredConfig = [
    'MONGO_URL',
];


const configService = new ConfigService(process.env).ensureValues(requiredConfig);


export { configService };