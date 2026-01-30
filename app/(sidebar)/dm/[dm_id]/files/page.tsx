// FileTab.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DocumentItem from "@/app/components/ui/documentItem";
import FileHover from "@/app/components/file-hover"; // make sure path is correct
import axios from "@/lib/axios";

interface File {
  message_id: number;
  file: string;
  created_at: string;
  sender: {
    id: number;
    name: string;
    avatar_url?: string;
  };
  name?: string;
}

export default function FileTab() {
  const params = useParams();
  const channelId = params?.channel_id;

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;

    const fetchFiles = async () => {
      try {
        const res = await axios.get(`/channels/${channelId}/files`);
        if (res.data.success) {
          setFiles(res.data.data.files);
        }
      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [channelId]);

  const handleAction = (action: "download" | "share", fileId: string) => {
    console.log(action, fileId);
    // Add your download or share logic here
  };

  if (loading) return <p>Loading files...</p>;
  if (files.length === 0) return <p>No files found.</p>;

  return (
    <div className="w-full mx-auto p-6">
      <div className="rounded-md border border-gray-300">
        {files.map((f, index) => (
          <div
            key={index}
            className="relative group/fileGroup" // <-- make this relative to position hover absolutely
          >
            <DocumentItem
              name={f.name ?? "unnamed file"}
              sharedBy={f.sender.name}
              date={new Date(f.created_at).toLocaleDateString()}
            />

            {/* Show FileHover only on hover */}
            <div className="opacity-0 group-hover/fileGroup:opacity-100 transition-opacity duration-200">
              <FileHover fileId={f.message_id.toString()} onAction={handleAction} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
