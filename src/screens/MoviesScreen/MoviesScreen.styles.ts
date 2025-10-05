import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#171010' 
  },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  header: { 
    color: 'white', 
    fontWeight: '800', 
    fontSize: 28, 
    padding: 16 
  },
  iconContainer: { 
    padding: 16 
  },
  icon: { 
    color: 'white', 
    fontWeight: '800', 
    fontSize: 28, 
  },
  err: { 
    color: '#ff8080', 
    paddingHorizontal: 16 
  },
});
