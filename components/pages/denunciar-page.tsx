"use client"

import type React from "react"
import { AlertTriangle, LogIn, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { saveImageToServer } from "@/lib/upload-utils"
import { toast } from "sonner"

interface DenunciarPageProps {
  isLoggedIn: boolean
  simulateLogin: (isAdmin: boolean) => void
  setCurrentPage: (page: string) => void
  handleReportSubmit: (report: any) => void
  openHowItWorksModal: (type: "denounce" | "tags") => void 
}

export function DenunciarPage({
  isLoggedIn,
  simulateLogin,
  setCurrentPage,
  handleReportSubmit,
  openHowItWorksModal,
}: DenunciarPageProps) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    tipo: "",
    plataforma: "",
    descricao: "",
    telegramUsername: "",
    telegramUserId: "",
    discordUsername: "",
    discordUserId: "",
    otherPlatformIdentifier: "",
    images: [] as string[],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.name))
    }
  }, [selectedFiles])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let filesArray = Array.from(e.target.files)
      
      if (filesArray.length > 5) {
        toast.error('Máximo de 5 imagens permitidas')
        filesArray = filesArray.slice(0, 5)
      }

      const validFiles = filesArray.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
        const isValidSize = file.size <= 5 * 1024 * 1024
        return isValidType && isValidSize
      })

      if (validFiles.length !== filesArray.length) {
        toast.error('Alguns arquivos foram ignorados. Use apenas imagens JPG, PNG ou GIF até 5MB.')
      }

      if (validFiles.length === 0) {
        e.target.value = ''
        return
      }

      setSelectedFiles(validFiles)

      const tempUrls = validFiles.map(file => URL.createObjectURL(file))
      setFormData(prev => ({ ...prev, images: tempUrls }))

      try {
        const uploadedUrls = await Promise.all(validFiles.map(file => saveImageToServer(file)))
        setFormData(prev => ({ ...prev, images: uploadedUrls }))
      } catch (error) {
        console.error('Erro ao fazer upload das imagens:', error)
        toast.error('Erro ao fazer upload das imagens. Tente novamente.')
        tempUrls.forEach(url => URL.revokeObjectURL(url))
        setSelectedFiles([])
        setFormData(prev => ({ ...prev, images: [] }))
        e.target.value = ''
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleReportSubmit(formData)
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      tipo: "",
      plataforma: "",
      descricao: "",
      telegramUsername: "",
      telegramUserId: "",
      discordUsername: "",
      discordUserId: "",
      otherPlatformIdentifier: "",
      images: [],
    })
    setSelectedFiles([])
  }

  if (!isLoggedIn) {
    return (
      <main className="pt-24 md:pt-32 min-h-screen flex items-center justify-center bg-grid px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 md:space-y-6 bg-card p-8 md:p-12 rounded-2xl md:rounded-3xl max-w-lg">
          <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Acesso Restrito</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto">
            Você precisa estar logado para fazer uma denúncia. Por favor, faça login para continuar.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-gray-100 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold flex items-center space-x-2 mx-auto"
            onClick={() => simulateLogin(false)}
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar Agora</span>
          </Button>
          <Button
            className="bg-transparent border border-border text-muted-foreground hover:bg-accent px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold flex items-center space-x-2 mx-auto mt-4"
            onClick={() => setCurrentPage("inicio")}
          >
            <span>Voltar para Início</span>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 md:pt-32 min-h-screen bg-grid">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="space-y-8 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-3 bg-destructive/20 rounded-full px-4 py-2 md:px-6 md:py-3">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
              <span className="text-xs md:text-sm text-red-400 uppercase tracking-widest font-bold">NOVA DENÚNCIA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">DENUNCIAR</h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Ajude a proteger nossa comunidade reportando atividades suspeitas
            </p>
            <Button
              className="bg-muted text-muted-foreground hover:bg-accent px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base mx-auto"
              onClick={() => openHowItWorksModal("denounce")}
            >
              <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Como Denunciar
            </Button>
          </div>

          <div className="bg-card rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-destructive/5 rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-primary/5 rounded-full translate-y-8 -translate-x-8 md:translate-y-12 md:-translate-x-12"></div>

            <form className="space-y-6 md:space-y-10 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-2 md:space-y-4">
                <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">Plataforma</label>
                <select
                  className="w-full bg-input border border-white/20 text-white rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                  value={formData.plataforma}
                  onChange={(e) => setFormData({ ...formData, plataforma: e.target.value })}
                  required
                >
                  <option value="">Selecione a plataforma</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Discord">Discord</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {(formData.plataforma === "WhatsApp" ||
                formData.plataforma === "Telegram" ||
                formData.plataforma === "Discord") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                        Nome do Golpista
                      </label>
                      <Input
                        placeholder="Nome da pessoa denunciada"
                        className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                        Telefone do Golpista
                      </label>
                      <Input
                        placeholder="(11) 99999-9999"
                        className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20 font-mono"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        required
                      />
                    </div>
                  </>
                </div>
              )}

              {formData.plataforma === "Telegram" && (
                <>
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                      Username do Golpista (Telegram)
                    </label>
                    <Input
                      placeholder="@username"
                      className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                      value={formData.telegramUsername}
                      onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                      ID do Usuário Golpista (Telegram - Opcional)
                    </label>
                    <Input
                      placeholder="123456789"
                      className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                      value={formData.telegramUserId}
                      onChange={(e) => setFormData({ ...formData, telegramUserId: e.target.value })}
                    />
                  </div>
                </>
              )}

              {formData.plataforma === "Discord" && (
                <>
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                      Username do Golpista (Discord)
                    </label>
                    <Input
                      placeholder="usuario#1234 ou @usuario"
                      className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                      value={formData.discordUsername}
                      onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                      ID do Usuário Golpista (Discord - Opcional)
                    </label>
                    <Input
                      placeholder="123456789012345678"
                      className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                      value={formData.discordUserId}
                      onChange={(e) => setFormData({ ...formData, discordUserId: e.target.value })}
                    />
                  </div>
                </>
              )}

              {formData.plataforma === "Outro" && (
                <div className="space-y-2 md:space-y-4">
                  <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                    Identificador do Golpista na Plataforma
                  </label>
                  <Input
                    placeholder="Ex: Link do perfil, ID, nome de usuário..."
                    className="w-full bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                    value={formData.otherPlatformIdentifier}
                    onChange={(e) => setFormData({ ...formData, otherPlatformIdentifier: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="space-y-2 md:space-y-4">
                <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                  Email do Golpista (Opcional)
                </label>
                <Input
                  placeholder="email@exemplo.com"
                  className="bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                />
              </div>

              <div className="space-y-2 md:space-y-4">
                <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                  Tipo de Golpe
                </label>
                <select
                  className="w-full bg-input border border-white/20 text-white rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus:ring-2 focus:ring-white/20"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="pix">PIX Falso</option>
                  <option value="venda">Venda Falsa</option>
                  <option value="emprestimo">Empréstimo Falso</option>
                  <option value="investimento">Investimento Falso</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="space-y-2 md:space-y-4">
                <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                  Descrição Detalhada
                </label>
                <textarea
                  placeholder="Descreva detalhadamente o que aconteceu, como foi abordado, valores envolvidos..."
                  className="w-full bg-input border border-white/20 text-white placeholder-gray-400 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base min-h-[100px] md:min-h-[120px] resize-none focus:ring-2 focus:ring-white/20"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:space-y-4">
                <label className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                  Anexar Fotos (Opcional)
                </label>
                <div className="relative w-full bg-input border border-white/20 rounded-xl md:rounded-2xl py-3 md:py-5 px-4 md:px-6 text-sm md:text-base focus-within:ring-2 focus-within:ring-white/20 transition-all duration-200 flex items-center space-x-3 cursor-pointer">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="bg-secondary text-white px-3 py-1.5 rounded-md font-semibold text-sm hover:bg-secondary-foreground transition-colors">
                    Escolher arquivos
                  </div>
                  <span className="text-gray-400 truncate flex-1 text-sm">
                    {selectedFiles.length > 0
                      ? selectedFiles.map((file) => file.name).join(", ")
                      : "Nenhum arquivo escolhido"}
                  </span>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${file.name}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs p-1 opacity-0 hover:opacity-100 transition-opacity">
                          {file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 md:pt-8">
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-gray-100 py-5 md:py-7 rounded-xl md:rounded-2xl text-lg md:text-xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-[1.01]"
                >
                  <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 mr-3 md:mr-4" />
                  ENVIAR DENÚNCIA
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
