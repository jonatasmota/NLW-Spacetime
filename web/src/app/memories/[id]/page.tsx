import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { ChevronLeft } from 'lucide-react'

import { api } from '@/lib/api'
import dayjs from 'dayjs'

interface MemoriesDetailsProps {
  params: {
    id: string
  }
}

interface MemoryDetailsProps {
  id: string
  content: string
  coverUrl: string
  createdAt: string
  isPublic: boolean
  userId: string
}

export default async function MemoriesDetails({ params }: MemoriesDetailsProps) {
  const token = cookies().get('token')?.value
  const memoryId = params.id

  const memoryDetailsResponse = await api.get(`memories/${memoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memoryDetails: MemoryDetailsProps = memoryDetailsResponse.data

  return (
    <div className="flex flex-col p-8">
      <Link href="/" className="mb-4 flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
        <span className="gap-1 text-sm text-gray-200 hover:text-gray-100">
          Back to timeline
        </span>
      </Link>
      <time className="mb-2 text-sm text-gray-100">
      {dayjs(memoryDetails.createdAt).format('MMMM D[, ]YYYY')}
      </time>
      <Image
        src={memoryDetails.coverUrl}
        alt=""
        width={592}
        height={280}
        className="mb-4 aspect-video w-full rounded-lg object-cover"
      />
      <p className="text-justify indent-8 text-lg leading-relaxed text-gray-200">
        {memoryDetails.content}
      </p>
    </div>
  )
}