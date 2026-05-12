import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Layout, Menu, Typography, Card, Space } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined, BgColorsOutlined, SettingOutlined } from '@ant-design/icons';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import { index as teams } from '@/routes/teams';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    const menuItems = [
        {
            key: editProfile().url,
            icon: <UserOutlined />,
            label: <Link href={editProfile().url}>Profile</Link>,
        },
        {
            key: editSecurity().url,
            icon: <LockOutlined />,
            label: <Link href={editSecurity().url}>Security</Link>,
        },
        {
            key: teams().url,
            icon: <TeamOutlined />,
            label: <Link href={teams().url}>Teams</Link>,
        },
        {
            key: editAppearance().url,
            icon: <BgColorsOutlined />,
            label: <Link href={editAppearance().url}>Appearance</Link>,
        },
    ];

    const selectedKey = menuItems.find(item => isCurrentOrParentUrl(item.key))?.key || editProfile().url;

    return (
        <Content className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Title level={2} className="!mb-1">
                        <Space>
                            <SettingOutlined />
                            <span>Settings</span>
                        </Space>
                    </Title>
                    <Paragraph type="secondary">
                        Manage your profile and account settings
                    </Paragraph>
                </div>

                <Card bordered={false} className="shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
                    <Layout className="bg-white min-h-[600px]">
                        <Sider 
                            width={280} 
                            theme="light" 
                            className="!bg-gray-50/50 border-r border-gray-100"
                            breakpoint="lg"
                            collapsedWidth="0"
                        >
                            <Menu
                                mode="inline"
                                selectedKeys={[selectedKey]}
                                items={menuItems}
                                className="h-full border-none !bg-transparent py-4"
                            />
                        </Sider>
                        <Content className="p-6 sm:p-8 lg:p-10">
                            <div className="max-w-3xl">
                                {children}
                            </div>
                        </Content>
                    </Layout>
                </Card>
            </div>
        </Content>
    );
}
