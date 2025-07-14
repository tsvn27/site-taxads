"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSession, signIn, signOut } from "next-auth/react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { InicioPage } from "@/components/pages/inicio-page"
import { GolpistasPage } from "@/components/pages/golpistas-page"
import { DenunciarPage } from "@/components/pages/denunciar-page"
import { AdminDashboardPage } from "@/components/pages/admin-dashboard-page"
import { GolpistaDetailModal } from "@/components/modals/golpista-detail-modal"
import { AdvancedFiltersModal } from "@/components/modals/advanced-filters-modal"
import { HowItWorksModal } from "@/components/modals/how-it-works-modal"

import { sendDiscordWebhook, sendDiscordDM } from "@/actions/discord"

export default function SentinelRevolutionaryFixed() {
  const { data: session, status } = useSession()
  const [currentPage, setCurrentPageInternal] = useState("inicio")
  
  const [pendingReports, setPendingReports] = useState<any[]>([])
  const [approvedGolpistas, setApprovedGolpistas] = useState<any[]>([])
  const [rejectedReports, setRejectedReports] = useState<any[]>([])
  const [loggedInUsers, setLoggedInUsers] = useState<Set<string>>(new Set())

  const [showGolpistaDetailModal, setShowGolpistaDetailModal] = useState(false)
  const [selectedGolpista, setSelectedGolpista] = useState<any>(null)

  const [advancedFilters, setAdvancedFilters] = useState({
    platform: "",
    type: "",
    verified: null as boolean | null,
    risk: "",
  })
  const [showAdvancedFiltersModal, setShowAdvancedFiltersModal] = useState(false)
  const [howItWorksModalType, setHowItWorksModalType] = useState<"denounce" | "tags" | null>(null)

  const { toast } = useToast()

  const prevStatus = useRef(status)

  useEffect(() => {
    const storedPending = localStorage.getItem("pendingReports")
    const storedApproved = localStorage.getItem("approvedGolpistas")
    const storedRejected = localStorage.getItem("rejectedReports")
    const storedLoggedInUsers = localStorage.getItem("loggedInUsers")

    if (storedPending) setPendingReports(JSON.parse(storedPending))
    if (storedApproved) setApprovedGolpistas(JSON.parse(storedApproved))
    if (storedRejected) setRejectedReports(JSON.parse(storedRejected))
    if (storedLoggedInUsers) setLoggedInUsers(new Set(JSON.parse(storedLoggedInUsers)))

    setCurrentPageInternal("inicio")
  }, [])

  useEffect(() => {
    localStorage.setItem("pendingReports", JSON.stringify(pendingReports))
  }, [pendingReports])

  useEffect(() => {
    localStorage.setItem("approvedGolpistas", JSON.stringify(approvedGolpistas))
  }, [approvedGolpistas])

  useEffect(() => {
    localStorage.setItem("rejectedReports", JSON.stringify(rejectedReports))
  }, [rejectedReports])

  useEffect(() => {
    localStorage.setItem("loggedInUsers", JSON.stringify(Array.from(loggedInUsers)))
  }, [loggedInUsers])

  useEffect(() => {
    if (status === "authenticated" && prevStatus.current === "loading") {
      const userId = session?.user?.id || session?.user?.email || "unknown"
      setLoggedInUsers((prev) => new Set(prev).add(userId))
      toast({
        title: "Login Realizado!",
        description: `Bem-vindo, ${session?.user?.name || session?.user?.email || "Usuário"}!`,
        duration: 3000,
      })
    } else if (status === "unauthenticated" && prevStatus.current === "authenticated") {
      toast({
        title: "Sessão Encerrada",
        description: "Você foi desconectado com sucesso.",
        duration: 3000,
      })
    }
    prevStatus.current = status
  }, [status, session, toast])

  const setCurrentPage = (page: string) => {
    console.log("Navegando para:", page)
    setCurrentPageInternal(page)
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    signOut()
  }

  const handleReportSubmit = useCallback(
    (newReport: any) => {
      const reportWithId = {
        ...newReport,
        id: crypto.randomUUID(),
        status: "pending",
        reporterDiscordId: session?.user?.id || session?.user?.email || "unknown",
      }

      setPendingReports((prev) => [...prev, reportWithId])

      toast({
        title: "Denúncia Enviada!",
        description: "Sua denúncia foi enviada para aprovação.",
        duration: 3000,
      })

      setCurrentPage("inicio")
    },
    [session, toast, setPendingReports],
  )

  const handleApproveReport = useCallback(
    async (reportId: string, risk: string) => {
      let approvedReport: any = null
      const reportToApprove = pendingReports.find((report) => report.id === reportId)

      if (reportToApprove) {
        approvedReport = {
          ...reportToApprove,
          status: "approved",
          denuncias: 1,
          verificado: true,
          risco: risk, 
        }

        setPendingReports((prev) => prev.filter((report) => report.id !== reportId))

        setApprovedGolpistas((prevApproved) => {
          if (!prevApproved.some((item) => item.id === approvedReport.id)) {
            return [...prevApproved, approvedReport]
          }
          return prevApproved
        })

        toast({
          title: "Denúncia Aprovada!",
          description: `A denúncia de ${reportToApprove.nome || reportToApprove.telegramUsername || reportToApprove.discordUsername || reportToApprove.otherPlatformIdentifier} foi aprovada.`,
          duration: 3000,
          variant: "default",
        })

        try {
          await sendDiscordWebhook(approvedReport)
          if (approvedReport.reporterDiscordId) {
            await sendDiscordDM(
              approvedReport.reporterDiscordId,
              `\`✅\` **Denúncia Aprovada**

Sua denúncia sobre **${approvedReport.nome || approvedReport.telegramUsername || approvedReport.discordUsername || approvedReport.otherPlatformIdentifier}** foi verificada e aprovada com sucesso.
\`🛡️\` Obrigado por contribuir para a segurança da comunidade!`,
            )
          }
        } catch (error) {
          console.error("Erro ao enviar notificações Discord:", error)
        }
      }
    },
    [pendingReports, toast, setApprovedGolpistas],
  )

  const handleRejectReport = useCallback(
    async (reportId: string) => {
      let rejectedReport: any = null
      const reportToReject = pendingReports.find((report) => report.id === reportId)

      if (reportToReject) {
        rejectedReport = { ...reportToReject, status: "rejected" }

        setPendingReports((prev) => prev.filter((report) => report.id !== reportId))

        setRejectedReports((prevRejected) => {
          if (!prevRejected.some((item) => item.id === rejectedReport.id)) {
            return [...prevRejected, rejectedReport]
          }
          return prevRejected
        })

        toast({
          title: "Denúncia Rejeitada!",
          description: `A denúncia de ${reportToReject.nome || reportToReject.telegramUsername || reportToReject.discordUsername || reportToReject.otherPlatformIdentifier} foi rejeitada.`,
          duration: 3000,
          variant: "destructive",
        })

        if (rejectedReport.reporterDiscordId) {
          try {
            await sendDiscordDM(
              rejectedReport.reporterDiscordId,
              `\`❌\` **Denúncia Rejeitada**

Sua denúncia sobre **${rejectedReport.nome || rejectedReport.telegramUsername || rejectedReport.discordUsername || rejectedReport.otherPlatformIdentifier}** foi rejeitada após análise.
\`💬\` Para mais detalhes, entre em contato com um administrador.`,
            )
          } catch (error) {
            console.error("Erro ao enviar DM de rejeição:", error)
          }
        }
      }
    },
    [pendingReports, toast, setRejectedReports],
  )

  const handleApproveRejectedReport = useCallback(
    async (reportId: string, risk: string) => {
      let reApprovedReport: any = null
      const reportToReApprove = rejectedReports.find((report) => report.id === reportId)

      if (reportToReApprove) {
        reApprovedReport = {
          ...reportToReApprove,
          status: "approved",
          denuncias: (reportToReApprove.denuncias || 0) + 1,
          verificado: true,
          risco: risk, 
        }

        setRejectedReports((prev) => prev.filter((report) => report.id !== reportId))

        setApprovedGolpistas((prevApproved) => {
          if (!prevApproved.some((item) => item.id === reApprovedReport.id)) {
            return [...prevApproved, reApprovedReport]
          }
          return prevApproved
        })

        toast({
          title: "Denúncia Re-aprovada!",
          description: `A denúncia de ${reportToReApprove.nome || reportToReApprove.telegramUsername || reportToReApprove.discordUsername || reportToReApprove.otherPlatformIdentifier} foi re-aprovada.`,
          duration: 3000,
          variant: "default",
        })

        try {
          await sendDiscordWebhook(reApprovedReport)
          if (reApprovedReport.reporterDiscordId) {
            await sendDiscordDM(
              reApprovedReport.reporterDiscordId,
              `\`✅\` **Denúncia Re-aprovada**

Sua denúncia sobre **${reApprovedReport.nome || reApprovedReport.telegramUsername || reApprovedReport.discordUsername || reApprovedReport.otherPlatformIdentifier}** foi re-aprovada após nova análise.
\`🛡️\` Obrigado por contribuir para a segurança da comunidade!`,
            )
          }
        } catch (error) {
          console.error("Erro ao enviar notificações de re-aprovação:", error)
        }
      }
    },
    [rejectedReports, toast, setApprovedGolpistas],
  )

  const handleRejectApprovedReport = useCallback(
    async (reportId: string) => {
      let reRejectedReport: any = null
      const reportToReReject = approvedGolpistas.find((report) => report.id === reportId)

      if (reportToReReject) {
        reRejectedReport = { ...reportToReReject, status: "rejected" }

        setApprovedGolpistas((prev) => prev.filter((report) => report.id !== reportId))

        setRejectedReports((prevRejected) => {
          if (!prevRejected.some((item) => item.id === reRejectedReport.id)) {
            return [...prevRejected, reRejectedReport]
          }
          return prevRejected
        })

        toast({
          title: "Denúncia Rejeitada!",
          description: `A denúncia de ${reportToReReject.nome || reportToReReject.telegramUsername || reportToReReject.discordUsername || reportToReReject.otherPlatformIdentifier} foi movida para rejeitadas.`,
          duration: 3000,
          variant: "destructive",
        })

        if (reRejectedReport.reporterDiscordId) {
          try {
            await sendDiscordDM(
              reRejectedReport.reporterDiscordId,
              `\`❌\` **Denúncia Rejeitada Novamente** 

Sua denúncia sobre **${reRejectedReport.nome || reRejectedReport.telegramUsername || reRejectedReport.discordUsername || reRejectedReport.otherPlatformIdentifier}** foi rejeitada após nova análise.
\`💬\` Para mais detalhes, entre em contato com um administrador.`,
            )
          } catch (error) {
            console.error("Erro ao enviar DM de re-rejeição:", error)
          }
        }
      }
    },
    [approvedGolpistas, toast, setRejectedReports],
  )

  const openGolpistaDetail = (golpista: any) => {
    setSelectedGolpista(golpista)
    setShowGolpistaDetailModal(true)
  }

  const closeGolpistaDetail = () => {
    setSelectedGolpista(null)
    setShowGolpistaDetailModal(false)
  }

  const openAdvancedFilters = (currentFilters: any) => {
    setAdvancedFilters(currentFilters)
    setShowAdvancedFiltersModal(true)
  }

  const applyAdvancedFilters = (filters: {
    platform: string
    type: string
    verified: boolean | null
    risk: string
  }) => {
    setAdvancedFilters(filters)
  }

  const closeAdvancedFiltersModal = () => {
    setShowAdvancedFiltersModal(false)
  }

  const openHowItWorks = (type: "denounce" | "tags") => {
    setHowItWorksModalType(type)
  }

  const closeHowItWorks = () => {
    setHowItWorksModalType(null)
  }

  const handleClearAllReports = useCallback(() => {
    setPendingReports([])
    setApprovedGolpistas([])
    setRejectedReports([])
    localStorage.removeItem("pendingReports")
    localStorage.removeItem("approvedGolpistas")
    localStorage.removeItem("rejectedReports")
    toast({
      title: "Dados Limpos!",
      description: "Todas as denúncias (pendentes, aprovadas, rejeitadas) foram removidas do localStorage.",
      duration: 3000,
    })
  }, [toast])

  const currentUser = session?.user
    ? {
        name: session.user.name || "Usuário",
        avatar: session.user.image || "/placeholder.svg",
        image: session.user.image || "/placeholder.svg",
        isAdmin: session.user.isAdmin,
      }
    : null

  return (
    <div className="min-h-screen bg-background text-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={status === "authenticated"}
        user={currentUser}
        simulateLogin={() => signIn("discord")}
        handleLogout={handleLogout}
        pendingReports={pendingReports}
        approvedGolpistas={approvedGolpistas}
      />
      <div
        key={currentPage}
        className="transition-all duration-500 ease-in-out opacity-0 translate-y-4 animate-fade-in-up"
      >
        {currentPage === "inicio" && (
          <InicioPage
            setCurrentPage={setCurrentPage}
            approvedGolpistasCount={approvedGolpistas.length}
            loggedInUsersCount={loggedInUsers.size}
          />
        )}
        {currentPage === "golpistas" && (
          <GolpistasPage
            approvedGolpistas={approvedGolpistas}
            openGolpistaDetail={openGolpistaDetail}
            openAdvancedFiltersModal={openAdvancedFilters}
            openHowItWorksModal={openHowItWorks}
            currentFilters={advancedFilters}
          />
        )}
        {currentPage === "denunciar" && (
          <DenunciarPage
            isLoggedIn={status === "authenticated"}
            simulateLogin={() => signIn("discord")}
            setCurrentPage={setCurrentPage}
            handleReportSubmit={handleReportSubmit}
            openHowItWorksModal={openHowItWorks}
          />
        )}
        {currentPage === "admin-dashboard" && (
          <AdminDashboardPage
            isLoggedIn={status === "authenticated"}
            user={currentUser}
            setCurrentPage={setCurrentPage}
            pendingReports={pendingReports}
            approvedGolpistas={approvedGolpistas}
            rejectedReports={rejectedReports}
            handleApproveReport={handleApproveReport}
            handleRejectReport={handleRejectReport}
            handleApproveRejectedReport={handleApproveRejectedReport}
            handleRejectApprovedReport={handleRejectApprovedReport}
            handleClearAllReports={handleClearAllReports} // Passa a nova função
          />
        )}
      </div>
      {showGolpistaDetailModal && <GolpistaDetailModal golpista={selectedGolpista} onClose={closeGolpistaDetail} />}
      {showAdvancedFiltersModal && (
        <AdvancedFiltersModal
          currentFilters={advancedFilters}
          onApplyFilters={applyAdvancedFilters}
          onClose={closeAdvancedFiltersModal}
        />
      )}
      {howItWorksModalType && <HowItWorksModal type={howItWorksModalType} onClose={closeHowItWorks} />}
      <Footer />
    </div>
  )
}
