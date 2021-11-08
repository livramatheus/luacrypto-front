const Storage = {

    adicionaMoeda: (simbolo) => {
        let moedas = JSON.parse(localStorage.getItem('moedas'));

        if (!moedas.includes(simbolo)) {
            moedas.push(simbolo);
        }
        
        localStorage.setItem('moedas', JSON.stringify(moedas));
    },

    removeMoeda: (simbolo) => {
        let moedas = JSON.parse(localStorage.getItem('moedas'));
        moedas.pop(simbolo);
        localStorage.setItem('moedas', JSON.stringify(moedas));
    },
    
    getMoedas: () => {
        return JSON.parse(localStorage.getItem('moedas'));
    },

    setMoedas: (arrayDeSimbolos) => {
        localStorage.setItem('moedas', JSON.stringify(arrayDeSimbolos));
    },

    setFiatPreferencia: (moeda) => {
        localStorage.setItem('fiatPreferencia', moeda);
    },

    getFiatPreferencia: () => {
        return localStorage.getItem('fiatPreferencia');
    }

}

export default Storage;