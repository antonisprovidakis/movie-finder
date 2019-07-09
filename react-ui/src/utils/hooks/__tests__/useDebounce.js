import { renderHook, act } from 'react-hooks-testing-library';
import useDebounce from '../useDebounce';

jest.useFakeTimers();

it('should update value after specified delay has passed', () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: '', delay: 500 } }
  );

  expect(result.current).toBe('');
  act(() => jest.runAllTimers());
  expect(result.current).toBe('');

  rerender({ value: 'Hello World', delay: 500 });

  expect(result.current).toBe('');
  act(() => jest.advanceTimersByTime(498));
  expect(result.current).toBe('');
  act(() => jest.runAllTimers());
  expect(result.current).toBe('Hello World');
});

it('should return latest value', () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: '', delay: 500 } }
  );

  expect(result.current).toBe('');
  act(() => jest.advanceTimersByTime(200));
  expect(result.current).toBe('');

  rerender({ value: 'Hello World', delay: 500 });

  expect(result.current).toBe('');
  act(() => jest.advanceTimersByTime(498));
  expect(result.current).toBe('');
  act(() => jest.runAllTimers());
  expect(result.current).toBe('Hello World');
});
