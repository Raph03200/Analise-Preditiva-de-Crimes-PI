// csv.ts
import { normalizeName } from './normalize'

// Agrupa mortes por município em um mês/ano específico
export function aggregateDeaths(csvText: string, ano: number, mes: number) {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  const header = lines.shift()?.split(';').map(h => h.trim().toLowerCase()) || []
  const dataIdx = header.indexOf('data')
  const munIdx = header.indexOf('municipio')

  const counts: Record<string, number> = {}

  for (const line of lines) {
    const cols = line.split(';')
    if (!cols[dataIdx] || !cols[munIdx]) continue

    // Converte data DD/MM/YYYY para Date
    const [dia, mesStr, anoStr] = cols[dataIdx].split('/')
    const date = new Date(Number(anoStr), Number(mesStr) - 1, Number(dia))

    if (date.getFullYear() === ano && date.getMonth() + 1 === mes) {
      const munNorm = normalizeName(cols[munIdx])
      counts[munNorm] = (counts[munNorm] || 0) + 1
    }
  }

  return counts
}

// Processa CSV de regiões (municipio;regiao)
export function parseRegionCSV(csvText: string) {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  lines.shift() // remove header
  const map: Record<string, string> = {}
  for (const line of lines) {
    const cols = line.split(';').map(c => c.trim())
    if (cols.length < 2) continue
    map[normalizeName(cols[0])] = cols[1]
  }
  return map
}
