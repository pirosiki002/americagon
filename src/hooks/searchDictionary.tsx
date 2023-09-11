const searchDictionary = async (query: string): Promise<string[]> => {
  const response = await fetch('/kantan-ej-dictionary.json');
  const data = await response.json();

  if (data[query]) {
    return data[query].ja;
  }
  return [];
};

export default searchDictionary;
