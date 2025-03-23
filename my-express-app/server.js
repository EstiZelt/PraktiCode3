// ייבוא המודולים הדרושים
const express = require('express');

// יצירת אפליקציה חדשה של Express
const app = express();
const PORT = process.env.PORT || 3000;

// נתיב ברירת מחדל
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(process.env.URL, {
            headers: {
                'Authorization': `Bearer ${process.env.RENDER_API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services', details: error.message });
    }});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`השרת רץ בכתובת: http://localhost:${PORT}`);
});
