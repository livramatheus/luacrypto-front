const abreviacoesMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const AuxiliarDias = {
    /**
     * Retorna se o mercado está aberto na data passada por parâmetro.
     * Se não for passada uma data, retornará se o mercado está aberto para a data atual.
     * @param {Date} data Um objeto do tipo Date 
     * @returns {boolean} Se o mercado está ou não aberto
     * @todo Considerar feriados nacionais e feriado de São Paulo
     * @todo Considerar horários somente entre 10:00 e 17:00 como mercado aberto
     */
    isMercadoAberto: (data = new Date()) => {
        return ![0, 6].includes(data.getDay());
    },

    formataExtenso: (data = new Date()) => {
        return `${data.getDate()}/${abreviacoesMeses[data.getMonth()]}`;
    }

}

export default AuxiliarDias;