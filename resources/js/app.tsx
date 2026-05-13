import { createInertiaApp } from '@inertiajs/react';
import AntdConfigProvider from '@/components/antd-config-provider';
import { Toaster } from '@/components/ui/sonner';
import { initializeTheme } from '@/hooks/use-appearance';
import { initializeColorTheme } from '@/hooks/use-color-theme';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name === 'readme':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
            case name.startsWith('teams/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <AntdConfigProvider>
                {app}
                <Toaster />
            </AntdConfigProvider>
        );
    },
    progress: {
        color: '#6366f1',
    },
});

// This will set light / dark mode on load...
initializeTheme();
// This will set color theme on load...
initializeColorTheme();
