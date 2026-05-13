import { Head, Link } from '@inertiajs/react';
import {
    CheckCircleOutlined,
    BookOutlined,
    ToolOutlined,
    CloudServerOutlined,
    DatabaseOutlined,
    CodeOutlined,
    RocketOutlined,
    ArrowLeftOutlined,
    GithubOutlined,
    NodeIndexOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Typography, Tag, Divider } from 'antd';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';

const { Title, Text, Paragraph } = Typography;

const backendPackages = [
    { name: 'laravel/framework', version: '^13.7', description: 'Laravel framework core' },
    { name: 'laravel/fortify', version: '^1.34', description: 'Authentication backend (login, register, 2FA, etc.)' },
    { name: 'laravel/wayfinder', version: '^0.1.14', description: 'Type-safe route generation for JavaScript' },
    { name: 'inertiajs/inertia-laravel', version: '^3.0', description: 'Inertia.js server-side adapter' },
    { name: 'spatie/laravel-permission', version: '^7.4', description: 'Role & permission management' },
    { name: 'laravel/tinker', version: '^3.0', description: 'Interactive PHP REPL' },
];

const devBackendPackages = [
    { name: 'pestphp/pest', version: '^4.7', description: 'Modern PHP testing framework' },
    { name: 'pestphp/pest-plugin-laravel', version: '^4.1', description: 'Pest integration for Laravel' },
    { name: 'laravel/pint', version: '^1.27', description: 'PHP code style fixer' },
    { name: 'laravel/sail', version: '^1.58', description: 'Docker development environment' },
    { name: 'laravel/boost', version: '^2.2', description: 'Laravel development assistant (MCP)' },
    { name: 'laravel/pail', version: '^1.2.5', description: 'Log viewer for the terminal' },
    { name: 'fakerphp/faker', version: '^1.24', description: 'Fake data generator for tests' },
];

const frontendPackages = [
    { name: 'react', version: '^19.2.0', description: 'UI library' },
    { name: 'antd', version: '^6.3.7', description: 'Ant Design component library' },
    { name: '@inertiajs/react', version: '^3.0.0', description: 'Inertia.js React adapter' },
    { name: '@inertiajs/vite', version: '^3.0.0', description: 'Inertia.js Vite plugin' },
    { name: 'tailwindcss', version: '^4.0.0', description: 'Utility-first CSS framework' },
    { name: '@headlessui/react', version: '^2.2.0', description: 'Headless UI primitives' },
    { name: '@radix-ui/*', version: '^1.x', description: 'Accessible UI primitives (avatar, dialog, dropdown, etc.)' },
    { name: 'lucide-react', version: '^0.475.0', description: 'Icon library' },
    { name: 'sonner', version: '^2.0.0', description: 'Toast notifications' },
    { name: 'typescript', version: '^5.7.2', description: 'TypeScript language' },
    { name: 'vite', version: '^8.0.0', description: 'Build tool and dev server' },
];

const requirements = [
    { icon: <CodeOutlined />, label: 'PHP', value: '^8.3' },
    { icon: <DatabaseOutlined />, label: 'Database', value: 'MySQL / PostgreSQL / SQLite' },
    { icon: <CloudServerOutlined />, label: 'Web Server', value: 'Apache / Nginx' },
    { icon: <NodeIndexOutlined />, label: 'Node.js', value: '>= 18' },
    { icon: <ToolOutlined />, label: 'Composer', value: '^2.0' },
    { icon: <GithubOutlined />, label: 'Git', value: 'Any modern version' },
];

