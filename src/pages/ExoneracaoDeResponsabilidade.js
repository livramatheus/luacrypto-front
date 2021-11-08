import PageTitle from "../components/PageTitle";
import { Helmet } from 'react-helmet';

export default function ExoneracaoDeResponsabilidade() {

    return (
        <>
            <Helmet defer={false} >
                <title>Exoneração de Responsabilidade | LuaCrypto </title>
                <meta
                    name="robots"
                    content="noindex"
                />
            </Helmet>
            <PageTitle title="Exoneração de Responsabilidade" />
            <div>
                <h3>Não é sugestão ou conselho de investimento</h3>
                <p>
                    As informações fornecidas neste site <span className="bold">não se enquadram em aconselhamento de investimento, aconselhamento financeiro, aconselhamento comercial ou qualquer outro tipo de conselho</span>. Dessa forma, você não deve tratar ou interpretar qualquer parte do conteúdo deste site como tal. LuaCrypto não recomenda que qualquer criptomoeda ou qualquer outro tipo de ativo financeiro deva ser comprado, vendido ou mantido por você. Realize sua própria pesquisa e consulte seu consultor financeiro antes de tomar qualquer decisão de investimento. A LuaCrypto não faz declarações (nem tem opiniões) sobre a conveniência ou a adequação de qualquer investimento.
                </p>

                <p>
                    É de sua responsabilidade considerar se esses produtos ou operações são adequados para você com base nos seus interesses, objetivos e apetite ao risco. A LuaCrypto não será responsabilizada por quaisquer danos decorrentes de operações ou investimentos em produtos financeiros aqui apresentados. A LuaCrypto não recomenda usar os dados e informações fornecidos como a única base para tomada de decisões de investimento.
                </p>

                <h3>Precisão da Informação</h3>
                <p>
                    A LuaCrypto se esforça para lhe fornecer os melhores e mais precisos dados, entretanto, podem existir informações faltantes ou incorretas, assim sendo, não nos responsabilizamos por tais imprevistos. LuaCrypto fornece todas as informações "no estado em que se encontram", somente para fins informativos, e, você entende que está usando toda e qualquer informação aqui disponível <span className="bold">por sua própria conta e risco</span>.
                </p>
                <p>
                    Todos os dados apresentados em LuaCrypto são fornecidos por terceiros, e podem apresentar atrasos. Além disso, LuaCrypto não verifica os dados e exonera-se de qualquer obrigação de fazer isso.
                </p>

                <h3>Conversão de moeda</h3>
                <p>
                    A LuaCrypto não pode garantir a exatidão das taxas de câmbio apresentadas. Antes de fazer qualquer operação que possa ser afetada por mudanças de câmbio, confirme as taxas atuais e vigentes.
                </p>

                <h3>Sem Garantia</h3>
                <p>
                    Ao longo do site LuaCrypto serão disponibilizados anúncios e hiperlinks de terceiros o que não constituem qualquer garantia ou recomendação da LuaCrypto. Antes de utilizar qualquer serviço de terceiro, realize sua própria pesquisa.
                </p>

                <h3>Fonte dos Dados</h3>
                <p>
                    Os dados deste site são alimentados por Coingecko, Alternative e Alphavantage.
                </p>
            </div>
        </>
    );

}