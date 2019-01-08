// import { Dimensions } from 'react-native';

const BUTTON = {
  backgroundColor: '#ddd',
  padding: 15,
  borderRadius: 3,
  marginTop: 10,
  width: 300,
  flexDirection: 'row',
  justifyContent: 'center',
};

export default {
  btn: BUTTON,
  btnSecondary: {
    ...BUTTON,
    backgroundColor: '#ccc',
  },
  btnText: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  home: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '50%',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  slotWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    margin: 10,
  },
  slot: {
    // width: Dimensions.get('window').width / 2.2,
    // height: Dimensions.get('window').height / 10,
    width: 60,
    height: 60,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
};
