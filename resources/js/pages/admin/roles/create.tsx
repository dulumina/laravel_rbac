import { SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, useForm } from '@inertiajs/react';
import { App, Button, Card, Form, Input, Space, Switch } from 'antd';
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

    const groupedPermissions = availablePermissions.reduce((acc, permission) => {
        let group = 'General';
        if (permission.includes('.')) {
            group = permission.split('.')[0];
        } else if (permission.includes(' ')) {
            const parts = permission.split(' ');
            group = parts[parts.length - 1];
        }
        
        const groupName = group.charAt(0).toUpperCase() + group.slice(1);
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(permission);
        return acc;
    }, {} as Record<string, string[]>);

    const onFinish = () => {
        post(store().url, {
            onSuccess: () => message.success('Role created successfully'),
        });
    };

    const togglePermission = (permission: string, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permission] as never[]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== permission) as never[]);
        }
    };

    const toggleGroup = (groupPerms: string[], checked: boolean) => {
        if (checked) {
            const newPermissions = Array.from(new Set([...data.permissions, ...groupPerms]));
            setData('permissions', newPermissions as never[]);
        } else {
            const newPermissions = data.permissions.filter((p) => !groupPerms.includes(p));
            setData('permissions', newPermissions as never[]);
        }
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
                className="max-w-4xl"
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

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-medium">Permissions</span>
                            <Space>
                                <Button 
                                    size="small" 
                                    onClick={() => setData('permissions', availablePermissions as never[])}
                                >
                                    Select All
                                </Button>
                                <Button 
                                    size="small" 
                                    onClick={() => setData('permissions', [] as never[])}
                                >
                                    Deselect All
                                </Button>
                            </Space>
                        </div>

                        {Object.entries(groupedPermissions).map(([group, perms]) => {
                            const allChecked = perms.every(p => data.permissions.includes(p as never));
                            const someChecked = perms.some(p => data.permissions.includes(p as never)) && !allChecked;
                            
                            return (
                                <div key={group} className="mb-6 bg-gray-50/30 p-4 rounded-xl border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider m-0">
                                            {group}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">Select Group</span>
                                            <Switch 
                                                size="small" 
                                                checked={allChecked} 
                                                onChange={(checked) => toggleGroup(perms, checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {perms.map((p) => (
                                            <div 
                                                key={p} 
                                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                                    data.permissions.includes(p as never) 
                                                        ? 'bg-white border-blue-200 shadow-sm' 
                                                        : 'bg-white/50 border-transparent'
                                                }`}
                                            >
                                                <span className="text-sm text-gray-700">{p}</span>
                                                <Switch
                                                    size="small"
                                                    checked={data.permissions.includes(p as never)}
                                                    onChange={(checked) => togglePermission(p, checked)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {errors.permissions && <div className="text-red-500 text-sm mt-1">{errors.permissions}</div>}
                    </div>

                    <Form.Item className="mb-0 mt-8">
                        <Button type="primary" htmlType="submit" loading={processing} size="large" block>
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
