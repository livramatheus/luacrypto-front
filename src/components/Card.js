import { Link } from "react-router-dom";
import FormatadorDinheiro from '../helpers/FormatadorDinheiro';
import { useEffect, useRef, useContext } from "react";
import { gsap } from 'gsap';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { Conversao } from "../MainPage";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Card(props) {

    const paramsConversao = useContext(Conversao);

    const prevCountRef = useRef();

    useEffect(() => {
        prevCountRef.current = props.preco;
    });

    const prevCount = prevCountRef.current;

    let requirements = props && paramsConversao;

    const realizaAnimacaoCard = () => {
        gsap.fromTo('.card-title, .card-data', {
            fontSize: '1.35rem',
        }, {
            fontSize: '1.3rem',
            duration: 0.3,
            ease: 'power1'
        });

        gsap.fromTo('.card-main', {
            backgroundColor: '#c3c8e6'
        }, {
            backgroundColor: 'var(--mainbgcolor)',
            duration: 1.3,
            ease: 'power1'
        });
    }

    useEffect(() => {
        if (prevCount) {
            realizaAnimacaoCard();
        }

    }, [props.preco]);

    const onClickCardClose = () => {
        props.removerMoeda(props.chave);
    }

    return (
        requirements ? (
            <div className="card-main">
                <div className="card-close">
                    <CloseRoundedIcon
                        fontSize="small"
                        onClick={() => { onClickCardClose() }}
                        className="card-close-icon"
                    />
                </div>

                <Link
                    className="card"
                    to={props.destination}
                >
                    <div className="card-title">
                        {props.name}
                        <Tooltip
                            title="Variação das últimas 24 horas."
                            placement="top-start"
                        >
                            <span
                                className={props.variacao >= 0 ? 'percent-up' : 'percent-down'}
                            >
                                {props.variacao >= 0 ? '▲' : '▼'}
                                {FormatadorDinheiro.formatAsPercentage(props.variacao)}
                            </span>
                        </Tooltip>

                    </div>
                    <div
                        className="card-data"
                    >
                        {FormatadorDinheiro.formatAndConvertAsCurrency(props.preco, paramsConversao)}
                    </div>
                </Link>
            </div>
        ) : (
            <Skeleton variant="rect" width="19.4%" height="7rem" />
        )
    );
}