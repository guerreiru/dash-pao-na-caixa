import React from 'react'
import { Link } from 'react-router-dom';
import DropDown from '../DropDown';
import HeaderTemplate from '../HeaderTemplate'
import { DropDownBtn } from './styles';

const PadariaHeader = () => {
  const ItemLinks = () => {
    return (
      <>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
        <DropDownBtn href="/" onClick={(e) => e.preventDefault()}>
          <DropDown></DropDown>
        </DropDownBtn>
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
