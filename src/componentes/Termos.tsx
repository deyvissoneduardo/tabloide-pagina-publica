import { Campo, Contato, DocumentoLegal, Secao } from './DocumentoLegal';
import { POLITICA } from './privacidade-conteudo';
import { SECOES_TERMOS as S, TERMOS } from './termos-conteudo';

/**
 * Termos de Uso da rota "/termos": contrato entre o Tabloide Digital e o lojista, base da execução de
 * contrato citada na Política de Privacidade. Default export: carregada com lazy() (chunk e CSS próprios).
 */
export default function Termos() {
  const { controlador, encarregado } = POLITICA;

  return (
    <DocumentoLegal
      titulo="Termos de Uso"
      atualizacao={TERMOS.ultimaAtualizacao}
      secoes={S}
      introducao={
        <p>
          Estes Termos de Uso regulam o uso do <strong>Tabloide Digital</strong>, plataforma oferecida por{' '}
          <Campo valor={controlador.nome} />, inscrito no CNPJ sob o nº <Campo valor={controlador.cnpj} />,
          com sede em <Campo valor={controlador.cidadeUf} />. Leia com atenção antes de criar sua conta.
        </p>
      }
    >
      <Secao secao={S[0]}>
        <p>
          Ao criar uma conta no painel do Tabloide Digital e marcar a opção de aceite, você declara ter lido,
          entendido e concordado com estes Termos de Uso e com a{' '}
          <a href="/privacidade">Política de Privacidade</a>. Registramos a versão aceita, com data e hora. Se
          não concordar, não utilize o painel.
        </p>
        <p>
          Quem aceita estes termos em nome de um comércio declara ter poderes para representá-lo. Nestes
          termos, esse comércio é chamado de <strong>lojista</strong>; cada loja física é uma{' '}
          <strong>filial</strong>; e quem lê o QR Code é o <strong>consumidor</strong>.
        </p>
      </Secao>

      <Secao secao={S[1]}>
        <p>
          O Tabloide Digital permite ao lojista cadastrar filiais, panfletos, categorias e produtos com
          período de vigência e publicá-los numa página web própria de cada filial, aberta por QR Code, sem
          que o consumidor precise fazer login ou instalar aplicativo.
        </p>
        <p>
          O Tabloide Digital apenas hospeda e exibe as ofertas. Não vende produtos, não intermedeia pagamentos
          e não participa da relação de consumo entre o lojista e seus clientes.
        </p>
        <p>
          Eventuais planos, valores e condições comerciais serão informados previamente e dependerão de aceite
          específico do lojista.
        </p>
      </Secao>

      <Secao secao={S[2]}>
        <ul>
          <li>
            O lojista faz o próprio cadastro informando nome fantasia, nome do responsável, e-mail, senha e
            WhatsApp. O CNPJ é opcional. As informações devem ser verdadeiras e mantidas atualizadas.
          </li>
          <li>
            O responsável pela conta deve ser maior de 18 anos. Cada e-mail corresponde a uma única conta, e
            cada lojista tem um único login de acesso ao painel.
          </li>
          <li>
            Toda conta nasce aguardando ativação. Enquanto não for ativada, o lojista pode montar suas filiais
            e ofertas, mas as páginas públicas não ficam no ar. A ativação fica a critério do Tabloide
            Digital, que pode solicitar informações adicionais para confirmar a identidade do lojista.
          </li>
          <li>
            O lojista é responsável por manter sua senha em sigilo e por todas as ações realizadas com seu
            login. Em caso de suspeita de uso indevido, deve avisar imediatamente pelo canal de contato.
          </li>
          <li>
            Não há recuperação automática de senha. O lojista que esquecer a senha deve entrar em contato, e
            uma nova senha será definida após a confirmação da sua identidade.
          </li>
        </ul>
      </Secao>

      <Secao secao={S[3]}>
        <p>O lojista se compromete a:</p>
        <ul>
          <li>
            divulgar apenas ofertas verdadeiras, com preços, quantidades, condições e prazos corretos. A
            oferta publicada obriga o lojista perante o consumidor, nos termos do Código de Defesa do
            Consumidor (arts. 30 e 35);
          </li>
          <li>
            cumprir as normas aplicáveis à publicidade do seu ramo, como as regras da Anvisa para medicamentos
            e produtos de saúde e as restrições à propaganda de bebidas alcoólicas e tabaco;
          </li>
          <li>
            publicar apenas imagens, marcas, logotipos e textos sobre os quais tenha direitos ou autorização
            de uso;
          </li>
          <li>
            não publicar dados pessoais de terceiros (como fotos de pessoas identificáveis, nomes ou telefones
            de clientes) sem base legal, conforme a Lei Geral de Proteção de Dados Pessoais (LGPD);
          </li>
          <li>conferir a página pública de cada filial antes de divulgar o QR Code.</li>
        </ul>
      </Secao>

      <Secao secao={S[4]}>
        <p>É proibido usar o Tabloide Digital para:</p>
        <ul>
          <li>
            divulgar conteúdo ilegal, enganoso, abusivo, discriminatório, ofensivo ou que viole direitos de
            terceiros;
          </li>
          <li>anunciar produtos ou serviços cuja venda ou divulgação seja proibida;</li>
          <li>enviar arquivos com vírus ou código malicioso;</li>
          <li>
            tentar acessar dados de outros lojistas, áreas restritas ou sistemas da plataforma, ou contornar
            suas medidas de segurança e limites de uso;
          </li>
          <li>
            sobrecarregar o serviço com requisições automatizadas ou extrair dados da plataforma em massa;
          </li>
          <li>revender ou sublicenciar o acesso ao painel sem autorização.</li>
        </ul>
      </Secao>

      <Secao secao={S[5]}>
        <p>
          O lojista continua dono do conteúdo que publica. Ao publicá-lo, concede ao Tabloide Digital uma
          licença gratuita, não exclusiva e limitada ao período da conta, para armazenar, otimizar (por
          exemplo, redimensionar e comprimir imagens) e exibir esse conteúdo na página pública e no painel.
        </p>
        <p>
          O lojista é o único responsável pelo conteúdo que publica. O Tabloide Digital não revisa as ofertas
          antes da publicação, mas pode remover ou tornar indisponível conteúdo que viole estes termos ou a
          lei, inclusive por ordem judicial, nos termos do Marco Civil da Internet.
        </p>
      </Secao>

      <Secao secao={S[6]}>
        <p>
          Para proteger o lojista e o consumidor, a plataforma registra o preço, as datas e a imagem do
          panfleto de cada oferta no cadastro e em cada alteração, com data, hora e valor anterior. Esse
          histórico não pode ser alterado nem apagado, inclusive pelo lojista, e pode ser usado como prova do
          que foi divulgado.
        </p>
        <p>
          A exclusão de itens no painel é lógica: o item deixa de aparecer na página pública, mas continua
          guardado. Itens vencidos ou excluídos não podem ser reativados; para publicar de novo, cadastre um
          item novo.
        </p>
      </Secao>

      <Secao secao={S[7]}>
        <ul>
          <li>
            Cada filial tem um endereço público com código aleatório, que não muda quando a filial é
            renomeada. Assim, o QR Code impresso continua valendo. A impressão e a afixação do QR Code são de
            responsabilidade do lojista.
          </li>
          <li>
            Uma oferta só aparece enquanto o lojista estiver ativo, o item não tiver sido excluído e a data
            atual estiver dentro da vigência, no fuso horário da filial.
          </li>
          <li>
            Enquanto a conta estiver aguardando ativação ou desativada, as páginas públicas respondem como
            &quot;não encontrada&quot;.
          </li>
          <li>
            O painel de acessos mostra quantas vezes a página foi carregada, não quantas pessoas a visitaram.
            Recarregar a página conta de novo, e robôs e prévias de link são descartados. Os números são
            indicativos, sem garantia de exatidão.
          </li>
        </ul>
      </Secao>

      <Secao secao={S[8]}>
        <p>
          O Tabloide Digital pode estabelecer limites de quantidade de filiais, de produtos e de tamanho de
          arquivos por lojista, informados no painel. Produtos vencidos e não excluídos contam no limite.
        </p>
      </Secao>

      <Secao secao={S[9]}>
        <p>
          Buscamos manter o serviço disponível todos os dias, com manutenções preferencialmente de madrugada,
          mas não garantimos funcionamento ininterrupto ou livre de erros. Falhas de internet, de fornecedores
          ou de força maior podem causar indisponibilidade.
        </p>
        <p>
          Fazemos cópias de segurança diárias, guardadas por até 30 dias. Recomendamos que o lojista mantenha
          cópia própria das imagens e arquivos que publica.
        </p>
      </Secao>

      <Secao secao={S[10]}>
        <p>
          A marca Tabloide Digital, o software, o layout e os demais elementos da plataforma pertencem ao seu
          titular e são protegidos por lei. Estes termos não transferem ao lojista nenhum direito sobre eles
          além do uso do serviço.
        </p>
      </Secao>

      <Secao secao={S[11]}>
        <ul>
          <li>
            O Tabloide Digital pode desativar a conta que violar estes termos ou a lei, ou quando houver
            indício de fraude ou risco à segurança. Sempre que possível, o lojista será avisado antes, com o
            motivo.
          </li>
          <li>
            Com a conta desativada, o painel fica disponível somente para consulta e as páginas públicas saem
            do ar. Ao reativar a conta, tudo volta como estava; itens que venceram no intervalo continuam
            vencidos.
          </li>
          <li>
            O lojista pode pedir o encerramento da conta a qualquer momento pelo canal de contato. Após o
            encerramento, os dados são eliminados ou anonimizados nos prazos da Política de Privacidade,
            ressalvado o histórico das ofertas, guardado para cumprimento de obrigação legal.
          </li>
        </ul>
      </Secao>

      <Secao secao={S[12]}>
        <p>
          O lojista responde pelas ofertas que divulga, pelo cumprimento delas perante o consumidor e por
          danos causados pelo conteúdo que publica, inclusive perante terceiros.
        </p>
        <p>
          Na máxima extensão permitida pela lei, o Tabloide Digital não responde por prejuízos decorrentes do
          conteúdo publicado pelo lojista, de indisponibilidades temporárias, do uso indevido do login por
          descuido do lojista ou de fatos de terceiros e de força maior. Nada nestes termos afasta direitos
          que a lei garante e que não possam ser renunciados.
        </p>
      </Secao>

      <Secao secao={S[13]}>
        <p>
          O tratamento de dados pessoais é descrito na <a href="/privacidade">Política de Privacidade</a>, que
          faz parte destes termos.
        </p>
      </Secao>

      <Secao secao={S[14]}>
        <p>
          Estes termos podem ser atualizados. A data da última atualização fica sempre no topo desta página.
          Mudanças relevantes serão comunicadas pelo e-mail cadastrado ou pelo painel e, quando necessário,
          será pedido um novo aceite. Se o lojista não concordar com a nova versão, pode encerrar a conta.
        </p>
      </Secao>

      <Secao secao={S[15]}>
        <address className="dl-contato">
          <span>
            <strong>Responsável:</strong> <Campo valor={encarregado.nome} />
          </span>
          <span>
            <strong>E-mail:</strong> <Contato email={encarregado.email} />
          </span>
        </address>
      </Secao>

      <Secao secao={S[16]}>
        <p>
          Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de{' '}
          <Campo valor={controlador.cidadeUf} /> para resolver eventuais conflitos, ressalvado o direito de
          quem for considerado consumidor de propor a ação no foro do seu domicílio.
        </p>
      </Secao>
    </DocumentoLegal>
  );
}
