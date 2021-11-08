import HorizontalAd from "./HorizontalAd"
import FormatadorDinheiro from "../helpers/FormatadorDinheiro"
import DisplayPercentual from "./DisplayPercentual"
import CoinAboutExchange from "./CoinAboutExchange"
import CoinAboutFornecimento from "./CoinAboutFornecimento"
import { useContext } from "react";
import { Conversao } from "../MainPage";
import Skeleton from "@material-ui/lab/Skeleton"

export default function CoinAbout(props) {

    const paramsConversao = useContext(Conversao);
    const {
        categoria,
        nome,
        simbolo,
        preco_atual,
        volume_24h,
        variacao_24h,
        variacao_7d,
        variacao_30d,
        website,
        subreddit,
        info,
        fornecimento_maximo,
        fornecimento_circulante
    } = props.data;

    let requirements = (paramsConversao && props.data);

    const sobre = categoria === 1 ? (
        requirements ? (
            <p>
                <span className="bold">{nome}</span> é uma moeda digital simbolizada como <span className="color-text bold">{simbolo}</span> que utiliza da tecnologia de blockchain e de criptografia para assegurar a validade de suas transações.
                Sua cotação atual é de {paramsConversao && FormatadorDinheiro.formatAndConvertAsCurrency(preco_atual, paramsConversao)}. Nas últimas 24 horas foram negociados {paramsConversao && FormatadorDinheiro.formatAndConvertAsCurrency(volume_24h, paramsConversao)} em {nome}. <CoinAboutExchange nome={nome} />
            </p>
            
        ) : (
            <h2>Vazio</h2>
        )
    ) : (
        <p>
            <span className="bold">{nome}</span> é uma <span className="bold">stablecoin</span> simbolizada como <span className="color-text bold">{simbolo}</span> que utiliza da tecnologia de blockchain e de criptografia para assegurar a validade de suas transações.
            Como seu valor é lastreado, o mesmo permanece "estável" na faixa de {props.fiats && FormatadorDinheiro.formatAsCurrency(preco_atual, props.fiats[2])}. Nas últimas 24 horas foram negociados {paramsConversao && FormatadorDinheiro.formatAndConvertAsCurrency(volume_24h, paramsConversao)} em {nome}. <CoinAboutExchange nome={nome} />
        </p>
    )

    return (
        <article>
            {
                <h2>
                    {requirements ? (
                        `Sobre ${nome}`
                    ) : (
                        <Skeleton width="10rem" height="1.9rem" />
                    )}
                </h2>
            }
            {
                requirements ? (
                    <>
                        {sobre}
                        <p>
                            Nas últimas 24 horas, o <span className="bold">{simbolo}</span> teve uma variação no seu preço de <DisplayPercentual percentual={variacao_24h} />, na última semana uma variação de <DisplayPercentual percentual={variacao_7d} />, e nos últimos 30 dias <DisplayPercentual percentual={variacao_30d} />.
                        </p>
                        {
                            props.data &&
                            <p>
                                <span>O site oficial do projeto pode ser acessado em <a className="link" target="_blank" rel="noreferrer" href={website}>{website}</a>. </span>
                                {subreddit && <>Deseja debater com a comunidade? Então acesse a página oficial do projeto no <a className="link" target="_blank" rel="noreferrer" href={`https://reddit.com/r/${subreddit}`}>Reddit</a>.</>}
                            </p>
                        }
                    </>
                ) : (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton style={{ marginBottom: '1rem' }} />
                        <Skeleton />
                        <Skeleton style={{ marginBottom: '1rem' }} />
                        <Skeleton width="50%" />
                    </>
                )
            }

            <HorizontalAd />

            {
                info && <div dangerouslySetInnerHTML={{ __html: info }}></div>
            }

            {
                requirements ? (
                    <CoinAboutFornecimento
                        simbolo={simbolo}
                        nome={nome}
                        fornMax={fornecimento_maximo}
                        fornCirc={fornecimento_circulante}
                    />
                ) : (
                    <>
                        <Skeleton width="10rem" height="1.9rem" style={{marginBottom: '1rem'}}/>
                        <Skeleton />
                        <Skeleton width="30%"  style={{marginBottom: '1rem'}} />
                    </>
                )
            }
            {
                info && (
                    <>
                        {
                            requirements ? (
                                <p>
                                    Fonte: <cite>{website}</cite>
                                </p>
                            ) : (
                                <Skeleton width="25%" />
                            )
                        }
                        <HorizontalAd />
                    </>
                )
            }
        </article>

    )

}