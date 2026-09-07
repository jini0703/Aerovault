import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
  "src/index.css": `@import "tailwindcss";

@theme {
  --color-brand-bg: var(--bg);
  --color-brand-surface: var(--surface);
  --color-brand-surface-hover: var(--surface-hover);
  --color-brand-primary: var(--primary);
  --color-brand-secondary: var(--secondary);
  --color-brand-text: var(--text);
  --color-brand-text-muted: var(--text-muted);
  --color-brand-border: var(--border);
  
  --font-sans: 'Inter', system-ui, sans-serif;
}

@layer base {
  :root {
    --bg: #F8FAFC; /* warm white / pale lavender tint */
    --surface: #FFFFFF;
    --surface-hover: #F1F5F9;
    --primary: #8B5CF6; /* Purple */
    --secondary: #06B6D4; /* Cyan */
    --text: #0F172A; /* deep navy text */
    --text-muted: #64748B;
    --border: #E2E8F0;
  }

  .dark {
    --bg: #080B12; /* deep blue-black */
    --surface: #0D111C;
    --surface-hover: #131A2A;
    --primary: #8B5CF6; /* Purple */
    --secondary: #06B6D4; /* Cyan */
    --text: #F8FAFC;
    --text-muted: #94A3B8;
    --border: #1E293B;
  }

  body {
    background-color: var(--color-brand-bg);
    color: var(--color-brand-text);
    font-family: var(--font-sans);
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s, color 0.3s;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-brand-bg); 
}

::-webkit-scrollbar-thumb {
  background: var(--color-brand-border); 
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-surface-hover); 
}
`,
  "src/context/ThemeContext.jsx": `import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log(\`Wrote \${filePath}\`);
}
