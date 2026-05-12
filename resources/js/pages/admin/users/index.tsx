import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Card, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { destroy, edit, index } from '@/actions/App/Http/Controllers/Admin/UserController';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface Props {
    users: User[];
}

export default function UserIndex({ users }: Props) {
    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Typography.Text strong>{text}</Typography.Text>
                    <Typography.Text type="secondary">{record.email}</Typography.Text>
                </Space>
            ),
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[]) => (
                <>
                    {roles.map((role) => (
                        <Tag color="blue" key={role}>
                            {role}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={edit(record.id).url}>
                        <Button icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => router.delete(destroy(record.id).url)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <Head title="User Management" />
            <Card
                title={
                    <Space>
                        <UserOutlined />
                        <span>User Management</span>
                    </Space>
                }
            >
                <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
        </div>
    );
}

UserIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Users', href: index().url },
    ],
});
