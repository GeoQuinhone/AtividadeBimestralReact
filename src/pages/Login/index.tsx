import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/Loading";
import { Notificacao } from "../../components/Notificacao";

export const Login = () => {
    const navigate = useNavigate();
    const refEmail = useRef<HTMLInputElement>(null);
    const refForm = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [notificacao, setNotificacao] = useState<{ mensagem: string; tipo?: "sucesso" | "erro" | "aviso" | "info" } | null>(null);

    useEffect(() => {
        refEmail.current?.focus();
    }, []);

    const enviarLogin = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (!refForm.current?.checkValidity()) {
            refForm.current?.classList.add("was-validated");
            return;
        }

        const target = event.target as typeof event.target & {
            email: { value: string };
            senha: { value: string };
        };

        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:3001/login", {
                email: target.email.value,
                senha: target.senha.value
            });

            if (data.sucesso) {
                setNotificacao({ mensagem: "Login realizado com sucesso!", tipo: "sucesso" });
                setTimeout(() => navigate("/painel"), 1000); 
            } else {
                setNotificacao({ mensagem: "Email ou senha incorretos!", tipo: "erro" });
            }

        } catch (erro) {
            console.error(erro);
            setNotificacao({ mensagem: "Erro no login. Tente novamente!", tipo: "erro" });
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f2f5"
        }}>
            {loading && <Loading />}
            {notificacao && <Notificacao mensagem={notificacao.mensagem} tipo={notificacao.tipo} onClose={() => setNotificacao(null)} />}
            <form ref={refForm} noValidate className="card p-4" style={{ width: "350px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} onSubmit={enviarLogin}>
                <h2 className="text-center mb-4">Login</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Digite seu email" required ref={refEmail} />
                    <div className="invalid-feedback">Por favor digite o seu email.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" placeholder="Digite sua senha" required />
                    <div className="invalid-feedback">Por favor digite a sua senha.</div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Esqueceu a senha?</button>
                    <button type="submit" className="btn btn-success">Entrar</button>
                </div>
            </form>
        </div>
    );
};
