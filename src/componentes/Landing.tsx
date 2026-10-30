import { useEffect, useRef, useState } from 'react';
import { useRevelar } from '../hooks/use-revelar';
import '../estilos/landing.css';
import {
  FUNCIONALIDADES,
  LINK_WHATSAPP,
  NUMEROS,
  PASSOS,
  SEGMENTOS,
  SEGMENTOS_DIGITADOS,
  VANTAGENS,
  type Numero,
  type Passo,
} from './landing-conteudo';
import { LandingCelular } from './LandingCelular';
import { LandingPainel } from './LandingPainel';
import { LandingQrCode } from './LandingQrCode';

const TITULO = 'Tabloide Digital — Suas ofertas no celular do cliente com um QR Code';

/** Landing institucional da rota "/". Default export: carregada com lazy() (chunk e CSS próprios). */
export default function Landing() {
  const raiz = useRevelar<HTMLDivElement>();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    document.title = TITULO;
  }, []);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <div className="lp" ref={raiz}>
      <header className="lp-nav">
        <a className="lp-nav__marca" href="#inicio" onClick={fecharMenu}>
          <Logo />
          <span>
            Tabloide <b>Digital</b>
          </span>
        </a>
        <button
          type="button"
          className={`lp-nav__menu${menuAberto ? ' lp-nav__menu--aberto' : ''}`}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="lp-links"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="lp-links" className={`lp-nav__links${menuAberto ? ' lp-nav__links--aberto' : ''}`}>
          <a href="#como-funciona" onClick={fecharMenu}>
            Como funciona
          </a>
          <a href="#funcionalidades" onClick={fecharMenu}>
            Funcionalidades
          </a>
          <a href="#painel" onClick={fecharMenu}>
            Painel
          </a>
          <a href="#vantagens" onClick={fecharMenu}>
            Vantagens
          </a>
          <a
            className="lp-botao lp-botao--pequeno"
            href={LINK_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            Entre em contato
          </a>
        </nav>
      </header>

      <main>
        <section className="lp-hero" id="inicio">
          <div className="lp-hero__fundo" aria-hidden="true">
            <span className="lp-hero__grade" />
            <span className="lp-hero__bolha lp-hero__bolha--1" />
            <span className="lp-hero__bolha lp-hero__bolha--2" />
            <span className="lp-hero__bolha lp-hero__bolha--3" />
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className="lp-hero__particula" style={{ ['--i' as string]: i }} />
            ))}
          </div>

          <div className="lp-hero__texto">
            <span className="lp-selo lp-entrada" style={{ ['--atraso' as string]: '0ms' }}>
              <span className="lp-selo__ponto" /> Encarte digital por QR Code
            </span>
            <h1 className="lp-hero__titulo lp-entrada" style={{ ['--atraso' as string]: '120ms' }}>
              As ofertas do seu <PalavraDigitada /> no celular do cliente em{' '}
              <span className="lp-gradiente">1 toque</span>
            </h1>
            <p className="lp-hero__subtitulo lp-entrada" style={{ ['--atraso' as string]: '240ms' }}>
              Troque o panfleto de papel por uma página de ofertas que abre pelo QR Code na porta da loja. Sem
              aplicativo, sem login, sempre atualizada.
            </p>
            <div className="lp-hero__acoes lp-entrada" style={{ ['--atraso' as string]: '360ms' }}>
              <a
                className="lp-botao lp-botao--brilho"
                href={LINK_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconeWhatsapp /> Quero minha página
              </a>
              <a className="lp-botao lp-botao--fantasma" href="#como-funciona">
                Ver como funciona
              </a>
            </div>
            <ul className="lp-hero__provas lp-entrada" style={{ ['--atraso' as string]: '480ms' }}>
              <li>✓ Sem app para o cliente</li>
              <li>✓ Panfleto ou produtos</li>
              <li>✓ Várias filiais</li>
            </ul>
          </div>

          <div className="lp-hero__visual lp-entrada" style={{ ['--atraso' as string]: '300ms' }}>
            <div className="lp-hero__celular">
              <LandingCelular />
            </div>
            <div className="lp-flutuante lp-flutuante--qr">
              <LandingQrCode rotulo="QR Code de exemplo da filial" />
              <span>Aponte a câmera</span>
            </div>
            <div className="lp-flutuante lp-flutuante--desconto" aria-hidden="true">
              <b>-25%</b>
              <span>Picanha hoje</span>
            </div>
            <div className="lp-flutuante lp-flutuante--ao-vivo" aria-hidden="true">
              <span className="lp-selo__ponto" /> Atualizado agora
            </div>
          </div>
        </section>

        <section className="lp-faixa" aria-label="Segmentos atendidos">
          <div className="lp-faixa__trilho">
            {[...SEGMENTOS, ...SEGMENTOS].map((segmento, i) => (
              <span key={i} className="lp-faixa__item" aria-hidden={i >= SEGMENTOS.length}>
                {segmento}
              </span>
            ))}
          </div>
        </section>

        <section className="lp-secao" id="como-funciona">
          <Cabecalho
            rotulo="Como funciona"
            titulo="Do painel ao celular do cliente em 3 passos"
            texto="Você cuida das ofertas. A gente cuida de levar até quem está na loja."
          />
          <ol className="lp-passos">
            {PASSOS.map((passo, i) => (
              <li
                key={passo.numero}
                className="lp-passo lp-revelar"
                data-revelar
                style={{ ['--atraso' as string]: `${i * 140}ms` }}
              >
                <span className="lp-passo__numero">{passo.numero}</span>
                <span className="lp-passo__icone">
                  <IconePasso icone={passo.icone} />
                </span>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-secao lp-secao--escura" id="funcionalidades">
          <Cabecalho
            rotulo="Funcionalidades"
            titulo="Tudo o que o seu encarte precisa. E o que o papel nunca fez."
            texto="Feito para o dia a dia de quem vende: rápido de cadastrar, bonito de ver, fácil de manter."
            escuro
          />
          <div className="lp-bento">
            {FUNCIONALIDADES.map((item, i) => (
              <article
                key={item.titulo}
                className={`lp-cartao lp-revelar${item.destaque ? ' lp-cartao--destaque' : ''}`}
                data-revelar
                style={{ ['--atraso' as string]: `${(i % 4) * 90}ms` }}
              >
                <span className="lp-cartao__icone" aria-hidden="true">
                  {item.icone}
                </span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-secao" id="painel">
          <Cabecalho
            rotulo="Painel do lojista"
            titulo="Controle total, do celular ou do computador"
            texto="Cadastre produtos, personalize a página e gerencie cada filial com prévia ao vivo antes de publicar."
          />
          <div className="lp-vitrine lp-revelar" data-revelar>
            <LandingPainel />
          </div>
        </section>

        <section className="lp-numeros" aria-label="Tabloide Digital em números">
          {NUMEROS.map((numero, i) => (
            <div
              key={numero.rotulo}
              className="lp-numero lp-revelar"
              data-revelar
              style={{ ['--atraso' as string]: `${i * 100}ms` }}
            >
              <Contador numero={numero} />
              <span className="lp-numero__rotulo">{numero.rotulo}</span>
            </div>
          ))}
        </section>

        <section className="lp-secao" id="vantagens">
          <Cabecalho
            rotulo="Vantagens"
            titulo="Por que lojistas estão deixando o papel"
            texto="Menos custo de impressão, mais agilidade para reagir à concorrência e uma experiência moderna para o cliente."
          />
          <ul className="lp-vantagens">
            {VANTAGENS.map((vantagem, i) => (
              <li
                key={vantagem.titulo}
                className="lp-vantagem lp-revelar"
                data-revelar
                style={{ ['--atraso' as string]: `${(i % 3) * 110}ms` }}
              >
                <span className="lp-vantagem__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <div>
                  <h3>{vantagem.titulo}</h3>
                  <p>{vantagem.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-cta" id="contato">
          <div className="lp-cta__caixa lp-revelar" data-revelar>
            <span className="lp-cta__anel" aria-hidden="true" />
            <h2>Pronto para colocar suas ofertas no bolso do cliente?</h2>
            <p>Entre em contato pelo WhatsApp e a gente te ajuda a publicar a primeira página da sua loja.</p>
            <a
              className="lp-botao lp-botao--brilho lp-botao--grande"
              href={LINK_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconeWhatsapp /> Entre em contato
            </a>
          </div>
        </section>
      </main>

      <footer className="lp-rodape">
        <div className="lp-nav__marca">
          <Logo />
          <span>
            Tabloide <b>Digital</b>
          </span>
        </div>
        <p>Ofertas da sua loja, direto no celular do cliente.</p>
        <small>© {new Date().getFullYear()} Tabloide Digital. Imagens meramente ilustrativas.</small>
      </footer>

      <a
        className="lp-whats"
        href={LINK_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <IconeWhatsapp />
      </a>
    </div>
  );
}

function Cabecalho({
  rotulo,
  titulo,
  texto,
  escuro = false,
}: {
  rotulo: string;
  titulo: string;
  texto: string;
  escuro?: boolean;
}) {
  return (
    <div className={`lp-cabecalho lp-revelar${escuro ? ' lp-cabecalho--escuro' : ''}`} data-revelar>
      <span className="lp-cabecalho__rotulo">{rotulo}</span>
      <h2>{titulo}</h2>
      <p>{texto}</p>
    </div>
  );
}

const INTERVALO_PALAVRA_MS = 2400;

function PalavraDigitada() {
  const [indice, setIndice] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndice((i) => (i + 1) % SEGMENTOS_DIGITADOS.length),
      INTERVALO_PALAVRA_MS,
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="lp-digitada" key={indice}>
      {SEGMENTOS_DIGITADOS[indice]}
    </span>
  );
}

const DURACAO_CONTADOR_MS = 1400;

function Contador({ numero }: { numero: Numero }) {
  const elemento = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(typeof IntersectionObserver === 'undefined' ? numero.alvo : 0);

  useEffect(() => {
    const alvo = elemento.current;
    if (!alvo || typeof IntersectionObserver === 'undefined') return;
    let quadro = 0;
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada?.isIntersecting) return;
      observador.disconnect();
      const inicio = performance.now();
      const passo = (agora: number) => {
        const progresso = Math.min(1, (agora - inicio) / DURACAO_CONTADOR_MS);
        setValor(Math.round(numero.alvo * (1 - Math.pow(1 - progresso, 3))));
        if (progresso < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    });
    observador.observe(alvo);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [numero.alvo]);

  return (
    <span className="lp-numero__valor" ref={elemento}>
      {numero.prefixo}
      {valor}
      {numero.sufixo}
    </span>
  );
}

function Logo() {
  return (
    <svg className="lp-logo" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="currentColor" />
      <rect x="14" y="16" width="30" height="8" rx="4" fill="#fff" />
      <rect x="25" y="16" width="8" height="32" rx="4" fill="#fff" />
      <circle cx="46" cy="44" r="6" className="lp-logo__ponto" />
    </svg>
  );
}

function IconeWhatsapp() {
  return (
    <svg className="lp-icone-whats" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3z" />
    </svg>
  );
}

function IconePasso({ icone }: { icone: Passo['icone'] }) {
  if (icone === 'painel') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M7 9h6M7 12h9" />
      </svg>
    );
  }
  if (icone === 'qr') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3M21 14v7h-4M14 18v3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 18h4M9 8l2 2 4-4" />
    </svg>
  );
}
