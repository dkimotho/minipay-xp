import { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-bg-primary">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className={`w-full max-w-md mx-auto px-4 py-6 ${className}`}>
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
