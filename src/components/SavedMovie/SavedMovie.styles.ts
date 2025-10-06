import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#231F20',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 12,
  },
  poster: { 
    width: 70, 
    height: 100, 
    borderRadius: 8, 
    backgroundColor: '#333' 
  },
  placeholder: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  info: { 
    flex: 1, 
    marginLeft: 12 
  },
  title: { 
    color: 'white', 
    fontWeight: '700', 
    fontSize: 16 
  },
  overview: { 
    color: '#c9c9c9', 
    marginTop: 4 
  },
  rating: { 
    color: '#f5d142', 
    marginTop: 6 
  },
});
