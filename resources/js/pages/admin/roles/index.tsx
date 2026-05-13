import { DeleteOutlined, EditOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Card, Popconfirm, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { create, destroy, edit, index } from '@/actions/App/Http/Controllers/Admin/RoleController';
import DataTable from '@/components/data-table';

interface Role {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
}

interface Props {
    roles: Role[];
    total: number;
    page: number;
    perPage: number;
    search: string;
}

export default function RoleIndex({ roles, total, page, perPage, search }: Props) {
    const columns: ColumnsType<Role> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-bold">{text}</span>,
        },
        {
            title: 'Permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: string[]) => (
                <div className="flex flex-wrap gap-1">
                    {permissions.map((perm) => (
                        <Tag color="green" key={perm}>
                            {perm}
                        </Tag>
                    ))}
                </div>
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
                        title="Delete role"
                        description="Are you sure to delete this role?"
                        onConfirm={() => router.delete(destroy(record.id).url)}
                        okText="Yes"
                        cancelText="No"
                        disabled={record.name === 'super-admin'}
                    >
                        <Button danger icon={<DeleteOutlined />} disabled={record.name === 'super-admin'} />
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
            <Head title="Role Management" />
            <div className="max-w-7xl mx-auto">
                <Card>
                    <DataTable
                        columns={columns}
                        data={roles}
                        rowKey="id"
                        total={total}
                        page={page}
                        perPage={perPage}
                        search={search}
                        onPageChange={(p) => navigate({ page: p, perPage, search })}
                        onPerPageChange={(pp) => navigate({ page: 1, perPage: pp, search })}
                        onSearchChange={(s) => navigate({ page: 1, perPage, search: s })}
                        searchPlaceholder="Search roles..."
                        title="Role Management"
                        extra={
                            <Link href={create().url}>
                                <Button type="primary" icon={<SafetyCertificateOutlined />}>
                                    Add Role
                                </Button>
                            </Link>
                        }
                    />
                </Card>
            </div>
        </div>
    );
}

RoleIndex.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Roles', href: index().url },
    ],
});
