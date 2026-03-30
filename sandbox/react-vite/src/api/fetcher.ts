export const customFetcher = async <T>({
  url,
  method,
  params,
  data,
  signal,
  headers,
}: {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  data?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : "";

  const response = await fetch(`${url}${queryString}`, {
    method,
    signal,
    ...(data ? { body: JSON.stringify(data) } : {}),
    headers: { "Content-Type": "application/json", ...headers },
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};
