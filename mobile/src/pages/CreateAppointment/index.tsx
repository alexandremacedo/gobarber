import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import DateTimePicker from '@react-native-community/datetimepicker'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
} from './styles';
import { format } from 'date-fns';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const providersList = useRef<FlatList>(null)

  const { user } = useAuth()
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const { goBack } = useNavigation()

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState(routeParams.providerId)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      const providersExcludeSelected = new Array(response.data.filter((providerFind: Provider) => providerFind.id !== selectedProviderId))

      const selectedProvider = response.data.filter((providerFind: Provider) => providerFind.id === selectedProviderId)

      const selectedProviderFirst = [selectedProvider[0], ...providersExcludeSelected[0]]

      if (providersList.current) {
        providersList.current.scrollToOffset({ animated: true, offset: 0 });
      }
      setProviders(selectedProviderFirst)
    })
  }, [setProviders, selectedProviderId])

  useEffect(() => {
    api.get(`providers/${selectedProviderId}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then((response) => {
      setAvailability(response.data)

      console.log(response.data)
    })
  }, [selectedDate, selectedProviderId])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProviderId(providerId)
  }, [setSelectedProviderId])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [setShowDatePicker])

  const handleDateChange = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date)
      }
    }, [setShowDatePicker, setSelectedDate])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [setSelectedHour])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourForamatted: format(new Date().setHours(hour), 'HH:00'),
          available
        }
      })

  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourForamatted: format(new Date().setHours(hour), 'HH:00'),
          available
        }
      })

  }, [availability])



  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"></Icon>
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          ref={providersList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 34 }}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProviderId}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName
                selected={provider.id === selectedProviderId}
              >{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>Selecionar data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            value={selectedDate} />
        )}
      </Calendar>

      <Content>
        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourForamatted, hour, available }) => (
                <Hour
                  enabled={available}
                  key={hour}
                  selected={selectedHour === hour}
                  available={available}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText
                    key={hourForamatted}
                    selected={selectedHour === hour}>
                    {hourForamatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(({ hourForamatted, hour, available }) => (
                <Hour
                  enabled={available}
                  key={hour}
                  selected={selectedHour === hour}
                  available={available}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText
                    key={hourForamatted}
                    selected={selectedHour === hour}>
                    {hourForamatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
      </Content>

    </Container >
  );
}

export default CreateAppointment;
