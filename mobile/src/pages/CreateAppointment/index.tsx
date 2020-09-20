import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const { goBack } = useNavigation()

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState(routeParams.providerId)

  useEffect(() => {
    api.get('providers').then(response => {
      const providersExcludeSelected = new Array(response.data.filter((providerFind: Provider) => providerFind.id !== selectedProviderId))

      const selectedProvider = response.data.filter((providerFind: Provider) => providerFind.id === selectedProviderId)

      const selectedProviderFirst = [selectedProvider[0], ...providersExcludeSelected[0]]

      setProviders(selectedProviderFirst)
    })
  }, [setProviders, selectedProviderId])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProviderId(providerId)
  }, [setSelectedProviderId])


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

    </Container >
  );
}

export default CreateAppointment;
