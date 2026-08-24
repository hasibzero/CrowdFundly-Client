import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('crowdfundly');

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "Supporter"
            },
            credits: {
                type: "number",
                required: false,
                defaultValue: 50
            },
            photoURL: {
                type: "string",
                required: false
            }
        }
    },
    plugins: [
        jwt({
            jwt: {
                expirationTime: '7d',
            }
        })
    ],
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
