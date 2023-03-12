import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatsPage({ form, setForm, setSeatName, seatName }) {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState(null);
  const navigate = useNavigate();
  const [selectSeat, setSelectSeat] = useState([]);

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
  }, [idSessao]);

  function callSelect(id) {
    if (!form.ids.includes(id)) {
      const seatsSelect = [...selectSeat, id];
      setSelectSeat(seatsSelect);
      const updateSeat = [...form.ids, id];
      const updateForm = { ...form, ids: updateSeat };
      setForm(updateForm);
    } else {
      const updatedSelectSeat = selectSeat.filter((seatId) => seatId !== id);
      setSelectSeat(updatedSelectSeat);
      const updatedForm = {
        ...form,
        ids: form.ids.filter((seatId) => seatId !== id),
      };
      setForm(updatedForm);
    }
  }

  function callRemoveName(seat) {
    console.log(seatName);
    if (seat.isAvailable === false) {
      setSeatName([...seatName]);
    } else if (seatName.includes(seat.name)) {
      const updatedName = seatName.filter((seatName) => seatName !== seat.name);
      setSeatName(updatedName);
    } else {
      const order = [...seatName, seat.name].sort((a, b) => Number(a) - Number(b));
      setSeatName(order);
    }
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function callLogin(event) {
    event.preventDefault();

    const url =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
    const promise = axios.post(url, form);
    promise.then((res) => {
      navigate("/sucesso", { state: { form, seats } });
      console.log(form);
      console.log(res.data);
    });
    promise.catch((err) => console.log(err.response.data));
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats &&
          seats.seats.map((seat) => (
            <SeatItem
              data-test="seat"
              key={seat.id}
              color={
                seat.isAvailable === false
                  ? "#FBE192"
                  : selectSeat.includes(seat.id)
                  ? "#1AAE9E"
                  : "#C3CFD9"
              }
              borderColor={
                seat.isAvailable === false
                  ? "#F7C52B"
                  : selectSeat.includes(seat.id)
                  ? "#1AAE9E"
                  : "#808F9D"
              }
              onClick={() => {
                callSelect(
                  seat.isAvailable === true
                    ? seat.id
                    : alert("Esse assento não está disponível")
                );
                callRemoveName(seat);
              }}
            >
              {seat.name}
            </SeatItem>
          ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle color={"#1AAE9E"} borderColor={"#0E7D71"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle color={"#C3CFD9"} borderColor={"#808F9D"} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle color={"#FBE192"} borderColor={"#F7C52B"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={callLogin}>
        Nome do Comprador:
        <input
          data-test="client-name"
          type="text"
          placeholder="Digite seu nome..."
          required
          name={"name"}
          value={form.name}
          onChange={handleChange}
        />
        CPF do Comprador:
        <input
          data-test="client-cpf"
          type="number"
          placeholder="Digite seu CPF..."
          required
          name={"cpf"}
          value={form.cpf}
          onChange={handleChange}
        />
        <button data-test="book-seat-btn" type="submit">
          Reservar Assento(s)
        </button>
      </FormContainer>
      <FooterContainer data-test="footer">
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
  font-family: "Roboto", sans-serif;
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
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.color};
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
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.color};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto", sans-serif;
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
