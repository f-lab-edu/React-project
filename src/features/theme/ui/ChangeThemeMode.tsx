import { useThemeMode } from '@/shared/lib/theme/ThemeProvider';
import { changeThemeButton } from '@/features/theme/ui/ChangeThemeMode.css';

export const ChangeThemeMode = () => {
  const { mode, setMode } = useThemeMode();

  const handleChangeThemeMode = () =>
    setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <button className={changeThemeButton} onClick={handleChangeThemeMode}>
      {mode === 'dark' ? <div>Dark</div> : <div>SUN</div>}
    </button>
  );
};
