// usePlacesData.ts
import { useEffect, useState } from "react";
import { Place } from "src/@types/index.d";
import { fetchDummyPlaces } from "src/dummyApi";

export function usePlacesData() {
  const [places, setPlaces] = useState<Place[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const fetchedPlaces = await fetchDummyPlaces();
        setPlaces(fetchedPlaces);
      } catch (e) {
        // setError(e as Error);
      } finally {
        // setIsLoading(false);
      }
    };
    loadPlaces();
  }, []);

  return { places /*, isLoading, error */ };
}
