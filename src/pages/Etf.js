import PageTitle from "../components/PageTitle";
import BubbleGroupLink from '../components/BubbleGroupLink';
import HorizontalAd from "../components/HorizontalAd";
import { Link } from "react-router-dom";
import { useRouteMatch, Route } from 'react-router-dom';
import EtfData from './EtfData';
import { Helmet } from "react-helmet";

export default function Etf(props) {

    const { path }   = useRouteMatch();
    const { fiats } = props;

    return (
        <>
            <Route exact path={path}>
            <Helmet defer={false} >
                    <title>Cotações das ETFs brasileiras | LuaCrypto</title>
                    <meta
                        name="description"
                        content="Cotações das etfs da bolsa de valores brasileira"
                    />
                    <meta
                        name="keywords"
                        content="cotação, cotacao, preco, atual, atualizado, gráfico, tempo, real, bolsa, etf, cripto, criptomoeda"
                    />
                </Helmet>

                <PageTitle title="ETF de Criptomoedas" />
                {
                    <BubbleGroupLink fiats={fiats} />
                }
                <article>
                    <h3>O que é uma ETF?</h3>
                    <p>
                        Um <span className="color-text bold">Exchange-Traded Fund (ETF)</span>, é um fundo de investimento negociado na Bolsa de Valores similar a uma ação.
                        Os ETFs geralmente acompanham um índice, como índices de ações ou índices de títulos. Os ETFs tornam-se investimentos atrativos em virtude de seus <span className="bold">baixos custos</span>, eficiência tributária e por apresentar características similares as ações.
                    </p>
                    <p>
                    Ao incorporarem ETFs em suas carteiras de aplicações, os investidores se beneficiam instantaneamente de uma vasta <span className="bold">diversificação</span>. Os ETFs oferecem uma maior pluralidade quando se comparados com ações (ou criptomoedas) individuais, pois agrupam ativos diferentes, de acordo com a constituição do índice.
                    </p>
                </article>
                <HorizontalAd />
                <article>
                    <h3>Sobre as ETFs de criptomoedas</h3>
                    <p>
                        Para aqueles que desejam investir em criptomoedas como o <Link to="/moeda/bitcoin" className="link">Bitcoin</Link>, a exposição torna-se mais simplificada com as <span className="bold color-text">ETF</span>, que garantem uma sensação maior de segurança em razão dos seus índices de funcionamento. Além disso, as ETFs são uma ótima opção para aqueles que estão <span className="bold">começando a investir</span>, já que para engressar nos ETF basta apenas uma conta em uma corretora.
                    </p>
                </article>
            </Route>

            <Route path={`${path}/:symbol`}>
                <EtfData fiats={fiats} />
            </Route>
        </>
    );

}