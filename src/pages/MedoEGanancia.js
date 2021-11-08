import BarraMedoGanancia from "../components/BarraMedoGanancia";
import HorizontalAd from "../components/HorizontalAd";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import GraficoMedoGanancia from "../components/GraficoMedoGanancia";
import Axios from "axios";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";

export default function MedoEGanancia() {

    const [dadosGrafico, setDadosGrafico] = useState();

    useEffect(() => {
        getDadosMedoGanancia();
    }, []);

    /**
     * Faz uma pesquisa para o backend retornando dados de medo e ganância para o gráfico
     */
    const getDadosMedoGanancia = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}medogananciageral`).then(
            (response) => {
                if (response.status === 200) {
                    response.data.forEach((item) => {
                        item.data = new Date(item.data);
                    });

                    setDadosGrafico(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    return (
        <>
            <Helmet defer={false} >
                <title>Índice de Medo e Ganância do Bitcoin | LuaCrypto</title>
                <meta
                    name="description"
                    content="Índice de ganância do Bitcoin"
                />
                <meta
                    name="keywords"
                    content="indice, medo, ganancia, bitcoin, btc"
                />
            </Helmet>

            <PageTitle title="Medo e Ganância do Bitcoin" />

            <p>Todos os dias são analisadas emoções e sentimentos de diferentes fontes e os compactamos em um número simples. Este indicador retrata o sentimento atual do mercado, variando ente 0, que retrata <span className="bold">medo extremo</span> e 100, indicando <span className="bold">ganância extrema</span>.</p>

            {
                <BarraMedoGanancia dadosGrafico={dadosGrafico}/>
            }

            <HorizontalAd />

            <h2>Gráfico histórico de medo e ganância do Bitcoin</h2>

            <div className="historico-medo-ganancia">
                <GraficoMedoGanancia dados={dadosGrafico} />
            </div>

            <HorizontalAd />

            <article>
                <h2>Por que medir o medo e a ganância?</h2>

                <p>O comportamento do mercado de criptomoedas é muito emocional e volátil. As pessoas tendem a ficar gananciosas quando o mercado está subindo, o que resulta em FOMO (medo de perder). Além disso, as pessoas costumam vender suas moedas em reação irracional de ver números vermelhos. Com o <span className="bold">Índice de Medo e Ganância</span>, tentamos livrar você de suas próprias reações emocionais exageradas.</p>

                <p>Existem duas suposições simples:</p>

                <ul>
                    <li>O medo extremo pode ser um sinal de que os investidores estão muito preocupados. <span className="bold color-text">Essa pode ser uma oportunidade de compra</span>.</li>
                    <li>Quando os investidores estão ficando muito gananciosos, isso significa que o mercado precisa de uma correção.</li>
                </ul>

                <p>Portanto, analisamos o sentimento atual do mercado de <Link to="/moeda/btc" className="link">Bitcoin</Link> e transformamos estes dados em um medidor simples de 0 a 100. No qual zero significa "medo extremo", enquanto 100 significa "ganância extrema". Veja abaixo mais informações sobre nossas fontes de dados.</p>
            </article>

            <article>
                <h2>Fontes de dados</h2>
                <p>
                    Os dados são coletados de cinco diferentes fontes. Cada ponto de dados é avaliado da mesma forma que no dia anterior, a fim de visualizar um progresso significativo na mudança de sentimento do mercado de criptomoedas. São eles:
                </p>

                <h3>Volatilidade (25%)</h3>
                <p>
                    São aferidas a volatilidade atual e máxima saques de Bitcoin e são comparados com os valores médios correspondentes dos últimos 30 dias e 90 dias.  Argumentamos que um aumento incomum na volatilidade é um sinal de um mercado <span className="bold color-text">tímido</span>.
                </p>

                <h3>Momento / volume do mercado (25%)</h3>
                <p>
                    Além disso, são averiguados o volume atual e a dinâmica do mercado (novamente em comparação com os últimos valores médios de 30 e 90 dias) e colocamos esses dois valores juntos. Geralmente, quando vemos altos volumes de compra em um mercado positivo diariamente, concluímos que o mercado age <span className="bold color-text">excessivamente otimista</span>.
                </p>

                <HorizontalAd />

                <h3>Redes Sociais (15%)</h3>
                <p>
                    Embora que a análise de sentimento do <a href="https://www.reddit.com/" className="link">Reddit</a> ainda esteja em caráter experimental, a análise do <a href="https://twitter.com/" className="link">Twitter</a> está em execução. Lá, são agregados e enumerados postagens em várias hashtags para cada diferente <Link to="/moeda" className="link">moeda</Link> e são averiguados com que rapidez e quantas interações eles recebem em determinados intervalos de tempo. Uma alta taxa de engajamento incomum resulta em um crescente <span className="bold">interesse do público</span> pela moeda, o que pode corresponder em um comportamento de <span className="bold color-text">mercado ganancioso</span>.
                </p>

                <h3>Pesquisas (15%) <span className="percent-down">(temporariamente suspensas)</span></h3>
                <p>
                    Junto com o <a href="https://strawpoll.com/en/" className="link">strawpoll.com</a>, que é uma robusta plataforma de pesquisa pública, são realizadas pesquisas semanais sobre <Link to="/moeda" className="link">criptomoedas</Link> nas quais as pessoas expressam como elas veem o mercado no momento.
                </p>

                <h3>Dominância (10%)</h3>
                <p>
                    A dominância de uma moeda refere-se a sua participação total no mercado de criptomoedas. <span className="bold">Quando a dominância do Bitcoin aumenta</span>, geralmente significa que as pessoas não estão mais optando pelas <span className="bold">altcoins</span> (que possuem carater mais especulativo). Por outro lado, <span className="bold">quando o domínio do Bitcoin diminui</span>, as pessoas ficam mais gananciosas investindo em moedas alternativas. De qualquer forma, analisando a dominância de uma moeda diferente do Bitcoin, você poderia argumentar o contrário, já que mais interesse em uma moeda alternativa pode concluir um comportamento alternativo / ganancioso para aquela moeda específica.
                </p>

                <h3>Tendências (10%)</h3>
                <p>
                    São coletados e analisados os dados do <a href="https://trends.google.com/trends/" className="link">Google Trends</a> para inúmeras pesquisas realizadas relacionadas ao Bitcoin, especialmente a variação no volume de pesquisa, bem como outras pesquisas populares atualmente recomendadas.
                </p>
                <p>
                    Fonte: <cite>alternative.me - Crypto Fear & Greed Index</cite>
                </p>
            </article>

            <HorizontalAd />
        </>
    );

}