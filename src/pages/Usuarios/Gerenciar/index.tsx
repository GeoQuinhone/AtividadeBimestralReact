import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export const GerenciarUsuarios = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [editar, setEditar] = useState(false);

    const refForm = useRef<any>(null) // useRef semelhante useState porem nao força renderização

    useEffect(() => {

        // buscar usuario pelo parametro passando na url sempre vai ser uma string
        const idUsuario = Number(id);
        console.log(id)
        console.log(idUsuario)

        if (!isNaN(idUsuario)) {

            setEditar(true);
            axios.get(`http://localhost:3001/usuarios?id=${idUsuario}`) // 

                .then((res) => {
                    refForm.current['nome'].value = res.data[0].nome
                    refForm.current['email'].value = res.data[0].email
                })
        }
    }, [id])

    const enviarFormulario = useCallback((event: SyntheticEvent) => { // serve para que a função nao seja recarregada quando o estado for alterado
        event.preventDefault(); // serve para não deixar que o formulario renderize a nossa pagina

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nome: { value: string },
                email: { value: string }
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value
            }

            if (editar) {
                axios.put(`http://localhost:3001/usuarios/${id}`, objSalvar)

                .then(() => {
                    alert('Editado com sucesso mané')
                    navigate('/usuarios')
                })
                .catch((erro) => {
                    console.log(erro)
                })

            } else {
                axios.post('http://localhost:3001/usuarios', objSalvar)
                    .then(() => {
                        alert('Salvo com sucesso!')
                        navigate('/usuarios')
                    }).catch((erro) => {
                        console.log(erro)
                    })
            }
        } else {
            refForm.current.classList.add('was-validated') // mostrar as mensagens de erro do nosso bootstrap no refform
        }

    }, [editar, id])

    return (
        <>
            <h1>Usuarios</h1>
            <form
                noValidate
                className="row g-3"
                ref={refForm}
                onSubmit={enviarFormulario}>

                <div className="col-md-12">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Digite seu nome"
                        required
                        id="nome"
                    />
                    <div className="invalid-feedback">
                        Por favor digite o seu nome.
                    </div>
                </div>

                <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                        className="form-control"
                        placeholder="Digite o seu email"
                        required
                        id="email"
                    />
                    <div className="invalid-feedback">
                        Por favor digite o seu email.
                    </div>
                </div>
                <div className="col-md-12">
                    <button
                        className="btn"
                        type="button"
                        onClick={() => {
                            navigate('/usuarios')
                        }}
                    >
                        Voltar
                    </button>
                    <button
                        className="btn btn-success"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>

            </form>
        </>
    )
}