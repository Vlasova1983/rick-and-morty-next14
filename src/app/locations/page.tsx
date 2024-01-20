'use client';
import {  useCallback, useEffect,useState } from 'react';
import { useSearchParams,useRouter,usePathname } from 'next/navigation';
import Head from "next/head";
import { IHeroData} from '@/services/interfaces/interface';
import Layout from '@/components/layout/layout';
import Pages from '@/components/pages/pages';

const  LocationsPage=() =>{ 
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name_location = searchParams.get('name_location');
  const page_location = searchParams.get('page_location');
  const type = searchParams.get('type');
  const dimension = searchParams.get('dimension');
  

  const [results,setResults]=useState<IHeroData>();
  const [page,setPage]=useState<number>(Number(page_location));  
  const [name,setName]=useState<string>(String(name_location));  
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());      
      params.set(name, value) ;
      return params.toString();
    },
    [searchParams]
  );

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
      router.push(pathname + '?' + createQueryString('page_location', String(page)));      
  },[page]); 
  
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));
    router.push(pathname + '?' + createQueryString('location_name', String(name)));
    setPage(1);     
  },[name]); 

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_DOMAIN+`/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`) 
      .then((response)=> {return response.json();})
      .then((data:IHeroData)=>setResults(data));      
  },[type,dimension]);


  const setPageCharecters=()=>{
    results!==undefined&&page<results.info.pages?setPage(page+1):setPage(1);    
  };    
  return (
    <Layout>
      <Head>
        <title>Location</title>
      </Head>    
      {results&&<Pages 
        value={name} 
        setValue={setName}         
        results={results} 
        setPage={setPageCharecters} 
      />  }   
    </Layout>
  );  
};

export default LocationsPage;