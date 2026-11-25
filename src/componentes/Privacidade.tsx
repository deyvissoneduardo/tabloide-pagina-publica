import { Campo, Contato, DocumentoLegal, Secao } from './DocumentoLegal';
import { POLITICA, SECOES } from './privacidade-conteudo';

/**
 * Política de Privacidade (LGPD, Lei 13.709/2018) da rota "/privacidade". Estrutura baseada no
 * Guia de Elaboração de Termo de Uso e Política de Privacidade do Governo Federal e nos guias da ANPD.
 * Default export: carregada com lazy() (chunk e CSS próprios).
 */
export default function Privacidade() {
  const { controlador, encarregado } = POLITICA;

  return (
    <DocumentoLegal
      titulo="Política de Privacidade"
      atualizacao={POLITICA.ultimaAtualizacao}
      secoes={SECOES}
      introducao={
        <p>
          Esta Política de Privacidade explica, de forma simples, como o <strong>Tabloide Digital</strong>{' '}
          trata dados pessoais, em cumprimento à Lei Geral de Proteção de Dados Pessoais (LGPD, Lei nº
          13.709/2018), ao Marco Civil da Internet (Lei nº 12.965/2014) e ao Código de Defesa do Consumidor
          (Lei nº 8.078/1990).
        </p>
      }
    >
      <Secao secao={SECOES[0]}>
        <p>
          O Tabloide Digital é uma plataforma que permite a comércios (mercados, atacados, drogarias e outros)
          publicar suas ofertas numa página web aberta por QR Code, sem que o cliente precise fazer login ou
          instalar aplicativo.
        </p>
        <p>
          O <strong>controlador</strong> dos dados pessoais tratados pela plataforma é{' '}
          <Campo valor={controlador.nome} />, inscrito no CNPJ sob o nº <Campo valor={controlador.cnpj} />,
          com sede em <Campo valor={controlador.cidadeUf} />.
        </p>
        <p>
          Esta política complementa os <a href="/termos">Termos de Uso</a> do Tabloide Digital e se aplica a:
        </p>
        <ul>
          <li>
            <strong>Lojistas</strong>: comércios que se cadastram no painel para publicar ofertas, e as
            pessoas responsáveis por eles;
          </li>
          <li>
            <strong>Consumidores</strong>: pessoas que leem o QR Code e abrem a página de ofertas de uma loja;
          </li>
          <li>
            <strong>Visitantes</strong>: pessoas que acessam o site institucional do Tabloide Digital.
          </li>
        </ul>
      </Secao>

      <Secao secao={SECOES[1]}>
        <dl className="dl-definicoes">
          <dt>Dado pessoal</dt>
          <dd>
            Informação relacionada a pessoa natural identificada ou identificável (art. 5º, I, da LGPD).
          </dd>
          <dt>Titular</dt>
          <dd>Pessoa natural a quem se referem os dados pessoais.</dd>
          <dt>Tratamento</dt>
          <dd>
            Toda operação realizada com dados pessoais, como coleta, uso, armazenamento, compartilhamento e
            eliminação.
          </dd>
          <dt>Controlador</dt>
          <dd>Quem toma as decisões sobre o tratamento de dados pessoais.</dd>
          <dt>Operador</dt>
          <dd>Quem realiza o tratamento de dados pessoais em nome do controlador.</dd>
          <dt>Encarregado</dt>
          <dd>
            Pessoa indicada pelo controlador para atuar como canal de comunicação entre o controlador, os
            titulares e a Autoridade Nacional de Proteção de Dados (ANPD).
          </dd>
          <dt>Lojista</dt>
          <dd>Comércio que contrata a plataforma para publicar suas ofertas.</dd>
          <dt>Filial</dt>
          <dd>Cada loja física do lojista, com QR Code e página de ofertas próprios.</dd>
        </dl>
      </Secao>

      <Secao secao={SECOES[2]}>
        <h3>3.1. Dados do lojista</h3>
        <p>Ao se cadastrar e usar o painel, o lojista nos fornece:</p>
        <ul>
          <li>
            <strong>Dados de cadastro</strong>: nome fantasia, nome do responsável, e-mail (usado como login),
            senha, número de WhatsApp e, opcionalmente, CNPJ. A senha nunca é guardada em texto: guardamos
            apenas um resumo criptográfico (hash) que não permite recuperá-la;
          </li>
          <li>
            <strong>Dados das filiais</strong>: nome, endereço (CEP, logradouro, número, complemento, bairro,
            cidade e UF) e fuso horário. O endereço não é exibido na página pública;
          </li>
          <li>
            <strong>Conteúdo publicado</strong>: logotipo, banner, cores, panfletos (imagem ou PDF),
            categorias e produtos com nome, preço, descrição, observações, fotos e datas de vigência;
          </li>
          <li>
            <strong>Histórico de alterações</strong>: registro de preços, datas e imagens de panfletos, com
            data, hora e valor anterior de cada alteração;
          </li>
          <li>
            <strong>Registro do aceite</strong>: versão dos Termos de Uso e desta Política aceita no cadastro,
            com data e hora.
          </li>
        </ul>

        <h3>3.2. Dados do consumidor</h3>
        <p>
          A página de ofertas aberta pelo QR Code{' '}
          <strong>não pede cadastro, não usa cookies e não usa ferramentas de análise ou rastreamento</strong>
          . Não guardamos nome, telefone, localização, identificador do aparelho nem qualquer outro dado do
          consumidor no nosso banco de dados.
        </p>
        <p>
          Para mostrar ao lojista quantas vezes a página da filial foi aberta, registramos apenas uma{' '}
          <strong>contagem</strong> por filial, data e hora. Essa contagem não identifica ninguém e não é um
          dado pessoal.
        </p>

        <h3>3.3. Registros técnicos de acesso</h3>
        <p>
          Cada acesso ao painel do lojista (cadastro, login e uso) é registrado com o{' '}
          <strong>endereço IP</strong>, a data, a hora e o endereço acessado. Esses registros são guardados
          por 6 meses, como exige o Marco Civil da Internet (art. 15).
        </p>
        <p>
          Além disso, como qualquer serviço na internet, nossos servidores geram registros técnicos (logs)
          temporários, que podem conter o endereço IP, o tipo de navegador e de aparelho (user-agent), o
          endereço acessado, a data e a hora. Esses logs são gerados nos acessos ao painel e numa pequena
          amostra (cerca de 1%) dos acessos à página de ofertas, além de quando ocorre algum erro. O IP de
          quem abre a página de ofertas nunca é guardado no nosso banco de dados.
        </p>
        <p>
          Os registros de erros inesperados guardados para diagnóstico não contêm o conteúdo das requisições
          nem dados de identificação.
        </p>
      </Secao>

      <Secao secao={SECOES[3]}>
        <div className="dl-tabela" role="region" aria-label="Finalidades e bases legais" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Finalidade</th>
                <th scope="col">Dados</th>
                <th scope="col">Base legal (LGPD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Criar e manter a conta do lojista e autenticar o acesso ao painel</td>
                <td>Cadastro, e-mail e senha</td>
                <td>Execução de contrato (art. 7º, V)</td>
              </tr>
              <tr>
                <td>Publicar a página de ofertas de cada filial</td>
                <td>Conteúdo publicado e nome fantasia</td>
                <td>Execução de contrato (art. 7º, V)</td>
              </tr>
              <tr>
                <td>Ativar a conta, prestar suporte e redefinir a senha a pedido do lojista</td>
                <td>Nome do responsável, e-mail e WhatsApp</td>
                <td>Execução de contrato (art. 7º, V)</td>
              </tr>
              <tr>
                <td>Comprovar o aceite dos Termos de Uso e desta Política</td>
                <td>Registro do aceite</td>
                <td>Execução de contrato (art. 7º, V) e exercício regular de direitos (art. 7º, VI)</td>
              </tr>
              <tr>
                <td>Guardar o histórico de preços e datas das ofertas divulgadas, como prova da oferta</td>
                <td>Histórico de alterações</td>
                <td>
                  Cumprimento de obrigação legal (art. 7º, II) e exercício regular de direitos (art. 7º, VI)
                </td>
              </tr>
              <tr>
                <td>
                  Manter registros de acesso, garantir a segurança, limitar tentativas de login e prevenir
                  fraudes
                </td>
                <td>Registros técnicos de acesso</td>
                <td>
                  Cumprimento de obrigação legal (art. 7º, II, c/c art. 15 do Marco Civil) e legítimo
                  interesse (art. 7º, IX)
                </td>
              </tr>
              <tr>
                <td>Mostrar ao lojista o painel de acessos às suas filiais</td>
                <td>Contagem agregada, sem dado pessoal</td>
                <td>Não se aplica (não há dado pessoal)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Não vendemos dados pessoais, não os usamos para publicidade e não tomamos decisões automatizadas que
          afetem os titulares.
        </p>
      </Secao>

      <Secao secao={SECOES[4]}>
        <p>Compartilhamos dados apenas quando necessário para o funcionamento do serviço:</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong>: hospedagem do site, da página de ofertas e da API, incluindo os
            registros técnicos de acesso;
          </li>
          <li>
            <strong>Supabase Inc.</strong>: banco de dados e armazenamento das imagens e arquivos publicados.
            Ao abrir a página de ofertas, o navegador baixa as imagens diretamente desse serviço;
          </li>
          <li>
            <strong>Autoridades públicas</strong>: quando houver obrigação legal, ordem judicial ou requisição
            de autoridade competente.
          </li>
        </ul>
        <p>
          Esses fornecedores atuam como operadores, tratando os dados apenas conforme nossas instruções e com
          medidas de segurança compatíveis com a LGPD. O conteúdo publicado pelo lojista (ofertas, imagens,
          logotipo e nome fantasia) é, por natureza, público.
        </p>
      </Secao>

      <Secao secao={SECOES[5]}>
        <p>
          A API roda em servidores no Brasil (São Paulo), e o banco de dados e os arquivos ficam no Supabase,
          na região <Campo valor={POLITICA.regiaoSupabase} />. Como a Vercel e o Supabase são empresas
          sediadas nos Estados Unidos, alguns dados técnicos, como registros de acesso, podem ser tratados
          pontualmente fora do Brasil por esses fornecedores, inclusive pela rede de distribuição de conteúdo.
          Quando isso ocorre, a transferência segue o art. 33 da LGPD e a regulamentação da ANPD, com base em
          cláusulas contratuais e garantias de proteção oferecidas pelos fornecedores.
        </p>
      </Secao>

      <Secao secao={SECOES[6]}>
        <ul>
          <li>
            <strong>Página de ofertas e site institucional</strong>: não usam cookies, armazenamento local do
            navegador, pixels nem ferramentas de análise de terceiros;
          </li>
          <li>
            <strong>Painel do lojista</strong>: guarda no navegador ou no aparelho apenas o token de sessão,
            estritamente necessário para manter o lojista conectado. Ele é apagado ao sair da conta e expira
            automaticamente.
          </li>
        </ul>
      </Secao>

      <Secao secao={SECOES[7]}>
        <ul>
          <li>
            <strong>Dados de cadastro e conteúdo publicado</strong>: enquanto a conta existir. Itens excluídos
            no painel deixam de aparecer, mas continuam guardados enquanto a conta existir. Após o
            encerramento da conta, são eliminados ou anonimizados em até{' '}
            <Campo valor={POLITICA.prazoAposEncerramento} />, ressalvadas as hipóteses abaixo;
          </li>
          <li>
            <strong>Histórico de preços e datas das ofertas</strong>: pelo prazo necessário ao cumprimento de
            obrigações legais e à defesa em processos, inclusive o prazo prescricional do Código de Defesa do
            Consumidor (art. 16, I e IV, da LGPD);
          </li>
          <li>
            <strong>Registros técnicos de acesso</strong>: <Campo valor={POLITICA.prazoLogs} />;
          </li>
          <li>
            <strong>Cópias de segurança (backup)</strong>: até 30 dias;
          </li>
          <li>
            <strong>Contagem de acessos</strong>: sem prazo, por não conter dado pessoal.
          </li>
        </ul>
      </Secao>

      <Secao secao={SECOES[8]}>
        <p>Adotamos medidas técnicas e administrativas para proteger os dados, entre elas:</p>
        <ul>
          <li>tráfego sempre criptografado (HTTPS);</li>
          <li>senhas guardadas apenas como hash, nunca em texto;</li>
          <li>limite de tentativas de login e de requisições;</li>
          <li>isolamento entre lojistas: nenhum lojista acessa dados de outro;</li>
          <li>endereços públicos aleatórios e não sequenciais;</li>
          <li>senhas, tokens e chaves omitidos dos registros técnicos;</li>
          <li>acesso administrativo restrito e cópias de segurança diárias.</li>
        </ul>
        <p>
          Nenhum sistema é totalmente imune a falhas. Se ocorrer um incidente de segurança que possa causar
          risco ou dano relevante aos titulares, comunicaremos a ANPD e os titulares afetados, conforme o art.
          48 da LGPD.
        </p>
      </Secao>

      <Secao secao={SECOES[9]}>
        <p>Conforme o art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
        <ul>
          <li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
          <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em
            desconformidade com a LGPD;
          </li>
          <li>a portabilidade dos dados a outro fornecedor;</li>
          <li>a eliminação dos dados, ressalvadas as hipóteses de guarda previstas no art. 16 da LGPD;</li>
          <li>informações sobre as entidades com as quais compartilhamos dados;</li>
          <li>
            a oposição a tratamento realizado com base no legítimo interesse, em caso de descumprimento da
            LGPD.
          </li>
        </ul>
        <p>
          Parte dos dados de cadastro pode ser corrigida pelo próprio lojista no painel. Para acesso e
          portabilidade, entregamos uma cópia dos seus dados em formato estruturado (JSON). Para os demais
          pedidos, entre em contato pelo canal indicado na seção 14. Podemos pedir informações para confirmar
          sua identidade antes de atender. A confirmação e o acesso simplificado são atendidos de imediato, e
          a declaração completa em até 15 dias (art. 19 da LGPD).
        </p>
        <p>
          Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) pelo site{' '}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            gov.br/anpd
          </a>
          .
        </p>
      </Secao>

      <Secao secao={SECOES[10]}>
        <p>
          O lojista é o único responsável pelo conteúdo que publica. Ao publicar imagens, panfletos ou textos,
          o lojista declara ter os direitos necessários sobre eles e se compromete a não publicar dados
          pessoais de terceiros (como fotos de pessoas, nomes ou telefones de clientes) sem base legal para
          isso. Em relação a esse conteúdo, o lojista atua como controlador, e o Tabloide Digital, como
          operador.
        </p>
      </Secao>

      <Secao secao={SECOES[11]}>
        <p>
          O painel do Tabloide Digital é destinado a comerciantes e seus representantes maiores de 18 anos. A
          página de ofertas não coleta dados pessoais de nenhum visitante, inclusive de crianças e
          adolescentes.
        </p>
      </Secao>

      <Secao secao={SECOES[12]}>
        <p>
          Esta política pode ser atualizada para refletir mudanças no serviço ou na legislação. A data da
          última atualização fica sempre no topo desta página. Mudanças relevantes serão comunicadas aos
          lojistas pelo e-mail cadastrado ou pelo painel.
        </p>
      </Secao>

      <Secao secao={SECOES[13]}>
        <p>
          Dúvidas sobre esta política ou pedidos relacionados aos seus dados pessoais podem ser enviados ao
          encarregado pelo tratamento de dados pessoais:
        </p>
        <address className="dl-contato">
          <span>
            <strong>Encarregado:</strong> <Campo valor={encarregado.nome} />
          </span>
          <span>
            <strong>E-mail:</strong> <Contato email={encarregado.email} />
          </span>
          <span>
            <strong>Controlador:</strong> <Campo valor={controlador.nome} /> — CNPJ{' '}
            <Campo valor={controlador.cnpj} />
          </span>
        </address>
      </Secao>
    </DocumentoLegal>
  );
}
