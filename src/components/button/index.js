import React from 'react'
import './index.css';
import {Button} from 'antd';
export default function MyButton({text,action}){
    return(
        <Button id="botao">{text}</Button>
    );
}