import React, { useEffect, useMemo, useState } from "react";
import { Table, useMultiState, Loading } from "elementz";
import MiniGrafico from "./MiniGrafico";
import { Link } from "react-router-dom";
import FormatadorDinheiro from "../helpers/FormatadorDinheiro";
import DisplayPercentual from "./DisplayPercentual";
import { useContext } from "react";
import { Conversao } from "../MainPage";

export default function TabelaMoedas(props) {

    let { dados } = props;
    let paramsConversao = useContext(Conversao);

    let requirements = (dados.length > 1 && paramsConversao);

    const [config, setConfig] = useMultiState({
        rows: 200,
        scrollable: false,
        expandable: false,
        sortable: true
    });

    const data = useMemo(() => dados.slice(0, config.rows), [
        dados,
        config.rows
    ]);

    const columns = {
        nome: {
            title: "Moeda",
            onRender: (x, row, i) => {
                return (
                    <Link to={`/moeda/${row.chave}`} className="bold linha-tabela">
                        <img src={`/images/coins/${row.chave}.png`} />
                        {`${row.nome} (${row.simbolo})`}
                    </Link>
                )
            }
        },
        preco_atual: {
            title: "Valor",
            onRender: (x, row, i) => {
                return (
                    requirements && (
                        <span>
                            {FormatadorDinheiro.formatAndConvertAsCurrency(x, paramsConversao)}
                        </span>
                    )
                );
            }
        },
        capitalizacao: {
            title: "Cap. Mercado",
            onRender: (x, row, i) => {
                return (
                    requirements && (
                        <span>
                            {FormatadorDinheiro.formatAndConvertAsCurrency(x, paramsConversao)}
                        </span>
                    )
                )
            }
        },
        variacao_24h: {
            title: "Variação (24h)",
            onRender: (x, row, i) => {
                return (
                    <span>
                        <DisplayPercentual percentual={FormatadorDinheiro.formatAsPercentage(x)} />
                    </span>
                )
            }
        },
        cotacoes: {
            title: "Gráfico (24h)",
            onRender: (dadosCotacao, row, i) => {
                return (
                    <MiniGrafico dados={row.cotacoes} />
                )
            }
        }
    };

    return (
        <Table
            className="ez-border"
            loading={!requirements}
            columns={columns}
            data={data}
            sortable={["nome", "preco_atual", "capitalizacao", "variacao_24h"]}
            searchable={false}
            filterable={false}
            selectable={false}
            paginate={!config.scrollable}
            limit={25}
            scrollable={config.scrollable ? "500px" : false}
            fixed={true}
            onMobile={(row, i) => (
                <div className="pt-2 pb-2 tabela-moedas-resp">
                    <div className="tabela-moedas-resp-dados">
                        <Link to={`/moeda/${row.chave}`} className="bold linha-tabela">
                            <img src={`/images/coins/${row.chave}.png`} />
                            {`${row.nome} (${row.simbolo})`}
                        </Link>
                        <div>
                            {requirements && FormatadorDinheiro.formatAndConvertAsCurrency(row.preco_atual, paramsConversao)}
                            <DisplayPercentual percentual={row.variacao_24h} />
                        </div>
                    </div>
                    <div className="tabela-moedas-resp-graph">
                        <MiniGrafico dados={row.cotacoes} />
                    </div>
                </div>
            )}
        />
    );
}
