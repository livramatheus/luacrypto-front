import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import TopRow from './components/TopRow';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import MedoEGanancia from './pages/MedoEGanancia';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import { createContext, useEffect, useState } from 'react';
import Etf from './pages/Etf';
import ScrollToTop from './components/ScrollToTop';
import Storage from './helpers/Storage';
import Axios from 'axios';
import Termos from './pages/Termos';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade';
import ExoneracaoDeResponsabilidade from './pages/ExoneracaoDeResponsabilidade';
import Contato from './pages/Contato';
import Data from './params/Data';
import Moedas from './pages/Moedas';
import './style.css';

export const Conversao = createContext();

export default function MainPage() {

    const FIAT_PADRAO = 'BRL';

    const [coinsParaPesquisa, setCoinsParaPesquisa] = useState(Data.getMoedasIniciaisParaPesquisa);
    const [fiatPreferencia, setFiatPreferencia] = useState(FIAT_PADRAO);
    const [fiats, setFiats] = useState();
    const [dadosFiatPrefer, setDadosFiatPrefer] = useState();
    const [dadosDominancia, setDadosDominancia] = useState();

    useEffect(() => {
        realizaPesquisaFiat();
        realizaPesquisaMoeda();
        realizaPesquisaDominancia();

        if (!localStorage.getItem('fiatPreferencia')) {
            setFiatPreferencia(FIAT_PADRAO);
        } else {
            setFiatPreferencia(Storage.getFiatPreferencia());
        }
    }, []);

    useEffect(() => {
        Storage.setFiatPreferencia(fiatPreferencia);
        getCotacaoFiat();
    }, [fiatPreferencia]);

    /**
     * Faz um pedido para o back end retornando um array com todas as 
     * moedas (simbolo e nome) ordenadas pelo ranking.
     */
    const realizaPesquisaMoeda = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}todasmoedasreduzidas`).then(
            (response) => {
                if (response.status === 200) {
                    setCoinsParaPesquisa(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    /**
    * Resgata os dados mais recentes de dominância
    */
    const realizaPesquisaDominancia = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}dominanciarecente`).then(
            (response) => {
                if (response.status === 200) {
                    setDadosDominancia(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    /**
     * Faz um pedido para o back end retornando um array com todas as 
     * fiats
     */
    const realizaPesquisaFiat = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}todasfiatscompletas`).then(
            (response) => {
                if (response.status === 200) {
                    setFiats(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    /**
     * Faz uma pesquisa para o backend retornando a cotação atual da fiat selecionada
     */
    const getCotacaoFiat = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}fiat/${fiatPreferencia}`).then(
            (response) => {
                if (response.status === 200) {
                    setDadosFiatPrefer(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    const btnCookieStyle = {
        backgroundColor: 'var(--secondarycolor)',
        color: 'var(--darktxtcolor)',
        fontWeight: 'bold',
        padding: '0.5rem'
    };

    const spanCookieStyle = {
        color: 'var(--lighttxtcolor)'
    }

    const barCookieStyle = {
        background: 'rgba( 48, 48, 48, 0.83 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 5.5px )',
        WebkitBackdropFilter: 'blur( 5.5px )',
        border: '1px solid rgba( 255, 255, 255, 0.18 )'
    }

    return (
        <div id="dash">
            <BrowserRouter>
                <ScrollToTop />

                <Conversao.Provider value={dadosFiatPrefer}>

                    <SideMenu />

                    <div id="data">
                        <TopRow
                            coinsParaPesquisa={coinsParaPesquisa}
                            fiats={fiats}
                            dadosDominancia={dadosDominancia}
                            setFiatPreferencia={setFiatPreferencia}
                        />

                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>

                            <Route path="/medo-e-ganancia">
                                <MedoEGanancia />
                            </Route>

                            <Route path="/etf">
                                <Etf
                                    fiats={fiats}
                                />
                            </Route>

                            <Route path="/termos-de-uso">
                                <Termos />
                            </Route>

                            <Route path="/contato">
                                <Contato />
                            </Route>

                            <Route path="/politica-de-privacidade">
                                <PoliticaDePrivacidade />
                            </Route>

                            <Route path="/exoneracao-de-responsabilidade">
                                <ExoneracaoDeResponsabilidade />
                            </Route>

                            <Route path="/sobre">
                                <Sobre />
                            </Route>

                            <Route path="/moeda">
                                <div id="status">
                                    <Moedas
                                        coinsParaPesquisa={coinsParaPesquisa}
                                        fiats={fiats}
                                    />
                                </div>
                            </Route>

                            <Route path="*">
                                <h3>Erro 404</h3>
                            </Route>
                        </Switch>

                        <CookieConsent
                            buttonText="Eu aceito"
                            buttonStyle={btnCookieStyle}
                            style={barCookieStyle}
                            contentStyle={spanCookieStyle}
                        >
                            Ao clicar em "Eu Aceito" ou ao continuar navegando neste site, você concorda que o Bitcoin-Hoje pode guardar cookies no seu dispositivo e utilizar essas informações de acordo com a nossa <Link to="/politica-de-privacidade" className="link" style={{ color: 'var(--secondarycolor)', textDecoration: 'underline' }}>Política de Cookies</Link>.
                        </CookieConsent>

                        <Footer />
                    </div>
                </Conversao.Provider>
            </BrowserRouter>
        </div>
    )
}