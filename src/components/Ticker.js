import Skeleton from '@material-ui/lab/Skeleton';

export default function Ticker(props) {

  let { elementos } = props;

  let requirements = elementos;
  let dummyData = [null, null, null, null, null];

  return (

    <div className="content-ticker">
      {
        requirements ? (
          elementos.map((elemento, id) => {
            return <div key={id} className="item-noticia-recente">{elemento.titulo}</div>
          })
        ) : (
          dummyData.map((elemento, id) => {
            return (
              <div>
                <Skeleton key={id} width={`99%`} />
              </div>)
          })
        )
      }
    </div>
  );
}
