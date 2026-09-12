import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My QR Codes</h1>
        <Link href="/dashboard/create">
          <Button>Create QR Code</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center items-center h-48 border-dashed bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <Link href="/dashboard/create" className="flex flex-col items-center gap-2">
              <span className="text-4xl">+</span>
              <span className="font-medium">Create New</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

