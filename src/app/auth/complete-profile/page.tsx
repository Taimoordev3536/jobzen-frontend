
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Wrench, UserCircle2, Users, ClipboardCheck, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

const roleOptions = [
    {
        value: UserRole.EMPLOYER,
        label: 'Employer',
        description: 'Post jobs and manage workers',
        icon: Building2,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        value: UserRole.WORKER,
        label: 'Worker',
        description: 'Find jobs and get hired',
        icon: Wrench,
        color: 'from-green-500 to-emerald-500',
    },
    {
        value: UserRole.CLIENT,
        label: 'Client',
        description: 'Request services and hire teams',
        icon: UserCircle2,
        color: 'from-purple-500 to-pink-500',
    },
    {
        value: UserRole.PARTNER,
        label: 'Partner',
        description: 'Provide workers and services',
        icon: Users,
        color: 'from-orange-500 to-red-500',
    },
    {
        value: UserRole.INSPECTOR,
        label: 'Inspector',
        description: 'Monitor compliance and resolve disputes',
        icon: ClipboardCheck,
        color: 'from-indigo-500 to-violet-500',
    },
];

export default function CompleteProfilePage() {
    const router = useRouter();
    const { user, setAuth, accessToken, refreshToken } = useAuthStore();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
    };

    const handleSubmit = async () => {
        if (!selectedRole || !user) return;

        try {
            setIsLoading(true);
            // We need an endpoint to update the user's role
            // For now, let's assume we can use a generic update endpoint or creating a specific one
            // I'll create a specific endpoint in the backend for this: /users/complete-profile

            const response = await api.patch('/users/complete-profile', { role: selectedRole });

            // Update local store with new user data
            setAuth(response.data, accessToken!, refreshToken);

            toast.success('Profile completed successfully!');

            // Redirect based on role
            switch (selectedRole) {
                case UserRole.EMPLOYER:
                    router.push('/employer/dashboard');
                    break;
                case UserRole.WORKER:
                    router.push('/worker/dashboard');
                    break;
                case UserRole.CLIENT:
                    router.push('/client/dashboard');
                    break;
                case UserRole.PARTNER:
                    router.push('/partner/dashboard');
                    break;
                case UserRole.INSPECTOR:
                    router.push('/inspector/dashboard');
                    break;
                default:
                    router.push('/dashboard');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-4xl border-2 shadow-xl">
                <CardHeader className="text-center pb-8 border-b bg-white/50 backdrop-blur-sm">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Complete Your Profile
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                        Hi {user?.firstName || 'there'}! Please select how you want to use Jobzen.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {roleOptions.map((role) => {
                            const Icon = role.icon;
                            const isSelected = selectedRole === role.value;
                            return (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => handleRoleSelect(role.value)}
                                    className={`p-6 rounded-xl border-2 transition-all relative overflow-hidden group hover:shadow-lg ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                >
                                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-left mb-1">{role.label}</h3>
                                    <p className="text-sm text-muted-foreground text-left leading-relaxed">
                                        {role.description}
                                    </p>

                                    {isSelected && (
                                        <div className="absolute top-3 right-3 text-primary">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button
                            size="lg"
                            className="w-full md:w-auto min-w-[200px] text-lg h-12"
                            onClick={handleSubmit}
                            disabled={!selectedRole || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    Continue to Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
