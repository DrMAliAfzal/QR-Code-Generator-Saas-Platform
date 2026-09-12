"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { Input } from "./ui/input";

export default function QRCardActions({ id, currentUrl }: { id: string, currentUrl: string }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(currentUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/qr/' + id, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Error deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!url.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/qr/' + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationUrl: url }),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        alert("Failed to update");
      }
    } catch {
      alert("Error updating");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex w-full items-center gap-2 mt-2">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} disabled={isSaving} className="h-8 text-sm" />
        <Button size="icon" variant="ghost" onClick={handleSave} disabled={isSaving} className="h-8 w-8 text-green-600">
          <Save className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)} disabled={isSaving} className="h-8 w-8 text-slate-500">
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled={isDeleting} className="h-8 text-slate-600">
        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Link
      </Button>
      <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/edit/' + id)} disabled={isDeleting} className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Design
      </Button>
      <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting} className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
      </Button>
    </div>
  );
}


