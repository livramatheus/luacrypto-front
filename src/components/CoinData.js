import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import DisplayPercentual from "./DisplayPercentual";
import { useState, useEffect, useContext } from "react";
import Axios from 'axios';
import { useParams } from "react-router";
import HorizontalAd from "./HorizontalAd";
import GraficoCotacao from "./GraficoCotacao";
import VerticalToggleButtons from '../components/VerticalToggleButtons';
import { Conversao } from "../MainPage";
import { Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function CoinData(props) {

    let {
        chave,
        simbolo,
        nome,
        vende_binance,
        preco_atual,
        fornecimento_circulante,
        fornecimento_maximo,
        fornecimento_total,
        capitalizacao,
        volume_24h,
        variacao_24h,
        variacao_7d,
        variacao_30d
    } = props.data;

    const [dadosGrafico, setDadosGrafico] = useState();
    const [anual, setAnual] = useState();
    const [mensal, setMensal] = useState();
    const [semanal, setSemanal] = useState();
    const [diaria, setDiaria] = useState();
    const [selected, setSelected] = useState("24h");

    const { symbol } = useParams();
    const paramsConversao = useContext(Conversao);

    let requirements = (paramsConversao && dadosGrafico && props);

    const handleChange = (event, nextView) => {
        if (nextView) {
            setSelected(nextView);

            switch (nextView) {
                case '24h':
                    !diaria ? buscaDadosDiaria() : setDadosGrafico(diaria);
                    break;
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
                    !diaria ? buscaDadosDiaria() : setDadosGrafico(diaria);
                    break;
            }
        }
    };

    useEffect(() => {
        buscaDadosDiaria();
    }, [symbol]);

    const buscaDadosMensal = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}moedamensal/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
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
            Axios.get(`${process.env.REACT_APP_BACK_URL}moedaanual/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
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
            Axios.get(`${process.env.REACT_APP_BACK_URL}moedasemanal/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
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

    const buscaDadosDiaria = () => {
        if (symbol) {
            Axios.get(`${process.env.REACT_APP_BACK_URL}moedadiaria/${symbol}`).then(
                (response) => {
                    if (response.status === 200) {
                        response.data.forEach((item) => {
                            item.data_hora = new Date(item.data_hora);
                        });

                        setDiaria(response.data);
                        setDadosGrafico(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }

    return (
        <>
            <div id="coin-data-title">
                <span className="logo-e-botao">
                    <h1>
                        {
                            requirements ? (
                                <img src={`/images/coins/${chave}.png`} alt={`Logo ${chave}`} />
                            ) : (
                                <Skeleton variant="circle" width="1em" height="1em" />
                            )
                        }
                        {
                            requirements ? (
                                nome
                            ) : (
                                <Skeleton width="10rem" height="2.5rem" />
                            )
                        }
                    </h1>
                    {(requirements && vende_binance === 1) &&
                        <Button
                            disableElevation
                            variant="contained"
                            href="https://www.binance.com/pt-BR"
                            size="small"
                        >Compre {simbolo} na Binance</Button>
                    }
                </span>
                <h1>
                    {
                        requirements ? (
                            FormatadorDinheiro.formatAndConvertAsCurrency(preco_atual, paramsConversao)
                        ) : (
                            <Skeleton width="10rem" height="2.5rem" />
                        )
                    }
                </h1>
            </div>
            <div id="coin-data-content">
                <div className="data-content-section grafico-moeda">
                    <VerticalToggleButtons
                        selected={selected}
                        handleChange={handleChange}
                        elements={["24h", "7d", "30d", "365d"]}
                    />
                    <GraficoCotacao
                        height={330}
                        dadosGrafico={dadosGrafico}
                        dataKey="preco_atual"
                        dataKeyX="data_hora"
                        dataKeyY="preco_atual"
                        tipo={selected}
                    />
                </div>
                <div className="data-content-section data-moeda">
                    <span className="data-linebreak">
                        <span>Forn. Máximo: </span>
                        <span className="bold">
                            {
                                requirements ? (
                                    fornecimento_maximo ? FormatadorDinheiro.formatAsNumber(fornecimento_maximo) : '-'
                                ) : (
                                    <Skeleton />
                                )
                            }
                        </span>
                    </span>

                    <span className="data-linebreak">
                        <span>Forn. Total: </span>
                        <span className="bold">
                            {
                                requirements ? (
                                    fornecimento_maximo ? FormatadorDinheiro.formatAsNumber(fornecimento_total) : '-'
                                ) : (
                                    <Skeleton />
                                )
                            }
                        </span>
                    </span>

                    <span className="data-linebreak">
                        <span>Forn. Circulante: </span>
                        <span className="bold">
                            {
                                requirements ? (
                                    FormatadorDinheiro.formatAsNumber(fornecimento_circulante)
                                ) : (
                                    <Skeleton />
                                )
                            }
                        </span>
                    </span>
                    <span className="data-linebreak">
                        <span>Cap. de Mercado: </span>
                        <span className="bold">
                            {
                                requirements ? (
                                    FormatadorDinheiro.formatAndConvertAsCurrency(capitalizacao, paramsConversao)
                                ) : (
                                    <Skeleton />
                                )
                            }
                        </span>
                    </span>
                </div>

                <div className="data-content-section data-moeda">
                    <span className="data-linebreak">
                        <span>Volume (24h): </span>
                        <span className="bold">
                            {
                                requirements ? (
                                    FormatadorDinheiro.formatAndConvertAsCurrency(volume_24h, paramsConversao, true)
                                ) : (
                                    <Skeleton />
                                )
                            }
                        </span>
                    </span>

                    <span className="data-linebreak">
                        <span>Variação (24h): </span>
                        {
                            requirements ? (
                                <DisplayPercentual percentual={variacao_24h} />
                            ) : (
                                <Skeleton />
                            )
                        }
                    </span>
                    <span className="data-linebreak">
                        <span>Variação (7d): </span>
                        {
                            requirements ? (
                                <DisplayPercentual percentual={variacao_7d} />
                            ) : (
                                <Skeleton />
                            )
                        }
                    </span>
                    <span className="data-linebreak">
                        <span>Variação (30d): </span>
                        {
                            requirements ? (
                                <DisplayPercentual percentual={variacao_30d} />
                            ) : (
                                <Skeleton />
                            )
                        }
                    </span>
                </div>
            </div>

            <HorizontalAd />
        </>
    );
}