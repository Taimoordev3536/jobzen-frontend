import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableSkeletonProps {
    columns?: number;
    rows?: number;
}

export function TableSkeleton({ columns = 5, rows = 5 }: TableSkeletonProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columns }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-full max-w-[120px]" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRow key={i}>
                            {Array.from({ length: columns }).map((_, j) => (
                                <TableCell key={j}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 space-y-3">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-3 w-3/4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
