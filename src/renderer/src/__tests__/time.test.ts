import { describe, it, expect } from 'vitest'
import { formatTime, formatTimePrecise, parseTimeInput } from '../utils/time'

describe('formatTime', () => {
  it('formats zero', () => {
    expect(formatTime(0)).toBe('0:00')
  })

  it('formats seconds only', () => {
    expect(formatTime(45)).toBe('0:45')
  })

  it('formats minutes and seconds', () => {
    expect(formatTime(90)).toBe('1:30')
  })

  it('formats hours', () => {
    expect(formatTime(3661)).toBe('1:01:01')
  })

  it('pads single-digit seconds', () => {
    expect(formatTime(65)).toBe('1:05')
  })

  it('handles negative values gracefully', () => {
    expect(formatTime(-1)).toBe('0:00')
  })

  it('handles NaN gracefully', () => {
    expect(formatTime(NaN)).toBe('0:00')
  })
})

describe('formatTimePrecise', () => {
  it('formats with one decimal', () => {
    expect(formatTimePrecise(5.5)).toBe('0:05.5')
  })

  it('formats minutes correctly', () => {
    expect(formatTimePrecise(65.2)).toBe('1:05.2')
  })

  it('pads seconds below 10', () => {
    expect(formatTimePrecise(9.0)).toBe('0:09.0')
  })
})

describe('parseTimeInput', () => {
  it('parses plain seconds', () => {
    expect(parseTimeInput('83.5')).toBe(83.5)
  })

  it('parses M:SS format', () => {
    expect(parseTimeInput('1:23')).toBe(83)
  })

  it('parses M:SS.s format', () => {
    expect(parseTimeInput('1:23.5')).toBeCloseTo(83.5)
  })

  it('parses H:MM:SS format', () => {
    expect(parseTimeInput('1:01:01')).toBe(3661)
  })

  it('returns null for invalid input', () => {
    expect(parseTimeInput('abc')).toBeNull()
  })

  it('handles whitespace', () => {
    expect(parseTimeInput('  45  ')).toBe(45)
  })

  it('returns null for empty string', () => {
    expect(parseTimeInput('')).toBeNull()
  })
})
