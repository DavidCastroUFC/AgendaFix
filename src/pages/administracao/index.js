import React,{useState,useEffect} from 'react'
import Navbar from '../../components/navbar/index';
import TableWithSearch from '../../components/tableWithSearch/index';
import { Layout,Menu} from 'antd';
import {database} from '../../services/firebase';
const {Content} = Layout;

export default function Administracao(){
    const [session, setSession] = useState({ current: "1" });
    const [data,setData] =useState();

    const handleClick = e => {
        setSession({ current: e.key });
      };

      useEffect(() => {
        database.ref('atendimentos').get().then(function(snapshot) {
          if (snapshot.exists()) {
             const dados = snapshot.toJSON();
             //eslint-disable-next-line
             setData(eval(dados)); 
          }
          else {
            console.log("No data available");
          }
        }).catch(function(error) {
          console.error(error);
        });
      }, []);

    return(
        <>
            <Navbar/>
            <Content style={{padding: '20px 50px', display:'flex',flexDirection:'column', height: '93%', background:'#E1E1E1'}}>
                <Menu defaultSelectedKeys={["1"]} onClick={handleClick} mode="horizontal" style={{background:'none',height:'fit-content',width:'100%', borderBottomWidth:0}}>
                    <Menu.Item key="1" >
                        Atendimentos
                    </Menu.Item>
                    <Menu.Item key="2">
                    Agendamentos
                    </Menu.Item>
                </Menu>
                <div style={{marginTop:30}}>
                {session.current ==="1"
                ?
                <TableWithSearch data={data}/>
                :
                <p>dsadsa</p>
                }
                </div>
            </Content>
        </>
    );
}