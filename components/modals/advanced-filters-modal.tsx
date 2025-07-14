"use client"
import { X } from "lucide-react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AdvancedFiltersModalProps {
  currentFilters: {
    platform: string
    type: string
    verified: boolean | null
    risk: string
  }
  onApplyFilters: (filters: {
    platform: string
    type: string
    verified: boolean | null
    risk: string
  }) => void
  onClose: () => void
}

export function AdvancedFiltersModal({ currentFilters, onApplyFilters, onClose }: AdvancedFiltersModalProps) {
  const [filters, setFilters] = useState(currentFilters)

  useEffect(() => {
    setFilters(currentFilters)
  }, [currentFilters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    const clearedFilters = {
      platform: "",
      type: "",
      verified: null,
      risk: "",
    }
    setFilters(clearedFilters)
    onApplyFilters(clearedFilters)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-xs relative">
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
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter">Filtros</h2> 
          <p className="text-sm md:text-base text-gray-400">Refine sua busca</p> 
        </div>
        <div className="space-y-4 md:space-y-5">
          {" "}
          <div className="space-y-2">
            {" "}
            <label className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Plataforma</label>{" "}
            <select
              name="platform"
              className="w-full bg-input border-none text-white rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-white/20" // Alterado para rounded-xl
              value={filters.platform}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Telegram">Telegram</option>
              <option value="Discord">Discord</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Tipo de Golpe</label>
            <select
              name="type"
              className="w-full bg-input border-none text-white rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-white/20" // Alterado para rounded-xl
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="pix">PIX Falso</option>
              <option value="venda">Venda Falsa</option>
              <option value="emprestimo">Empréstimo Falso</option>
              <option value="investimento">Investimento Falso</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Risco</label>
            <select
              name="risk"
              className="w-full bg-input border-none text-white rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-white/20" 
              value={filters.risk}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Alto">Alto</option>
              <option value="Médio">Médio</option>
              <option value="Baixo">Baixo</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            {" "}
            <input
              type="checkbox"
              id="verified"
              name="verified"
              className="h-4 w-4 rounded-full text-white bg-input border-border focus:ring-white/20" 
              checked={filters.verified || false}
              onChange={handleFilterChange}
            />
            <label htmlFor="verified" className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">
              {" "}
              Apenas Verificados
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            {" "}
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-gray-100 py-2 rounded-xl text-sm font-bold" 
              onClick={handleApply}
            >
              Aplicar Filtros
            </Button>
            <Button
              variant="outline"
              className="flex-1 border border-border text-muted-foreground hover:bg-accent hover:text-white py-2 rounded-xl font-bold bg-transparent" 
              onClick={handleClear}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
