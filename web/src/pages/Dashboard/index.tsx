import React, { useState, useCallback } from 'react';
import { Container, Header, HeaderContent, Appointment, Section, Profile, NextAppointment, Content, Schedule, Calendar } from './styles';

import logo from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css'

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDataChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setSelectedDate(day)
      }
    }, [])

  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber"></img>
          <Profile>
            <img src={user.avatar_url} alt={user.name}></img>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower></FiPower>
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />

              <strong>Alexandre Macedo</strong>
              <span>
                <FiClock></FiClock>
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock></FiClock>
                08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>Alexandre Macedo</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock></FiClock>
                08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>Alexandre Macedo</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock></FiClock>
                08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>Alexandre Macedo</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            selectedDays={selectedDate}
            onDayClick={handleDataChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',

            ]}
          ></DayPicker>
        </Calendar>
      </Content>


    </Container>
  );
};

export default Dashboard;
