import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: { 
    color: 'white', 
    fontWeight: '800', 
    fontSize: 28, 
  },
  iconContainer: { 
    padding: 0 
  },
  icon: { 
    color: 'white', 
    fontWeight: '800', 
    fontSize: 28, 
  },
  err: {
    color: '#ff8080',
    paddingHorizontal: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  fullscreen: {
    width: width,
    height: height,
    backgroundColor: '#2b2b2b',
    padding: 20,
    margin: 0,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    color: 'white',
    marginTop: 12,
  },
  value: {
    color: '#bbb',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#444',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 4,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    margin: 4,
  },
  activeChip: {
    backgroundColor: '#E50914',
  },
  chipText: {
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clear: {
    backgroundColor: '#8b0000',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  apply: {
    backgroundColor: '#E50914',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  year: {
    flexDirection: 'row',
  },
  position: { 
    flex: 1, 
    marginRight: 6 
  },
  textWhite: {
    color: 'white',
  }
});
