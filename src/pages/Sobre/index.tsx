import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Sobre = () => {
    const {id} = useParams<{id: string}>();
        const navigate = useNavigate()

return(
    <>
        <div>
        <h1>Página Sobre</h1>
        <br />
        <p>Sobre selecionado: {id}</p>
        <br />
        <button className = "btn btn-danger"
        onClick={
            () => {
                navigate('/')
            }
        }>Voltar</button>
        </div>
    </>
)
}
