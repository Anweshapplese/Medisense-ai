# MediSense AI - React Application

A modern, futuristic medical intelligence platform built with React. This application helps users understand their medical reports using AI-powered analysis.

## Project Structure

```
medisense-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Background.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   └── Dashboard.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Features

- **Home Page**: Hero section with 3D medical report visualization, features, stats, and dashboard preview
- **Sign In Page**: User authentication with CAPTCHA verification
- **Sign Up Page**: User registration with social login options
- **Dashboard Page**: Personalized health command center
- **Responsive Design**: Fully responsive across all devices
- **Animated UI**: Futuristic animations and effects

## Installation

1. Navigate to the project directory:
```bash
cd medisense-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with animations and gradients
- **Google Fonts** - Orbitron and Space Grotesk fonts

## Pages & Routes

- `/` - Home page
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/dashboard` - Dashboard page

## Components

### Background
Animated background with particles and grid lines for futuristic effect

### Navbar
Fixed navigation bar with logo and authentication buttons

### Footer
Footer with disclaimer, links, and company information

### Pages
- **Home**: Landing page with hero, stats, features, and CTA sections
- **SignIn**: Login form with email, password, and CAPTCHA
- **SignUp**: Registration form with name, email, password fields
- **Dashboard**: User dashboard with reports and quick actions

## Styling

All styles are in `src/App.css` with:
- CSS Variables for theming
- Keyframe animations
- Responsive breakpoints
- Hover effects and transitions

## Future Integration

This is a frontend-only application. Backend integration points:

1. **Authentication**: Connect sign in/up forms to your auth API
2. **Dashboard Data**: Fetch user reports from your database
3. **File Upload**: Implement medical report upload functionality
4. **AI Analysis**: Connect to your AI analysis backend
5. **User Profile**: Add user profile management

## Customization

### Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #00F0FF;
  --secondary: #7B2FF7;
  --accent: #FF006E;
  --dark: #0A0E27;
  --darker: #05070F;
}
```

### Fonts
Change fonts in `public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

## License

This project is for educational and demonstration purposes.

## Medical Disclaimer

⚠️ **IMPORTANT**: AI-generated insights are for informational purposes only. Always consult qualified healthcare professionals for medical decisions.