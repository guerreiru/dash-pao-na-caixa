import React from 'react'
import { Link } from 'react-router-dom';
import HeaderTemplate from '../HeaderTemplate'

const PadariaHeader = () => {
  const ItemLinks = () => {
    return (
      <>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
      </>
    );
  };

  return (
    <div>
      <HeaderTemplate loc="/dash" Links={ItemLinks} />
    </div>
  )
}

export default PadariaHeader
