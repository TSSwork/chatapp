import EmptyState from "@/components/emptystate"
import React from "react"
export const dynamic = 'force-dynamic'

export default function Dashboard() {
    return (
      <main className="flex min-h-screen bg-white w-full">
        <div className="hidden lg:block lg:pl-80 min-h-screen w-full">
            <EmptyState />
        </div>
      </main>
    )
  }