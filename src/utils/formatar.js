export const formatar = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}