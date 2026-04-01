export const PageSkeleton = () => {
  return (
    <div className="w-full px-4 py-6 flex flex-col gap-4">
      <div className="h-12 bg-bg-tertiary rounded-lg animate-pulse" />
      <div className="h-8 bg-bg-tertiary rounded-lg animate-pulse w-3/4" />
      <div className="h-32 bg-bg-tertiary rounded-lg animate-pulse" />
      <div className="h-8 bg-bg-tertiary rounded-lg animate-pulse" />
      <div className="h-8 bg-bg-tertiary rounded-lg animate-pulse w-5/6" />
    </div>
  )
}
