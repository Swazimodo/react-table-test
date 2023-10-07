import { act, render, renderHook } from '@testing-library/react'
import { useNumberField, useTextField } from 'common/fieldHooks'

describe('useNumberField', () => {
  test('useNumberField_initializeWithValue_valueShouldBeSaved', () => {
    const initalValue = 101
    const { result } = renderHook(() => useNumberField(initalValue))

    expect(result.current.value).toEqual(initalValue)
  })

  test('useNumberField_initializeWithoutValue_valueShouldBeZero', () => {
    const { result } = renderHook(() => useNumberField())

    expect(result.current.value).toEqual(0)
  })

  test('setValue_provideValue_valueShouldBeSaved', () => {
    const { result } = renderHook(() => useNumberField())

    const newValue = 333
    act(() => {
      result.current.setValue(newValue)
    })

    expect(result.current.value).toEqual(newValue)
  })

  test('handleChange_provideIntStrEventValue_valueShouldBeSaved', () => {
    const { result } = renderHook(() => useNumberField())

    const newValue = 333
    const event = { target: { value: newValue.toString() } }
    act(() => {
      // @ts-expect-error: is not a proper event object
      result.current.handleChange(event)
    })

    expect(result.current.value).toEqual(newValue)
  })

  test('handleChange_provideFloatStrEventValue_valueShouldBeSaved', () => {
    const { result } = renderHook(() => useNumberField())

    const newValue = 333.44
    const event = { target: { value: newValue.toString() } }
    act(() => {
      // @ts-expect-error: is not a proper event object
      result.current.handleChange(event)
    })

    expect(result.current.value).toEqual(newValue)
  })

  test('handleChange_withAlphaCharacters_initialValueShouldBePreserved', () => {
    const initalValue = 101
    const { result } = renderHook(() => useNumberField(initalValue))

    const newValue = 333
    const event = { target: { value: `foo${newValue}bar` } }
    act(() => {
      // @ts-expect-error: is not a proper event object
      result.current.handleChange(event)
    })

    expect(result.current.value).toEqual(initalValue)
  })
})

describe('useTextField', () => {
  test('useTextField_initializeWithValue_valueShouldBeSaved', () => {
    const initalValue = "hello world"
    const { result } = renderHook(() => useTextField(initalValue))

    expect(result.current.value).toEqual(initalValue)
  })

  test('useTextField_initializeWithoutValue_valueShouldBeEmptyString', () => {
    const { result } = renderHook(() => useTextField())

    expect(result.current.value).toEqual("")
  })

  test('setValue_provideValue_valueShouldBeSaved', () => {
    const { result } = renderHook(() => useTextField())

    const newValue = "hello world"
    act(() => {
      result.current.setValue(newValue)
    })

    expect(result.current.value).toEqual(newValue)
  })

  test('handleChange_provideEventValue_valueShouldBeSaved', () => {
    const { result } = renderHook(() => useTextField())

    const newValue = "hello world"
    const event = { target: { value: newValue } }
    act(() => {
      // @ts-expect-error: is not a proper event object
      result.current.handleChange(event)
    })

    expect(result.current.value).toEqual(newValue)
  })
})

