// Fil: server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

// Hent Model og Routes
import { getDb } from './models/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'dip-secret', resave: false, saveUninitialized: false }));
app.use(express.static('public')); // Denne linje fortæller Express, at den må læse filer fra 'public' mappen



// Sæt Pug op (View engine)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Hovedruten (Forsiden)
app.get('/', (req, res) => {
    const db = getDb();
    
    // Koip af chats med ownernames
    const chatsWithNames = db.chats.map(chat => {
        const owner = db.users.find(u => u.id === chat.ownerId);
        return {
            ...chat,
            ownerName: owner ? owner.username : 'Ukendt'
        };
    });

    res.render('index', {
        currentUser: req.session.user,
        users: db.users,
        chats: chatsWithNames // Vi sender den nye liste med navne til Pug
    });
});

// Forbind Ruterne
app.use('/', userRoutes);
app.use('/api/chats', chatRoutes);

// Start!
app.listen(PORT, () => {
    console.log(`Server kører på http://localhost:${PORT}`);
});