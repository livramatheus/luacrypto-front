import { useParams } from "react-router-dom"
import CoinAbout from "../components/CoinAbout";
import { useState, useEffect } from "react";
import CoinData from "../components/CoinData";
import Axios from 'axios';
import { Helmet } from "react-helmet";

export default function MoedaInfo(props) {
    
    let { symbol } = useParams();
    const [dadosMoeda, setDadosMoeda] = useState();

    let requirements = (dadosMoeda && true);

    const buscaDadosMoeda = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}moeda/${symbol}`).then(
            (response) => {
                if (response.status === 200) {
                    setDadosMoeda(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    useEffect(() => {
        buscaDadosMoeda();
    }, [symbol]);

    return (
        <div id="content">
            {
                requirements && (
                    <Helmet defer={false}>
                        <title>{`${dadosMoeda.nome} (${dadosMoeda.simbolo}) cotação, preço, gráfico hoje`} | LuaCrypto</title>
                        <meta
                            name="description"
                            content={`Cotação atual de ${dadosMoeda.nome} (${dadosMoeda.simbolo}), apresentando gráfico, histórico e capitalização de mercado`}
                        />
                        <meta
                            name="keywords"
                            content={`cotação, ${dadosMoeda.nome}, ${dadosMoeda.simbolo}, hoje, criptomoeda, preço, gráfico`}
                        />
                    </Helmet>
                )
            }

            {
                requirements && (
                    <>
                        <CoinData data={dadosMoeda} />
                        <CoinAbout data={dadosMoeda} fiats={props.fiats} />
                    </>
                )
            }
        </div >
    )

}