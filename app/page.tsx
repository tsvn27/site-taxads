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
    async function fetchData() {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        
        setPendingReports(data.pendingReports);
        setApprovedGolpistas(data.approvedReports);
        setRejectedReports(data.rejectedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as denúncias.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }

    fetchData();
    setCurrentPageInternal("inicio");
  }, [toast])

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
    async (newReport: any) => {
      try {
        const reportData = {
          authorId: session?.user?.id || session?.user?.email || "unknown",
          authorName: session?.user?.name || "Anônimo",
          scammerName: newReport.nome || newReport.telegramUsername || newReport.discordUsername || newReport.otherPlatformIdentifier,
          scammerId: newReport.discordId || newReport.telegramId || newReport.otherPlatformId || "unknown",
          description: newReport.description,
          images: newReport.images || [],
        };

        const response = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportData),
        });

        if (!response.ok) throw new Error('Falha ao enviar denúncia');

        const savedReport = await response.json();
        setPendingReports((prev) => [...prev, savedReport]);

        toast({
          title: "Denúncia Enviada!",
          description: "Sua denúncia foi enviada para aprovação.",
          duration: 3000,
        });

        setCurrentPage("inicio");
      } catch (error) {
        console.error('Error submitting report:', error);
        toast({
          title: "Erro ao enviar denúncia",
          description: "Não foi possível enviar sua denúncia. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    [session, toast, setPendingReports],
  )

  const handleApproveReport = useCallback(
    async (reportId: string, risk: string) => {
      try {
        const response = await fetch('/api/reports', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reportId, status: 'approved', risk }),
        });

        if (!response.ok) throw new Error('Falha ao aprovar denúncia');

        const approvedReport = await response.json();

        setPendingReports((prev) => prev.filter((report) => report.id !== reportId));
        setApprovedGolpistas((prev) => [...prev, approvedReport]);

        toast({
          title: "Denúncia Aprovada!",
          description: `A denúncia de ${approvedReport.scammer_name} foi aprovada.`,
          duration: 3000,
          variant: "default",
        });

        try {
          await sendDiscordWebhook(approvedReport);
          if (approvedReport.author_id) {
            await sendDiscordDM(
              approvedReport.author_id,
              `\`✅\` **Denúncia Aprovada**

Sua denúncia sobre **${approvedReport.scammer_name}** foi verificada e aprovada com sucesso.
\`🛡️\` Obrigado por contribuir para a segurança da comunidade!`,
            );
          }
        } catch (error) {
          console.error("Erro ao enviar notificações Discord:", error);
        }
      } catch (error) {
        console.error('Error approving report:', error);
        toast({
          title: "Erro ao aprovar denúncia",
          description: "Não foi possível aprovar a denúncia. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    [toast],
  )

  const handleRejectReport = useCallback(
    async (reportId: string) => {
      try {
        const response = await fetch('/api/reports', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reportId, status: 'rejected' }),
        });

        if (!response.ok) throw new Error('Falha ao rejeitar denúncia');

        const rejectedReport = await response.json();

        setPendingReports((prev) => prev.filter((report) => report.id !== reportId));
        setRejectedReports((prev) => [...prev, rejectedReport]);

        toast({
          title: "Denúncia Rejeitada!",
          description: `A denúncia de ${rejectedReport.scammer_name} foi rejeitada.`,
          duration: 3000,
          variant: "destructive",
        });

        if (rejectedReport.author_id) {
          try {
            await sendDiscordDM(
              rejectedReport.reporterDiscordId,
              `\`❌\` **Denúncia Rejeitada**

Sua denúncia sobre **${rejectedReport.nome || rejectedReport.telegramUsername || rejectedReport.discordUsername || rejectedReport.otherPlatformIdentifier}** foi rejeitada após análise.
\`💬\` Para mais detalhes, entre em contato com um administrador.`,
            )
          } catch (error) {
            console.error("Erro ao enviar DM de rejeição:", error);
          }
        }
      } catch (error) {
        console.error('Error rejecting report:', error);
        toast({
          title: "Erro ao rejeitar denúncia",
          description: "Não foi possível rejeitar a denúncia. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    [pendingReports, toast, setRejectedReports],
  )

  const handleApproveRejectedReport = useCallback(
    async (reportId: string, risk: string) => {
      try {
        const response = await fetch('/api/reports', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reportId, status: 'approved', risk }),
        });

        if (!response.ok) throw new Error('Falha ao re-aprovar denúncia');

        const reApprovedReport = await response.json();

        setRejectedReports((prev) => prev.filter((report) => report.id !== reportId));
        setApprovedGolpistas((prev) => [...prev, reApprovedReport]);

        toast({
          title: "Denúncia Re-aprovada!",
          description: `A denúncia de ${reApprovedReport.scammer_name} foi re-aprovada.`,
          duration: 3000,
          variant: "default",
        });

        try {
          await sendDiscordWebhook(reApprovedReport);
          if (reApprovedReport.author_id) {
            await sendDiscordDM(
              reApprovedReport.author_id,
              `\`✅\` **Denúncia Re-aprovada**

Sua denúncia sobre **${reApprovedReport.scammer_name}** foi re-aprovada após nova análise.
\`🛡️\` Obrigado por contribuir para a segurança da comunidade!`,
            );
          }
        } catch (error) {
          console.error("Erro ao enviar notificações de re-aprovação:", error);
        }
      } catch (error) {
        console.error('Error re-approving report:', error);
        toast({
          title: "Erro ao re-aprovar denúncia",
          description: "Não foi possível re-aprovar a denúncia. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    [toast],
  )

  const handleRejectApprovedReport = useCallback(
    async (reportId: string) => {
      try {
        const response = await fetch('/api/reports', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reportId, status: 'rejected' }),
        });

        if (!response.ok) throw new Error('Falha ao rejeitar denúncia aprovada');

        const reRejectedReport = await response.json();

        setApprovedGolpistas((prev) => prev.filter((report) => report.id !== reportId));
        setRejectedReports((prev) => [...prev, reRejectedReport]);

        toast({
          title: "Denúncia Rejeitada!",
          description: `A denúncia de ${reRejectedReport.scammer_name} foi movida para rejeitadas.`,
          duration: 3000,
          variant: "destructive",
        });

        if (reRejectedReport.author_id) {
          try {
            await sendDiscordDM(
              reRejectedReport.author_id,
              `\`❌\` **Denúncia Rejeitada Novamente** 

Sua denúncia sobre **${reRejectedReport.scammer_name}** foi rejeitada após nova análise.
\`💬\` Para mais detalhes, entre em contato com um administrador.`,
            );
          } catch (error) {
            console.error("Erro ao enviar DM de re-rejeição:", error);
          }
        }
      } catch (error) {
        console.error('Error rejecting approved report:', error);
        toast({
          title: "Erro ao rejeitar denúncia aprovada",
          description: "Não foi possível rejeitar a denúncia. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
    [toast],
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

  const handleClearAllReports = useCallback(async () => {
    try {
      const response = await fetch('/api/reports/clear', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Falha ao limpar dados');

      setPendingReports([]);
      setApprovedGolpistas([]);
      setRejectedReports([]);

      toast({
        title: "Dados Limpos!",
        description: "Todas as denúncias foram removidas com sucesso.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      toast({
        title: "Erro ao limpar dados",
        description: "Não foi possível limpar os dados. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    }
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
