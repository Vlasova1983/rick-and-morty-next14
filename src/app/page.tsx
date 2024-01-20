import Layout from "@/components/layout/layout";
import Image from 'next/image';
import styles from "./home.module.css";
const Home=()=>{
  return (
    <Layout>
       <Image 
        className={styles.img}              
        src="/logo.svg"
        alt="logo"           
        width={350}
        height={212}
        priority                       
      />   
    </Layout>   
  );
};


export default Home;