import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { Helmet } from 'react-helmet';

export default function Sobre() {

    return (

        <>
            <Helmet defer={false} >
                <title>Sobre LuaCrypto | LuaCrypto </title>
                <meta
                    name="robots"
                    content="noindex"
                />
            </Helmet>
            <article>
                <PageTitle title="Sobre LuaCrypto" />

                <p>
                    <span className="bold color-text">LuaCrypto</span> é um portal sobre <Link to="/moeda" className="link">criptomoedas</Link> que disponibiliza dados gerais sobre as principais criptomoedas do mercado, como cotações, histórico, desempenho geral e capitalizações de mercado.
                </p>

                <p>
                    Além das próprias criptomoedas, fornecemos dados a respeito das principais <Link to="/etf" className="link">ETFs</Link> disponíveis no mercado brasileiro.
                </p>

                <p>
                    Neste site também são apresentados gráficos para análises específicas, como por exemplo o índice histórico de <Link to="/medo-e-ganancia" className="link">Medo e Ganância</Link> etc.
                </p>

                <p>
                    LuaCrypto mensalmente atinge milhares de usuários, e nos sentimos extremamente realizados em fornecer um portal intuitivo com os dados da melhor qualidade.
                </p>
            </article>
        </>

    );

}