import { api } from "@/lib/api";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Memory {
  coverUrl: string;
  excerpt: string;
  createdAt: string;
  id: string;
}

const Memory = async () => {
  const isAuthenticated = cookies().has("token");
  const router = useRouter();
  const { id } = router.query;
  const [memory, setMemory] = useState({});

  if (!isAuthenticated) {
    return null;
  }

  const token = cookies().get("token")?.value;

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const response = await api.get(`/memories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchMemory();
    }
  }, [id]);

  if (!memory) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format("MMMM D[, ]YYYY")}
        </time>
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.excerpt}
        </p>
      </div>
    </div>
  );
};

export default Memory;
