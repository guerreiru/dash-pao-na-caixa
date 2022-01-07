import React from 'react'
import { Link } from 'react-router-dom';
import HeaderTemplate from '../HeaderTemplate'

const PadariaHeader = () => {
  const ItemLinks = () => {
    return (
      <>
        <Link to="/condominios">Condomínios</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
      </>
    );
  };

  return (
    <div>
      <Header Links={ItemLinks} />
    </div>
  )
}

export default PadariaHeader
