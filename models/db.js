import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

let db = { users: [], chats: [] };

try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    db = JSON.parse(fileContent);
    console.log("Model: Data læst succesfuldt!");
} catch (error) {
    console.error("Model: Kunne ikke læse data.json. Grund:", error.message);
}

export const getDb = () => db;
export const saveData = () => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(db, null, 2));
    } catch (error) {
        console.error(" Fejl ved gemning:", error.message);
    }
};