import ResultadoPesquisaCard from "./ResultadoPesquisaCard";
import { Popover } from '@material-ui/core';
import { useState, useEffect } from "react";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

export default function AddMoedaCard(props) {

    const [filteredCoins, setFilteredCoins] = useState();
    const [searchCoin, setSearchCoin] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setFilteredCoins(props)
    }, []);

    /**
     * Realiza um filtro no array de moedas, filtrando seus símbolos e seus nomes
     */
    const filtraMoedas = () => {
        if (props.coinsParaPesquisa) {
            let filtrado = props.coinsParaPesquisa.filter((coin) => {
                return (coin.simbolo.toLowerCase().startsWith(searchCoin) ||
                    coin.nome.toLowerCase().startsWith(searchCoin));
            });

            setFilteredCoins(filtrado);
        }
    }

    /**
     * Efeito para filtrar o array de moedas assim que for digitada 
     * uma letra no campo de pesquisa
     */
    useEffect(() => {
        if (props.coinsParaPesquisa) {
            filtraMoedas();
        }
    }, [searchCoin]);

    /**
     * Toda vez que for alterada uma letra no campo de pesquisa será setado no
     * state o que está sendo pesquisado
     */
    const handleChange = ({ target }) => {
        setSearchCoin(target.value.toLowerCase())
    }

    /**
     * Função para fechar o popover de pesquisa
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Função para abrir o popover de pesquisa 
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const id = open ? 'simple-popover-card' : undefined;

    return (
        <>
            <div className="card-main" onClick={handleClick} aria-describedby={id}>
                <span className="card-add" >
                    <div className="card-title-add">
                        Adicionar moeda
                    </div>
                    <div className="card-data-add">
                        <AddCircleOutlineRoundedIcon
                            className="card-add-icon"
                            fontSize="large"
                        />
                    </div>
                </span>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className="popover-pesquisa"
                PaperProps={{
                    style: {
                        width: '20rem',
                        backgroundColor: 'var(--mainbgcolor)'
                    }
                }}
            >
                <div className="pesquisa">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        onChange={handleChange}
                        value={searchCoin}
                    />
                    <ResultadoPesquisaCard
                        coinsParaPesquisa={filteredCoins}
                        close={handleClose}
                        addMoedaHandler={props.addMoedaHandler}
                    />
                </div>
            </Popover>
        </>
    );

}