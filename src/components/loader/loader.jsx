import Image from 'next/image';
import styles  from './loader.module.css';

const Loader = () => { 
  return (
  <div className={styles.loader}>
    <Image 
        className={styles.img}              
        src="/loading.svg"
        alt="loading"           
        width={258}
        height={273}
        priority                       
      />   
  </div>
  );
};

export default Loader;