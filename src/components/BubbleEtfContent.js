import FormatadorDinheiro from '../helpers/FormatadorDinheiro';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Conversao } from '../MainPage';
import Skeleton from '@material-ui/lab/Skeleton';

export default function BubbleEtfContent(props) {

    let { etfData, fiats } = props;
    const paramsConversao = useContext(Conversao)
    let requirements = (etfData && fiats && paramsConversao);

    return (
        <Link to={`/etf/${etfData.simbolo}`} className="card-component card-component-clickable">
            <div className="detail-body-center">
                <div className="bubble-etf-content">
                    <div className="bubble-etf-content-title">
                        {
                            requirements ? (
                                <span className="etf-bubble-big-text">{etfData.simbolo}</span>
                            ) : (
                                <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 15)}rem`} height="3.5rem" />
                            )
                        }

                        {
                            requirements ? (
                                <em>{etfData.nome}</em>
                            ) : (
                                <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 3)}rem`} height="1.2rem" />
                            )
                        }

                    </div>
                    <div className="bubble-etf-content-dados">
                        <div>
                            <span className="item-dado-etf">
                                <span>Baixa:</span>
                                {
                                    requirements ? (
                                        <span className="bold">
                                            {FormatadorDinheiro.formatAndConvertAsCurrency(etfData.baixa / fiats[0].valor, paramsConversao)}
                                        </span>
                                    ) : <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 3)}rem`} height="2rem" />
                                }
                            </span>
                            <span className="item-dado-etf">
                                <span>Abertura:</span>
                                {
                                    requirements ? (
                                        <span className="bold">
                                            {FormatadorDinheiro.formatAndConvertAsCurrency(etfData.abertura / fiats[0].valor, paramsConversao)}
                                        </span>
                                    ) : <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 3)}rem`} height="2rem" />
                                }
                            </span>
                        </div>
                        <div>
                            <span className="item-dado-etf">
                                <span>Alta:</span>
                                {
                                    requirements ? (
                                        <span className="bold">
                                            {FormatadorDinheiro.formatAndConvertAsCurrency(etfData.alta / fiats[2].valor, paramsConversao)}
                                        </span>
                                    ) : <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 3)}rem`} height="2rem" />
                                }
                            </span>
                            <span>
                                <Tooltip
                                    title="Volume total negociado no dia."
                                    placement="top-start"
                                >
                                    <span className="item-dado-etf">
                                        <span>Volume:</span>
                                        {
                                            requirements ? (
                                                <span className="bold">
                                                    {FormatadorDinheiro.formatAndConvertAsCurrency(etfData.volume_24h / fiats[0].valor, paramsConversao)}
                                                </span>
                                            ) : <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 3)}rem`} height="2rem" />
                                        }
                                    </span>
                                </Tooltip>
                            </span>
                        </div>
                    </div>
                    <div className="bottom-dado-etf">
                        {
                            requirements ? (
                                <span className="etf-bubble-big-text">{FormatadorDinheiro.formatAndConvertAsCurrency(etfData.preco_atual / fiats[0].valor, paramsConversao)}</span>
                            ) : (
                                <Skeleton className="skel-inline" width={`${parseInt((Math.random() * 4) + 5)}rem`} height="3.5rem" />
                            )
                        }
                        <em className="etf-bubble-light-text">Dados de fechamento de {new Date(etfData.data_hora).toLocaleDateString()}</em>
                    </div>
                </div>
            </div>
        </Link>
    );
}