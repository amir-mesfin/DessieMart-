<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW5xZ2VnZ3F4dXJ2Z2V5dWZ4Z2NqZzJlcXZ6d2Z6Y2N0dW5xbmN6YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aD2vlgJi2lUY5g4/giphy.gif" width="150">
  <h1 style="color: #6a11cb; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">🛍️ DessieMart 🛒</h1>
  <p style="color: #2575fc; font-size: 1.1em;">✨ Modern Ecommerce Platform with React & Node.js ✨</p>
  
  <div>
    <a href="https://dessiemart.netlify.app/">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-FF5722?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo">
    </a>
    <img src="https://img.shields.io/github/license/amir-mesfin/dessiemart?style=for-the-badge&color=blueviolet" alt="License">
    <img src="https://img.shields.io/badge/version-1.0-green?style=for-the-badge" alt="Version">
  </div>
</div>

---

## 🌟 Key Feature
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 10px; border-radius: 8px; flex: 1; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h3 style="color: #6a11cb;">💳 Secure Payments</h3>
    <p>Stripe integration for seamless checkout</p>
  </div>
  <div style="background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); padding: 10px; border-radius: 8px; flex: 1; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h3 style="color: #2575fc;">🛒 Smart Cart</h3>
    <p>Persistent shopping cart with local storage</p>
  </div>
  <div style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); padding: 10px; border-radius: 8px; flex: 1; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h3 style="color: #d81b60;">🎨 Material UI</h3>
    <p>Beautiful components with responsive design</p>
  </div>
</div>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone (https://github.com/amir-mesfin/DessieMart-)
cd dessiemart

# Frontend setup
cd frontend
npm install
echo "VITE_BASEURL=http://localhost:5175/api" > .env
npm run dev

# Backend setup (in new terminal)
cd ../backend
npm install
echo "PORT=5175
STRIPE_KEY=your_stripe_key
MONGO_URI=mongodb://127.0.0.1:27017/DessieMartdb" > .env
npm run dev
```
```
dessiemart/
├── frontend/               # React Vite app
│   ├── public/             # Static assets
│   ├── src/                # Source files
│   │   ├── components/     # Reusable UI
│   │   ├── pages/          # Route components
│   │   └── App.jsx         # Root component
│
└── backend/                # Node.js API
    ├── models/             # MongoDB schemas
    ├── routes/             # API endpoints
    ├── middleware/         # Auth & validation
    └── server.js           # Entry point
```
<h2  style="color: #6a11cb; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);"> 🎨 Customization Tips </h2>
<ol>
<li> Change color theme: Modify the Material UI theme in frontend/src/theme.js</li>
<li> Add new products: Update the MongoDB product schema in backend/models/Product.js</li>
<li> Custom animations: Edit Framer Motion presets in frontend/src/animations/</li>
</ol>


<h2  style="color: #6a11cb; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);"> 💻 Tech Stack </h2>
<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"> <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe"> <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI"> </div>

<h3 style="color: #6a11cb;">✨ Pro Tip</h3> <p>Use <code>npm run build</code> in frontend for optimized production bundle!</p> <div style="margin-top: 20px;"> <h3 style="color: #2575fc;">Made with  by Amir Mesfin</h3> <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px;"> <a href="#"> <img src="https://img.shields.io/badge/-Portfolio-4ECDC4?style=flat-square&logo=google-chrome&logoColor=white"> </a> <a href="#"> <img src="https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"> </a> </div> </div> </div> ```


