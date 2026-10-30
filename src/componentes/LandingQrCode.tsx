const TAMANHO = 25;

/** Módulos de um QR Code ilustrativo (não lê nada): padrão fixo, com os 3 quadrados de posição. */
function gerarModulos(): [number, number][] {
  const modulos: [number, number][] = [];
  let semente = 7;
  const aleatorio = () => {
    semente = (semente * 9301 + 49297) % 233280;
    return semente / 233280;
  };
  const naMarca = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= TAMANHO - 8 && y < 8) || (x < 8 && y >= TAMANHO - 8);

  for (let y = 0; y < TAMANHO; y++) {
    for (let x = 0; x < TAMANHO; x++) {
      if (!naMarca(x, y) && aleatorio() > 0.52) modulos.push([x, y]);
    }
  }
  return modulos;
}

const MODULOS = gerarModulos();
const MARCAS: [number, number][] = [
  [0, 0],
  [TAMANHO - 7, 0],
  [0, TAMANHO - 7],
];

export function LandingQrCode({
  rotulo = 'QR Code ilustrativo',
  escanear = true,
}: {
  rotulo?: string;
  escanear?: boolean;
}) {
  return (
    <div className="lp-qr">
      <svg
        className="lp-qr__svg"
        viewBox={`-2 -2 ${TAMANHO + 4} ${TAMANHO + 4}`}
        role="img"
        aria-label={rotulo}
      >
        <rect x="-2" y="-2" width={TAMANHO + 4} height={TAMANHO + 4} rx="2" className="lp-qr__fundo" />
        {MARCAS.map(([x, y]) => (
          <g key={`${x}-${y}`} className="lp-qr__marca">
            <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="1.2" fill="none" strokeWidth="1" />
            <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" />
          </g>
        ))}
        {MODULOS.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x + 0.1}
            y={y + 0.1}
            width="0.8"
            height="0.8"
            rx="0.2"
            className="lp-qr__modulo"
          />
        ))}
      </svg>
      {escanear && <span className="lp-qr__scanner" aria-hidden="true" />}
    </div>
  );
}
