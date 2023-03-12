import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SuccessPage({ setForm, seatName, setSeatName }) {
  const location = useLocation();
  const { form, seats } = location.state;

  function clear() {
    setForm({ ids: [], name: "", cpf: "" });
    setSeatName([]);
  }

  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>

      <TextContainer>
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{seats && seats.movie.title}</p>
        <p>
          {seats && seats.day.date} - {seats && seats.name}
        </p>
      </TextContainer>

      <TextContainer>
        <strong>
          <p>Ingressos</p>
        </strong>
        {seatName.map((name) => (
          <p key={name}>Assento {name}</p>
        ))}
      </TextContainer>

      <TextContainer>
        <strong>
          <p>Comprador</p>
        </strong>
        <p>Nome: {form.name}</p>
        <p>CPF: {form.cpf}</p>
      </TextContainer>
      <Link to="/" onClick={() => clear()} data-test="go-home-btn">
        <button>Voltar para Home</button>
      </Link>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
  }
  h1 {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
