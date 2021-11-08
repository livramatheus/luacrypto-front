import HorizontalAd from '../components/HorizontalAd';
import BubbleGroups from '../components/BubbleGroup';
import VerticalAd from '../components/VerticalAd';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import TabelaMoedas from '../components/TabelaMoedas';
import { useState, useEffect } from 'react';
import axiosRetry from 'axios-retry';

export default function Home() {

    const [dadosTabela, setDadosTabela] = useState([]);

    useEffect(() => {
        getDadosTabela();
    }, []);

    axiosRetry(Axios, {
        retries: 4,
        retryDelay: (retryCount) => {
            console.log(`tryed again `, retryCount)
            return retryCount * 700;
        }
    })

    const getDadosTabela = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}dadoslista`).then((resposta) => {
            if (resposta.status === 200) {
                setDadosTabela(resposta.data);
            }
        });
    }

    return (
        <>
            <Helmet defer={false} >
                <title>Portal de criptomoedas, cotações e gráficos | LuaCrypto </title>
                <meta
                    name="description"
                    content="Portal com os mais variados dados sobre criptomoedas"
                />
                <meta
                    name="keywords"
                    content="luacrypto, cripto, criptomoedas, bitcoin, btc, preços, cotação"
                />
            </Helmet>

            <TabelaMoedas dados={dadosTabela} />

            <HorizontalAd />
        </>
    );

}