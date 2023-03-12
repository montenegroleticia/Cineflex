import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ ids: [], name: "", cpf: "" });
  const [seatName, setSeatName] = useState([]);

  return (
    <BrowserRouter>
      <NavContainer>CINEFLEX</NavContainer>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <SeatsPage
              setForm={setForm}
              form={form}
              setSeatName={setSeatName}
              seatName={seatName}
            />
          }
        />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              setForm={setForm}
              setSeatName={setSeatName}
              seatName={seatName}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
