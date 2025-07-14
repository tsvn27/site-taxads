"use client"
import { X, Tag, AlertTriangle } from "lucide-react" 
import { Button } from "@/components/ui/button"

interface HowItWorksModalProps {
  onClose: () => void
  type: "denounce" | "tags" 
}

export function HowItWorksModal({ onClose, type }: HowItWorksModalProps) {
  const isDenounceType = type === "denounce"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-6 w-full max-w-md relative">
        {" "}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-400 hover:text-white w-7 h-7" 
          onClick={onClose}
        >
          <X className="w-4 h-4" /> 
          <span className="sr-only">Fechar</span>
        </Button>
        <div className="text-center space-y-2 mb-4">
          {" "}
          {isDenounceType ? (
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-400 mx-auto" />
          ) : (
            <Tag className="w-10 h-10 md:w-12 md:h-12 text-blue-400 mx-auto" />
          )}
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter">
            {isDenounceType ? "Como Denunciar?" : "Entenda as Tags"}
          </h2>{" "}
          <p className="text-sm md:text-base text-gray-400">
            {isDenounceType ? "Guia rápido para sua denúncia" : "Significado das classificações"}
          </p>{" "}
        </div>
        <div className="space-y-5 md:space-y-6 text-gray-300 text-sm md:text-base">
          {isDenounceType ? (
            <div>
              <h3 className="text-base md:text-lg font-bold mb-2">Passos para Denunciar:</h3>
              <p className="leading-relaxed">
                1. Navegue até a aba "Denunciar".
                <br />
                2. Preencha o formulário com o máximo de detalhes sobre o golpista e o ocorrido.
                <br />
                3. Selecione a plataforma e, se possível, anexe fotos ou evidências.
                <br />
                4. Suas informações são revisadas por nossa equipe para manter a comunidade segura.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-base md:text-lg font-bold mb-2">Significado das Classificações:</h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <span className="font-bold text-green-400">Verificado:</span> A denúncia foi confirmada por nossa
                  equipe com base em evidências. Indica alta certeza de fraude.
                </p>
                <p className="leading-relaxed">
                  <span className="font-bold text-yellow-400">Risco (Alto, Médio, Baixo):</span> Classifica o nível de
                  perigo do golpista:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <span className="font-bold text-red-400">Alto:</span> Grande ameaça, histórico de golpes graves.
                  </li>
                  <li>
                    <span className="font-bold text-yellow-400">Médio:</span> Risco considerável, menos ocorrências.
                  </li>
                  <li>
                    <span className="font-bold text-blue-400">Baixo:</span> Risco menor, denúncia isolada ou menor
                    impacto.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
