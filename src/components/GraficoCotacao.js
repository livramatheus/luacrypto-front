import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import AuxiliarDias from "../helpers/AuxiliarDias";
import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import CustomToolTip from "./CustomToolTip";
import Skeleton from '@material-ui/lab/Skeleton';
import { useContext } from 'react';
import { Conversao } from '../MainPage';
import {isMobile} from 'react-device-detect';

export default function GraficoCotacao(props) {

    const paramsConversao = useContext(Conversao);

    let { height, dadosGrafico, dataKey, dataKeyX, dataKeyY, tipo, converter } = props;

    return (
        <div className="wrapper-grafico-cotacao">
            {
                (dadosGrafico && paramsConversao) ? (
                    <ResponsiveContainer
                        height={height}
                    >
                        <AreaChart
                            data={dadosGrafico}
                        >
                            <defs>
                                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--secondarycolor)" stopOpacity={0.4} />
                                    <stop offset="75%" stopColor="var(--secondarycolor)" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>

                            <Area
                                dataKey={dataKey}
                                stroke="var(--secondarycolor)"
                                fill="url(#color)"

                            />
                            <XAxis
                                dataKey={dataKeyX}
                                axisLine={false}
                                tickLine={false}
                                domain={['auto', 'auto']}
                                tickFormatter={
                                    (data) => {
                                        if (tipo !== '24h') {
                                            return AuxiliarDias.formataExtenso(data);
                                        }

                                        return `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
                                    }
                                }
                                fontSize={13}
                            />
                            <YAxis
                                dataKey={dataKeyY}
                                axisLine={false}
                                tickLine={false}
                                mirror={isMobile}
                                tickMargin={10}
                                domain={['auto', 'auto']}
                                width={110}
                                tickFormatter={(preco) => {
                                    return FormatadorDinheiro.formatAndConvertAsCurrency(preco, paramsConversao, 2);
                                }}
                                fontSize={13}
                            />
                            <Tooltip tipo={tipo} content={<CustomToolTip converter={converter} />} />
                            <CartesianGrid opacity={0.5} vertical={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <Skeleton variant="rect" width="100%" height={height} />
                )
            }
        </div>
    );
}