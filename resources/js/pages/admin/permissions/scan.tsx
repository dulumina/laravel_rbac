import { CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Head, Link, router } from '@inertiajs/react';
import { Badge, Button, Card, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { index, store, storeBulk } from '@/actions/App/Http/Controllers/Admin/PermissionController';

const { Text } = Typography;

interface ScanResult {
    name: string;
    feature: string;
    guard_name: string;
    created_at: string | null;
    in_db: boolean;
    in_code: boolean;
    files: string[];
    id: number | null;
}

interface Props {
    scanResults: ScanResult[];
}

export default function PermissionScan({ scanResults }: Props) {
    const handleAddMissing = (name: string) => {
        router.post(store().url, { name });
    };

    const handleAddAllMissing = () => {
        const missingNames = scanResults.filter((r) => !r.in_db).map((r) => r.name);
        if (missingNames.length > 0) {
            router.post(storeBulk().url, { names: missingNames });
        }
    };

    const columns: ColumnsType<ScanResult> = [
        {
            title: 'Feature',
            dataIndex: 'feature',
            key: 'feature',
            render: (text) => <Tag color="blue">{text}</Tag>,
            filters: Array.from(new Set(scanResults.map(r => r.feature))).map(f => ({ text: f, value: f })),
            onFilter: (value, record) => record.feature === value,
        },
        {
            title: 'Permission Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Text code className="text-blue-600">{text}</Text>,
        },
        {
            title: 'In DB',
            dataIndex: 'in_db',
            key: 'in_db',
            align: 'center',
            render: (inDb, record) => (
                <Space>
                    {inDb ? (
                        <Tooltip title="Found in database">
                            <CheckCircleOutlined className="text-green-500 text-lg" />
                        </Tooltip>
                    ) : (
                        <Space>
                            <Tooltip title="Missing from database">
                                <CloseCircleOutlined className="text-red-500 text-lg" />
                            </Tooltip>
                            <Button
                                size="small"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => handleAddMissing(record.name)}
                            >
                                Add
                            </Button>
                        </Space>
                    )}
                </Space>
            ),
        },
        {
            title: 'In Code',
            dataIndex: 'in_code',
            key: 'in_code',
            align: 'center',
            render: (inCode, record) => (
                inCode ? (
                    <Tooltip title={`Found in ${record.files.length} files`}>
                        <CheckCircleOutlined className="text-green-500 text-lg" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Not found in source code or routes">
                        <Badge status="warning" text="Unused" />
                    </Tooltip>
                )
            ),
        },
        {
            title: 'Files / Locations',
            key: 'files',
            render: (_, record) => (
                record.files.length > 0 ? (
                    <div className="max-w-xs overflow-hidden">
                        {record.files.map((file, i) => (
                            <div key={i} className="text-xs text-gray-500 truncate mb-1">
                                <FileTextOutlined className="mr-1" />
                                {file}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text type="secondary" italic>No code matches found</Text>
                )
            ),
        },
    ];

    return (
        <div className="p-6">
            <Head title="Scan Permissions" />
            <Card
                title={
                    <Space>
                        <Button
                            icon={<LeftOutlined />}
                            onClick={() => router.get(index().url)}
                        />
                        <span>Permission Scan Results</span>
                    </Space>
                }
                extra={
                    <Space size="large">
                        <Space>
                            <Badge status="success" text="In Sync" />
                            <Badge status="error" text="Missing from DB" />
                            <Badge status="warning" text="Unused in Code" />
                        </Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            disabled={!scanResults.some((r) => !r.in_db)}
                            onClick={handleAddAllMissing}
                        >
                            Add All Missing
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={scanResults}
                    rowKey="name"
                    pagination={{ pageSize: 20 }}
                />
            </Card>
        </div>
    );
}

PermissionScan.layout = () => ({
    breadcrumbs: [
        { title: 'Admin', href: '#' },
        { title: 'Permissions', href: index().url },
        { title: 'Scan', href: '#' },
    ],
});
