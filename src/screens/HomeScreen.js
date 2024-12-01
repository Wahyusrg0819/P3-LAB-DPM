import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl, 
  ScrollView,
  Image
} from 'react-native';
import { fetchWeatherByCity } from '../services/weatherService';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      weatherData: null,
      cityInput: 'Jakarta'
    };
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchWeatherByCity(this.state.cityInput);
      this.setState({ 
        weatherData: data, 
        isLoading: false,
        error: null
      });
    } catch (error) {
      this.setState({ 
        error: 'Tidak dapat mengambil data cuaca', 
        isLoading: false 
      });
    }
  }

  handleSearch = () => {
    this.fetchWeather();
  }

  renderWeatherContent() {
    const { weatherData } = this.state;
    
    return (
      <View style={styles.weatherContainer}>
        <Text style={styles.cityName}>{weatherData.cityName}</Text>
        
        <Image 
          source={{ uri: weatherData.icon }}
          style={styles.weatherIcon}
        />
        
        <Text style={styles.temperature}>
          {weatherData.temperature}°C
        </Text>
        
        <Text style={styles.description}>
          {weatherData.description}
        </Text>
        
        <View style={styles.detailContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Kelembaban</Text>
            <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Kecepatan Angin</Text>
            <Text style={styles.detailValue}>{weatherData.windSpeed} m/s</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { isLoading, error, weatherData, cityInput } = this.state;

    return (
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={this.fetchWeather}
          />
        }
      >

        {isLoading ? (
          <ActivityIndicator 
            size="large" 
            color="#0000ff" 
            style={styles.loadingIndicator} 
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          weatherData && this.renderWeatherContent()
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#666',
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#888',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  }
});

export default HomeScreen;