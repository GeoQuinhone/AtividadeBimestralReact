import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export const Home = () => {
    const navigate = useNavigate()
    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<string[]>([]);
    const [numPagina, setNumPagina] = useState("");

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
                        navigate('/login/ Bem Vindo Geovane')
                    }
                }>Navegar Para a Pagina de Login</button>
            <br />
            <br />
            <br />
            <button className="btn btn-primary"
                onClick={
                    () => {
                        navigate('/usuarios')
                    }
                }>Navegar Para a Pagina de Usuarios</button>
            <br />
            <br />
            <br />
            <input type="text"
                placeholder="Digite o Número da Página Sobre"
                style={{ width: "250px" }}
                value={numPagina}
                onChange={(e) => setNumPagina(e.target.value)}
            />
            <br />
            <button className="btn btn-info"
                onClick={() => {
                    if (numPagina.trim() !== "" && !isNaN(Number(numPagina))) {
                        navigate(`/sobre/${numPagina}`);
                    } else {
                        alert("Digite um número válido zé mané")
                    }
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