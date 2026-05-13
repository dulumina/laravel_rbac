import { DeleteOutlined, KeyOutlined, PlusOutlined, RadarChartOutlined } from '@ant-design/icons';
import { Head, router, useForm } from '@inertiajs/react';
import { App, Button, Card, Divider, Empty, Form, Input, List, Modal, Popconfirm, Space, Tag, Typography } from 'antd';
const { Text, Title } = Typography;
import { destroy, index, scan, store } from '@/actions/App/Http/Controllers/Admin/PermissionController';
import { useState } from 'react';

interface Permission {
    id: number;
    name: string;
    created_at: string;
}

interface Props {
    permissions: Permission[];
}

export default function PermissionIndex({ permissions }: Props) {
    const { message } = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const onFinish = () => {
        post(store().url, {
            onSuccess: () => {
                message.success('Permission created successfully');
                reset();
                setIsModalOpen(false);
            },
        });
    };

    const groupedPermissions = permissions.reduce(
        (acc, permission) => {
            const parts = permission.name.split('.');
            const group = parts.length > 1 ? parts[0] : 'General';
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(permission);
            return acc;
        },
        {} as Record<string, Permission[]>,
    );

    const groups = Object.keys(groupedPermissions).sort();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Head title="Permission Management" />
            <div className="max-w-7xl mx-auto space-y-6">
                <Card
                    title={
                        <Space>
                            <KeyOutlined />
                            <span>Permissions List</span>
                        </Space>
                    }
                    extra={
                        <Space>
                            <Button icon={<RadarChartOutlined />} onClick={() => router.get(scan().url)}>
                                Scan Permissions
                            </Button>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                                Add Permission
                            </Button>
                        </Space>
                    }
                >
                    {permissions.length === 0 ? (
                        <Empty description="No permissions found" />
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
                            {groups.map((group) => (
                                <div key={group} className="break-inside-avoid">
                                    <Divider titlePlacement="left" className="!my-4">
                                        <Tag color="blue" className="px-2 py-0 text-xs font-bold uppercase">
                                            {group}
                                        </Tag>
                                    </Divider>
                                    <List
                                        size="small"
                                        dataSource={groupedPermissions[group]}
                                        renderItem={(item) => (
                                            <List.Item
                                                className="!px-0 !py-2"
                                                actions={[
                                                    <Popconfirm
                                                        key="delete"
                                                        title="Delete permission"
                                                        description="Are you sure to delete this permission?"
                                                        onConfirm={() => router.delete(destroy(item.id).url)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button danger type="text" size="small" icon={<DeleteOutlined />} />
                                                    </Popconfirm>,
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    title={
                                                        <Text code className="text-[11px] text-blue-600">
                                                            {item.name}
                                                        </Text>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>

            <Modal
                title={
                    <Space>
                        <PlusOutlined />
                        <span>Add New Permission</span>
                    </Space>
                }
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    reset();
                }}
                footer={null}
                destroyOnClose
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Permission Name"
                        required
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name}
                    >
                        <Input
                            placeholder="e.g. edit articles"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            size="large"
                            autoFocus
                        />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => {
                                setIsModalOpen(false);
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Create Permission
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

PermissionIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Permissions', href: index().url },
    ],
});
