import React from 'react';
import { Table, Input, Button, Space,Popconfirm, message,Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,DeleteFilled,EditFilled } from '@ant-design/icons';
import {database} from '../../services/firebase';
import axios from 'axios';
export default class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    load: false,
    data: '',
  };
  
  getData = async () => {
    let res = await axios.get("https://agendafix-19e84-default-rtdb.firebaseio.com/atendimentos.json");
    let array = [];
    let json = res.data;
    Object.keys(json).map(item=>{ 
        json[item].id = item;
        return array.push(json[item])
    });
    this.setState({data:array})
  }
  componentDidMount(){
    this.getData()
  }
  componentDidUpdate(){
    this.getData()
  }

  confirm = (dataIndex)=> {
    this.setState({
      load:true,
    });
    setTimeout(()=>{
      database.ref("atendimentos").child(`${dataIndex}`).remove().then(()=>{
        
        this.setState({
          load:false,
        });
        message.success('Deletado');
      });
    },1000);
    
  }
  
  acoes = dataIndex => ({
    
    render: dataIndex =>(
      <div>
        < Popconfirm
        title = "Tem certeza?"
        onConfirm =  {
         ()=> this.confirm(dataIndex)
        }
        okText = "Yes"
        cancelText = "No" >
          <Button danger type="link" icon={<DeleteFilled/>}>
            Deletar
          </Button>
        </Popconfirm>
        <Button type="link" icon={<EditFilled />} >Editar</Button>
        
    </div>
      ),
  }
  );
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Pesquisar por nome`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 110 }}
          >
            Pesquisar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ fontSize: '20px',color: filtered ? '#1890ff' : undefined}}/>,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
    
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
      
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
 
  render() {
    const columns = [
      {
        title: 'Nome do Serviço',
        dataIndex: 'nome',
        key: 'nome',
        width: '20%',
        ...this.getColumnSearchProps('nome'),
      },
      {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        width: '40%',
      },
      {
        title: 'Preço',   
        dataIndex: 'preco',
        key: 'preco',
      },
      {
        title: 'Data',   
        dataIndex: 'data',
        key: 'data',
      },
      {
        title: '',   
        key: 'id',
        width: '20%',
        dataIndex: 'id',
        ...this.acoes('id'),
      },
    ];
   
    return this.state.load===false ? <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 15}} scroll={{ y:350 }}/> : <Spin tip="Carregando"> <Table columns={columns} dataSource={this.props.data} pagination={{ pageSize: 15}} scroll={{ y:350 }}/></Spin>;
  }
}

