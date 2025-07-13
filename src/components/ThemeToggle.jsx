import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn btn-outline-secondary" onClick={toggleTheme}>
      Thème : {theme === 'light' ? 'Clair 🌞' : 'Sombre 🌙'}
    </button>
  );
}