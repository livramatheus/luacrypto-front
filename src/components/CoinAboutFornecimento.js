import FormatadorDinheiro from '../helpers/FormatadorDinheiro';
import { Link } from 'react-router-dom';

export default function CoinAboutFornecimento(props) {
    
    let {simbolo, nome, fornMax, fornCirc} = props;
    let info = null;

    if (fornMax) {
        info = (
            <>
                Atualmente, do fornecimento máximo de {FormatadorDinheiro.formatAsNumber(fornMax)} {simbolo},
                estão em circulação {FormatadorDinheiro.formatAsNumber(fornCirc)} {simbolo}, o que representa
                aproximadamente {FormatadorDinheiro.formatAsPercentage(Math.floor((fornCirc * 100) / fornMax))} do
                fornecimento máximo.
            </>
        );
    } else {
        info = (
            <>
                Atualmente, existem em circulação {fornCirc} de {nome} (
                {simbolo}). Ao contrário de moedas como o <Link to="/moeda/bitcoin" className="link">Bitcoin</Link>, o {nome}{" "}
                não possui um fornecimento total limitado.
            </>
        );
    }

    return (
        <div>
            <h3>
                Quantos {nome} ({simbolo}) estão em circulação?
            </h3>
            <p>{info}</p>
        </div>
    );
}
