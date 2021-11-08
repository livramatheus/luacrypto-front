import Storage from "../helpers/Storage";
import { useEffect, useState } from "react";
import Axios from "axios";
import Card from "../components/Card";
import AddMoedaCard from "../components/AddMoedaCard";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";

export default function CardsMoedas(props) {

    /**
     * Irá requisitar atualização das moedas a cada 
     * 4 minutos e meio para o back-end 
     */
    const MINUTE_MS = 270000;

    /**
     * Número máximo de moedas que podem ser adicionadas na watchlist
     */
    const MAXIMO_MOEDAS_WATCHLIST = 9;

    /**
     * Essas são as moedas iniciais que serão mandadas para a storage
     * assim que o usuário abrir a aplicação pela primeira vez
     */
    const moedasIniciaisStorage = ['bitcoin', 'ethereum', 'cardano', 'binancecoin'];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Armazena nome, símbolo, variação das últimas 24 horas e o 
     * valor das moedas watchlisted
     */
    const [moedas, setMoedas] = useState();

    /**
     * Armazena apenas os símbolos das moedas watchlisted, 
     * utilizado para manter no storage
     */
    const [watchlisted, setWatchlisted] = useState([]);

    /**
     * [Assim que a página é aberta], define no state as moedas watchlisted.
     * Se é a primeira vez que acessou o site, define as moedas iniciais como watchlisted.
     * Senão busca as moedas anteriormente selecionadas e a define no state.
     * Por fim, realiza uma requisição à API para receber os dados da moeda.
     */
    useEffect(() => {
        if (!localStorage.getItem('moedas')) {
            setWatchlisted(moedasIniciaisStorage);
        } else {
            setWatchlisted(Storage.getMoedas());
        }

        pesquisaMoedasWatchlist();
    }, []);

    /**
     * [Quando o watchlist tem seu valor alterado], realiza uma busca de cotações
     * e salva no storage o novo valor
     */
    useEffect(() => {
        pesquisaMoedasWatchlist();
        Storage.setMoedas(watchlisted);
    }, [watchlisted]);

    /**
     * [Quando as moedas têm seus valores alterados], aguarda por X minutos
     * e realiza uma nova busca das cotações recentes na API back-end.
     * Assim que a moeda tem seu valor alterado, já é agendada a próxima requisição
     * para daqui a X minutos
     */
    useEffect(() => {
        const interval = setInterval(() => {
            pesquisaMoedasWatchlist();
        }, MINUTE_MS);

        return () => {
            clearInterval(interval);
        }
    }, [moedas]);

    /**
     * Realiza uma requisição para o backend de várias moedas.
     * Esta requisição retorna apenas o nome, símbolo, a variação das últimas 24h
     * e a última cotação de uma moeda
     */
    const pesquisaMoedasWatchlist = () => {
        let moedasRequisicao = watchlisted.join(',');
        if (moedasRequisicao) {

            Axios.get(`${process.env.REACT_APP_BACK_URL}moedareduzida/${moedasRequisicao}`).then(
                (response) => {
                    if (response.status === 200) {
                        setMoedas(response.data);
                    } else {
                        console.error('Error');
                    }
                }
            );
        }
    }

    /**
     * Adiciona uma nova moeda ao watchlist  
     * @param {string} chave 
     */
    function adicionarMoeda(chave) {
        if (watchlisted.length < MAXIMO_MOEDAS_WATCHLIST) {
            if (!watchlisted.includes(chave)) {
                setWatchlisted([...watchlisted, chave]);
            }
        } else {
            handleClickOpen();
        }
    }

    /**
     * Remove uma moeda do watchlist
     * @param {string} chave 
     */
    function removerMoeda(chave) {
        if (watchlisted.includes(chave)) {
            setWatchlisted(
                watchlisted.filter((simb) => {
                    return simb != chave;
                })
            );
        }
    }

    return (
        <div id="card-group">
            {
                watchlisted.length > 0 && (
                    moedas ? (
                        moedas.map((moeda, id) => {
                            return (
                                <Card
                                    key={id}
                                    chave={moeda.chave}
                                    name={moeda.simbolo}
                                    destination={`moeda/${moeda.chave}`}
                                    simbolo={moeda.simbolo}
                                    preco={moeda.preco_atual}
                                    removerMoeda={removerMoeda}
                                    variacao={moeda.variacao_24h}

                                />
                            );
                        })
                    ) : (
                        <>
                            {
                                watchlisted.map((item, id) => {
                                    return <Skeleton variant="rect" width="19.4%" height="7rem" key={id} />
                                })
                            }
                        </>
                    )
                )
            }

            <AddMoedaCard
                addMoedaHandler={adicionarMoeda}
                coinsParaPesquisa={props.coinsParaPesquisa}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Ops!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Você não pode adicionar mais moedas ao painel Lista de Interesse.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}