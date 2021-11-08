import Skeleton from '@material-ui/lab/Skeleton';
import FormatadorDinheiro from '../helpers/FormatadorDinheiro';
import FormatadorString from '../helpers/FormatadorString';
import { useContext } from 'react';
import { Conversao } from '../MainPage';
import { Link } from 'react-router-dom';

export default function Destaque(props) {

  let { elementos } = props;
  let requirements = elementos.length > 0;
  let dummyData = [null, null, null, null, null];
  let paramsConversao = useContext(Conversao);

  return (

    <div className="content-ticker">
      {
        requirements ? (
          elementos.map((elemento, id) => {
            return (
              <div key={id} className="lista-destaque">
                <Link to={`/moeda/${elemento.chave}`}>
                  <span className="dados-gerais">
                    <img src={`/images/coins/${elemento.chave}.png`} alt={`Logo ${elemento.chave}`} />
                    <span className="bold">
                      {FormatadorString.limitarNomeMoeda(elemento.nome)} ({elemento.simbolo})
                    </span>
                  </span>

                  <span className="dados-cotacao">
                    <span>
                      {paramsConversao && FormatadorDinheiro.formatAndConvertAsCurrency(elemento.preco_atual, paramsConversao)}
                    </span>

                    <span
                      className={elemento.variacao_24h >= 0 ? 'percent-up' : 'percent-down'}
                    >
                      {elemento.variacao_24h >= 0 ? '▲' : '▼'}
                      {FormatadorDinheiro.formatAsPercentage(elemento.variacao_24h)}
                    </span>
                  </span>
                </Link>
              </div>
            )
          })
        ) : (
          dummyData.map((elemento, id) => {
            return (
              <div className="lista-destaque">
                <Skeleton variant="circle" width="1.3rem" height="1.3rem" />
                <Skeleton key={id} width={`${parseInt((Math.random() * 65) + 10)}%`} />
              </div>)
          })
        )
      }
    </div>
  );
}
