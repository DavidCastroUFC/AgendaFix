import React,{useState} from 'react'
import Navbar from '../../components/navbar/index';
import TableWithSearch from '../../components/tableWithSearch/index';
import { Layout,Menu,Modal,Button,Input,Form,InputNumber,message,Spin} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {database} from '../../services/firebase';
const {Content} = Layout;

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
};
/* eslint-enable no-template-curly-in-string */
export default function Administracao(){
    const [state, setState] = useState({
      visible: false,
      load: false,
    });
    const [session, setSession] = useState({ current: "1" });
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

    const handleClick = e => {
        setSession({ current: e.key });
      };
           
      const showModal = () => {
        setState({
          visible: true
        });
      
      };
    
    
      const handleCancel = () => {
        setState({ visible: false });
      };
    
      const { visible} = state;

      const onFinish = (values) => {
        values.data = date;
        values.preco = `R$ ${values.preco}`;
        database.ref('atendimentos').push(values);
        setState({visible: false});
      };
     
      const ModalAtendimento =()=>{
        return (
          <>
            <Modal
              visible={visible}
              title="Adicionar tipo de atendimento"
              onCancel={handleCancel}
              footer={[
              ]}
            >
              <Form
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
              >
                <Form.Item
                  name={["nome"]}
                  label="Nome"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["descricao"]}
                  label="Descrição"
                  rules={[
                    {
                      required: false
                    }
                  ]}
                  initialValue={''}
                >
                  <Input />
                </Form.Item>
                <Form.Item 
                name={["preco"]}
                label="Preço"
                rules={[
                  {
                    required: true
                  }
                ]}
                initialValue={0}
                >
                  <InputNumber
                    formatter={value => ` ${value}`.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                   
                  />
                </Form.Item>
                <div style={{display:'flex',justifyContent:'space-around',marginTop:30}}>
                <Button key="back" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
                  Adicionar
                </Button>
                </div>
              </Form>
            </Modal>
          </>
        );
      }

    return(
        <>
            <Navbar/>
            <Content style={{padding: '20px 50px', display:'flex',flexDirection:'column', height: '93%', background:'#E1E1E1'}}>
                <Menu defaultSelectedKeys={["1"]} onClick={handleClick} mode="horizontal" style={{background:'none',height:'fit-content',width:'100%', borderBottomWidth:0,textAlign:'right'}}>
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
                <div>
                   <div style={{textAlign:"right"}}>
                    <Button onClick={showModal} type="primary" style={{marginBottom:20}} icon={<PlusCircleFilled />}>
                      Novo
                    </Button>
                  </div>
                  <TableWithSearch /> 
                  <ModalAtendimento/>
                </div>
                :
                <p>dsadsa</p>
                }
                </div>
            </Content>
        </>
    );
}