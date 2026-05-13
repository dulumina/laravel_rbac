import { Head } from '@inertiajs/react';
import { Typography } from 'antd';
import AppearanceTabs from '@/components/appearance-tabs';
import ColorThemePicker from '@/components/color-theme-picker';
import { edit as editAppearance } from '@/routes/appearance';

const { Title, Text } = Typography;

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <div className="space-y-8">
                <div>
                    <Title level={4}>Appearance Settings</Title>
                    <Text type="secondary">Update your account's appearance settings and theme preferences</Text>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <Text strong className="block mb-4">Theme Selection</Text>
                    <AppearanceTabs />
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <Text strong className="block mb-4">Color Theme</Text>
                    <Text type="secondary" className="block mb-4">
                        Choose your preferred accent color for the interface
                    </Text>
                    <ColorThemePicker />
                </div>
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance().url,
        },
    ],
};
