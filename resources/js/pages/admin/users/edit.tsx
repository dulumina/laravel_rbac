import { UserOutlined } from '@ant-design/icons';
import { Head, useForm } from '@inertiajs/react';
import { App, Button, Card, Form, Input, Select, Space } from 'antd';
import { index, update } from '@/actions/App/Http/Controllers/Admin/UserController';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        roles: string[];
    };
    availableRoles: string[];
}

export default function UserEdit({ user, availableRoles }: Props) {
    const { message } = App.useApp();
    const { data, setData, put, processing, errors } = useForm({
        roles: user.roles,
    });

    const onFinish = () => {
        put(update(user.id).url, {
            onSuccess: () => message.success('User updated successfully'),
        });
    };

    return (
        <div className="p-6">
            <Head title={`Edit User: ${user.name}`} />
            <Card
                title={
                    <Space>
                        <UserOutlined />
                        <span>Edit User: {user.name}</span>
                    </Space>
                }
                className="max-w-2xl"
            >
                <Form layout="vertical" onFinish={onFinish} initialValues={data}>
                    <Form.Item label="Name">
                        <Input value={user.name} disabled size="large" />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input value={user.email} disabled size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Roles"
                        validateStatus={errors.roles ? 'error' : ''}
                        help={errors.roles}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select roles"
                            value={data.roles}
                            onChange={(value) => setData('roles', value)}
                            options={availableRoles.map((role) => ({ label: role, value: role }))}
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

UserEdit.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Users', href: index().url },
        { title: 'Edit User', href: '#' },
    ],
});
