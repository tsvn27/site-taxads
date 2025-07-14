"use client"
import { useState } from "react"
import { Shield, AlertTriangle, Eye, Target, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserDropdownOrLogin } from "@/components/user-dropdown-or-login"

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  isLoggedIn: boolean
  user: { name: string; image: string; isAdmin: boolean } | null
  simulateLogin: (isAdmin: boolean) => void
  handleLogout: () => void
  pendingReports: any[]
  approvedGolpistas: any[]
}

const navItems = [
  { id: "inicio", label: "Início", icon: Target },
  { id: "golpistas", label: "Golpistas", icon: Eye },
  { id: "denunciar", label: "Denunciar", icon: AlertTriangle },
]

export function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  user,
  simulateLogin,
  handleLogout,
  pendingReports,
  approvedGolpistas,
}: HeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black tracking-tighter">tsvn__</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">taxados</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center bg-card rounded-xl md:rounded-2xl px-1 py-1.5 md:px-2 md:py-2.5 gap-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center space-x-1 md:space-x-2 px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 text-sm md:text-base ${
                    currentPage === item.id
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-gray-400 hover:text-white hover:bg-muted"
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-semibold hidden lg:block">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-muted">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-lg ${
                          currentPage === item.id
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-gray-400 hover:text-white hover:bg-muted"
                        }`}
                        onClick={() => {
                          setCurrentPage(item.id)
                          setIsSheetOpen(false)
                        }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

          {isLoggedIn ? (
            <div className="bg-card rounded-xl md:rounded-2xl px-1 py-1.5 md:px-2 md:py-2.5">
              <UserDropdownOrLogin
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                setCurrentPage={setCurrentPage}
                pendingReports={pendingReports}
                approvedGolpistas={approvedGolpistas}
              />
            </div>
          ) : (
            <UserDropdownOrLogin
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogout={handleLogout}
              setCurrentPage={setCurrentPage}
              pendingReports={pendingReports}
              approvedGolpistas={approvedGolpistas}
            />
          )}
        </div>
      </div>
    </header>
  )
}
