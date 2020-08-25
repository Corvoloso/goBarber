import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="logo" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horarios agendados</h1>

          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda Feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src={user.avatar_url} alt="avatar" />

              <strong>Igor Alves</strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>

            <Section>
              <strong>Manhã</strong>

              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img
                    src="https://vs.media/resize?compression=8&quality=65&url=http%3A%2F%2Fimg.vs.media%2F1597952021c3f9e14bc527c4ecf681e79f8ad383611781f07a.jpg&width=320"
                    alt="Igor Bezerra"
                  />
                  <strong>Igor Bezerra</strong>
                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  09:00
                </span>

                <div>
                  <img
                    src="https://vs.media/resize?compression=8&quality=65&url=http%3A%2F%2Fimg.vs.media%2F1597952021c3f9e14bc527c4ecf681e79f8ad383611781f07a.jpg&width=320"
                    alt="Igor Bezerra"
                  />
                  <strong>Igor Bezerra</strong>
                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  11:00
                </span>

                <div>
                  <img
                    src="https://vs.media/resize?compression=8&quality=65&url=http%3A%2F%2Fimg.vs.media%2F1597952021c3f9e14bc527c4ecf681e79f8ad383611781f07a.jpg&width=320"
                    alt="Igor Bezerra"
                  />
                  <strong>Igor Bezerra</strong>
                </div>
              </Appointment>
            </Section>

            <Section>
              <strong>Tarde</strong>

              <Appointment>
                <span>
                  <FiClock />
                  15:00
                </span>

                <div>
                  <img
                    src="https://vs.media/resize?compression=8&quality=65&url=http%3A%2F%2Fimg.vs.media%2F1597952021c3f9e14bc527c4ecf681e79f8ad383611781f07a.jpg&width=320"
                    alt="Igor Bezerra"
                  />
                  <strong>Igor Bezerra</strong>
                </div>
              </Appointment>
            </Section>
          </NextAppointment>
        </Schedule>

        <Calendar>
          <DayPicker />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
