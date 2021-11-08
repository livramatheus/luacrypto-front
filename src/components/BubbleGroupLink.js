import BubbleEtfContent from "./BubbleEtfContent";
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function BubbleGroupLink(props) {

    const [etfs, setEtfs] = useState(null);

    const { fiats } = props;

    useEffect(() => {
        pesquisaEtfs();
    }, []);

    /**
     * Realiza uma requisição para o backend de várias ETFs.
     * Esta requisição retorna simbolo, nome, baixa, alta, abertura, volume e cotação atual
     */
    const pesquisaEtfs = () => {
        Axios.get(`${process.env.REACT_APP_BACK_URL}todasetfsreduzidas`).then(
            (response) => {
                if (response.status === 200) {
                    setEtfs(response.data);
                } else {
                    console.error('Error');
                }
            }
        );
    }

    return (
        <div id="card-component-group">
            {
                etfs && (
                    etfs.map((item, id) => {
                        return (
                            <BubbleEtfContent
                                key={id}
                                etfData={item}
                                fiats={fiats}
                            />
                        )
                    })
                )
            }
        </div>
    );

}