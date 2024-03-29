import { GetServerSideProps } from 'next';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Head from 'next/head';
import Image from 'next/image';
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaShoppingCart } from 'react-icons/fa'
import Prismic from '@prismicio/client';
import ebookst from "../../../public/images/ebooks.png"
import { useEffect } from 'react';
interface EbookProps {
    ebook: {
        slug: string,
        titlebook: string,
        descriptionbook: string,
        coverbook: string,
        updatedAt: string,
        linkebook:string,
    }
}

export default function Ebook({ ebook }: EbookProps) {
    useEffect(() => {

        if (typeof window !== 'undefined') {
          // O código abaixo será executado apenas no navegador
          import('scrollreveal').then((ScrollRevealModule) => {
            const ScrollReveal = ScrollRevealModule.default || ScrollRevealModule;
    
            const sr = ScrollReveal({
              duration: 1000,
              reset: false,
              // Outras opções de configuração aqui
            });
    
            sr.reveal('.animated-item', {
              origin: 'bottom',
              distance: '20px',
              easing: 'ease-in-out',
            });
          });
        }
      }, []);

    return (
        <>
            <Head>
                <title>{ebook.titlebook}</title>
            </Head>
            <div>
            <Image
               className={`${styles.ebooks} animated-item`}
                src={ebookst}
                alt="foto home mobile"
                width={490}
                height={272}
                loading="lazy"
                placeholder="blur"
              />
            </div>
            <div className={styles.allpage}>
                <main className={styles.container}>
                    <article  className={`${styles.post} animated-item`}>  
                        <Image
                            quality={100}
                            src={ebook.coverbook}
                            width={720}
                            height={410}
                            alt={ebook.titlebook}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPceQ4AAkYBiUQ8i/IAAAAASUVORK5CYII=" />
                       
                        <h1 className='animated-item'>{ebook.titlebook} </h1> 
                        <time className='animated-item'>{ebook.updatedAt}</time>
                        <a className={`${styles.readyButton} animated-item`} type="button" href={ebook.linkebook} target="_blank">  Garanta já o seu! &nbsp;
                    <FaShoppingCart size={25} /></a>
                      
                        <div className={`${styles.postContent} animated-item`} dangerouslySetInnerHTML={{ __html: ebook.descriptionbook }}></div>
                       
                    </article>
                  


                </main>

            </div>

            <div className={styles.voltar}>

                <a href="/ebooks">
                    <FaArrowLeft size={40} />

                </a>

            </div>



        </>


    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

    const { slug } = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('ebook', String(slug), {});

    if (!response) {
        return {
            redirect: {
                destination: '/ebooks',
                permanent: false
            }
        }
    }

    const ebook = {
        slug: slug,
        titlebook: RichText.asText(response.data.titlebook),
        descriptionbook: RichText.asHtml(response.data.descriptionbook),
        coverbook: response.data.coverbook.url,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',

           
        }),
        linkebook: response.data.linkebook.url,
        
    }



    return {
        props: {
            ebook
        }
    }
}