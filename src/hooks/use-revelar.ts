import { useEffect, useRef } from 'react';

/**
 * Marca com `.lp-visivel` cada descendente `[data-revelar]` quando ele entra na tela (uma vez só).
 * Sem IntersectionObserver, revela tudo de imediato.
 */
export function useRevelar<T extends HTMLElement>() {
  const raiz = useRef<T>(null);

  useEffect(() => {
    const elemento = raiz.current;
    if (!elemento) return;
    const alvos = Array.from(elemento.querySelectorAll<HTMLElement>('[data-revelar]'));

    if (typeof IntersectionObserver === 'undefined') {
      for (const alvo of alvos) alvo.classList.add('lp-visivel');
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add('lp-visivel');
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    for (const alvo of alvos) observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return raiz;
}
