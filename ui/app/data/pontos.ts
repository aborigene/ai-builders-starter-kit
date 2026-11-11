// Dados de exemplo para o workshop: 6 pontos com latitude, longitude e status.
// Cole este arquivo em ui/app/data/pontos.ts. Todos os dados são fictícios.

export type Status = 'ok' | 'atencao' | 'critico';

export interface Ponto {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  status: Status;
  latenciaMs: number;
  errosPorMin: number;
}

export const PONTOS: Ponto[] = [
  { id: 'sp', nome: 'São Paulo', latitude: -23.5505, longitude: -46.6333, status: 'ok', latenciaMs: 112, errosPorMin: 2 },
  { id: 'rj', nome: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729, status: 'atencao', latenciaMs: 340, errosPorMin: 14 },
  { id: 'bh', nome: 'Belo Horizonte', latitude: -19.9167, longitude: -43.9345, status: 'ok', latenciaMs: 98, errosPorMin: 1 },
  { id: 'rec', nome: 'Recife', latitude: -8.0476, longitude: -34.877, status: 'critico', latenciaMs: 910, errosPorMin: 57 },
  { id: 'poa', nome: 'Porto Alegre', latitude: -30.0346, longitude: -51.2177, status: 'ok', latenciaMs: 130, errosPorMin: 3 },
  { id: 'bsb', nome: 'Brasília', latitude: -15.7939, longitude: -47.8828, status: 'atencao', latenciaMs: 275, errosPorMin: 9 },
];

// OPCIONAL: gera uma query DQL com os mesmos dados, para que o useDql sirva mock e dado real.
// VALIDAR a sintaxe do comando "data" no tenant do evento antes de usar.
export const MOCK_QUERY =
  'data ' +
  PONTOS.map(
    (p) =>
      `record(id="${p.id}", nome="${p.nome}", latitude=${p.latitude}, longitude=${p.longitude}, ` +
      `status="${p.status}", latenciaMs=${p.latenciaMs}, errosPorMin=${p.errosPorMin})`,
  ).join(', ');

// Troque para false quando houver uma query real validada.
export const USE_MOCK = true;
