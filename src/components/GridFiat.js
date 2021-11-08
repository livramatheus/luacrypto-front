import SelectFiat from "./SelectFiat";

export default function GridFiat(props) {

    let { fiats, close, setFiatPreferencia } = props;

    return (
        <>
            <h2>Selecione a moeda:</h2>
            <div className="grid-fiat">
                {
                    fiats.map((elemento, id) => {
                        return (
                            <SelectFiat
                                key={id}
                                dados={elemento}
                                close={close}
                                setFiatPreferencia={setFiatPreferencia}
                            />
                        )
                    })
                }
            </div>
        </>
    )

}