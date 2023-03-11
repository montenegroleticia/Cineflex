import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage({ form, setForm }) {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState(null);
  const navigate = useNavigate();
  const [select, setSelect] = useState(null);

  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const promise = axios.get(url);
    promise.then((res) => {
      setSeats(res.data);
      console.log(res.data);
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  function callSelect() {
    setSelect("#1AAE9E");
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  }

  function callLogin(event) {
    event.presentDefault();

    const url =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
    const promise = axios.post(url, form);
    promise.then((res) => { 
    navigate("/sucesso")
    console.log(form)
    console.log(res.data)})
    promise.catch((err) => console.log(err.response.data));
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats &&
          seats.seats.map((seat) => (
            <SeatItem
              key={seat.id}
              seat={seat.isAvailable}
              select={select}
              onClick={() => callSelect(seat.id)}
            >
              {seat.name}
            </SeatItem>
          ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle green={"#1AAE9E"} backGreen={"#0E7D71"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle yellow={"#FBE192"} backYellow={"#F7C52B"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={callLogin}>
        Nome do Comprador:
        <input
          type="text"
          placeholder="Digite seu nome..."
          required
          name={"name"}
          value={form.name}
          onChange={handleChange}
        />
        CPF do Comprador:
        <input
          type="number"
          placeholder="Digite seu CPF..."
          required
          name={"cpf"}
          value={form.cpf}
          onChange={handleChange}
        />
        <button type="submit">Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
          <img
            src={seats && seats.movie.posterURL}
            alt={seats && seats.movie.title}
          />
        </div>
        <div>
          <p>{seats && seats.movie.title}</p>
          <p>
            {seats && seats.day.weekday} - {seats && seats.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid
    ${(props) =>
      props.backGreen
        ? props.backGreen
        : props.backYellow
        ? props.backYellow
        : "#7B8B99"};
  background-color: ${(props) =>
    props.green ? props.green : props.yellow ? props.yellow : "#C3CFD9"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid ${(props) => (props.seat === false ? "#F7C52B" : "#808F9D")};
  background-color: ${(props) =>
    props.select ? props.select : props.seat === false ? "#FBE192" : "#C3CFD9"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
