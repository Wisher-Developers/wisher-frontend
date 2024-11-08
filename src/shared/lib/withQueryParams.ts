type Stringifyable = string | number

/**
 * Add query params to a URL
 *
 * @param url a URL to add query params to
 * @param params an object of key-value pairs to add as query params.
 * All `null` and `undefined` values will be ignored.
 *
 * @returns a URL with query params
 */
export const withQueryParams = (
  params: Record<string, Stringifyable | null | undefined>
) => {
  const paramsArray: [string, string][] = []

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined)
      paramsArray.push([key, String(value)])
  }

  const searchParams = new URLSearchParams(paramsArray)

  if (!searchParams.toString()) return ""

  return searchParams.toString()
}
