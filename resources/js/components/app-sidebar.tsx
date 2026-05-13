import { Link, router, usePage } from '@inertiajs/react';
import { Avatar, Dropdown, Layout, Menu, Tooltip } from 'antd';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    ShieldCheck,
    UserCheck,
    Users,
    Zap,
} from 'lucide-react';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    SwapOutlined,
} from '@ant-design/icons';
import { index as permissionIndex } from '@/actions/App/Http/Controllers/Admin/PermissionController';
import { index as roleIndex } from '@/actions/App/Http/Controllers/Admin/RoleController';
import { index as userIndex } from '@/actions/App/Http/Controllers/Admin/UserController';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';
import { logout } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import { useAppearance } from '@/hooks/use-appearance';

const { Sider } = Layout;

type AppSidebarProps = {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
    isMobile?: boolean;
};

export function AppSidebar({ collapsed, onCollapse, isMobile }: AppSidebarProps) {
    const page = usePage();
    const user = page.props.auth.user as any;
    const currentTeam = page.props.currentTeam as any;
    const teams = (page.props.teams ?? []) as any[];
    const { isCurrentUrl } = useCurrentUrl();
    const getInitials = useInitials();
    const dashboardUrl = dashboard();
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const isAdmin = user?.can_access_admin;

    const getActiveKey = () => {
        if (isCurrentUrl(dashboardUrl)) return 'dashboard';
        if (isAdmin) {
            if (isCurrentUrl(userIndex().url)) return 'users';
            if (isCurrentUrl(roleIndex().url)) return 'roles';
            if (isCurrentUrl(permissionIndex().url)) return 'permissions';
        }
        return 'dashboard';
    };

    const mainItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            icon: <LayoutGrid size={16} />,
            label: <Link href={dashboardUrl} prefetch>Dashboard</Link>,
        },
    ];

    const adminItems: MenuProps['items'] = isAdmin ? [
        {
            key: 'platform-group',
            type: 'group',
            label: <span className="text-xs font-semibold uppercase tracking-widest opacity-50">Platform</span>,
            children: [
                {
                    key: 'users',
                    icon: <Users size={16} />,
                    label: <Link href={userIndex().url} prefetch>User Management</Link>,
                },
                {
                    key: 'roles',
                    icon: <ShieldCheck size={16} />,
                    label: <Link href={roleIndex().url} prefetch>Role Management</Link>,
                },
                {
                    key: 'permissions',
                    icon: <UserCheck size={16} />,
                    label: <Link href={permissionIndex().url} prefetch>Permissions</Link>,
                },
            ],
        },
    ] : [];

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <SettingOutlined />,
            label: <Link href={profileEdit()}>Settings</Link>,
        },
        {
            key: 'divider',
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            danger: true,
            label: 'Log out',
            onClick: () => router.visit(logout()),
        },
    ];

    const teamMenuItems: MenuProps['items'] = [
        ...teams.map((team: any) => ({
            key: `team-${team.id}`,
            label: team.name,
            icon: currentTeam?.id === team.id ? (
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            ) : (
                <span className="w-2 h-2 rounded-full bg-transparent border border-gray-300 inline-block" />
            ),
        })),
    ];

    const sidebarBg = isDark
        ? 'linear-gradient(180deg, #13131f 0%, #16162a 100%)'
        : 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)';
    const borderColor = isDark ? '#2e2e42' : '#e5e7ef';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={null}
            width={240}
            collapsedWidth={64}
            style={{
                background: sidebarBg,
                borderRight: `1px solid ${borderColor}`,
                overflow: 'hidden',
                position: isMobile ? 'relative' : 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 100,
                height: isMobile ? '100vh' : 'auto',
                transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div className="flex flex-col h-full w-full">
                {/* Logo / Brand */}
                <div
                    className="flex items-center px-4 transition-all duration-200"
                    style={{
                        height: 64,
                        borderBottom: `1px solid ${borderColor}`,
                        justifyContent: collapsed ? 'center' : 'space-between',
                    }}
                >
                    <Link
                        href={dashboardUrl}
                        prefetch
                        className="flex items-center gap-2.5 no-underline min-w-0"
                    >
                        <div
                            className="flex-shrink-0 flex items-center justify-center rounded-xl text-white"
                            style={{
                                width: 34,
                                height: 34,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                            }}
                        >
                            <Zap size={18} />
                        </div>
                        {!collapsed && (
                            <div className="min-w-0">
                                <div
                                    className="font-bold text-sm leading-tight truncate"
                                    style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                >
                                    Laravel RBAC
                                </div>
                                <div className="text-xs leading-tight" style={{ color: textColor }}>
                                    Admin Panel
                                </div>
                            </div>
                        )}
                    </Link>
                    {!collapsed && (
                        <button
                            onClick={() => onCollapse(true)}
                            className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                            style={{ color: textColor }}
                        >
                            <MenuFoldOutlined style={{ fontSize: 14 }} />
                        </button>
                    )}
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden py-3" style={{ scrollbarWidth: 'none' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[getActiveKey()]}
                        inlineCollapsed={collapsed}
                        items={mainItems}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: 13,
                        }}
                    />
                    {isAdmin && (
                        <Menu
                            mode="inline"
                            selectedKeys={[getActiveKey()]}
                            inlineCollapsed={collapsed}
                            items={adminItems}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: 13,
                            }}
                        />
                    )}
                </div>

                {/* Team Switcher */}
                {!collapsed && currentTeam && (
                    <div
                        className="px-3 py-2 mt-auto"
                        style={{ borderTop: `1px solid ${borderColor}` }}
                    >
                        <Dropdown menu={{ items: teamMenuItems }} trigger={['click']} placement="topLeft">
                            <button
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-colors border-0 bg-transparent"
                                style={{
                                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.05)',
                                    color: isDark ? '#94a3b8' : '#64748b',
                                }}
                            >
                                <div
                                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                                >
                                    {currentTeam.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <div
                                        className="text-xs font-medium truncate"
                                        style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                    >
                                        {currentTeam.name}
                                    </div>
                                    <div className="text-xs opacity-60">Switch team</div>
                                </div>
                                <SwapOutlined style={{ fontSize: 12 }} />
                            </button>
                        </Dropdown>
                    </div>
                )}

                {/* User Profile */}
                <div
                    className={!collapsed && !currentTeam ? "px-3 py-3 mt-auto" : "px-3 py-3"}
                    style={{ borderTop: `1px solid ${borderColor}` }}
                >
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        trigger={['click']}
                        placement="topLeft"
                    >
                        <button
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer transition-all border-0 bg-transparent group"
                            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                        >
                            <Avatar
                                src={user.avatar || undefined}
                                size={32}
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    flexShrink: 0,
                                    boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                                }}
                            >
                                {!user.avatar && getInitials(user.name)}
                            </Avatar>
                            {!collapsed && (
                                <div className="flex-1 text-left min-w-0">
                                    <div
                                        className="text-xs font-semibold truncate"
                                        style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                                    >
                                        {user.name}
                                    </div>
                                    <div
                                        className="text-xs truncate opacity-60"
                                        style={{ color: textColor }}
                                    >
                                        {user.email}
                                    </div>
                                </div>
                            )}
                        </button>
                    </Dropdown>
                </div>

                {/* Collapse Toggle (when expanded — show at bottom) */}
                {collapsed && (
                    <Tooltip title="Expand Sidebar" placement="right">
                        <button
                            onClick={() => onCollapse(false)}
                            className="w-full flex items-center justify-center py-3 cursor-pointer border-0 mt-auto bg-transparent transition-colors"
                            style={{
                                borderTop: `1px solid ${borderColor}`,
                                color: textColor,
                            }}
                        >
                            <MenuUnfoldOutlined style={{ fontSize: 16 }} />
                        </button>
                    </Tooltip>
                )}
            </div>
        </Sider>
    );
}
