import { Head, Link, usePage } from '@inertiajs/react';
import {
    RocketOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    TeamOutlined,
    ArrowRightOutlined,
    GithubOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Typography, Space } from 'antd';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard, login, register } from '@/routes';

const { Title, Text, Paragraph } = Typography;

const features = [
    {
        icon: <ThunderboltOutlined style={{ fontSize: 24 }} />,
        title: 'Blazing Fast',
        description: 'Built on Laravel\'s powerful architecture for lightning-fast performance and response times.',
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.1)',
    },
    {
        icon: <SafetyCertificateOutlined style={{ fontSize: 24 }} />,
        title: 'Enterprise Security',
        description: 'Fortified with industry-standard security protocols including 2FA, encryption, and more.',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
        icon: <TeamOutlined style={{ fontSize: 24 }} />,
        title: 'Team Collaboration',
        description: 'Seamless team management with role-based access controls and real-time collaboration.',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
        icon: <RocketOutlined style={{ fontSize: 24 }} />,
        title: 'Modern Stack',
        description: 'React, TypeScript, Inertia.js, and Ant Design — a cutting-edge tech stack at your fingertips.',
        color: '#3b82f6',
        bg: 'rgba(59, 130, 216, 0.1)',
    },
];

const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Users' },
    { value: '150+', label: 'Countries' },
    { value: '5★', label: 'Rating' },
];

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const cardBg = isDark ? '#1e1e2e' : '#ffffff';
    const subText = isDark ? '#94a3b8' : '#64748b';

    return (
        <>
            <Head title="Welcome" />

            <div
                className="min-h-screen"
                style={{ background: isDark ? '#13131f' : '#f5f6fa' }}
            >
                {/* Navigation */}
                <header
                    className="sticky top-0 z-50 border-b"
                    style={{
                        background: isDark ? 'rgba(30, 30, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        borderColor: isDark ? '#2e2e42' : '#e5e7ef',
                    }}
                >
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-sm text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                }}
                            >
                                S
                            </div>
                            <span
                                className="text-lg font-bold"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                Startup
                            </span>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button type="primary" shape="round" size="large">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button
                                            type="default"
                                            shape="round"
                                            size="large"
                                            style={{
                                                background: isDark ? '#2a2a3e' : undefined,
                                                borderColor: isDark ? '#2e2e42' : undefined,
                                                color: isDark ? '#e2e8f0' : undefined,
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()}>
                                            <Button type="primary" shape="round" size="large">
                                                Get Started
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden px-6 py-20 lg:py-32">
                    <div
                        className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
                        style={{ background: '#6366f1' }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
                        style={{ background: '#a855f7' }}
                    />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                            style={{
                                background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                                color: '#6366f1',
                                border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)'}`,
                            }}
                        >
                            <StarOutlined />
                            <span>Now powered by Laravel 13 & React 19</span>
                        </div>

                        <Title
                            level={1}
                            className="mb-6 !text-4xl !leading-tight lg:!text-6xl"
                            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                        >
                            Build Amazing
                            <br />
                            <span
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
                            >
                                Applications Faster
                            </span>
                        </Title>

                        <Paragraph
                            className="mx-auto mb-10 max-w-2xl text-lg"
                            style={{ color: subText }}
                        >
                            A modern, full-stack starter kit combining Laravel's robust backend with
                            React's dynamic frontend — featuring Inertia.js, Ant Design, and TypeScript
                            for an unparalleled development experience.
                        </Paragraph>

                        <Space size="large" className="flex-wrap justify-center">
                            {canRegister && (
                                <Link href={register()}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        shape="round"
                                        icon={<ArrowRightOutlined />}
                                        style={{
                                            height: 48,
                                            paddingInline: 32,
                                            fontSize: 16,
                                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                            border: 'none',
                                            boxShadow: '0 4px 24px rgba(99, 102, 241, 0.4)',
                                        }}
                                    >
                                        Start Building
                                    </Button>
                                </Link>
                            )}
                            <Link href="https://github.com" target="_blank">
                                <Button
                                    size="large"
                                    shape="round"
                                    icon={<GithubOutlined />}
                                    style={{
                                        height: 48,
                                        paddingInline: 32,
                                        fontSize: 16,
                                        background: isDark ? '#2a2a3e' : '#ffffff',
                                        borderColor: isDark ? '#2e2e42' : '#e5e7ef',
                                        color: isDark ? '#e2e8f0' : '#1e293b',
                                    }}
                                >
                                    View on GitHub
                                </Button>
                            </Link>
                        </Space>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="px-6 pb-8">
                    <div
                        className="mx-auto max-w-5xl rounded-2xl p-8"
                        style={{
                            background: cardBg,
                            border: `1px solid ${isDark ? '#2e2e42' : '#e5e7ef'}`,
                            boxShadow: isDark
                                ? '0 2px 8px rgba(0,0,0,0.3)'
                                : '0 2px 8px rgba(0,0,0,0.06)',
                        }}
                    >
                        <Row gutter={[32, 32]} className="text-center">
                            {stats.map((stat, i) => (
                                <Col xs={12} md={6} key={i}>
                                    <div
                                        className="text-3xl font-bold tracking-tight"
                                        style={{
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-sm font-medium" style={{ color: subText }}>
                                        {stat.label}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <Title
                                level={2}
                                className="!mb-3"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                Everything You Need
                            </Title>
                            <Paragraph
                                className="mx-auto max-w-xl text-base"
                                style={{ color: subText }}
                            >
                                A comprehensive set of tools and features to accelerate your development workflow.
                            </Paragraph>
                        </div>

                        <Row gutter={[24, 24]}>
                            {features.map((feature, i) => (
                                <Col xs={24} sm={12} lg={6} key={i}>
                                    <Card
                                        hoverable
                                        style={{
                                            background: cardBg,
                                            border: `1px solid ${isDark ? '#2e2e42' : '#e5e7ef'}`,
                                            borderRadius: 14,
                                            height: '100%',
                                            boxShadow: isDark
                                                ? '0 2px 8px rgba(0,0,0,0.2)'
                                                : '0 2px 8px rgba(0,0,0,0.04)',
                                        }}
                                        styles={{ body: { padding: '24px' } }}
                                    >
                                        <div
                                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                                            style={{ background: feature.bg, color: feature.color }}
                                        >
                                            {feature.icon}
                                        </div>
                                        <Title
                                            level={4}
                                            className="!mb-2 !text-base"
                                            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                        >
                                            {feature.title}
                                        </Title>
                                        <Paragraph
                                            className="!mb-0 !text-sm"
                                            style={{ color: subText }}
                                        >
                                            {feature.description}
                                        </Paragraph>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-16 lg:py-24">
                    <div
                        className="mx-auto max-w-4xl rounded-3xl p-12 text-center relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.35)',
                        }}
                    >
                        <div
                            className="absolute top-0 right-0 h-64 w-64 rounded-full opacity-10"
                            style={{ background: 'white', transform: 'translate(30%, -40%)' }}
                        />
                        <div
                            className="absolute bottom-0 left-16 h-40 w-40 rounded-full opacity-10"
                            style={{ background: 'white', transform: 'translate(0%, 40%)' }}
                        />

                        <div className="relative z-10">
                            <Title
                                level={2}
                                className="!mb-4 !text-white !text-3xl lg:!text-4xl"
                            >
                                Ready to Get Started?
                            </Title>
                            <Paragraph className="!mb-8 !text-indigo-200 !text-base max-w-lg mx-auto">
                                Join thousands of developers building modern applications with Laravel and React.
                            </Paragraph>
                            {canRegister && (
                                <Link href={register()}>
                                    <Button
                                        size="large"
                                        shape="round"
                                        icon={<ArrowRightOutlined />}
                                        style={{
                                            height: 48,
                                            paddingInline: 32,
                                            fontSize: 16,
                                            background: 'white',
                                            color: '#6366f1',
                                            border: 'none',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                        }}
                                    >
                                        Create Free Account
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    className="border-t px-6 py-8"
                    style={{
                        borderColor: isDark ? '#2e2e42' : '#e5e7ef',
                        background: cardBg,
                    }}
                >
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                }}
                            >
                                S
                            </div>
                            <span className="text-sm font-medium" style={{ color: subText }}>
                                Startup. Built with Laravel & React.
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a
                                href="https://laravel.com/docs"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm transition-colors hover:text-indigo-500"
                                style={{ color: subText }}
                            >
                                Documentation
                            </a>
                            <a
                                href="https://laracasts.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm transition-colors hover:text-indigo-500"
                                style={{ color: subText }}
                            >
                                Laracasts
                            </a>
                            <a
                                href="https://cloud.laravel.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm transition-colors hover:text-indigo-500"
                                style={{ color: subText }}
                            >
                                Deploy
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm transition-colors hover:text-indigo-500"
                                style={{ color: subText }}
                            >
                                <GithubOutlined style={{ fontSize: 18 }} />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
