import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Brush
} from "recharts";
import CustomTooltipMG from "./CustomTooltipMG";
import CustomDot from "./CustomDot";
import AuxiliarDias from "../helpers/AuxiliarDias";
import Skeleton from "@material-ui/lab/Skeleton";

export default function GraficoMedoGanancia(props) {

    let { dados } = props;
    let requirements = dados;

    return (
        <div className="wrapper-grafico-medo-ganancia">
            {
                requirements ? (
                    <ResponsiveContainer height={350} id="graph-medo-ganancia">
                        <LineChart data={dados} margin={{ left: -26 }}>
                            <CartesianGrid strokeDasharray="2 3" />
                            <XAxis
                                dataKey="data"
                                domain={["auto", "auto"]}
                                minTickGap={dados.length / 10}
                                tickFormatter={(props) => {
                                    return AuxiliarDias.formataExtenso(props);
                                }}
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                                content={({ payload }) => {
                                    if (payload.length) {
                                        return (
                                            <CustomTooltipMG
                                                data={[
                                                    payload[0].payload.data.toLocaleDateString(),
                                                    `Índice: ${payload[0].payload.indice}`,
                                                    payload[0].payload.descricao
                                                ]}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="natural"
                                strokeWidth={2}
                                dataKey="indice"
                                stroke="#82ca9d"
                                dot={<CustomDot />}
                            />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                ) : <Skeleton variant="rect" width="70%" height={350} />
            }
        </div>
    );
}
