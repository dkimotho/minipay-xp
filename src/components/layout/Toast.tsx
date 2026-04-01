import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

export const Toast = () => {
  const context = useContext(AppContext)
  if (!context || !context.toast) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-accent-green text-bg-primary px-4 py-3 rounded-lg text-sm font-medium z-50 max-w-xs text-center">
      {context.toast}
    </div>
  )
}
