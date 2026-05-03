import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #fbbf24;
    --primary-hover: #f59e0b;
    --bg-main: #0f172a;
    --bg-surface: #1e293b;
    --bg-glass: rgba(15, 23, 42, 0.75);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --border-glass: rgba(255, 255, 255, 0.1);
    --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--bg-main);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  /* Glassmorphism Utility */
  .glass {
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border-glass);
    box-shadow: var(--shadow-glass);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-main);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bg-surface);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #334155;
  }

  .footer-area {
    position: relative;
    z-index: 1;
    background-color: #020617;
    padding: 60px 0 0;
  }

  .footer-area .single-footer-widget .widget-title {
    font-size: 20px;
    color: var(--primary);
    margin-bottom: 30px;
    font-weight: 600;
  }

  .footer-area .single-footer-widget ul li a {
    display: block;
    color: var(--text-secondary);
    font-size: 15px;
    margin-bottom: 20px;
    padding-left: 0;
    transition: color 0.2s;
  }

  .footer-area .single-footer-widget ul li a:hover {
    color: var(--primary);
  }

  .footer-area .copywrite-area {
    border-top: 1px solid var(--border-glass);
    padding: 30px 0;
    margin-top: 50px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }
`;

export default GlobalStyle;
