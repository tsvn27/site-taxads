"use client"
import { Shield, Zap, Users, AlertTriangle, ArrowRight, Eye } from "lucide-react"

interface InicioPageProps {
  setCurrentPage: (page: string) => void
  approvedGolpistasCount: number 
  loggedInUsersCount: number 
}

export function InicioPage({ setCurrentPage, approvedGolpistasCount, loggedInUsersCount }: InicioPageProps) {
  return (
    <main className="pt-24 md:pt-32 min-h-screen relative overflow-hidden bg-grid flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 w-full py-8 md:py-0">
          <div className="space-y-8 md:space-y-12 text-center lg:text-left lg:flex-1">
            <div className="space-y-4 md:space-y-8">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold">
                  SISTEMA ATIVO
                </span>
              </div>
              <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.85] tracking-tighter">
                PROTEJA
                <br />
                <span className="text-gray-400">SUA</span>
                <br />
                COMUNIDADE
              </h1>
            </div>
            <p className="text-base md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Plataforma revolucionária de inteligência coletiva contra fraudes digitais
            </p>
          </div>

          <div className="flex items-center justify-center lg:flex-1 order-first lg:order-last pb-8 lg:pb-0">
            <div className="relative shield-3d-container">
              <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full border-4 border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-card/10 to-transparent"></div>

                <div className="absolute inset-6 sm:inset-8 md:inset-10 lg:inset-12 rounded-full border-2 border-border/50 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl flex items-center justify-center shield-3d">
                    <Shield className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white shield-icon-3d" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-card rounded-2xl flex items-center justify-center animate-pulse">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" />
                </div>
                <div className="absolute bottom-6 left-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-card rounded-2xl flex items-center justify-center animate-pulse delay-1000">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
        <div className="grid gap-4 md:gap-6 max-w-2xl mx-auto lg:mx-0">
          <div
            className="group bg-card hover:bg-accent rounded-2xl md:rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            onClick={() => setCurrentPage("denunciar")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-red-500/20 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                  <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-red-400" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold mb-1">Fazer Denúncia</div>
                  <div className="text-gray-400 text-sm">Reportar novo golpista</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
            </div>
          </div>

          <div
            className="group bg-card hover:bg-accent rounded-2xl md:rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            onClick={() => setCurrentPage("golpistas")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Eye className="w-7 h-7 md:w-8 md:h-8 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold mb-1">Ver Golpistas</div>
                  <div className="text-gray-400 text-sm">Consultar base de dados</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-12 md:py-20">
        <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-card rounded-full px-6 py-4 sm:px-12 sm:py-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-red-500">{approvedGolpistasCount}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Golpistas</div>
          </div>
          <div className="w-px h-8 sm:h-12 bg-muted hidden sm:block"></div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-green-500">{loggedInUsersCount}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Protegidos</div>
          </div>
        </div>
      </div>
    </main>
  )
}
