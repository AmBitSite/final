import state from './Redux/state'

test('счетчик равен одному', () => {
  expect(state._user.counter).toBe(1);
});
test('песня не проигрывается', () => {
  expect(state.getStatus()).toBeFalsy();
});
test('адрес песни строка', () => {
  expect(state.getSrc()).toBe('');
});
test('список песен определен', () => {
  expect(state.wrapSong).toBeDefined();
});
test('список песен определен', () => {
  expect(state.song).toContainEqual({"genre": "Electro", "name": "Prodigy", "src": "http://d.zaix.ru/cJgk.mp3", "title": "Smack My Bitch Up"});
});