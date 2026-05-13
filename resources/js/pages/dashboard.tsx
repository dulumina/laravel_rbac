import { Head, usePage } from '@inertiajs/react';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    KeyOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Progress, Row, Statistic, Table, Tag, Timeline } from 'antd';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const page = usePage();
    const user = page.props.auth.user as any;
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const cardBg = isDark ? '#1e1e2e' : '#ffffff';
    const subText = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? '#2e2e42' : '#e5e7ef';

    const stats = [
        {
            title: 'Total Users',
            value: 1284,
            suffix: null as string | null,
            change: 12.5,
            up: true,
            bg: 'rgba(99, 102, 241, 0.1)',
            color: '#6366f1',
            icon: <TeamOutlined style={{ fontSize: 20 }} />,
        },
        {
            title: 'Active Roles',
            value: 8,
            suffix: null as string | null,
            change: 0,
            up: true,
            bg: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            icon: <SafetyCertificateOutlined style={{ fontSize: 20 }} />,
        },
        {
            title: 'Permissions',
            value: 42,
            suffix: null as string | null,
            change: 5.2,
            up: true,
            bg: 'rgba(245, 158, 11, 0.1)',
            color: '#f59e0b',
            icon: <KeyOutlined style={{ fontSize: 20 }} />,
        },
        {
            title: 'System Health',
            value: 98.6,
            suffix: '%',
            change: 0.2,
            up: true,
            bg: 'rgba(59, 130, 246, 0.1)',
            color: '#3b82f6',
            icon: <RocketOutlined style={{ fontSize: 20 }} />,
        },
    ];

    const recentActivityColumns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (name: string) => (
                <div className="flex items-center gap-2">
                    <Avatar
                        size={28}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            fontSize: 11,
                            fontWeight: 600,
                        }}
                    >
                        {name.charAt(0)}
                    </Avatar>
                    <span style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 500, fontSize: 13 }}>
                        {name}
                    </span>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (action: string) => (
                <span style={{ color: subText, fontSize: 12 }}>{action}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag
                    color={status === 'success' ? 'success' : status === 'warning' ? 'warning' : 'error'}
                    style={{ borderRadius: 6, fontSize: 11 }}
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (time: string) => (
                <span style={{ color: subText, fontSize: 11 }}>{time}</span>
            ),
        },
    ];

    const recentActivity = [
        { key: '1', user: 'John Doe', action: 'Updated user permissions', status: 'success', time: '2 min ago' },
        { key: '2', user: 'Jane Smith', action: 'Created new role', status: 'success', time: '15 min ago' },
        { key: '3', user: 'Bob Johnson', action: 'Failed login attempt', status: 'error', time: '1 hr ago' },
        { key: '4', user: 'Alice Brown', action: 'Exported user data', status: 'warning', time: '2 hr ago' },
        { key: '5', user: 'Charlie Lee', action: 'System config updated', status: 'success', time: '5 hr ago' },
    ];

    const systemMetrics = [
        { label: 'CPU Usage', value: 42, color: '#6366f1' },
        { label: 'Memory', value: 68, color: '#10b981' },
        { label: 'Storage', value: 35, color: '#f59e0b' },
        { label: 'Network', value: 55, color: '#3b82f6' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">
                {/* Welcome Banner */}
                <div
                    className="rounded-2xl p-6 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
                    }}
                >
                    <div
                        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                        style={{ background: 'white', transform: 'translate(30%, -40%)' }}
                    />
                    <div
                        className="absolute bottom-0 right-32 w-32 h-32 rounded-full opacity-10"
                        style={{ background: 'white', transform: 'translate(0%, 40%)' }}
                    />
                    <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">
                                Welcome back, {user?.name?.split(' ')[0]} 👋
                            </h1>
                            <p className="text-indigo-200 text-sm">
                                Here's what's happening in your application today.
                            </p>
                        </div>
                        <div
                            className="px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(8px)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            View Reports
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <Row gutter={[16, 16]}>
                    {stats.map((stat, i) => (
                        <Col xs={24} sm={12} xl={6} key={i}>
                            <Card
                                hoverable
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: 14,
                                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                                }}
                                styles={{ body: { padding: '20px' } }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="text-xs font-medium mb-2 uppercase tracking-wider"
                                            style={{ color: subText }}
                                        >
                                            {stat.title}
                                        </div>
                                        <Statistic
                                            value={stat.value}
                                            suffix={stat.suffix ?? undefined}
                                            valueStyle={{
                                                fontSize: 28,
                                                fontWeight: 700,
                                                color: isDark ? '#e2e8f0' : '#1e293b',
                                                lineHeight: 1.2,
                                            }}
                                        />
                                        {stat.change > 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <span
                                                    className="text-xs font-medium flex items-center gap-0.5"
                                                    style={{ color: stat.up ? '#10b981' : '#ef4444' }}
                                                >
                                                    {stat.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                    {stat.change}%
                                                </span>
                                                <span className="text-xs" style={{ color: subText }}>vs last month</span>
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: stat.bg, color: stat.color }}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Main Content Row */}
                <Row gutter={[16, 16]}>
                    {/* Recent Activity Table */}
                    <Col xs={24} xl={15}>
                        <Card
                            title={
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        Recent Activity
                                    </span>
                                    <span className="text-xs cursor-pointer font-medium" style={{ color: '#6366f1' }}>
                                        View all →
                                    </span>
                                </div>
                            }
                            style={{
                                background: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: 14,
                                boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                            }}
                            styles={{
                                header: {
                                    borderBottom: `1px solid ${borderColor}`,
                                },
                                body: { padding: 0 },
                            }}
                        >
                            <Table
                                dataSource={recentActivity}
                                columns={recentActivityColumns}
                                pagination={false}
                                size="small"
                                style={{ background: 'transparent' }}
                            />
                        </Card>
                    </Col>

                    {/* Right Column */}
                    <Col xs={24} xl={9}>
                        <div className="space-y-4">
                            {/* System Metrics */}
                            <Card
                                title={
                                    <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        System Metrics
                                    </span>
                                }
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: 14,
                                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                                }}
                                styles={{
                                    header: { borderBottom: `1px solid ${borderColor}` },
                                    body: { padding: '20px' },
                                }}
                            >
                                <div className="space-y-4">
                                    {systemMetrics.map((metric, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-xs font-medium" style={{ color: subText }}>
                                                    {metric.label}
                                                </span>
                                                <span className="text-xs font-bold" style={{ color: metric.color }}>
                                                    {metric.value}%
                                                </span>
                                            </div>
                                            <Progress
                                                percent={metric.value}
                                                showInfo={false}
                                                strokeColor={metric.color}
                                                trailColor={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                                                strokeWidth={6}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Timeline */}
                            <Card
                                title={
                                    <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        Timeline
                                    </span>
                                }
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: 14,
                                    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                                }}
                                styles={{
                                    header: { borderBottom: `1px solid ${borderColor}` },
                                    body: { padding: '20px' },
                                }}
                            >
                                <Timeline
                                    items={[
                                        {
                                            color: '#6366f1',
                                            children: (
                                                <div>
                                                    <div className="text-xs font-medium" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                                        New user registered
                                                    </div>
                                                    <div className="text-xs mt-0.5" style={{ color: subText }}>5 minutes ago</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            color: '#10b981',
                                            children: (
                                                <div>
                                                    <div className="text-xs font-medium" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                                        Role permissions updated
                                                    </div>
                                                    <div className="text-xs mt-0.5" style={{ color: subText }}>30 minutes ago</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            color: '#f59e0b',
                                            children: (
                                                <div>
                                                    <div className="text-xs font-medium" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                                        System backup completed
                                                    </div>
                                                    <div className="text-xs mt-0.5" style={{ color: subText }}>2 hours ago</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            color: '#3b82f6',
                                            children: (
                                                <div>
                                                    <div className="text-xs font-medium" style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                                        Configuration saved
                                                    </div>
                                                    <div className="text-xs mt-0.5" style={{ color: subText }}>5 hours ago</div>
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

Dashboard.layout = () => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
});
