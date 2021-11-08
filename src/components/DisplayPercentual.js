import FormatadorDinheiro from "../helpers/FormatadorDinheiro";

export default function DisplayPercentual(props) {
    let { percentual } = props;
    percentual = parseFloat(percentual);

    let classToAplly = percentual < 0 ? 'bold percent-down' : 'bold percent-up';
    
    return (
        <span className={classToAplly}>{FormatadorDinheiro.formatAsPercentage(percentual)}</span>
    );
    
}