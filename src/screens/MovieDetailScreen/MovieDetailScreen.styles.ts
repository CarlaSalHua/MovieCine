import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171010',
  },
  back: {
    padding: 16,
  },
  backText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  backdrop: {
    width: '100%',
    height: 240,
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 26,
  },
  meta: {
    color: '#cfcfcf',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  save: {
    backgroundColor: '#2b2b2b',
  },
  saveActive: {
    backgroundColor: '#E50914',
  },
  trailer: {
    backgroundColor: '#E50914',
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
  },
  overview: {
    color: '#e6e6e6',
    marginTop: 16,
    lineHeight: 20,
  },
  castSection: {
    marginTop: 16,
  },
  section: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
    padding: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    marginBottom: 6,
  },
  cast: {
    width: 100,
    marginBottom: 12,
  },
  castName: {
    width: '100%',
    color: 'white',
    paddingRight: 8,
  },
  castChar: {
    color: '#bbb',
    fontSize: 12,
  },
  listPadding: {
    paddingHorizontal: 12,
  },
});
