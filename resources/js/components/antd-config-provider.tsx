import { App, ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    colorSuccess: '#10b981',
                    colorWarning: '#f59e0b',
                    colorError: '#ef4444',
                    colorInfo: '#3b82f6',
                    borderRadius: 10,
                    borderRadiusLG: 14,
                    fontFamily:
                        'Inter Variable, Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
                    fontSize: 14,
                    colorBgContainer: isDark ? '#1e1e2e' : '#ffffff',
                    colorBgElevated: isDark ? '#2a2a3e' : '#ffffff',
                    colorBgLayout: isDark ? '#13131f' : '#f5f6fa',
                    colorBorder: isDark ? '#2e2e42' : '#e5e7ef',
                    colorText: isDark ? '#e2e8f0' : '#1e293b',
                    colorTextSecondary: isDark ? '#94a3b8' : '#64748b',
                    colorSplit: isDark ? '#2e2e42' : '#e5e7ef',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    boxShadowSecondary:
                        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    wireframe: false,
                },
                components: {
                    Layout: {
                        siderBg: isDark ? '#13131f' : '#ffffff',
                        headerBg: isDark ? '#1e1e2e' : '#ffffff',
                        bodyBg: isDark ? '#13131f' : '#f5f6fa',
                        triggerBg: isDark ? '#1e1e2e' : '#f5f6fa',
                        triggerColor: isDark ? '#94a3b8' : '#64748b',
                    },
                    Menu: {
                        darkItemBg: 'transparent',
                        darkSubMenuItemBg: 'transparent',
                        itemBg: 'transparent',
                        subMenuItemBg: 'transparent',
                        itemSelectedBg: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                        itemSelectedColor: '#6366f1',
                        itemHoverBg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.06)',
                        itemHoverColor: '#6366f1',
                        itemColor: isDark ? '#94a3b8' : '#64748b',
                        itemActiveBg: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
                        activeBarWidth: 3,
                        activeBarBorderWidth: 3,
                        iconSize: 16,
                        collapsedIconSize: 18,
                    },
                    Card: {
                        headerBg: 'transparent',
                        borderRadiusLG: 14,
                    },
                    Button: {
                        borderRadius: 8,
                        primaryShadow: 'none',
                    },
                    Table: {
                        borderRadius: 10,
                        headerBg: isDark ? '#1e1e2e' : '#f8fafc',
                        rowHoverBg: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
                    },
                },
            }}
        >
            <App>{children}</App>
        </ConfigProvider>
    );
}
