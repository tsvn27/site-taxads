"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogIn, Plus, Settings, LogOut } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

interface UserDropdownOrLoginProps {
  isLoggedIn: boolean
  user: { name: string; image: string; isAdmin: boolean } | null
  handleLogout: () => void 
  setCurrentPage: (page: string) => void
  pendingReports: any[]
  approvedGolpistas: any[]
}

export function UserDropdownOrLogin({
  isLoggedIn,
  user,
  handleLogout,
  setCurrentPage,
  pendingReports,
  approvedGolpistas,
}: UserDropdownOrLoginProps) {
  if (isLoggedIn && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative group cursor-pointer flex items-center space-x-3">
            <Avatar className="w-10 h-10 md:w-12 md:h-12">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                <Image src="/placeholder.svg" alt="Placeholder" width={48} height={48} />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-base md:text-lg font-bold">{user.name}</div>
              <div className="text-xs text-gray-400">{user.isAdmin ? "Administrador" : "Membro"}</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 md:w-96 bg-card border-none text-white rounded-3xl p-0 overflow-hidden"
        >
          <div className="p-6 md:p-8 bg-gradient-to-br from-card to-muted">
            <div className="flex items-center space-x-4 mb-4 md:mb-6">
              <Avatar className="w-14 h-14 md:w-16 md:h-16 rounded-2xl">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>
                  <Image src="/placeholder.svg" alt="Placeholder" width={64} height={64} />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg md:text-xl font-bold">{user.name}</div>
                <div className="text-xs md:text-sm text-gray-400">
                  {user.isAdmin ? "Administrador" : "Membro Ativo"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-3xl font-black">{approvedGolpistas.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-3xl font-black text-white-400">{approvedGolpistas.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Aprovadas</div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-2xl md:text-3xl font-black text-white-400">{pendingReports.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Pendentes</div>
              </div>
            </div>
          </div>
          <div className="p-3 md:p-4 space-y-2">
            <DropdownMenuItem
              className="text-white hover:bg-muted rounded-2xl px-3 py-2 md:px-4 md:py-3 cursor-pointer group"
              onClick={() => setCurrentPage("denunciar")}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-500/20 flex items-center justify-center mr-3 md:mr-4 group-hover:bg-red-500/30 transition-colors">
                <Plus className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
              </div>
              <div>
                <div className="font-semibold">Nova Denúncia</div>
                <div className="text-xs text-gray-400">Reportar golpista</div>
              </div>
            </DropdownMenuItem>
            {user.isAdmin && ( 
              <DropdownMenuItem
                className="text-white hover:bg-muted rounded-2xl px-3 py-2 md:px-4 md:py-3 cursor-pointer group"
                onClick={() => setCurrentPage("admin-dashboard")}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mr-3 md:mr-4 group-hover:bg-blue -500/30 transition-colors">
                  <Settings className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold">Dashboard Admin</div>
                  <div className="text-xs text-gray-400">Gerenciar denúncias</div>
                </div>
              </DropdownMenuItem>
            )}

            <div className="h-px bg-muted my-2"></div>
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-500/10 rounded-2xl px-3 py-2 md:px-4 md:py-3 group"
              onClick={() => signOut()} 
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-500/20 flex items-center justify-center mr-3 md:mr-4 group-hover:bg-red-500/30 transition-colors">
                <LogOut className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
              </div>
              <div>
                <div className="font-semibold">Sair</div>
                <div className="text-xs text-gray-400">Encerrar sessão</div>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  } else {
    return (
      <Button
        className="bg-primary text-primary-foreground hover:bg-gray-100 px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold flex items-center space-x-2 text-sm md:text-base"
        onClick={() => signIn("discord")} 
      >
        <LogIn className="w-4 h-4 md:w-5 md:h-5" />
        <span>Entrar com Discord</span>
      </Button>
    )
  }
}