export default function Readme() {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const cardBg = isDark ? '#1e1e2e' : '#ffffff';
    const subText = isDark ? '#94a3b8' : '#64748b';
    const borderColor = isDark ? '#2e2e42' : '#e5e7ef';

    return (
        <>
            <Head title="README" />

            <div
                className="min-h-screen"
                style={{ background: isDark ? '#13131f' : '#f5f6fa' }}
            >
                {/* Header */}
                <header
                    className="sticky top-0 z-50 border-b"
                    style={{
                        background: isDark ? 'rgba(30, 30, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        borderColor: borderColor,
                    }}
                >
                    <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl font-bold text-sm text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                }}
                            >
                                R
                            </div>
                            <span
                                className="text-lg font-bold"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                README
                            </span>
                        </div>

                        <Link href={home()}>
                            <Button type="default" shape="round" icon={<ArrowLeftOutlined />}>
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="mx-auto max-w-5xl px-6 py-12 space-y-10">
                    {/* Description */}
                    <section>
                        <Card
                            style={{
                                background: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: 14,
                            }}
                            styles={{ body: { padding: '32px' } }}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    }}
                                >
                                    <RocketOutlined style={{ fontSize: 24, color: 'white' }} />
                                </div>
                                <div>
                                    <Title
                                        level={2}
                                        className="!mb-1"
                                        style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                    >
                                        Laravel Slash
                                    </Title>
                                    <Text style={{ color: subText }}>
                                        A modern full-stack starter kit built with Laravel 13, React 19,
                                        Inertia.js 3, and Ant Design 6.
                                    </Text>
                                </div>
                            </div>

                            <Divider style={{ borderColor }} />

                            <Paragraph
                                className="!text-base !leading-relaxed"
                                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                            >
                                Laravel Slash is a production-ready application starter kit that combines
                                the robustness of the Laravel framework with the dynamism of modern
                                frontend technologies. It provides a solid foundation for building
                                full-stack web applications with a great developer experience.
                            </Paragraph>

                            <Paragraph
                                className="!text-base !leading-relaxed"
                                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                            >
                                The stack features Laravel 13 on the backend with Fortify for authentication,
                                Spatie permissions for RBAC, and Wayfinder for type-safe routing. The
                                frontend uses React 19 with Inertia.js for seamless server-side rendering,
                                Ant Design 6 for a polished UI, and Tailwind CSS 4 for utility-first styling.
                                TypeScript is used throughout for type safety.
                            </Paragraph>
                        </Card>
                    </section>

                    {/* System Requirements */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <CloudServerOutlined style={{ fontSize: 22, color: '#6366f1' }} />
                            <Title
                                level={3}
                                className="!mb-0"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                System Requirements
                            </Title>
                        </div>

                        <Row gutter={[16, 16]}>
                            {requirements.map((req, i) => (
                                <Col xs={24} sm={12} lg={8} key={i}>
                                    <Card
                                        hoverable
                                        style={{
                                            background: cardBg,
                                            border: `1px solid ${borderColor}`,
                                            borderRadius: 12,
                                        }}
                                        styles={{ body: { padding: '20px' } }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-10 w-10 items-center justify-center rounded-xl"
                                                style={{
                                                    background: isDark
                                                        ? 'rgba(99, 102, 241, 0.15)'
                                                        : 'rgba(99, 102, 241, 0.08)',
                                                    color: '#6366f1',
                                                }}
                                            >
                                                {req.icon}
                                            </div>
                                            <div>
                                                <Text
                                                    className="!text-sm font-medium"
                                                    style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                                >
                                                    {req.label}
                                                </Text>
                                                <br />
                                                <Text className="!text-xs" style={{ color: subText }}>
                                                    {req.value}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>

                    {/* Installation */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOutlined style={{ fontSize: 22, color: '#10b981' }} />
                            <Title
                                level={3}
                                className="!mb-0"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                Installation Guide
                            </Title>
                        </div>

                        <Card
                            style={{
                                background: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: 14,
                            }}
                            styles={{ body: { padding: '28px' } }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 1</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Clone the Repository
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        git clone https://github.com/your-username/laravel_slash.git
                                        <br />
                                        cd laravel_slash
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 2</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Install PHP Dependencies
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        composer install
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 3</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Environment Configuration
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        cp .env.example .env
                                        <br />
                                        php artisan key:generate
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 4</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Database Setup
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        # Edit .env file with your database credentials
                                        <br />
                                        php artisan migrate
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 5</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Install Frontend Dependencies & Build
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        npm install
                                        <br />
                                        npm run build
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="success" style={{ borderRadius: 6 }}>Step 6</Tag>
                                        <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                            Run the Application
                                        </Text>
                                    </div>
                                    <div
                                        className="rounded-xl p-4 font-mono text-sm"
                                        style={{
                                            background: isDark ? '#0d0d1a' : '#f1f5f9',
                                            color: isDark ? '#e2e8f0' : '#1e293b',
                                            border: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        composer run dev
                                    </div>
                                    <Paragraph className="!mt-2 !text-sm" style={{ color: subText }}>
                                        This will start the Laravel development server, queue worker, log
                                        viewer, and Vite dev server concurrently.
                                    </Paragraph>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Vendors */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <ToolOutlined style={{ fontSize: 22, color: '#f59e0b' }} />
                            <Title
                                level={3}
                                className="!mb-0"
                                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                            >
                                Vendors & Packages
                            </Title>
                        </div>

                        <div className="space-y-6">
                            {/* Backend */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircleOutlined style={{ color: '#6366f1' }} />
                                    <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        Backend (PHP / Composer)
                                    </Text>
                                </div>
                                <Row gutter={[12, 12]}>
                                    {backendPackages.map((pkg, i) => (
                                        <Col xs={24} md={12} key={i}>
                                            <Card
                                                size="small"
                                                style={{
                                                    background: isDark
                                                        ? 'rgba(30, 30, 46, 0.6)'
                                                        : '#ffffff',
                                                    border: `1px solid ${borderColor}`,
                                                    borderRadius: 10,
                                                }}
                                                styles={{ body: { padding: '14px 16px' } }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <Text
                                                            className="!text-sm font-medium"
                                                            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                                        >
                                                            {pkg.name}
                                                        </Text>
                                                        <br />
                                                        <Text className="!text-xs" style={{ color: subText }}>
                                                            {pkg.description}
                                                        </Text>
                                                    </div>
                                                    <Tag
                                                        color="default"
                                                        style={{
                                                            borderRadius: 6,
                                                            fontSize: 11,
                                                            marginLeft: 8,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {pkg.version}
                                                    </Tag>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>

                            {/* Backend Dev */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircleOutlined style={{ color: '#10b981' }} />
                                    <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        Backend Dev (PHP / Composer)
                                    </Text>
                                </div>
                                <Row gutter={[12, 12]}>
                                    {devBackendPackages.map((pkg, i) => (
                                        <Col xs={24} md={12} key={i}>
                                            <Card
                                                size="small"
                                                style={{
                                                    background: isDark
                                                        ? 'rgba(30, 30, 46, 0.6)'
                                                        : '#ffffff',
                                                    border: `1px solid ${borderColor}`,
                                                    borderRadius: 10,
                                                }}
                                                styles={{ body: { padding: '14px 16px' } }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <Text
                                                            className="!text-sm font-medium"
                                                            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                                        >
                                                            {pkg.name}
                                                        </Text>
                                                        <br />
                                                        <Text className="!text-xs" style={{ color: subText }}>
                                                            {pkg.description}
                                                        </Text>
                                                    </div>
                                                    <Tag
                                                        color="default"
                                                        style={{
                                                            borderRadius: 6,
                                                            fontSize: 11,
                                                            marginLeft: 8,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {pkg.version}
                                                    </Tag>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>

                            {/* Frontend */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircleOutlined style={{ color: '#f59e0b' }} />
                                    <Text strong style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
                                        Frontend (npm)
                                    </Text>
                                </div>
                                <Row gutter={[12, 12]}>
                                    {frontendPackages.map((pkg, i) => (
                                        <Col xs={24} md={12} key={i}>
                                            <Card
                                                size="small"
                                                style={{
                                                    background: isDark
                                                        ? 'rgba(30, 30, 46, 0.6)'
                                                        : '#ffffff',
                                                    border: `1px solid ${borderColor}`,
                                                    borderRadius: 10,
                                                }}
                                                styles={{ body: { padding: '14px 16px' } }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <Text
                                                            className="!text-sm font-medium"
                                                            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                                        >
                                                            {pkg.name}
                                                        </Text>
                                                        <br />
                                                        <Text className="!text-xs" style={{ color: subText }}>
                                                            {pkg.description}
                                                        </Text>
                                                    </div>
                                                    <Tag
                                                        color="default"
                                                        style={{
                                                            borderRadius: 6,
                                                            fontSize: 11,
                                                            marginLeft: 8,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {pkg.version}
                                                    </Tag>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer
                        className="rounded-2xl px-8 py-6 text-center"
                        style={{
                            background: cardBg,
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        <Text className="!text-sm" style={{ color: subText }}>
                            Built with Laravel 13 · React 19 · Inertia.js 3 · Ant Design 6
                        </Text>
                    </footer>
                </div>
            </div>
        </>
    );
}
