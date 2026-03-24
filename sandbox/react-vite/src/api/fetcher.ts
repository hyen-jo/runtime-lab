export const customFetcher = async <T>({
  url,
  method,
  params,
  data,
}: {
  url: string;
  method: string;
  params?: Record<string, string>;
  data?: unknown;
}): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const response = await fetch(`${url}${queryString}`, {
    method,
    ...(data ? { body: JSON.stringify(data) } : {}),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};
