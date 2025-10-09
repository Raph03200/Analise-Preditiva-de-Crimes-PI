'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { normalizeName } from '../utils/normalize'
import { aggregateDeaths, parseRegionCSV } from '../utils/csv'
import { useMemo } from 'react'



// Cores por região
const REGION_COLORS: Record<string, string> = {
  '15+': '#990000',
  '5 a 15': '#ff6666',
  '1 a 5': '#3399ff',
  'sem ocorrências': '#cccccc',
}

type Props = {
  year: number,
  month: number
}

const MapPernambuco = ({ year, month }: Props) => {
  const [geoJson, setGeoJson] = useState(null)
  const [, setRegionMap] = useState<Record<string, string>>({})
  const [deathsCounts, setDeathsCounts] = useState<Record<string, number>>({})

  // Carrega GeoJSON
  useEffect(() => {
    fetch('/geo/geojs-26-mun.json')
      .then(res => res.json())
      .then((data) => {
        //@ts-expect-error só o type
        data.features.forEach((f) => {
          const props = f.properties || {}
          const nome = props.NM_MUN || props.NM_MUNICIP || props.nome || props.NOME || props.name || props.municipio || props.NAME
          f.properties._mun_norm = normalizeName(nome)
        })
        setGeoJson(data)
      })
  }, [])

  // Carrega CSV de regiões
  useEffect(() => {
    fetch('/geo/municipio_region.csv')
      .then(res => res.text())
      .then(txt => {
        const map = parseRegionCSV(txt)
        setRegionMap(map)
        if (geoJson) {
          //@ts-expect-error só o type
          geoJson.features.forEach((f) => {
            const key = f.properties._mun_norm
            if (map[key]) f.properties._regiao_custom = map[key]
          })
          //@ts-expect-error só o type
          setGeoJson({ ...geoJson })
        }
      })
      .catch(() => setRegionMap({}))
  }, [geoJson])

  // Carrega CSV de mortes e calcula mortes do mês
  useEffect(() => {
    fetch('/geo/mortes.csv')
      .then(res => res.text())
      .then(txt => {
        const counts = aggregateDeaths(txt, year, month)
        setDeathsCounts(counts)
      })
  }, [year, month])


  //@ts-expect-error só o type
  function styleFeature(feature) {
    const props = feature.properties || {}
    const mortes = deathsCounts[props._mun_norm] || 0

    let fillColor = '#cccccc' // cinza para 0 mortes
    if (mortes >= 1 && mortes <= 5) fillColor = '#3399ff' // azul
    else if (mortes > 5 && mortes < 15) fillColor = '#ff6666' // vermelho claro
    else if (mortes >= 15) fillColor = '#990000' // vermelho escuro

    return {
      color: '#222222', // borda
      weight: 0.6,
      fillColor,
      fillOpacity: 0.7,
    }
  }

  //@ts-expect-error só o type
  function onEachFeature(feature, layer) {
    const props = feature.properties || {}
    const nome = props._mun_norm ? props._mun_norm.charAt(0).toUpperCase() + props._mun_norm.slice(1) : props.name || '---'
    layer.on('click', () => {
      const mortes = deathsCounts[props._mun_norm] || 0
      layer.bindPopup(`<strong>${nome}</strong><br/>Mortes no mês: ${mortes}`).openPopup()
    })
  }

  

  const geoJsonKey = useMemo(() => {
    // Gera uma chave simples baseada no ano, mês e quantidade de mortes (poderia ser mais robusto)
    const hash = Object.keys(deathsCounts).length
    return `${year}-${month}-${hash}`
  }, [year, month, deathsCounts])

  if (!geoJson) return <div>Carregando malha de Pernambuco...</div>

  return (
    <div className="h-full w-full">
      <MapContainer center={[-8.5, -37.5]} zoom={8} style={{ height: '100%', width: '100%' }} minZoom={6}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors & CARTO'
        />
        <GeoJSON key={geoJsonKey} data={geoJson} style={styleFeature} onEachFeature={onEachFeature} />
        <Legend />
      </MapContainer>
    </div>
  )
}

// Legenda
const Legend: React.FC = () => {
  const map = useMap()
  useEffect(() => {
    //@ts-expect-error só o type
    const control = L.control({ position: 'bottomright' })
    control.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend')
      let inner = '<strong>Gravidade</strong><br/>'
      for (const [reg, color] of Object.entries(REGION_COLORS)) {
        inner += `<i style="background:${color}; width:18px; height:12px; display:inline-block; margin-right:8px;"></i>${reg}<br/>`
      }
      div.innerHTML = inner
      return div
    }
    control.addTo(map)
    return () => control.remove()
  }, [map])
  return null
}

export default MapPernambuco
