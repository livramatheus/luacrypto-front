import { Link } from "react-router-dom";
import FormatadorString from "../helpers/FormatadorString";

export default function ResultadoPesquisa(props) {

    if (props.coinsParaPesquisa.length > 0) {
        return (
            <div className="resultado-pesquisa" >
                {props.coinsParaPesquisa.slice(0, 6).map((moeda, id) => {
                    return (
                        <Link to={`/moeda/${moeda.chave}`} onClick={props.close} className="item-pesquisa" key={id}>
                            <span>
                                <img src={`/images/coins/${moeda.chave}.png`} alt={`${moeda.simbolo} Logo`} />
                            </span>
                            <span title={moeda.nome}>
                                <span className="bold">{FormatadorString.limitarNomeMoeda(moeda.nome)}</span> - {moeda.simbolo}
                            </span>
                        </Link>
                    )
                })}
            </div>
        );
    }

    return (
        <div id="no-coin-found">
            <h4>Ops! Nada encontrado...</h4>
            <div style={{backgroundImage: `url('/images/no_coin_found.svg')`}}></div>  
        </div>  
    );
}