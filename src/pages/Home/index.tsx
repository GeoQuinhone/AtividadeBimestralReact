import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export const Home = () => {
    const navigate = useNavigate()
    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<string[]>([]);

    useEffect(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        if (tarefasSalvas) {
            setTarefas(JSON.parse(tarefasSalvas));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = () => {
        if (tarefa.trim() !== "") {
            setTarefas([...tarefas, tarefa]);
            setTarefa("");
        }
    };
    return (
        <>
            <h1>Bem vindo a nossa pagina da chopi</h1>
            <br />
            <button className="btn btn-primary"
                onClick={
                    () => {
                        navigate('/login/Geovane')
                    }
                }>Navegar Para a Pagina de Login</button>
            <br />
            <br />
            <br />
            <button className="btn btn-info"
                onClick={() => {
                    navigate('/sobre/15')
                }
                }>Navegar Para a Página Sobre</button>
            <br />
            <br />
            <br />
            <h2>Lista de Tarefas</h2>
            <input
                type="text"
                placeholder="Digite uma tarefa"
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={adicionarTarefa}
            >
                Adicionar
            </button>
                   <button
                className="btn btn-danger"
                onClick={() => setTarefas(([]))}
            >
                Remover Tarefas
            </button>

            <ul>
                {tarefas.map((item, index) => (
                    <li key={index} className="text-lg">
                        {item}
                    </li>
                ))}
            </ul>
        </>

    )

}

export default Home;