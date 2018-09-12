import Vue from 'vue'
import {sum, setArti} from '@/models/mode'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 2)).toBe(4);
  });
  
test('adds 2 + 2 to equal 4', () => {
    expect(sum(2, 2)).toBe(4);
  });

//   test('the data is peanut butter', async () => {
//     expect.assertions(1);
//     const data = await setArti();
//     console.log(data)
//     expect(data).toBe('peanut butter');
//   });