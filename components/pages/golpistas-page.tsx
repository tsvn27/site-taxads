"use client"
import { Search, Filter, User, ArrowRight, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"

interface GolpistasPageProps {
  approvedGolpistas: any[]
  openGolpistaDetail: (golpista: any) => void
  openAdvancedFiltersModal: (currentFilters: any) => void
  openHowItWorksModal: (type: "denounce" | "tags") => void 
  currentFilters: {
    platform: string
    type: string
    verified: boolean | null
    risk: string
  }
}

export function GolpistasPage({
  approvedGolpistas,
  openGolpistaDetail,
  openAdvancedFiltersModal,
  openHowItWorksModal,
  currentFilters,
}: GolpistasPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGolpistas = useMemo(() => {
    let tempGolpistas = approvedGolpistas

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      tempGolpistas = tempGolpistas.filter(
        (golpista) =>
          golpista.nome?.toLowerCase().includes(lowerCaseQuery) ||
          golpista.telefone?.toLowerCase().includes(lowerCaseQuery) ||
          golpista.email?.toLowerCase().includes(lowerCaseQuery) ||
          golpista.telegramUsername?.toLowerCase().includes(lowerCaseQuery) ||
          golpista.discordUsername?.toLowerCase().includes(lowerCaseQuery) ||
          golpista.otherPlatformIdentifier?.toLowerCase().includes(lowerCaseQuery),
      )
    }

    if (currentFilters.platform) {
      tempGolpistas = tempGolpistas.filter((golpista) => golpista.plataforma === currentFilters.platform)
    }
    if (currentFilters.type) {
      tempGolpistas = tempGolpistas.filter((golpista) => golpista.tipo === currentFilters.type)
    }
    if (currentFilters.verified !== null) {
      tempGolpistas = tempGolpistas.filter((golpista) => golpista.verificado === currentFilters.verified)
    }
    if (currentFilters.risk) {
      tempGolpistas = tempGolpistas.filter((golpista) => golpista.risco === currentFilters.risk)
    }

    return tempGolpistas
  }, [approvedGolpistas, searchQuery, currentFilters])

  return (
    <main className="pt-24 md:pt-32 min-h-screen bg-grid">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-8 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-3 bg-card rounded-full px-4 py-2 md:px-6 md:py-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold">
                BASE DE DADOS
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">GOLPISTAS</h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Indivíduos identificados e verificados pela nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 bg-card rounded-2xl md:rounded-3xl p-4 md:p-6">
            <div className="md:col-span-2 relative">
              {" "}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <Input
                placeholder="Buscar por nome, telefone, email..."
                className="pl-10 md:pl-14 bg-input border-none text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-4 text-sm md:text-lg focus:ring-2 focus:ring-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 md:gap-6">
              {" "}
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-gray-100 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base"
                onClick={() => openAdvancedFiltersModal(currentFilters)}
              >
                <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Filtros
              </Button>
              <Button
                className="flex-1 bg-muted text-muted-foreground hover:bg-accent px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base"
                onClick={() => openHowItWorksModal("tags")}
              >
                <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Entenda as Tags
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6">
            {filteredGolpistas.length === 0 ? (
              <p className="text-center text-gray-400 text-lg py-8">
                Nenhum golpista encontrado com os critérios de busca e filtro.
              </p>
            ) : (
              filteredGolpistas.map((golpista) => (
                <div
                  key={golpista.id}
                  className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent transition-all duration-300 group cursor-pointer"
                  onClick={() => openGolpistaDetail(golpista)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-muted rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                        <User className="w-7 h-7 md:w-8 md:h-8 text-gray-400" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                          <h3 className="text-lg md:text-xl font-bold">
                            {golpista.nome ||
                              golpista.telegramUsername ||
                              golpista.discordUsername ||
                              golpista.otherPlatformIdentifier ||
                              "Nome Indefinido"}
                          </h3>
                          {golpista.verificado && (
                            <div className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                              Verificado
                            </div>
                          )}
                          <div
                            className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              golpista.risco === "Alto"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {golpista.risco} Risco
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400 text-xs md:text-sm">
                          {golpista.telefone && <span className="font-mono">{golpista.telefone}</span>}
                          {golpista.telegramUsername && <span>@{golpista.telegramUsername}</span>}
                          {golpista.discordUsername && <span>{golpista.discordUsername}</span>}
                          {golpista.otherPlatformIdentifier && <span>{golpista.otherPlatformIdentifier}</span>}
                          {(golpista.telefone ||
                            golpista.telegramUsername ||
                            golpista.discordUsername ||
                            golpista.otherPlatformIdentifier) &&
                            (golpista.tipo || golpista.plataforma) && <span className="hidden sm:inline">•</span>}
                          {golpista.tipo && <span>{golpista.tipo}</span>}
                          {golpista.plataforma && golpista.tipo && <span className="hidden sm:inline">•</span>}
                          {golpista.plataforma && <span>{golpista.plataforma}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-left md:text-center">
                      <div className="text-2xl md:text-3xl font-black">{golpista.denuncias}</div>
                      <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Denúncias</div>
                    </div>
                    <div className="text-left md:text-right">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
