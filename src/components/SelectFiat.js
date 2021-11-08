export default function SelectFiat(props) {

    let { dados, close, setFiatPreferencia } = props;

    const selecionaFiat = () => {
        setFiatPreferencia(dados.chave);
        close();
    }

    return (
        <div className="select-fiat" onClick={selecionaFiat}>
            <div className="fiat-img">
                <img src={`../images/fiats/${dados.chave}.svg`} alt="" />
            </div>
            <div className="fiat-content">
                <div className="content-nome">{dados.nome}</div>
                <div className="content-simbolo">{dados.chave}</div>
            </div>
        </div>
    );

}