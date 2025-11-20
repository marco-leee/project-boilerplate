import { Theme } from "@radix-ui/themes";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AppConfig {
    apiBaseUrl: string;
    env: string;
}

interface UserConfig {
    theme: 'light' | 'dark';
}

interface Config extends AppConfig, UserConfig { }

const defaultConfig: Config = {
    apiBaseUrl: 'http://localhost:8080',
    env: 'development',
    theme: 'dark',
};

const configKey = 'app-config';

const ConfigContext = createContext<Config>(defaultConfig);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<Config>(defaultConfig);

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return;
        }

        const wholeConfig = localStorage.getItem(configKey);

        if (wholeConfig === null) {
            return;
        }

        try {
            setConfig({ ...defaultConfig, ...JSON.parse(wholeConfig) });
        } catch (error) {
            console.error('Error parsing config', error);
        }
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            <Theme appearance={config.theme}>
                {children}
            </Theme>
        </ConfigContext.Provider>
    );
}

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}

