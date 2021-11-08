import { Tooltip, Divider } from "@material-ui/core";
import DisplayPercentual from "./DisplayPercentual";
import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import { useContext } from "react";
import { Conversao } from "../MainPage";
import Skeleton from "@material-ui/lab/Skeleton";

export default function GlobalData(props) {

    let { dadosDominancia, fiats } = props;
    const paramConversao = useContext(Conversao);

    let requirements = (dadosDominancia && fiats && paramConversao);

    return (
        <div className="global-data">
            <Tooltip title="Percentual de dominância de mercado das principais criptomoedas.">
                <div>
                    <span className="bold">Dominância:</span>
                    {
                        requirements ? (
                            <span>BTC {FormatadorDinheiro.formatAsPercentage(dadosDominancia.domin_percent_bitcoin)}</span>
                        ) : (
                            <Skeleton width="4.9rem" />
                        )
                    }
                    {
                        requirements ? (
                            <span>ETH {FormatadorDinheiro.formatAsPercentage(dadosDominancia.domin_percent_ethereum)}</span>
                        ) : (
                            <Skeleton width="4.9rem" />
                        )
                    }
                </div>
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Tooltip title="Refere-se a capitalização total, contabilizando todas as criptomoedas.">
                <div>
                    <span className="bold">Capit. Global:</span>
                    {
                        requirements ? (
                            <span>{FormatadorDinheiro.formatAndConvertAsCurrency(dadosDominancia.cap_total_crypto, paramConversao)}</span>
                        ) : (
                            <Skeleton width="10.5rem" />
                        )
                    }
                </div>
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Tooltip title="Refere-se a variacão percentual da capitalização total de criptomoedas das últimas 24 horas.">
                <div>
                    <span className="bold">Var. (24h):</span>
                    {
                        requirements ? (
                            <span>{<DisplayPercentual percentual={dadosDominancia.variacao_cap_percent_24h} />}</span>
                        ) : (
                            <Skeleton width="2.5rem" />
                        )
                    }
                </div>
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Tooltip title="Cotação atualizada do Dólar americado e do Euro.">
                <div>
                    <span className="bold">Fiats:</span>
                    {
                        requirements ? (
                            <span>USD: {FormatadorDinheiro.formatAsBrl(fiats[0].valor)}</span>
                        ) : (
                            <Skeleton width="5.2rem" />
                        )
                    }

                    {
                        requirements ? (
                            <span>EUR: {FormatadorDinheiro.formatAsBrl(fiats[0].valor / fiats[1].valor)}</span>
                        ) : (
                            <Skeleton width="5.2rem" />
                        )
                    }
                </div>
            </Tooltip>

        </div>
    );
}
