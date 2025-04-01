'use client';

import { Switch, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from './ThemeProviders';
import '../../app/globals.css'; // Ensure this file is included for styles

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fab-container">
      <Tooltip title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}>
        <Switch
          checked={theme === 'light'}
          onChange={toggleTheme}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
          className="fab-switch"
        />
      </Tooltip>
    </div>
  );
}
