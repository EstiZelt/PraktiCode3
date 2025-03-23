// ייבוא המודולים הדרושים
const express = require('express');

// יצירת אפליקציה חדשה של Express
const app = express();
const PORT = 10000;

const getRenderApps = async () => {
    try {
      const response = await axios.get(RENDER_API_KEY, {
        headers: {
          Authorization: `Bearer ${RENDER_API_URL}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Render services:', error);
      throw error;
    }
  };
  
  // Endpoint GET להחזיר את רשימת האפליקציות
  app.get('/render-apps', async (req, res) => {
    try {
      const apps = await getRenderApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Render services' });
    }
  });
// נתיב ברירת מחדל
// app.get('/', async (req, res) => {
//     try {
//         const response = await axios.get(process.env.URL, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.RENDER_API_KEY}`
//             }
//         });

//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch services', details: error.message });
//     }});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`השרת רץ בכתובת: http://localhost:${PORT}`);
});
