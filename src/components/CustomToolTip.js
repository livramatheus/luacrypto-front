import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import { useContext } from "react";
import { Conversao } from "../MainPage";

export default function CustomToolTip(props) {

    let { active, payload, label, tipo, converter } = props;

    const paramsConversao = useContext(Conversao);

    if (active) {
        return (
            <div className="body-tooltip">
                <div>{tipo !== '24h' ? label.toLocaleDateString() : label.getHours().toString().padStart(2, '0') + ':' + label.getMinutes().toString().padStart(2, '0')}</div>
                <div>{FormatadorDinheiro.formatAndConvertAsCurrency(payload[0].value, paramsConversao, converter)}</div>
            </div>
        )
    }

    return null;
}