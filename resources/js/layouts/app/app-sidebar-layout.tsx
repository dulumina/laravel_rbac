import { Layout } from 'antd';
import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { useAppearance } from '@/hooks/use-appearance';
import type { AppLayoutProps } from '@/types';

const { Content } = Layout;

export default function AppSidebarLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const sidebarWidth = collapsed ? 64 : 240;
    const contentBg = isDark ? '#13131f' : '#f5f6fa';

    return (
        <Layout style={{ minHeight: '100vh', background: contentBg }}>
            <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
            <Layout
                style={{
                    marginLeft: sidebarWidth,
                    transition: 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: contentBg,
                    minHeight: '100vh',
                }}
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <Content
                    style={{
                        background: contentBg,
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
