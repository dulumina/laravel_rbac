import { Link } from '@inertiajs/react';
import { Zap } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div
            className="min-h-svh flex items-center justify-center p-6 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)',
            }}
        >
            {/* Background decorations */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
                        radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 60% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
                    `,
                }}
            />

            {/* Animated orbs */}
            <div
                className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    top: '-10%',
                    left: '-10%',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />
            <div
                className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    bottom: '-5%',
                    right: '-5%',
                    animation: 'float 12s ease-in-out infinite reverse',
                }}
            />

            <div className="w-full max-w-sm relative z-10">
                <div className="flex flex-col gap-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 no-underline"
                        >
                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.5)',
                                }}
                            >
                                <Zap size={26} />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-white text-lg leading-tight">
                                    Laravel RBAC
                                </div>
                            </div>
                        </Link>

                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                            <p className="text-sm text-slate-400">{description}</p>
                        </div>
                    </div>

                    {/* Form container */}
                    <div
                        className="rounded-2xl p-6"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(5deg); }
                    66% { transform: translateY(10px) rotate(-3deg); }
                }
            `}</style>
        </div>
    );
}
