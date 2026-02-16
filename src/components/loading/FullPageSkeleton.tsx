'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase } from 'lucide-react';

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Sidebar Skeleton */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Jobzen
              </span>
            </div>
          </div>

          {/* User Info Skeleton */}
          <div className="p-3">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Skeleton */}
          <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </nav>

          {/* Footer Skeleton */}
          <div className="p-3 border-t border-gray-200 space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-2">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between h-[54px] px-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-7 w-10 rounded-lg" />
            </div>
          </div>
        </header>

        {/* Page Content Skeleton */}
        <main className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Welcome Banner Skeleton */}
            <div className="rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg bg-white/40" />
                      <Skeleton className="h-6 w-32 rounded-full bg-white/40" />
                    </div>
                    <Skeleton className="h-6 w-56 bg-white/40" />
                    <Skeleton className="h-4 w-96 max-w-full bg-white/40" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-8 w-32 rounded-lg bg-white/40" />
                      <Skeleton className="h-8 w-32 rounded-lg bg-white/40" />
                    </div>
                  </div>
                  <Skeleton className="hidden lg:block h-28 w-28 rounded-full bg-white/40" />
                </div>
              </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-0 shadow-lg rounded-xl bg-white p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-5 w-20 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Layout Skeleton */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Left Card */}
              <div className="border-0 shadow-xl rounded-xl bg-white">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-xl space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-5 w-32" />
                              <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <Skeleton className="h-6 w-24 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Card */}
              <div className="border-0 shadow-xl rounded-xl bg-white">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-xl space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="border-0 shadow-xl rounded-xl bg-white">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                      <div className="p-3 space-y-2">
                        <Skeleton className="h-12 w-12 rounded-xl" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
