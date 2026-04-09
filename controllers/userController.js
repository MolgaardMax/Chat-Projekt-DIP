import { getDb, saveData } from '../models/db.js';

export const login = (req, res) => {
    const db = getDb();
    const user = db.users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) { 
        req.session.user = user; 
        res.redirect('/'); 
    } else { 
        res.send("Fejl i login. <a href='/'>Prøv igen</a>"); 
    }
};

export const register = (req, res) => {
    const db = getDb();
    const { username, password } = req.body;
    if (db.users.find(u => u.username === username)) return res.send("Brugernavn optaget");
    
    const newUser = { id: "u" + Date.now(), username, password, level: 1, createdAt: new Date() };
    db.users.push(newUser); 
    saveData();
    
    req.session.user = newUser; 
    res.redirect('/');
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

export const updateUserLevel = (req, res) => {
    const db = getDb();
    
    // Sikkerhedstjek
    if (!req.session.user || req.session.user.level !== 3) {
        return res.status(403).send("Ingen adgang: Kun admins kan ændre niveauer.");
    }

    const targetUserId = req.params.id;
    const newLevel = parseInt(req.body.newLevel);

    // Find brugeren i databasen og opdater niveauet
    const userToUpdate = db.users.find(u => u.id === targetUserId);
    if (userToUpdate) {
        userToUpdate.level = newLevel;
        saveData(); // Gem den opdaterede database til data
    }
    
    // Send admin tilbage til forsiden, så de kan se ændringen
    res.redirect('/');
};