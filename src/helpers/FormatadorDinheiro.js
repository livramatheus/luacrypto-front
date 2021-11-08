const FormatadorDinheiro = {

    formatAndConvertAsCurrency: (valorParaConverter, params, maxDigits = 6) => {
        let moeda = params.chave;
        let resultado = params.valor * valorParaConverter;

        if (valorParaConverter > 0.01) {
            return valorParaConverter ? new Intl.NumberFormat('br', { style: 'currency', currency: moeda }).format(resultado) : '-';
        }

        return valorParaConverter ? new Intl.NumberFormat('br', { style: 'currency', currency: moeda, maximumSignificantDigits: maxDigits }).format(resultado) : '-';
    },

    formatAsBrl: (valorParaFormatar, maxDigits = 6) => {
        if (valorParaFormatar > 0.01) {
            return valorParaFormatar ? new Intl.NumberFormat('br', { style: 'currency', currency: 'BRL' }).format(valorParaFormatar) : '-';
        }

        return valorParaFormatar ? new Intl.NumberFormat('br', { style: 'currency', currency: 'BRL', maximumSignificantDigits: maxDigits }).format(valorParaFormatar) : '-';
    },

    formatAsCurrency: (valorParaFormatar, params) => {
        let moeda = params.chave;

        if (valorParaFormatar > 0.01) {
            return valorParaFormatar ? new Intl.NumberFormat('br', { style: 'currency', currency: moeda }).format(valorParaFormatar) : '-';
        }

        return valorParaFormatar ? new Intl.NumberFormat('br', { style: 'currency', currency: moeda, maximumSignificantDigits: 6 }).format(valorParaFormatar) : '-';
    },

    formatAsNumber: (valorParaConverter) => {
        return valorParaConverter ? new Intl.NumberFormat('pt').format(valorParaConverter) : '-';
    },

    formatAsPercentage: (valorParaConverter) => {
        if (valorParaConverter == 0) {
            return parseFloat(valorParaConverter).toFixed(2) + '%'
        }

        return valorParaConverter ? parseFloat(valorParaConverter).toFixed(2) + '%' : '-';
    }
}

export default FormatadorDinheiro;