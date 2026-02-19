
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(data: ForgotPasswordValues) {
        setIsLoading(true);
        try {
            await authService.forgotPassword(data.email);
            setIsSubmitted(true);
            toast({
                title: 'Reset Link Sent',
                description: 'If an account exists with this email, you will receive a reset link shortly.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Check your email</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We have sent a password reset link to <span className="font-semibold text-gray-900">{form.getValues('email')}</span>.
                    </p>
                    <div className="mt-6">
                        <Link href="/login">
                            <Button variant="outline" className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        Did not receive the email? Check your spam folder or <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">try again</button>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        No worries! Enter your email and we will send you a reset instructions.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input placeholder="Enter your email" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </Button>

                        <div className="flex items-center justify-center">
                            <Link href="/login" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
