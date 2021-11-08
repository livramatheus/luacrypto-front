import { Link } from 'react-router-dom'

export default function Footer() {

    return (
        <footer id="footer">
            <div className="footer-section logo-footer" style={{backgroundImage: `url('/images/logo_dark_horizontal.svg')`}}>

            </div>

            <div className="footer-section">
                <div className="footer-column">
                    <h4>Sobre</h4>
                    <Link to="/sobre">Sobre LuaCrypto</Link>
                    <Link to="/politica-de-privacidade">Política de Privacidade</Link>
                    <Link to="/termos-de-uso">Termos de Uso</Link>
                    <Link to="/exoneracao-de-responsabilidade">Exoneração de Responsabilidade</Link>
                </div>
                <div className="footer-column">
                    <h4>Suporte</h4>
                    <Link to="/contato">Contato</Link>
                </div>
            </div>
        </footer>
    );

}