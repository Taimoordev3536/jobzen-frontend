'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { User, UserRole, CreateUserDto } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Users, UserCheck, UserX, Search, UserCircle2, Building2 } from 'lucide-react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getDashboardConfig } from '@/config/dashboard.config';
import { DataListItem } from '@/components/dashboard/DataListItem';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export default function ClientsPage() {
    const dashboardConfig = getDashboardConfig(UserRole.EMPLOYER);
    const [clients, setClients] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const { toast } = useToast();

    // Form state
    const [formData, setFormData] = useState<Partial<CreateUserDto>>({
        role: UserRole.CLIENT,
        email: '',
        password: '',
        name: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const data = await authService.getManagedUsers(UserRole.CLIENT);
            setClients(data);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to load clients',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.createManagedUser(formData as CreateUserDto);
            toast({
                title: 'Success',
                description: 'Client created successfully',
            });
            setIsCreating(false);
            setFormData({
                role: UserRole.CLIENT,
                email: '',
                password: '',
                name: '',
                firstName: '',
                lastName: '',
                phone: ''
            });
            loadClients();
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to create client. Email might be taken.',
                variant: 'destructive',
            });
        }
    };

    // Calculate stats
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'active' || !c.status).length;
    const inactiveClients = clients.filter(c => c.status === 'inactive').length;

    if (isLoading) {
        return <FullPageSkeleton />;
    }

    return (
        <DashboardLayout
            menuItems={dashboardConfig.menuItems}
            title="Manage Clients"
        >
            <div className="space-y-6">
                <WelcomeBanner
                    title="Manage Your Clients"
                    badgeLabel="Client Overview"
                    badgeText={`${totalClients} Clients`}
                    badgeIcon={UserCircle2}
                    gradient="from-purple-600 to-pink-600"
                    decorativeIcon={Building2}
                >
                    <div className="flex flex-wrap gap-3 w-full">
                        <div className="px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex items-center gap-2">
                            <div className="text-xl font-bold">{totalClients}</div>
                            <div className="text-xs text-white/70">Total</div>
                        </div>
                        <div className="px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex items-center gap-2">
                            <div className="text-xl font-bold text-green-300">{activeClients}</div>
                            <div className="text-xs text-white/70">Active</div>
                        </div>
                        <div className="px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 flex items-center gap-2">
                            <div className="text-xl font-bold text-red-300">{inactiveClients}</div>
                            <div className="text-xs text-white/70">Inactive</div>
                        </div>
                    </div>
                </WelcomeBanner>

                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Client</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Name (or Company Name)</label>
                                <Input
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button type="submit">Create Client</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <Card className="border-0 shadow-md">
                    <CardHeader className="border-b pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Your Clients</CardTitle>
                            <div className="flex items-center gap-3">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search clients..." className="pl-8" />
                                </div>
                                <Button onClick={() => setIsCreating(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Client
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {clients.length === 0 ? (
                            <div className="text-center py-12">
                                <UserCircle2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold">No clients found</h3>
                                <p className="text-muted-foreground">Add your first client to start managing relationships.</p>
                                <Button className="mt-4" onClick={() => setIsCreating(true)}>Add First Client</Button>
                            </div>
                        ) : (
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {clients.map((client) => (
                                    <DataListItem
                                        key={client.id}
                                        primaryText={client.name || `${client.firstName} ${client.lastName}`}
                                        secondaryText={client.email}
                                        icon={UserCircle2}
                                        colorIndex={4}
                                        rightContent={
                                            <div className="text-xs text-muted-foreground">
                                                {client.phone || 'No phone'}
                                            </div>
                                        }
                                        badge={{
                                            label: client.status || 'Active',
                                            variant: (client.status === 'active' || !client.status) ? 'success' : 'warning'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
