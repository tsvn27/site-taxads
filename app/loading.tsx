export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold">Carregando...</p>
      </div>
    </div>
  )
}
