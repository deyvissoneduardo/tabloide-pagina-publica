interface Props {
  aoTentarDeNovo: () => void;
}

export function SemConexao({ aoTentarDeNovo }: Props) {
  return (
    <main className="aviso">
      <h1 className="aviso__titulo">Não foi possível carregar as ofertas</h1>
      <p className="aviso__texto">Verifique a internet e tente de novo.</p>
      <button type="button" className="botao" onClick={aoTentarDeNovo}>
        Tentar de novo
      </button>
    </main>
  );
}
