import { Route } from "react-router";
import Moeda from "./MoedaInfo";
import HorizontalAd from "../components/HorizontalAd";
import { Helmet } from 'react-helmet';
import CardsMoedas from "../components/CardsMoedas";
import { useRouteMatch } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function Moedas(props) {

    const { path } = useRouteMatch();

    return (
        <>
            <Route exact path={path}>
                <Helmet defer={false} >
                    <title>Cotações em tempo real das criptomoedas | LuaCrypto</title>
                    <meta
                        name="description"
                        content="Cotações em tempo real das criptomoedas"
                    />
                    <meta
                        name="keywords"
                        content="cotação, cotacao, preco, atual, atualizado, gráfico, tempo, real, cripto, criptomoeda"
                    />
                </Helmet>

                <PageTitle title="Lista de Interesse" />

                <p>
                    Adicione as criptomoedas de sua preferência na <span className="bold">Lista de Interesse</span> e acompanhe-as em tempo real. Seus valores são atualizados a cada 5 minutos.
                </p>

                <CardsMoedas
                    coinsParaPesquisa={props.coinsParaPesquisa}
                />

                <HorizontalAd />

            </Route>

            <Route path={`${path}/:symbol`}>
                <Moeda fiats={props.fiats} />
            </Route>
        </>

    );
}