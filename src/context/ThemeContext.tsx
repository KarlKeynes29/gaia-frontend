import React, { createContext, useContext, useState } from 'react';
import { gaiaTheme, type GaiaTheme } from '../theme';

// Note about the importation line above^
// TS gets confused when a TS import of a "type" is joined together in one line with the JS one--because I have "verbatimModuleSyntax" to true.
const ThemeContext = createContext<GaiaTheme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme] = useState<GaiaTheme>(gaiaTheme);

    return (
        <ThemeContext.Provider value={currentTheme}>
            <div
                style={{
                    backgroundColor: currentTheme.colors.background,
                    minHeight: '100vh',
                    color: currentTheme.colors.textMain,
                    transition: 'background-color 0.2s ease'
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useGaiaTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useGaiaTheme must be used within a ThemeProvider');
    }
    return context;
}
