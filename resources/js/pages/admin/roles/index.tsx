import { DeleteOutlined, EditOutlined, MoreOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Card, Dropdown, Modal, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
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
            width: 60,
            render: (_, record) => {
                const isSuperAdmin = record.name === 'super-admin';

                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        icon: <EditOutlined />,
                        label: 'Edit',
                        onClick: () => router.get(edit(record.id).url),
                    },
                    { type: 'divider' },
                    {
                        key: 'delete',
                        icon: <DeleteOutlined />,
                        label: 'Delete',
                        danger: true,
                        disabled: isSuperAdmin,
                        onClick: () =>
                            Modal.confirm({
                                title: 'Delete role',
                                content: `Are you sure you want to delete "${record.name}"?`,
                                okText: 'Yes',
                                cancelText: 'No',
                                okType: 'danger',
                                onOk: () => router.delete(destroy(record.id).url),
                            }),
                    },
                ];

                return (
                    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                        <Button type="text" icon={<MoreOutlined />} size="small" />
                    </Dropdown>
                );
            },
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
