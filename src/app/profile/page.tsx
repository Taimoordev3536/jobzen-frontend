'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { StatCard } from '@/components/dashboard/StatCard';
import { getDashboardConfig } from '@/config/dashboard.config';
import { UserRole } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import { getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import {
    User,
    Mail,
    Phone,
    Save,
    Shield,
    Building2,
    Wrench,
    UserCircle2,
    UsersIcon,
    ClipboardCheck,
    CheckCircle2,
    Edit3,
    Lock,
    Calendar,
    Star,
    Briefcase,
    X,
} from 'lucide-react';

// ─── Role metadata ────────────────────────────────────────────────────────────
const ROLE_META: Record<UserRole, { label: string; icon: any; decorativeIcon: any }> = {
    [UserRole.ADMIN]: { label: 'System Administrator', icon: Shield, decorativeIcon: Shield },
    [UserRole.EMPLOYER]: { label: 'Employer', icon: Building2, decorativeIcon: Briefcase },
    [UserRole.WORKER]: { label: 'Worker', icon: Wrench, decorativeIcon: Wrench },
    [UserRole.CLIENT]: { label: 'Client', icon: UserCircle2, decorativeIcon: Star },
    [UserRole.PARTNER]: { label: 'Partner', icon: UsersIcon, decorativeIcon: UsersIcon },
    [UserRole.INSPECTOR]: { label: 'Inspector', icon: ClipboardCheck, decorativeIcon: ClipboardCheck },
    [UserRole.UNASSIGNED]: { label: 'Unassigned', icon: User, decorativeIcon: User },
};

// ─── Role stats (mock) ────────────────────────────────────────────────────────
const ROLE_STATS: Partial<Record<UserRole, Array<{ title: string; value: string; change: string; icon: any; colorIndex: 1 | 2 | 3 | 4 }>>> = {
    [UserRole.EMPLOYER]: [
        { title: 'Active Jobs', value: '24', change: '+3 this week', icon: Briefcase, colorIndex: 1 },
        { title: 'Total Workers', value: '156', change: '+12 this month', icon: UsersIcon, colorIndex: 2 },
        { title: 'Jobs Completed', value: '842', change: '+48 this week', icon: CheckCircle2, colorIndex: 3 },
        { title: 'Avg. Rating', value: '4.8★', change: 'Based on 320 reviews', icon: Star, colorIndex: 4 },
    ],
    [UserRole.WORKER]: [
        { title: 'Jobs Completed', value: '47', change: '+5 this month', icon: CheckCircle2, colorIndex: 1 },
        { title: 'Active Jobs', value: '3', change: 'Currently assigned', icon: Briefcase, colorIndex: 2 },
        { title: 'Avg. Rating', value: '4.9★', change: 'Based on 47 reviews', icon: Star, colorIndex: 3 },
        { title: 'Hours Worked', value: '380h', change: 'This month', icon: Calendar, colorIndex: 4 },
    ],
    [UserRole.CLIENT]: [
        { title: 'Service Requests', value: '12', change: '+2 this month', icon: Briefcase, colorIndex: 1 },
        { title: 'Completed', value: '9', change: '75% completion rate', icon: CheckCircle2, colorIndex: 2 },
        { title: 'Favourites', value: '5', change: 'Saved workers', icon: Star, colorIndex: 3 },
        { title: 'Member Since', value: '2024', change: 'Active member', icon: Calendar, colorIndex: 4 },
    ],
    [UserRole.PARTNER]: [
        { title: 'Companies', value: '8', change: 'Onboarded', icon: Building2, colorIndex: 1 },
        { title: 'Active Contracts', value: '15', change: '+3 this month', icon: Briefcase, colorIndex: 2 },
        { title: 'Commission', value: '$4.2K', change: 'This quarter', icon: Star, colorIndex: 3 },
        { title: 'Avg. Rating', value: '4.7★', change: 'Based on 80 reviews', icon: CheckCircle2, colorIndex: 4 },
    ],
    [UserRole.ADMIN]: [
        { title: 'Total Users', value: '1,240', change: '+24 this week', icon: UsersIcon, colorIndex: 1 },
        { title: 'Active Jobs', value: '340', change: '+18 today', icon: Briefcase, colorIndex: 2 },
        { title: 'Platform Rating', value: '4.8★', change: 'Overall score', icon: Star, colorIndex: 3 },
        { title: 'Revenue', value: '$124K', change: 'This month', icon: CheckCircle2, colorIndex: 4 },
    ],
    [UserRole.INSPECTOR]: [
        { title: 'Cases Reviewed', value: '89', change: '+6 this week', icon: ClipboardCheck, colorIndex: 1 },
        { title: 'Pending Cases', value: '4', change: 'Awaiting review', icon: Briefcase, colorIndex: 2 },
        { title: 'Avg. Rating', value: '4.9★', change: 'Based on 89 reviews', icon: Star, colorIndex: 3 },
        { title: 'Reports Filed', value: '72', change: '+4 this week', icon: CheckCircle2, colorIndex: 4 },
    ],
};

// ─── Field row (view / edit) ──────────────────────────────────────────────────
function FieldRow({
    label,
    value,
    isEditing,
    inputProps,
}: {
    label: string;
    value: string;
    isEditing: boolean;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
    return (
        <div className="space-y-1.5">
            <label
                className="text-xs font-semibold uppercase tracking-widest opacity-50"
                style={{ color: 'var(--theme-card-text)' }}
            >
                {label}
            </label>
            {isEditing ? (
                <Input
                    {...inputProps}
                    className="transition-all duration-200"
                    style={{
                        backgroundColor: 'var(--theme-accent-light)',
                        borderColor: 'var(--theme-sidebar-border)',
                        color: 'var(--theme-card-text)',
                    }}
                />
            ) : (
                <p
                    className="text-sm font-semibold py-2 border-b"
                    style={{
                        color: value ? 'var(--theme-card-text)' : 'var(--theme-card-subtext)',
                        borderColor: 'var(--theme-sidebar-border)',
                    }}
                >
                    {value || '—'}
                </p>
            )}
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const { user, setAuth, accessToken, refreshToken } = useAuthStore();
    const { activeTheme } = useThemeStore();
    const isDefault = activeTheme === 'default';
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({ name: '', firstName: '', lastName: '', phone: '' });
    const savedFormRef = useRef({ name: '', firstName: '', lastName: '', phone: '' });

    // ── Fetch fresh profile from server on mount ──────────────────────────────
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const freshUser = await authService.getProfile();
                if (user && accessToken) {
                    setAuth({ ...user, ...freshUser }, accessToken, refreshToken);
                }
                const freshForm = {
                    name: freshUser.name || '',
                    firstName: freshUser.firstName || '',
                    lastName: freshUser.lastName || '',
                    phone: freshUser.phone || '',
                };
                setForm(freshForm);
                savedFormRef.current = freshForm;
            } catch {
                if (user) {
                    const fallback = {
                        name: user.name || '',
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        phone: user.phone || '',
                    };
                    setForm(fallback);
                    savedFormRef.current = fallback;
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = {
                name: form.name || `${form.firstName} ${form.lastName}`.trim(),
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
            };
            const updated = await authService.updateProfile(payload);
            if (user && accessToken) {
                const merged = { ...user, ...updated };
                setAuth(merged, accessToken, refreshToken);
                const saved = {
                    name: merged.name || '',
                    firstName: merged.firstName || '',
                    lastName: merged.lastName || '',
                    phone: merged.phone || '',
                };
                setForm(saved);
                savedFormRef.current = saved;
            }
            toast({ title: 'Profile Updated', description: 'Your changes have been saved.' });
            setIsEditing(false);
        } catch (error: any) {
            console.error('Profile update error:', error?.response?.data || error);
            toast({
                title: 'Error',
                description: error?.response?.data?.message || 'Failed to save profile.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setForm(savedFormRef.current);
        setIsEditing(false);
    };

    if (isLoading || !user) return <FullPageSkeleton />;

    const role = user.role as UserRole;
    const dashboardConfig = getDashboardConfig(role in ROLE_META ? role : UserRole.CLIENT);
    const roleMeta = ROLE_META[role] || ROLE_META[UserRole.UNASSIGNED];
    const RoleIcon = roleMeta.icon;
    const displayName =
        form.name || `${form.firstName || ''} ${form.lastName || ''}`.trim() || user.email;
    const joinDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : null;
    const roleStats = ROLE_STATS[role];

    return (
        <DashboardLayout menuItems={dashboardConfig.menuItems} title="My Profile">
            <div className="max-w-4xl mx-auto space-y-5">

                {/* ── Welcome / Hero Banner ─────────────────────────────────── */}
                <WelcomeBanner
                    title={`Welcome, ${form.firstName || displayName}!`}
                    subtitle={`${roleMeta.label} · Member since ${joinDate ?? 'N/A'} · ${user.email}`}
                    badgeIcon={RoleIcon}
                    badgeLabel={roleMeta.label}
                    badgeText={displayName}
                    decorativeIcon={roleMeta.decorativeIcon}
                    primaryAction={
                        isEditing
                            ? undefined
                            : { label: 'Edit Profile', icon: Edit3, onClick: () => setIsEditing(true) }
                    }
                />

                {/* ── Two-column cards ──────────────────────────────────────── */}
                <div className="grid gap-5 md:grid-cols-2">

                    {/* Personal Information */}
                    <Card
                        className="border overflow-hidden transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            borderColor: 'var(--theme-card-border)',
                        }}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Icon slot 1 */}
                                    <div
                                        className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
                                        style={{
                                            background: 'linear-gradient(to bottom right, var(--theme-icon-1-from), var(--theme-icon-1-to))',
                                        }}
                                    >
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle
                                            className="text-base font-bold"
                                            style={{ color: 'var(--theme-card-text)' }}
                                        >
                                            Personal Information
                                        </CardTitle>
                                        <CardDescription style={{ color: 'var(--theme-card-subtext)' }}>
                                            Your basic profile details
                                        </CardDescription>
                                    </div>
                                </div>

                                {/* Avatar */}
                                <div
                                    className="h-11 w-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0"
                                    style={{
                                        background: 'linear-gradient(to bottom right, var(--theme-avatar-from), var(--theme-avatar-to))',
                                    }}
                                >
                                    {getInitials(displayName)}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <FieldRow
                                label="Display Name"
                                value={form.name}
                                isEditing={isEditing}
                                inputProps={{
                                    value: form.name,
                                    onChange: (e) => handleChange('name', e.target.value),
                                    placeholder: 'Your display name',
                                }}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <FieldRow
                                    label="First Name"
                                    value={form.firstName}
                                    isEditing={isEditing}
                                    inputProps={{
                                        value: form.firstName,
                                        onChange: (e) => handleChange('firstName', e.target.value),
                                        placeholder: 'First name',
                                    }}
                                />
                                <FieldRow
                                    label="Last Name"
                                    value={form.lastName}
                                    isEditing={isEditing}
                                    inputProps={{
                                        value: form.lastName,
                                        onChange: (e) => handleChange('lastName', e.target.value),
                                        placeholder: 'Last name',
                                    }}
                                />
                            </div>

                            <FieldRow
                                label="Phone Number"
                                value={form.phone}
                                isEditing={isEditing}
                                inputProps={{
                                    value: form.phone,
                                    onChange: (e) => handleChange('phone', e.target.value),
                                    placeholder: '+1 (555) 000-0000',
                                    type: 'tel',
                                }}
                            />

                            {/* Save / Cancel buttons (inside card when editing) */}
                            {isEditing && (
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        style={{
                                            background: 'linear-gradient(to right, var(--theme-nav-active-from), var(--theme-nav-active-to))',
                                            color: 'var(--theme-nav-active-text)',
                                        }}
                                    >
                                        <Save className="h-3.5 w-3.5 mr-1.5" />
                                        {isSaving ? 'Saving…' : 'Save Changes'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        style={{
                                            borderColor: 'var(--theme-sidebar-border)',
                                            color: 'var(--theme-card-text)',
                                        }}
                                    >
                                        <X className="h-3.5 w-3.5 mr-1" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card
                        className="border overflow-hidden transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            borderColor: 'var(--theme-card-border)',
                        }}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
                                    style={{
                                        background: 'linear-gradient(to bottom right, var(--theme-icon-2-from), var(--theme-icon-2-to))',
                                    }}
                                >
                                    <Lock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <CardTitle
                                        className="text-base font-bold"
                                        style={{ color: 'var(--theme-card-text)' }}
                                    >
                                        Account Information
                                    </CardTitle>
                                    <CardDescription style={{ color: 'var(--theme-card-subtext)' }}>
                                        Login &amp; security details
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label
                                    className="text-xs font-semibold uppercase tracking-widest opacity-50"
                                    style={{ color: 'var(--theme-card-text)' }}
                                >
                                    Email Address
                                </label>
                                <div
                                    className="flex items-center justify-between py-2 border-b"
                                    style={{ borderColor: 'var(--theme-sidebar-border)' }}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Mail className="h-4 w-4 shrink-0 opacity-50" style={{ color: 'var(--theme-card-text)' }} />
                                        <span
                                            className="text-sm font-semibold truncate"
                                            style={{ color: 'var(--theme-card-text)' }}
                                        >
                                            {user.email}
                                        </span>
                                    </div>
                                    <span
                                        className="ml-2 shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'rgba(16,185,129,0.12)',
                                            color: '#10b981',
                                        }}
                                    >
                                        <CheckCircle2 className="h-3 w-3" />
                                        Verified
                                    </span>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="space-y-1.5">
                                <label
                                    className="text-xs font-semibold uppercase tracking-widest opacity-50"
                                    style={{ color: 'var(--theme-card-text)' }}
                                >
                                    Account Role
                                </label>
                                <div
                                    className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ backgroundColor: 'var(--theme-accent-light)' }}
                                >
                                    <div
                                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                                        style={{
                                            background: 'linear-gradient(to bottom right, var(--theme-icon-3-from), var(--theme-icon-3-to))',
                                        }}
                                    >
                                        <RoleIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--theme-card-text)' }}>
                                            {roleMeta.label}
                                        </p>
                                        <p className="text-xs opacity-60" style={{ color: 'var(--theme-card-subtext)' }}>
                                            Your platform access level
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Login Method */}
                            <div className="space-y-1.5">
                                <label
                                    className="text-xs font-semibold uppercase tracking-widest opacity-50"
                                    style={{ color: 'var(--theme-card-text)' }}
                                >
                                    Login Method
                                </label>
                                <p
                                    className="text-sm font-semibold py-2 border-b capitalize"
                                    style={{
                                        color: 'var(--theme-card-text)',
                                        borderColor: 'var(--theme-sidebar-border)',
                                    }}
                                >
                                    {user.provider ? `${user.provider} OAuth` : 'Email & Password'}
                                </p>
                            </div>

                            {/* Change Password */}
                            {!user.provider && (
                                <div
                                    className="flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:shadow-sm"
                                    style={{
                                        backgroundColor: 'var(--theme-user-card-bg)',
                                        borderColor: 'var(--theme-user-card-border)',
                                    }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Lock className="h-4 w-4 opacity-50" style={{ color: 'var(--theme-card-text)' }} />
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: 'var(--theme-card-text)' }}>
                                                Password
                                            </p>
                                            <p className="text-xs opacity-60" style={{ color: 'var(--theme-card-subtext)' }}>
                                                Change your account password
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        style={{
                                            borderColor: 'var(--theme-sidebar-border)',
                                            color: 'var(--theme-card-text)',
                                        }}
                                    >
                                        <a href="/forgot-password">Change</a>
                                    </Button>
                                </div>
                            )}

                            {/* Phone quick-view */}
                            {form.phone && (
                                <div
                                    className="flex items-center gap-2 p-3 rounded-xl"
                                    style={{ backgroundColor: 'var(--theme-accent-light)' }}
                                >
                                    <Phone className="h-4 w-4 opacity-50" style={{ color: 'var(--theme-card-text)' }} />
                                    <span className="text-sm font-semibold" style={{ color: 'var(--theme-card-text)' }}>
                                        {form.phone}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </DashboardLayout>
    );
}
