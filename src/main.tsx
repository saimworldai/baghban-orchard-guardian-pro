
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css' // Import Mapbox GL CSS

createRoot(document.getElementById("root")!).render(<App />);
