const FormatadorString = {
    
    limitarNomeMoeda: (nome) => {
        return (nome.length >= 19 ? `${nome.substring(0, 19)}...` : nome);
    }

}

export default FormatadorString;