import { useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';

export default function BarraMedoGanancia(props) {

    let { dadosGrafico } = props;
    
    const [largura, setLargura] = useState(0);

    const styleIndiceInner = { width: `${largura}%` };
    const styleIndiceOuter = {};
    
    useEffect(() => {
        if (dadosGrafico) {
            setLargura(dadosGrafico[dadosGrafico.length - 1].indice);
        }
    }, [dadosGrafico]);

    let requirements = dadosGrafico;

    function getDescricaoSentimento(number) {
        if (number <= 25) {
            // Vermelho escuro
            styleIndiceInner.background = 'linear-gradient(to left, #C72C2C, #3a1111)';
            return 'Medo Eextremo';
        } else if (number > 25 && number <= 45) {
            // Vermelho claro
            styleIndiceInner.background = 'linear-gradient(to left, #d84f4f, #C72C2C)';
            return 'Medo';
        } else if (number > 45 && number <= 55) {
            // Laranja
            styleIndiceInner.background = 'linear-gradient(45deg, #BB1900, #FFB000)';
            return 'Neutro';
        } else if (number > 55 && number <= 75) {
            // Amarelo
            styleIndiceInner.background = 'linear-gradient(to left, #E8B03F, #FCED0A)';
            return 'Ganância';
        } else if (number > 75 && number <= 100) {
            // Verde
            styleIndiceInner.background = 'linear-gradient(to left, #42A341,  #B8E2A3)';
            return 'Ganância Extrema';
        } else {
            return '';
        }
    }

    return (
        <div id="medo-e-ganancia">
            <div className="indice-grupo">
                <div>
                    O índice de <span className="bold">Medo e Ganância</span> para o dia de hoje é de:
                </div>
                {
                    requirements ? (
                        <span className="indice-atual">
                            {dadosGrafico[dadosGrafico.length - 1].indice}
                        </span>
                    ) : (
                        <Skeleton
                            animation="wave"
                            height="5rem"
                            width="5rem"
                            style={{ margin: 'auto' }}
                        />
                    )
                }
                <div>
                    {
                        requirements ? (
                            <span className="desc-indice-atual">{getDescricaoSentimento(dadosGrafico[dadosGrafico.length - 1].indice)}</span>
                        ) : (
                            <Skeleton
                                animation="wave"
                                height="3rem"
                                width="5rem"
                                style={{ margin: 'auto' }}
                            />
                        )
                    }
                </div>
            </div>

            <div className="indice-outer" style={styleIndiceOuter}>
                <div className="indice-inner" style={styleIndiceInner}></div>
            </div>
        </div>
    );

}