import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function MiniGrafico(props) {
  let { dados } = props;

  
  let lineColor = dados[0].preco_atual > dados[dados.length - 1].preco_atual ? "#FF0000" : "#00FF00";



  return (
    <ResponsiveContainer width="70%" height={40}>
      <LineChart data={dados} margin={{ left: -60, bottom: -30 }}>
        <XAxis dataKey="name" tick={false} axisLine={false} />

        <YAxis domain={["auto", "auto"]} tick={false} axisLine={false} />

        <Line
          type="monotone"
          dataKey="preco_atual"
          stroke={lineColor}
          legendType="none"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}