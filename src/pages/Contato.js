import PageTitle from "../components/PageTitle";
import { Helmet } from "react-helmet";

export default function Contato() {
    
    return (
        <>
            <Helmet defer={false} >
                <title>Fale Com | LuaCrypto </title>
                <meta
                    name="robots"
                    content="noindex"
                />
            </Helmet>
            <article>
                <PageTitle title="Fale com LuaCrypto" />

                <p>
                    Caso deseje enviar sugestões, tirar dúvidas, reportar bugs, ou firmar parceirias com a <span className="bold color-text">LuaCrypto</span>, por favor, entre em contato conosco através do seguinte e-mail:
                </p>
                
                <address>
                    <a href="mailto:contato@luacrypto.com" className="link">contato@luacrypto.com</a>.
                </address>

                <p>
                    Estaremos enormemente gratos em ouvir o que você tem a dizer.
                </p>
            </article>
        </>

    );

}