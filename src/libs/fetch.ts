export async function getData<T>(url: string) {
  try {
    const res = await fetch(url);

    if (res.status != 200) {
      throw new Error("Failed to fetch data");
    }
    const data = (await res.json()) as T;
    return data;
  } catch (error) {
    console.error(error);
  }
}
