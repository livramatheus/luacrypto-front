import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Axios from 'axios';
import HorizontalAd from '../components/HorizontalAd';
import GraficoCotacao from "../components/GraficoCotacao";
import DisplayPercentual from "../components/DisplayPercentual";
import { Helmet } from "react-helmet";
import { Conversao } from "../MainPage";
import VerticalToggleButtons from "../components/VerticalToggleButtons";
import Skeleton from "@material-ui/lab/Skeleton";

export default function EtfData(props) {

    const { symbol } = useParams();
    const [dadosEtf, setDadosEtf] = useState();
    const [dadosGrafico, setDadosGrafico] = useState();
    const { fiats } = props;
    const [selected, setSelected] = useState("7d");
    const [anual, setAnual] = useState();
    const [mensal, setMensal] = useState();
    const [semanal, setSemanal] = useState();
    const [diaria, setDiaria] = useState();

    const paramsConversao = useContext(Conversao);

    let requirements = (paramsConversao && dadosGrafico && dadosEtf && fiats);

    useEffect(() => {
            buscaDadosEtf();
    }, []);

    useEffect(() => {
        if (fiats) {
            buscaDadosSemanal();
        }
    }, [symbol, fiats]);


    const buscaDadosEtf = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}etf/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        setDadosEtf(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }

    const buscaDadosMensal = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}etfmensal/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
                            item.preco_atual = item.preco_atual / fiats[0].valor;
                        });

                        setMensal(response.data);
                        setDadosGrafico(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }

    const buscaDadosAnual = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}etfanual/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
                            item.preco_atual = item.preco_atual / fiats[0].valor;
                        });

                        setAnual(response.data);
                        setDadosGrafico(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }
    
    const buscaDadosSemanal = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}etfsemanal/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
                            item.preco_atual = item.preco_atual / fiats[0].valor;
                        });

                        setSemanal(response.data);
                        setDadosGrafico(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }

    const handleChange = (event, nextView) => {
        if (nextView) {
            setSelected(nextView);

            switch (nextView) {
                case '7d':
                    !semanal ? buscaDadosSemanal() : setDadosGrafico(semanal);
                    break;
                case '30d':
                    !mensal ? buscaDadosMensal() : setDadosGrafico(mensal);
                    break;
                case '365d':
                    !anual ? buscaDadosAnual() : setDadosGrafico(anual);
                    break;
                default:
                    !diaria ? buscaDadosSemanal() : setDadosGrafico(semanal);
                    break;
            }
        }
    };

    return (
        <>
            {
                requirements && (
                    <Helmet defer={false} >
                        <title>{`${dadosEtf.nome} (${dadosEtf.simbolo}) cotação, preço, gráfico hoje`} | LuaCrypto</title>
                        <meta
                            name="description"
                            content={`Cotação atual de ${dadosEtf.nome} (${dadosEtf.simbolo}), apresentando gráfico, histórico e capitalização de mercado`}
                        />
                        <meta
                            name="keywords"
                            content={`cotação, ${dadosEtf.nome}, ${dadosEtf.simbolo}, hoje, criptomoeda, preço, gráfico`}
                        />
                    </Helmet>
                )
            }

            {
                <>
                    <div id="coin-data-title">
                        <h1>
                            {
                                requirements ? (
                                    <img src={`../images/etfs/${dadosEtf.simbolo}.png`} alt="" />
                                ) : (
                                    <Skeleton variant="circle" width="1em" height="1em" />
                                )
                            }
                            {
                                requirements ? (
                                    `${dadosEtf.nome} (${dadosEtf.simbolo})`
                                ) : (
                                    <Skeleton width="20rem" height="2.5rem" />
                                )
                            }

                        </h1>
                        <h1>
                            {
                                requirements ? (
                                    FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.preco_atual / fiats[0].valor, paramsConversao)
                                ) : (
                                    <Skeleton width="10rem" height="2.5rem" />
                                )
                            }
                        </h1>
                    </div>
                    <div id="coin-data-content">
                        <div className="data-content-section grafico-etf">
                            <VerticalToggleButtons
                                selected={selected}
                                handleChange={handleChange}
                                elements={["7d", "30d", "365d"]}
                            />
                            <GraficoCotacao
                                height={330}
                                dadosGrafico={dadosGrafico}
                                dataKey="preco_atual"
                                dataKeyX="data_hora"
                                dataKeyY="preco_atual"
                                converter={true}
                                tipo={selected}
                            />
                        </div>
                        <div className="data-content-section data-etf">
                            <span className="data-linebreak">
                                <span>Variação (24h): </span>
                                {
                                    requirements ? (
                                        <DisplayPercentual percentual={dadosEtf.variacao_24h} />
                                    ) : (
                                        <Skeleton />
                                    )
                                }
                            </span>
                            <span className="data-linebreak">
                                <span>Variação (7d): </span>
                                {
                                    requirements ? (
                                        <DisplayPercentual percentual={dadosEtf.variacao_7d} />
                                    ) : (
                                        <Skeleton />
                                    )
                                }
                            </span>
                            <span className="data-linebreak">
                                <span>Variação (30d): </span>
                                {
                                    requirements ? (
                                        <DisplayPercentual percentual={dadosEtf.variacao_30d} />
                                    ) : (
                                        <Skeleton />
                                    )
                                }
                            </span>

                            <span className="data-linebreak">
                                <span>Baixa: </span>
                                <span className="bold">
                                    {
                                        requirements ? (
                                            FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.baixa / fiats[0].valor, paramsConversao)
                                        ) : (
                                            <Skeleton />
                                        )
                                    }
                                </span>
                            </span>

                            <span className="data-linebreak">
                                <span>Alta: </span>
                                <span className="bold">
                                    {
                                        requirements ? (
                                            FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.alta / fiats[0].valor, paramsConversao)
                                        ) : (
                                            <Skeleton />
                                        )
                                    }
                                </span>
                            </span>

                            <span className="data-linebreak">
                                <span>Volume (24h): </span>
                                <span className="bold">
                                    {
                                        requirements ? (
                                            FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.volume_24h / fiats[0].valor, paramsConversao)
                                        ) : (
                                            <Skeleton />
                                        )
                                    }
                                </span>
                            </span>
                        </div>
                    </div>

                    <HorizontalAd />

                    <article>
                        <h2>
                            {
                                requirements ? (
                                    `Sobre ${dadosEtf.nome}`

                                ) : (
                                    <Skeleton width="10rem" height="1.9rem" style={{marginBottom: '1rem'}} />
                                )
                            }
                        </h2>

                        {
                            requirements ? (
                                <>
                                    <p>
                                        <span className="bold">{dadosEtf.nome}</span> é uma Exchange-traded fund (ETF) negociada pelo código <span className="color-text bold">{dadosEtf.simbolo}</span>.
                                        Sua cotação atual é de {FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.preco_atual / fiats[0].valor, paramsConversao)}. No último dia de negociação do mercado de ações, foram negociados {FormatadorDinheiro.formatAndConvertAsCurrency(dadosEtf.volume_24h / fiats[0].valor, paramsConversao)} em {dadosEtf.nome}.
                                    </p>
                                    <p>
                                        Devido ao fato de uma ETF ser negociada apenas durante o período de pregão da bolsa de valores, o seu preço <span className="bold">não sofre alterações enquanto o mercado estiver fechado</span>, embora que os valores das criptomoedas relativas a ETF continuem flutuando.
                                    </p>
                                    <p>
                                        Nas últimas 24 horas, o <span className="bold">{dadosEtf.simbolo}</span> teve uma variação no seu preço de <DisplayPercentual percentual={dadosEtf.variacao_24h} />, na última semana uma variação de <DisplayPercentual percentual={dadosEtf.variacao_7d} />, e nos últimos 30 dias <DisplayPercentual percentual={dadosEtf.variacao_30d} />.
                                    </p>

                                    <p>
                                        <span>O site oficial da ETF pode ser acessado em <a className="link" target="_blank" rel="noreferrer" href={dadosEtf.website}>{dadosEtf.website}</a>. </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton width="70%"/>
                                    <Skeleton style={{ marginBottom: '1rem' }} />
                                    <Skeleton />
                                    <Skeleton width="50%"/>
                                    <Skeleton style={{ marginBottom: '1rem' }} />
                                    <Skeleton width="50%" />
                                </>
                            )
                        }

                        {
                            requirements && (
                                dadosEtf.info && (
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: dadosEtf.info }}></div>
                                        <p>
                                            Fonte: <cite>{dadosEtf.website}</cite>
                                        </p>
                                        <HorizontalAd />
                                    </>
                                )
                            )
                        }
                    </article>
                </>
            }
        </>
    );
}