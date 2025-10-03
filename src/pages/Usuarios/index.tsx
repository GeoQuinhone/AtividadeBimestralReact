import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface iUsuario {
    id: number;
    nome: string;
    email: string;
}

export const Usuario = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<iUsuario[]>([])
    useEffect(() => {
        axios.get('http://localhost:3001/usuarios')
            .then((resposta) => {
                setUsuarios(resposta.data)
                console.log("Deu certo!")
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, [])

    const excluirUsuario = useCallback(async (id: number) => { // vai ser asyncrona para nao utilizar o then nem o catch
        await axios.delete(`http://localhost:3001/usuario/${id}`)

        const { data } = await axios.get('http://localhost:3001/usuarios')

        setUsuarios(data)
    }, []);

    return (
        <>
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
