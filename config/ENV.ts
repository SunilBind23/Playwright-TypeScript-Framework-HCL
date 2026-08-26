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
    baseUrl: process.env.SB_BASE_URL!,
    username: process.env.SB_USERNAME!,
    password: process.env.SB_PASSWORD!,
};