import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Card, Popconfirm, Space, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { create, destroy, edit, index } from '@/actions/App/Http/Controllers/Admin/UserController';
import DataTable from '@/components/data-table';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface Props {
    users: User[];
    total: number;
    page: number;
    perPage: number;
    search: string;
}

export default function UserIndex({ users, total, page, perPage, search }: Props) {
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

    const navigate = (params: Record<string, any>) => {
        router.get(index().url, { ...params }, { preserveState: true, preserveScroll: true });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Head title="User Management" />
            <div className="max-w-7xl mx-auto">
                <Card>
                    <DataTable
                        columns={columns}
                        data={users}
                        rowKey="id"
                        total={total}
                        page={page}
                        perPage={perPage}
                        search={search}
                        onPageChange={(p) => navigate({ page: p, perPage, search })}
                        onPerPageChange={(pp) => navigate({ page: 1, perPage: pp, search })}
                        onSearchChange={(s) => navigate({ page: 1, perPage, search: s })}
                        searchPlaceholder="Search users..."
                        title="User Management"
                        extra={
                            <Link href={create().url}>
                                <Button type="primary" icon={<UserOutlined />}>
                                    Add User
                                </Button>
                            </Link>
                        }
                    />
                </Card>
            </div>
        </div>
    );
}

UserIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Users', href: index().url },
    ],
});
