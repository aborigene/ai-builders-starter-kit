// OPCIONAL (tema "Frota e telemetria"): uma volta fictícia em pista oval, com velocidade e direção.
// Cole em ui/app/data/telemetria-ficticia.ts. Todos os dados são gerados e fictícios.

export interface AmostraTelemetria {
  indice: number;
  latitude: number;
  longitude: number;
  velocidadeKmh: number;
  bearing: number; // direção em graus (0 a 360), útil para rotacionar o ícone no mapa
}

const CENTRO = { latitude: -23.7, longitude: -46.7 };
const RAIO_LAT = 0.004; // graus
const RAIO_LON = 0.007; // graus

const paraGraus = (rad: number) => ((rad * 180) / Math.PI + 360) % 360;

export function gerarVolta(amostras = 60): AmostraTelemetria[] {
  const pontos = Array.from({ length: amostras }, (_, i) => {
    const t = (i / amostras) * 2 * Math.PI;
    return {
      latitude: CENTRO.latitude + RAIO_LAT * Math.sin(t),
      longitude: CENTRO.longitude + RAIO_LON * Math.cos(t),
      // velocidade varia ao longo da volta: mais lenta nas pontas da oval
      velocidadeKmh: Math.round(95 + 55 * Math.abs(Math.sin(t * 2))),
    };
  });

  return pontos.map((p, i) => {
    const prox = pontos[(i + 1) % pontos.length];
    const dLat = prox.latitude - p.latitude;
    const dLon = (prox.longitude - p.longitude) * Math.cos((p.latitude * Math.PI) / 180);
    return {
      indice: i,
      latitude: p.latitude,
      longitude: p.longitude,
      velocidadeKmh: p.velocidadeKmh,
      bearing: Math.round(paraGraus(Math.atan2(dLon, dLat))),
    };
  });
}
