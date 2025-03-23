// ייבוא המודולים הדרושים
const express = require('express');
const axios = require('axios');
// יצירת אפליקציה חדשה של Express
const app = express();
const PORT = process.env.PORT || 3000;
const api_URL=`https://api.render.com/v1/services?includePreviews=true&limit=20` 
console.log("Trying to fetch from Render API...");
console.log("url",api_URL);
console.log("API Key:", process.env.RENDER_API_KEY);
//נתיב ברירת מחדל
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(api_URL, {
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
