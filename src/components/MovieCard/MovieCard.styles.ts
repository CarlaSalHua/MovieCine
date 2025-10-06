import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 12,
  },
  cardPressed: {
    opacity: 0.85,
  },
  poster: {
    width: 160,
    height: 230,
    borderRadius: 12,
    backgroundColor: '#222',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    marginTop: 8,
  },
  title: {
    color: 'white',
    fontWeight: '600',
  },
  rating: {
    color: '#ccc',
    marginTop: 2,
  },
  saveBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveBtnActive: {
    backgroundColor: '#E50914',
  },
  buttonPressed: {
    backgroundColor: '#d60712ff',
    opacity: 0.9,
  },
  saveTxt: {
    color: 'white',
    fontWeight: '700',
  },
  saveTxtActive: {
    color: 'white',
  },
});
