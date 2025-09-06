import { useNavigate, useParams } from "react-router-dom"


export const Login = () => {
    const { parametro } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <h1>Página de Login{parametro}</h1>
            <br />
            <button className = "btn btn-danger"
        onClick={
            () => {
                navigate('/')
            }
        }>Voltar</button>
        </>
    )
}