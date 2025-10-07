import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./../../../components/Loading";
import { Notificacao } from "./../../../components/Notificacao";
import './../../../styles/style.css';


export const GerenciarUsuarios = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [notificacao, setNotificacao] = useState<{ mensagem: string; tipo?: "sucesso" | "erro" | "aviso" | "info" } | null>(null);
    const [editar, setEditar] = useState(false);

    const refForm = useRef<any>(null); // useRef semelhante ao useState, porém não força renderização

    // Carregar usuário se estiver editando
    useEffect(() => {
        const idUsuario = Number(id);
        if (!isNaN(idUsuario)) {
            setEditar(true);
            axios
                .get(`http://localhost:3001/usuarios?id=${idUsuario}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        const usuario = res.data[0];
                        refForm.current["nome"].value = usuario.nome;
                        refForm.current["email"].value = usuario.email;
                        refForm.current["permissao"].value = usuario.permissao;
                    } else {
                        setNotificacao({ mensagem: "Usuário não encontrado!", tipo: "erro" });
                        navigate("/usuarios");
                    }
                })
                .catch((erro) => {
                    console.error(erro);
                    setNotificacao({ mensagem: "Erro ao buscar usuário", tipo: "erro" });
                });
        }
    }, [id, navigate]);

    // Enviar formulário
    const enviarFormulario = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault();

            if (!refForm.current.checkValidity()) {
                refForm.current.classList.add("was-validated");
                return;
            }

            const target = event.target as typeof event.target & {
                nome: { value: string };
                email: { value: string };
                senha: { value: string };
                permissao: { value: string };
            };

            const objSalvar: any = {
                nome: target.nome.value,
                email: target.email.value,
                permissao: target.permissao.value,
            };

            if (!editar || target.senha.value.trim() !== "") {
                objSalvar.senha = target.senha.value;
            }

            setLoading(true);
            const tempoMinimoLoading = 2000; 
            const inicio = Date.now();


            const requisicao = editar
                ? axios.put(`http://localhost:3001/usuarios/${id}`, objSalvar)
                : axios.post("http://localhost:3001/usuarios", objSalvar);

            requisicao
                .then(() => {
                    setTimeout(() => {
                        setNotificacao({
                            mensagem: editar ? "Usuário editado com sucesso!" : "Usuário cadastrado com sucesso!",
                            tipo: "sucesso",
                        });
                    }, 1200)

                    setTimeout(() => {
                        navigate("/usuarios");
                    }, 3000);
                })
                .catch((erro) => {
                    console.error(erro);
                    setNotificacao({ mensagem: "Erro ao salvar usuário", tipo: "erro" });
                })
                .finally(() => {
                    const tempoDecorrido = Date.now() - inicio
                    const tempoRestante = Math.max(0, tempoMinimoLoading - tempoDecorrido)

                    setTimeout(() => setLoading(false), tempoRestante)
                });
                
        },
        [editar, id, navigate]
    );

    return (
        <>
            <h1>{editar ? "Editar Usuário" : "Cadastrar Usuário"}</h1>

            {loading && <Loading text="Processando..." />}
            {notificacao && <Notificacao mensagem={notificacao.mensagem} tipo={notificacao.tipo} onClose={() => setNotificacao(null)} />}

            <form noValidate className="row g-3" ref={refForm} onSubmit={enviarFormulario}>
                <div className="col-sm-4">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" placeholder="Digite seu nome" required id="nome" />
                    <div className="invalid-feedback">Por favor digite o seu nome.</div>
                </div>

                <div className="col-sm-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Digite o seu email" required id="email" />
                    <div className="invalid-feedback">Por favor digite o seu email.</div>
                </div>

                <div className="col-sm-4">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder={editar ? "Digite uma nova senha (opcional)" : "Digite sua senha"}
                        id="senha"
                        required={!editar}
                    />
                    <div className="invalid-feedback">Por favor digite a sua senha.</div>
                </div>

                <div className="col-sm-4">
                    <label htmlFor="permissao" className="form-label">Permissão</label>
                    <select id="permissao" className="form-select" required defaultValue="">
                        <option value="" disabled>Selecione a permissão</option>
                        <option value="Admin">Admin</option>
                        <option value="Colaborador">Colaborador</option>
                    </select>
                    <div className="invalid-feedback">Selecione a permissão do usuário.</div>
                </div>

                <div className="col-md-12 mt-3">
                    <button className="btn btn-secondary me-2" type="button" onClick={() => navigate("/usuarios")}>Voltar</button>
                    <button className="btn btn-success" type="submit">{editar ? "Editar" : "Cadastrar"}</button>
                </div>
            </form>
        </>
    );
};
