import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3000';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    disponivel: true
  });

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const res = await axios.get(`${API_URL}/veiculos`);
      setVeiculos(res.data);
    } catch (err) {
      console.error('Erro ao buscar veículos:', err);
      alert('Erro ao buscar veículos do servidor.');
    }
  };

  const cadastrarVeiculo = async () => {
    if (!novoVeiculo.marca || !novoVeiculo.modelo || !novoVeiculo.ano || !novoVeiculo.placa) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    try {
      const body = {
        ...novoVeiculo,
        ano: Number(novoVeiculo.ano)
      };
      await axios.post(`${API_URL}/veiculos`, body);
      setNovoVeiculo({ marca: '', modelo: '', ano: '', placa: '', disponivel: true });
      fetchVeiculos();
    } catch (err) {
      console.error('Erro ao cadastrar veículo:', err.response || err);
      alert(err.response?.data?.error || 'Erro ao cadastrar veículo.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Locadora</h1>

      <div className="mb-4">
        <h3>Cadastrar Veículo</h3>
        <input
          className="form-control mb-2"
          placeholder="Marca"
          value={novoVeiculo.marca}
          onChange={e => setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Modelo"
          value={novoVeiculo.modelo}
          onChange={e => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Ano"
          value={novoVeiculo.ano}
          onChange={e => setNovoVeiculo({ ...novoVeiculo, ano: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Placa"
          value={novoVeiculo.placa}
          onChange={e => setNovoVeiculo({ ...novoVeiculo, placa: e.target.value })}
        />
        <button className="btn btn-primary" onClick={cadastrarVeiculo}>
          Cadastrar Veículo
        </button>
      </div>

      <h3>Veículos Cadastrados</h3>
      <ul className="list-group">
        {veiculos.map(v => (
          <li key={v.id} className="list-group-item">
            {v.id} — {v.marca} {v.modelo} ({v.ano}) — Placa: {v.placa} — {v.disponivel ? 'Disponível' : 'Indisponível'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
