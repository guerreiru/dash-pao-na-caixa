import React from 'react'
import { Link } from 'react-router-dom';
import HeaderTemplate from '../HeaderTemplate'

const PadariaHeader = () => {
  const ItemLinks = () => {
    return (
      <>
        <Link to="/usuarios">Residentes</Link>
        <Link to="/planos">Categorias</Link>
      </>
    );
  };

  return (
    <div>
      <HeaderTemplate Links={ItemLinks} />
    </div>
  )
}

export default PadariaHeader
