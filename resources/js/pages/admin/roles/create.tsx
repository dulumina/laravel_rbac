import { SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, useForm } from '@inertiajs/react';
import { App, Button, Card, Form, Input, Select, Space } from 'antd';
import { index, store } from '@/actions/App/Http/Controllers/Admin/RoleController';

interface Props {
    availablePermissions: string[];
}

export default function RoleCreate({ availablePermissions }: Props) {
    const { message } = App.useApp();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [],
    });

    const onFinish = () => {
        post(store().url, {
            onSuccess: () => message.success('Role created successfully'),
        });
    };

    return (
        <div className="p-6">
            <Head title="Create Role" />
            <Card
                title={
                    <Space>
                        <SafetyCertificateOutlined />
                        <span>Create Role</span>
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
                            Create Role
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

RoleCreate.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Roles', href: index().url },
        { title: 'Create', href: '#' },
    ],
});
