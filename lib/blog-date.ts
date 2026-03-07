import { format, parseISO } from "date-fns"

export function parseBlogDate(value: string) {
  return parseISO(value)
}

export function formatBlogDate(value: string, pattern: string) {
  return format(parseBlogDate(value), pattern)
}

export function compareBlogDatesDesc(first: string, second: string) {
  return parseBlogDate(second).getTime() - parseBlogDate(first).getTime()
}

export function toBlogUtcString(value: string) {
  return parseBlogDate(value).toUTCString()
}
