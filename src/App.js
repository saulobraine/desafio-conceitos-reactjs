import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepository = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'teste',
      techs: ['Teste']
    });

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter((repository) => repository.id !== id);

    setRepositories(filteredRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

    </div>
  );
}

export default App;
