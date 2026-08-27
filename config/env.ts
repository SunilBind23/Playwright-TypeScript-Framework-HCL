import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {

    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }

    return value;
}

export const ENV = {
    baseUrl: getEnv('APP_BASE_URL'),
    username: getEnv('APP_USERNAME'),
    password: getEnv('APP_PASSWORD')
};
