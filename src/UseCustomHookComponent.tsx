import { useEffect, useMemo, useState } from "react";

interface Beverage {
  name: string,
  producerName: string,
  beverageName: string,
  beverageColor: string,
  beverageStyle: string,
  producerLocation: string,
  abv: number,
  ibu: number,
  logo: string,
  level: number
}


function useFetchData<Payload>(url: string): {
  data: Payload | null;
  done: boolean
} {
  const [data, setData] = useState<Payload | null>(null);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((d: Payload) => {
        setData(d);
        setDone(true)
      })
  }, [url])

  return {
    data,
    done
  }
}

const UseCustomHookComponent = () => {
  const {data} = useFetchData<Beverage[]>("/hv-taplist.json");
  const portlandTaps = useMemo(() => (
     (data || []).filter((bev) => bev.producerLocation.includes("Portland"))
  ), [data])
  return (
    <div>
        {
          portlandTaps.length && (<img src={portlandTaps![0].logo} alt="Beverage logo" />)
        }
    </div>
  );
}

export default UseCustomHookComponent;