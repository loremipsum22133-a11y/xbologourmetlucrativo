import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, DollarSign, Percent, Package, Info, RefreshCw } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  packSize: number; // in grams/ml/units
  packPrice: number; // in BRL
  amountUsed: number; // in grams/ml/units
}

export const CostCalculator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [packagingCost, setPackagingCost] = useState<number>(0);
  const [overheadPercentage, setOverheadPercentage] = useState<number>(0); // gas, electricity, etc.
  const [profitMargin, setProfitMargin] = useState<number>(0); // percentage

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      packSize: 0,
      packPrice: 0,
      amountUsed: 0,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id) {
        return { ...ing, [field]: value };
      }
      return ing;
    }));
  };

  const resetCalculator = () => {
    setIngredients([]);
    setPackagingCost(0);
    setOverheadPercentage(0);
    setProfitMargin(0);
  };

  // Calculations
  const ingredientCosts = ingredients.map(ing => {
    if (ing.packSize <= 0 || ing.packPrice <= 0 || ing.amountUsed <= 0) return 0;
    return (ing.packPrice / ing.packSize) * ing.amountUsed;
  });

  const totalIngredientsCost = ingredientCosts.reduce((acc, curr) => acc + curr, 0);
  const overheadCost = totalIngredientsCost * (overheadPercentage / 100);
  const totalProductionCost = totalIngredientsCost + overheadCost + packagingCost;
  const suggestedSellingPrice = totalProductionCost * (1 + profitMargin / 100);
  const profitAmount = suggestedSellingPrice - totalProductionCost;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-2 pb-6">
      
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-[#E5DED3] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[#4E2A1E]">
            <Calculator className="w-5 h-5 text-[#F4C95D]" />
            <h2 className="text-base font-serif font-black">Calculadora de Custos & Lucro</h2>
          </div>
          <p className="text-xs text-[#4E2A1E]/60 max-w-xl">
            Calcule o custo exato dos ingredientes, embalagens e despesas indiretas para precificar seu X-Bolo corretamente e garantir lucro real.
          </p>
        </div>
        <button
          onClick={resetCalculator}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-[#E5DED3] hover:bg-[#FAEFE4]/50 text-xs font-bold text-[#4E2A1E]/70 transition-all active:scale-95 flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Resetar</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Forms (Ingredients & Parameters) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Ingredients list card */}
          <div className="bg-white rounded-3xl border border-[#E5DED3] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5F1EA] pb-3">
              <h3 className="text-sm font-serif font-bold text-[#4E2A1E]">1. Ingredientes da Receita</h3>
              <button
                onClick={addIngredient}
                className="flex items-center space-x-1 bg-[#4E2A1E] hover:bg-[#3d2018] text-[#F4C95D] px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Ingrediente</span>
              </button>
            </div>

            {/* Table/List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {ingredients.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#4E2A1E]/40">
                  Nenhum ingrediente adicionado. Clique no botão acima para adicionar.
                </div>
              ) : (
                ingredients.map((ing, index) => {
                  const cost = ingredientCosts[index];
                  return (
                    <div 
                      key={ing.id} 
                      className="p-3 bg-[#F5F1EA]/50 border border-[#E5DED3]/60 rounded-2xl grid grid-cols-12 gap-3 items-end relative group"
                    >
                      {/* Ingredient Name */}
                      <div className="col-span-12 md:col-span-4">
                        <label className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase mb-1">Nome</label>
                        <input
                          type="text"
                          value={ing.name}
                          onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                          placeholder="Ex: Chocolate 50%"
                          className="w-full bg-white border border-[#E5DED3] rounded-xl px-3 py-2 text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40"
                        />
                      </div>

                      {/* Package Size */}
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase mb-1">Tamanho (g/ml)</label>
                        <input
                          type="number"
                          value={ing.packSize || ''}
                          onChange={(e) => updateIngredient(ing.id, 'packSize', parseFloat(e.target.value) || 0)}
                          placeholder="1000"
                          className="w-full bg-white border border-[#E5DED3] rounded-xl px-3 py-2 text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40"
                        />
                      </div>

                      {/* Package Price */}
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase mb-1">Preço (R$)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={ing.packPrice || ''}
                          onChange={(e) => updateIngredient(ing.id, 'packPrice', parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                          className="w-full bg-white border border-[#E5DED3] rounded-xl px-3 py-2 text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40"
                        />
                      </div>

                      {/* Amount Used */}
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase mb-1">Usado (g/ml)</label>
                        <input
                          type="number"
                          value={ing.amountUsed || ''}
                          onChange={(e) => updateIngredient(ing.id, 'amountUsed', parseFloat(e.target.value) || 0)}
                          placeholder="100"
                          className="w-full bg-white border border-[#E5DED3] rounded-xl px-3 py-2 text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40"
                        />
                      </div>

                      {/* Calculated Ingredient Cost */}
                      <div className="col-span-10 md:col-span-1 text-right flex md:flex-col justify-between items-center md:items-end pb-2 md:pb-0">
                        <span className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase md:hidden">Custo</span>
                        <div>
                          <span className="block text-[10px] font-mono text-[#4E2A1E]/40 uppercase hidden md:block">Custo</span>
                          <span className="text-xs font-bold text-[#4E2A1E] font-mono whitespace-nowrap">
                            R$ {cost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Trash action */}
                      <div className="col-span-2 md:col-span-1 flex justify-end pb-1 md:pb-0">
                        <button
                          onClick={() => removeIngredient(ing.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Parameters & Additional Costs */}
          <div className="bg-white rounded-3xl border border-[#E5DED3] p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Packaging */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-1 text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">
                <Package className="w-3.5 h-3.5" />
                <span>Embalagem / Adicionais</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#4E2A1E]/50 font-mono">R$</span>
                <input
                  type="number"
                  step="0.10"
                  value={packagingCost || ''}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F5F1EA]/50 border border-[#E5DED3] rounded-xl text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40 focus:bg-white transition-all"
                />
              </div>
              <span className="text-[10px] text-[#4E2A1E]/40">Custo de caixas, fitas, etiquetas.</span>
            </div>

            {/* Overheads percentage */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-1 text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5" />
                <span>Gastos Indiretos (%)</span>
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#4E2A1E]/50 font-mono">%</span>
                <input
                  type="number"
                  value={overheadPercentage || ''}
                  onChange={(e) => setOverheadPercentage(parseFloat(e.target.value) || 0)}
                  className="w-full pl-4 pr-9 py-2.5 bg-[#F5F1EA]/50 border border-[#E5DED3] rounded-xl text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40 focus:bg-white transition-all"
                />
              </div>
              <span className="text-[10px] text-[#4E2A1E]/40">Gás, luz, água (recomendado 10%).</span>
            </div>

            {/* Desired profit margin */}
            <div className="space-y-1.5">
              <label className="flex items-center space-x-1 text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Margem de Lucro (%)</span>
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#4E2A1E]/50 font-mono">%</span>
                <input
                  type="number"
                  value={profitMargin || ''}
                  onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                  className="w-full pl-4 pr-9 py-2.5 bg-[#F5F1EA]/50 border border-[#E5DED3] rounded-xl text-xs text-[#4E2A1E] focus:outline-none focus:border-[#4E2A1E]/40 focus:bg-white transition-all"
                />
              </div>
              <span className="text-[10px] text-[#4E2A1E]/40">Retorno desejado (sugerido 150%+).</span>
            </div>

          </div>

        </div>

        {/* Right Sidebar Results Summary (Premium Card) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4E2A1E] via-[#6B3A2A] to-[#4E2A1E] text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#F4C95D]/10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 blur-lg" />

            <div className="border-b border-white/10 pb-4 relative z-10">
              <h3 className="text-sm font-mono font-bold tracking-widest text-[#F4C95D] uppercase">Resumo da Receita</h3>
              <p className="text-xs text-white/60">Análise financeira completa.</p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Cost breakdown items */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Custo Ingredientes:</span>
                <span className="font-mono font-bold">
                  R$ {totalIngredientsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Gasto Indireto ({overheadPercentage}%):</span>
                <span className="font-mono font-bold">
                  R$ {overheadCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Embalagem / Extras:</span>
                <span className="font-mono font-bold">
                  R$ {packagingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Total Production Cost */}
              <div className="flex justify-between items-center pt-3 border-t border-white/15">
                <span className="text-sm font-serif font-bold text-[#F4C95D]">CUSTO TOTAL:</span>
                <span className="text-base font-mono font-black text-[#F4C95D]">
                  R$ {totalProductionCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Suggested Price - BIG CALLOUT */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center space-y-1 mt-4">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">Preço de Venda Sugerido</span>
                <span className="text-3xl font-mono font-black text-[#F4C95D] block">
                  R$ {suggestedSellingPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-white/40 block">Com margem de lucro de {profitMargin}%</span>
              </div>

              {/* Profit Amount */}
              <div className="flex justify-between items-center pt-2 text-xs">
                <span className="text-white/60">Lucro Líquido por Bolo:</span>
                <span className="font-mono font-black text-green-400">
                  R$ {profitAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Help Tips */}
          <div className="bg-[#FAEFE4] border border-[#E5DED3] rounded-3xl p-5 space-y-3">
            <h4 className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#4E2A1E] uppercase tracking-wider">
              <Info className="w-4 h-4 text-[#F4C95D]" />
              <span>Dicas de Precificação</span>
            </h4>
            <ul className="text-[11px] text-[#4E2A1E]/80 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>Margem Saudável:</strong> Na confeitaria caseira, a margem de lucro sugerida é de 100% a 200% sobre o custo de produção para remunerar bem a sua mão de obra.</li>
              <li><strong>Consistência:</strong> Sempre use as mesmas marcas ou atualize os preços na tabela se comprar insumos mais caros.</li>
              <li><strong>Desperdício:</strong> Considere sempre as perdas nos potes e espátulas de silicone (já inclusas nos 10% de Gastos Indiretos).</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
