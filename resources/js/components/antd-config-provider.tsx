import { App, ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
    const { resolvedAppearance } = useAppearance();

    return (
        <ConfigProvider
            theme={{
                algorithm: resolvedAppearance === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#00A76F',
                    borderRadius: 8,
                    fontFamily: 'Open Sans Variable, Open Sans, Inter Variable, ui-sans-serif, system-ui, sans-serif',
                },
            }}
        >
            <App>{children}</App>
        </ConfigProvider>
    );
}
