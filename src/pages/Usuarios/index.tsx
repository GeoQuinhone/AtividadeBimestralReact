import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loading } from "./../../components/Loading";
import { Notificacao } from "./../../components/Notificacao";
import axios from "axios"
import './../../styles/style.css';


interface iUsuario {
    id: number;
    nome: string;
    email: string;
}

export const Usuario = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<iUsuario[]>([])
    const [loading, setLoading] = useState(false);
    const [notificacao, setNotificacao] = useState<{ mensagem: string; tipo?: "sucesso" | "erro" | "aviso" | "info" } | null>(null);
    useEffect(() => {
        // Requisição no backend
        axios.get('http://localhost:3001/usuarios')
            .then((resposta) => {
                setUsuarios(resposta.data)
                console.log("Deu certo!")
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, [])

    const excluirUsuario = useCallback(async (id: number) => {
        if (!window.confirm("Deseja realmente excluir este usuário?")) return;

        setLoading(true);
        const tempoInicioLoading = Date.now();

        try {
            await axios.delete(`http://localhost:3001/usuarios/${id}`);

            // Atualiza a lista de usuários
            const { data } = await axios.get("http://localhost:3001/usuarios");
            setUsuarios(data);

            // Mostra notificação de sucesso
            setNotificacao({
                mensagem: "Usuário excluído com sucesso!",
                tipo: "sucesso",
            });

        } catch (erro) {
            console.error(erro);
            setNotificacao({
                mensagem: "Erro ao excluir usuário!",
                tipo: "erro",
            });
        } finally {
            // garante que o loading fique visível por pelo menos 2 segundos
            const tempoDecorrido = Date.now() - tempoInicioLoading;
            const tempoRestante = Math.max(0, 2000 - tempoDecorrido);
            setTimeout(() => setLoading(false), tempoRestante);
        }
    }, []);

    return (
        <>
            {loading && <Loading />}
            {notificacao && (
                <Notificacao
                    mensagem={notificacao.mensagem}
                    tipo={notificacao.tipo}
                    onClose={() => setNotificacao(null)}
                />
            )}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 15
                }}
            >
                <h2>Usuário</h2>
                <button
                    className='btn btn-success'
                    type="button"
                    onClick={() => {
                        navigate('/usuarios/criar')
                    }}
                >
                    Add
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <th scope="row">{usuario.id}</th>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ marginRight: 5 }}
                                    onClick={() => {
                                        navigate(`/usuarios/${usuario.id}`) // templateliterals aceita enter, aceita variaveis js dentro dele
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => {
                                        excluirUsuario(usuario.id);

                                    }}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}
