'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImagePreviewModalProps {
  imageUrl: string
  onClose: () => void
}

export function ImagePreviewModal({ imageUrl, onClose }: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl h-full max-h-[80vh] flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-400 hover:text-white z-10"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Fechar</span>
        </Button>
        <img
          src={imageUrl}
          alt="Visualização da imagem"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    </div>
  )
}