"use client"
import EmptyState from '@/components/emptystate';
import useConversation from '@/hooks/useConversation';
import { cn } from '@/lib/utils';
import React from 'react'
export const dynamic = 'force-dynamic'

export default function Conversations() {
    const { isOpen } = useConversation();

    return (
      <main className="flex min-h-screen bg-white w-full">
        <div className={cn("hidden lg:block lg:pl-80 min-h-screen w-full", isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </div>
      </main>
    )
  }
