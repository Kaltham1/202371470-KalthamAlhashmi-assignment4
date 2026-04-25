# 📘 Technical Documentation

## 📁 Project Structure

The project is organized as follows:

- index.html → Main structure of the website  
- css/styles.css → Styling, layout, and responsiveness  
- js/script.js → JavaScript logic and interactivity  
- assets/ → Images and static resources  
- docs/ → Documentation files  

---

## 🧠 Technologies Used

- HTML → Structure and semantic layout  
- CSS → Styling, layout, responsiveness, dark mode  
- JavaScript → Interactivity, API integration, validation  

---

## 🔧 Features Implementation

### 1. Navigation System
- Fixed navigation bar with smooth scrolling  
- Links navigate to different sections (Home, About, Projects, GitHub, Contact)  
- Logo redirects to Home section  

---

### 2. About Me Section (Toggle Feature)
- Implemented a "Read More / Read Less" button  
- Uses JavaScript to toggle visibility of additional text  
- Improves user experience by keeping the interface clean  

---

### 3. Projects Section (Filtering & Sorting)
- Projects categorized using `data-category` attributes  
- Filtering allows users to view specific project types (Web, Database, AI)  
- Sorting is implemented based on project dates  
- JavaScript dynamically updates displayed projects without page reload  

---

### 4. GitHub API Integration
- Uses `fetch()` to retrieve repositories from GitHub API  
- Dynamically displays repositories in the UI  
- Includes error handling for failed API requests  
- Enhances the portfolio with real-time data  

---

### 5. Dark / Light Mode
- Toggle button switches between themes  
- Theme preference stored using `localStorage`  
- Automatically restores user preference on page reload  

---

### 6. Contact Form Validation
- Real-time validation for:
  - Full name  
  - Email format  
  - Phone number format  
  - Message length  
- Displays error messages under each input field  
- Prevents submission if inputs are invalid  
- Shows success message after valid submission  

---

## ⚡ Performance Optimization

- Images compressed to reduce load time  
- Efficient DOM manipulation used  
- Removed unused CSS and JavaScript code  
- Minimal external dependencies  

---

## 🧪 Testing and Compatibility

### Browsers Tested
- Google Chrome  
- Microsoft Edge  
- Safari  

### Devices Tested
- Desktop  
- Tablet  
- Mobile  

---

## 🔄 Evolution from Previous Assignments

This project builds upon earlier assignments:

- Assignment 1 → Basic HTML structure  
- Assignment 2 → Styling and responsive design  
- Assignment 3 → JavaScript logic and API integration  
- Assignment 4 → Final integration, UI improvements, and documentation  

---

## ⚠️ Limitations

- Contact form does not store data (no backend integration)  
- GitHub API depends on external availability  

---

## 🚀 Future Improvements

- Add backend functionality to store form submissions  
- Improve accessibility (ARIA labels, keyboard navigation)  
- Add animations and transitions  
- Expand project details with live previews  

---

## 🎯 Summary

This project demonstrates a complete front-end web application with dynamic features, API integration, responsive design, and a strong focus on user experience and performance.
