import React from 'react'
import Logo from '../../assets/logo';
import { Layout,} from 'antd';
const { Header,} = Layout;

export default function Navbar({Children}){
    return(
        <Header style={{display:'flex',background:'#F0F0F0',justifyContent:'space-between',alignItems:'center'}}>
            <Logo width={170}/>
            {Children}
        </Header>
    );
}