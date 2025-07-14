"use client"
import { Settings, Clock, CheckCircle, XCircle, Trash2, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ImagePreviewModal } from "@/components/modals/image-preview-modal"

interface AdminDashboardPageProps {
  isLoggedIn: boolean
  user: { name: string; image: string; isAdmin: boolean } | null
  setCurrentPage: (page: string) => void
  pendingReports: any[]
  approvedGolpistas: any[]
  rejectedReports: any[]
  handleApproveReport: (reportId: string, risk: string) => void
  handleRejectReport: (reportId: string) => void
  handleApproveRejectedReport: (reportId: string, risk: string) => void
  handleRejectApprovedReport: (reportId: string) => void
  handleClearAllReports: () => void
}

export function AdminDashboardPage({
  isLoggedIn,
  user,
  setCurrentPage,
  pendingReports,
  approvedGolpistas,
  rejectedReports,
  handleApproveReport,
  handleRejectReport,
  handleApproveRejectedReport,
  handleRejectApprovedReport,
  handleClearAllReports, 
}: AdminDashboardPageProps) {
  const [adminCurrentTab, setAdminCurrentTab] = useState("pending")
  const [selectedRiskForPending, setSelectedRiskForPending] = useState<Record<string, string>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!isLoggedIn || !user?.isAdmin) {
    return (
      <main className="pt-24 md:pt-32 min-h-screen flex items-center justify-center bg-grid px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 md:space-y-6 bg-card p-8 md:p-12 rounded-2xl md:rounded-3xl max-w-lg">
          <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Acesso Negado</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto">
            Você não tem permissão para acessar o dashboard administrativo.
          </p>
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

  const renderReports = (reports: any[], type: "pending" | "approved" | "rejected") => {
    if (reports.length === 0) {
      return (
        <p className="text-gray-400 text-center py-6 md:py-8 text-base md:text-lg">
          {type === "pending"
            ? "Nenhuma denúncia pendente no momento."
            : type === "approved"
              ? "Nenhuma denúncia aprovada ainda."
              : "Nenhuma denúncia rejeitada ainda."}
        </p>
      )
    }

    return (
      <div className="grid gap-4 md:gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-muted rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0"
          >
            <div className="space-y-1 md:space-y-2 flex-1">
              {" "}
              <h3 className="text-lg md:text-xl font-bold">
                {report.nome ||
                  report.telegramUsername ||
                  report.discordUsername ||
                  report.otherPlatformIdentifier ||
                  "Nome Indefinido"}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm">
                {report.telefone && `Telefone: ${report.telefone} • `}
                {report.email && `Email: ${report.email} • `}
                {report.telegramUsername && `Telegram: @${report.telegramUsername} • `}
                {report.discordUsername && `Discord: ${report.discordUsername} • `}
                {report.otherPlatformIdentifier && `ID Plataforma: ${report.otherPlatformIdentifier} • `}
                Tipo: {report.tipo} • Plataforma: {report.plataforma}
              </p>
              <p className="text-gray-300 text-sm md:text-base mt-1 md:mt-2">{report.descricao}</p>
              {report.images && report.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-gray-500 text-xs md:text-sm mb-2">Fotos Anexadas:</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {" "}
                    {report.images.map((imageName: string, index: number) => (
                      <div
                        key={index}
                        className="relative w-full h-16 rounded-md overflow-hidden bg-card flex items-center justify-center"
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
            {type === "pending" && (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-3 md:mt-0 w-full md:w-auto">
                <select
                  className="bg-input border border-white/20 text-white rounded-full py-2 px-3 text-sm focus:ring-2 focus:ring-white/20"
                  value={selectedRiskForPending[report.id] || "Alto"} 
                  onChange={(e) => setSelectedRiskForPending((prev) => ({ ...prev, [report.id]: e.target.value }))}
                >
                  <option value="Alto">Alto Risco</option>
                  <option value="Médio">Médio Risco</option>
                  <option value="Baixo">Baixo Risco</option>
                </select>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-full font-bold flex items-center justify-center text-sm"
                  onClick={() => handleApproveReport(report.id, selectedRiskForPending[report.id] || "Alto")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-full font-bold flex items-center justify-center text-sm"
                  onClick={() => handleRejectReport(report.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            )}
            {type === "approved" && (
              <div className="flex space-x-4 mt-3 md:mt-0">
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-full font-bold flex items-center text-sm"
                  onClick={() => handleRejectApprovedReport(report.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            )}
            {type === "rejected" && (
              <div className="flex space-x-4 mt-3 md:mt-0">
                <Button
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-full font-bold flex items-center text-sm"
                  onClick={() => handleApproveRejectedReport(report.id, selectedRiskForPending[report.id] || "Alto")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="pt-24 md:pt-32 min-h-screen bg-grid">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-8 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-3 bg-blue-500/20 rounded-full px-4 py-2 md:px-6 md:py-3">
              <Settings className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <span className="text-xs md:text-sm text-blue-400 uppercase tracking-widest font-bold">
                ADMIN DASHBOARD
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">GERENCIAR DENÚNCIAS</h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Revise e aprove ou rejeite denúncias pendentes
            </p>
          </div>

          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8">
            <div className="flex flex-wrap justify-center gap-3 md:space-x-4 mb-6 md:mb-8">
              <Button
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold flex items-center space-x-2 text-sm md:text-base ${
                  adminCurrentTab === "pending"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => setAdminCurrentTab("pending")}
              >
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span>Pendentes ({pendingReports.length})</span>
              </Button>
              <Button
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold flex items-center space-x-2 text-sm md:text-base ${
                  adminCurrentTab === "approved"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => setAdminCurrentTab("approved")}
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>Aprovadas ({approvedGolpistas.length})</span>
              </Button>
              <Button
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold flex items-center space-x-2 text-sm md:text-base ${
                  adminCurrentTab === "rejected"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => setAdminCurrentTab("rejected")}
              >
                <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>Rejeitadas ({rejectedReports.length})</span>
              </Button>
            </div>

            <div
              key={adminCurrentTab} 
              className="transition-all duration-500 ease-in-out opacity-0 translate-y-4 animate-fade-in-up"
            >
              {adminCurrentTab === "pending" && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Denúncias Pendentes</h2>
                  {renderReports(pendingReports, "pending")}
                </>
              )}
              {adminCurrentTab === "approved" && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Denúncias Aprovadas</h2>
                  {renderReports(approvedGolpistas, "approved")}
                </>
              )}
              {adminCurrentTab === "rejected" && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Denúncias Rejeitadas</h2>
                  {renderReports(rejectedReports, "rejected")}
                </>
              )}
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <Button
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold flex items-center space-x-2 mx-auto"
                onClick={handleClearAllReports}
              >
                <Trash2 className="w-5 h-5" />
                <span>Limpar Todos os Dados (Dev)</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  )
}
