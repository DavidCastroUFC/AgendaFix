import React from 'react'
import {Link} from 'react-router-dom';
import { Layout,} from 'antd';
const { Header,} = Layout;

export default function Navbar({Children}){
    return(
        <Header style={{display:'flex',background:'#F0F0F0',justifyContent:'space-between',alignItems:'center'}}>
            <Link to="/"><img src="https://i.imgur.com/uAYLFe7.png" style={{width:180}} alt="logomarca AgendaFix"/></Link>
            {Children}
        </Header>
    );
}