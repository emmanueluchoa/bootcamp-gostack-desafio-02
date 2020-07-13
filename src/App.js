import React, { useState, useEffect } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      const { data } = response;
      setProjects(data);
    });
  });

  async function handleAddRepository() {
    const repositorio = {
      title: `Teste ${Date.now()}`,
      url: 'www.teste.com',
      techs: [
        'C#',
        'asp.net',
        'MVC',
        'Typescript',
        'javascript',
        'CSS',
        'HTML',
        'NodeJS',
        'React',
        'Angular',
      ],
    };

    const { data } = await api.post('/repositories', repositorio);
    setProjects([...projects, data]);
  }

  async function handleRemoveRepository(id) {
    if (id) {
      await api.delete(`/repositories/${id}`);
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
