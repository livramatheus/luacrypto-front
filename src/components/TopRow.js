import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { Popover } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ResultadoPesquisa from './ResultadoPesquisa';
import GridFiat from './GridFiat';
import GlobalData from './GlobalData';

export default function TopRow(props) {

    let { coinsParaPesquisa, fiats, setFiatPreferencia, dadosDominancia } = props;

    // Fiat
    const [anchorFiat, setAnchorFiat] = useState(null);
    const openFiat = Boolean(anchorFiat);

    const handleClickFiat = (event) => {
        setAnchorFiat(event.currentTarget);
    };

    const handleCloseFiat = () => {
        setAnchorFiat(null);
    };

    // Busca Cripto
    const [anchorBusca, setAnchorBusca] = useState(null);
    const openBusca = Boolean(anchorBusca);

    const handleClickBusca = (event) => {
        setAnchorBusca(event.currentTarget);
    };

    const handleCloseBusca = () => {
        setAnchorBusca(null);
        setSearchCoin('');
    };

    const [searchCoin, setSearchCoin] = useState('');
    const [filteredCoins, setFilteredCoins] = useState();

    /**
     * Realiza um filtro no array de moedas, filtrando seus símbolos e seus nomes
     */
    const filtraMoedas = () => {
        let filtrado = coinsParaPesquisa.filter((coin) => {
            return (coin.simbolo.toLowerCase().startsWith(searchCoin) ||
                coin.nome.toLowerCase().startsWith(searchCoin));
        });

        setFilteredCoins(filtrado);
    }

    /**
     * Efeito para filtrar o array de moedas assim que for digitada 
     * uma letra no campo de pesquisa
     */
    useEffect(() => {
        if (coinsParaPesquisa) {
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

    const idPopoverBusca = openBusca ? 'popover-busca' : undefined;
    const idPopoverFiat = openFiat ? 'select-moeda' : undefined;

    return (
        <>
            <div id="top-row">
                <GlobalData
                    fiats={fiats}
                    dadosDominancia={dadosDominancia}
                />
                <div className="icons">
                    <AttachMoneyRoundedIcon className="ico" fontSize="small" onClick={handleClickFiat} aria-describedby={idPopoverFiat} />
                    <SearchRoundedIcon className="ico" fontSize="small" onClick={handleClickBusca} aria-describedby={idPopoverBusca} />
                </div>
            </div>
            <Popover
                id={idPopoverBusca}
                open={openBusca}
                anchorEl={anchorBusca}
                onClose={handleCloseBusca}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                    <input type="text" placeholder="Pesquisar..." onChange={handleChange} value={searchCoin} />
                    <ResultadoPesquisa
                        coinsParaPesquisa={filteredCoins}
                        close={handleCloseBusca}
                    />
                </div>
            </Popover>
            <Popover
                id={idPopoverFiat}
                open={openFiat}
                anchorEl={anchorFiat}
                onClose={handleCloseFiat}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className="popover-pesquisa"
                PaperProps={{
                    style: {
                        width: '32rem',
                        backgroundColor: 'var(--mainbgcolor)'
                    }
                }}
            >
                <div className="pesquisa">
                    <GridFiat
                        fiats={fiats}
                        close={handleCloseFiat}
                        setFiatPreferencia={setFiatPreferencia}
                    />
                </div>
            </Popover>
        </>
    );
}