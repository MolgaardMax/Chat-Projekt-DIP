import { getDb, saveData } from '../models/db.js';

export const getAllChats = (req, res) => {
    res.json(getDb().chats);
};

export const createChat = (req, res) => {
    const db = getDb();
    
    // Tjek om brugeren må oprette en chat
    if (!req.session.user || req.session.user.level < 2) {
        return res.status(403).json({ error: "Ingen adgang" });
    }
    
    const newChat = { 
        id: "c" + Date.now(), 
        name: req.body.name, 
        ownerId: req.session.user.id, 
        messages: [], 
        createdAt: new Date() 
    };
    
    db.chats.push(newChat); 
    saveData(); 
    res.json(newChat);
};

export const deleteChat = (req, res) => {
    const db = getDb();
    const index = db.chats.findIndex(c => c.id === req.params.id);
    
    if (index === -1) return res.status(404).json({ error: "Chat ikke fundet" });

    const chat = db.chats[index];
    
    // Tjek om brugeren må slette chatten
    if (req.session.user?.level === 3 || (req.session.user?.level === 2 && chat.ownerId === req.session.user.id)) {
        db.chats.splice(index, 1); 
        saveData(); 
        return res.json({ msg: "Slettet" });
    }
    res.status(403).json({ error: "Ingen adgang" });
};

export const getMessages = (req, res) => {
    const db = getDb();
    const chat = db.chats.find(c => c.id === req.params.id);
    
    if (chat) {
        const messagesToLoad = chat.messages || []; 

        const messagesWithNames = messagesToLoad.map(msg => {
            const user = db.users.find(u => u.id === msg.ownerId);
            
            return {
                ...msg,
                ownerName: user ? user.username : 'Ukendt bruger'
            };
        });
        
        res.json(messagesWithNames); 
    } else {
        res.status(404).json({ error: "Chat ikke fundet" });
    }
};
export const addMessage = (req, res) => {
    const db = getDb();
    const chat = db.chats.find(c => c.id === req.params.id);
    
    if (!chat) return res.status(404).json({ error: "Chat ikke fundet" });

    // Tilføj ownerName når beskeden oprettes
    const msg = { 
        id: "m" + Date.now(),
        content: req.body.content, 
        ownerId: req.session.user.id, 
        ownerName: req.session.user.username, 
        createdAt: new Date() 
    };
    
    if (!chat.messages) chat.messages = []; 
    
    chat.messages.push(msg); 
    saveData(); 
    res.json(msg);
};