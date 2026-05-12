import { SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, useForm } from '@inertiajs/react';
import { App, Button, Card, Form, Input, Select, Space } from 'antd';
import { index, update } from '@/actions/App/Http/Controllers/Admin/RoleController';

interface Props {
    role: {
        id: number;
        name: string;
        permissions: string[];
    };
    availablePermissions: string[];
}

export default function RoleEdit({ role, availablePermissions }: Props) {
    const { message } = App.useApp();
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions,
    });

    const onFinish = () => {
        put(update(role.id).url, {
            onSuccess: () => message.success('Role updated successfully'),
        });
    };

    return (
        <div className="p-6">
            <Head title={`Edit Role: ${role.name}`} />
            <Card
                title={
                    <Space>
                        <SafetyCertificateOutlined />
                        <span>Edit Role: {role.name}</span>
                    </Space>
                }
                className="max-w-2xl"
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Role Name"
                        required
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name}
                    >
                        <Input
                            placeholder="Enter role name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            size="large"
                            disabled={role.name === 'super-admin'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Permissions"
                        validateStatus={errors.permissions ? 'error' : ''}
                        help={errors.permissions}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select permissions"
                            value={data.permissions}
                            onChange={(value) => setData('permissions', value)}
                            options={availablePermissions.map((p) => ({ label: p, value: p }))}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item className="mb-0">
                        <Button type="primary" htmlType="submit" loading={processing} size="large">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

RoleEdit.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Roles', href: index().url },
        { title: 'Edit', href: '#' },
    ],
});
