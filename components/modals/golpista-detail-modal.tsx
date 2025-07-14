"use client"
import { useState } from "react"
import { User, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImagePreviewModal } from "./image-preview-modal"

interface GolpistaDetailModalProps {
  golpista: any
  onClose: () => void
}

export function GolpistaDetailModal({ golpista, onClose }: GolpistaDetailModalProps) {
  if (!golpista) return null

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-xl md:max-w-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white w-8 h-8 md:w-10 md:h-10"
          onClick={onClose}
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
          <span className="sr-only">Fechar</span>
        </Button>
        <div className="text-center space-y-3 md:space-y-4 mb-6 md:mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-xl md:rounded-2xl flex items-center justify-center mx-auto">
            <User className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
            {golpista.nome ||
              golpista.telegramUsername ||
              golpista.discordUsername ||
              golpista.otherPlatformIdentifier ||
              "Nome Indefinido"}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-400 text-sm md:text-lg">
            {golpista.telefone && <span className="font-mono">{golpista.telefone}</span>}
            {golpista.telefone && (golpista.tipo || golpista.plataforma) && <span>•</span>}
            {golpista.tipo && <span>{golpista.tipo}</span>}
            {golpista.plataforma && (golpista.tipo || golpista.telefone) && <span>•</span>}
            {golpista.plataforma && <span>{golpista.plataforma}</span>}
          </div>
          <div className="flex items-center justify-center space-x-3 md:space-x-4">
            {golpista.verificado && (
              <div className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider">
                Verificado
              </div>
            )}
            <div
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider ${
                golpista.risco === "Alto" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {golpista.risco} Risco
            </div>
          </div>
        </div>
        <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
          <p className="text-base md:text-lg font-semibold">Descrição da Denúncia:</p>
          <p className="leading-relaxed">{golpista.descricao}</p>
          <p className="text-xs md:text-sm text-gray-500">Total de Denúncias: {golpista.denuncias}</p>
          {golpista.email && <p className="text-xs md:text-sm text-gray-500">Email: {golpista.email}</p>}
          {golpista.telegramUserId && (
            <p className="text-xs md:text-sm text-gray-500">ID Telegram: {golpista.telegramUserId}</p>
          )}
          {golpista.discordUserId && (
            <p className="text-xs md:text-sm text-gray-500">ID Discord: {golpista.discordUserId}</p>
          )}

          {golpista.images && golpista.images.length > 0 && (
            <div className="mt-4 md:mt-6">
              <p className="text-base md:text-lg font-semibold mb-2">Fotos Anexadas:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {golpista.images.map((imageName: string, index: number) => (
                  <div
                    key={index}
                    className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center"
                  >
                    <img
                      src={imageName}
                      alt={`Evidência ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedImage(imageName)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs p-1 opacity-0 hover:opacity-100 transition-opacity group"
                    >
                      <ZoomIn className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
