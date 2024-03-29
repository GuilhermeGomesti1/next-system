import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { IconSobremim } from "../components/icons/iconsHome/iconSobremim";
import { IconEbook } from "../components/icons/iconsHome/iconEbook";
import { IconDicas } from "../components/icons/iconsHome/iconDicas";
import {
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaShoppingCart,
} from "react-icons/fa";
import styles from "../styles/home.module.scss";
import { ActiveLink } from "../components/ActiveLink";
import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import imgMobile from "../../public/images/imgmobile.png";
import homegislene from "../../public/images/homegislene.png";
import sobremim from "../../public/images/sobremim.png";
import sobremimWeb from "../../public/images/sobremimWeb.png";

import Link from "next/link";
import { useEffect } from "react";
type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  imagetop: string;
  title2gi1: string;
  bloco2title: string;
  bloco2content: string;
  bloco2banner: string;
  bloco3banner: string;
  bloco3: string;
  bloco3content: string;
  bloco4banner: string;
  bloco4: string;
  bloco4content: string;
  footer: string;
};

interface ContentProps {
  content: Content;
}
export default function Home({ content }: ContentProps) {

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
  //console.log(content)
  return (
    <>
      <Head>
        <title>Gislene Oliveira | Home </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.home}>
          <Image
            className={styles.homegislene}
            src={homegislene}
            alt="foto home"
            width={1833}
            height={911}
            loading="lazy"
            placeholder="blur"
          />

          <div>
            <Image
              className={styles.imgMobile}
              src={imgMobile}
              alt="foto home mobile"
              width={390}
              height={658}
              loading="lazy"
              placeholder="blur"
            />
          </div>


          <div className={styles.buttonGroup}>
              <Link href={"/sobre"} className={styles.buttonContainer}>
                <button className={styles.buttons}>
                  <span className={styles.iconButton}>
                   <IconSobremim/>
                  </span>
                  <span className={styles.titleButton}>SOBRE MIM</span>
                  <span className={styles.subtitleButton}>
                  Falar sobre comida é um presente, pois acredito que a alimentação saudável vai além de nutrientes, é uma questão de saúde.
                  </span>
                </button>
              </Link>

             

              <Link href={"/posts"} className={styles.buttonContainer}>
                <button className={styles.buttons}>
                  <span className={styles.iconButton}>
                    <IconDicas/>
                  </span>
                  <span className={styles.titleButton}> DICAS E RECEITAS</span>
                  <span className={styles.subtitleButton}>
                  Nossas dicas ajudarão você a fazer escolhas alimentares saudáveis e a desenvolver hábitos alimentares equilibrados. 
                  </span>
                </button>
              </Link>

              <Link href={"/ebooks"} className={styles.buttonContainer}>
                <button className={styles.buttons}>
                  <span className={styles.iconButton}>
                   <IconEbook/>
                  </span>
                  <span className={styles.titleButton}>EBOOKS</span>
                  <span className={styles.subtitleButton}>
                  Os meus eBooks de receitas saudáveis são uma coleção de guias culinários que ajudam as pessoas a adotar um estilo de vida mais saudável sem comprometer o sabor da comida.
                  </span>
                </button>
              </Link>
            </div>

        </div>

        <div  className={`${styles.divsobremimTitle} animated-item`}>  
            <Image
             className={`${styles.sobremimTitle} animated-item`}
              src={sobremim}
              alt="Sobre mim titulo"
              width={390}
              height={658}
              loading="lazy"
              placeholder="blur"
            />
          </div>

          <div  className={`${styles.divsobremimWeb} animated-item`}> 
            <Image
              className={`${styles.sobremimWeb} animated-item`}
              src={sobremimWeb}
              alt="Sobre mim titulo"
              width={650}
            height={183}
              loading="lazy"
              placeholder="blur"
            />
          </div>

        <div  className={`${styles.area1} animated-item`}>   
       
          <div className={`${styles.containerHeader} animated-item`}> 

         
        
            <img src={content.imagetop} alt="Conteúdos" />

            <section  className={`${styles.ctaText} animated-item`}> 
              <h1 className={`${styles.center} animated-item`}>  {content.title}</h1>   
              <br />
              <span> {content.titleContent} </span>

              <h2>{content.title2gi1}</h2>
              <ActiveLink legacyBehavior href="/sobre" activeClassName="sobre">
                <a href="/sobre">
                  <br />
                  <button> Saiba mais</button>
                </a>
              </ActiveLink>
            </section>
          </div>
        </div>

        <div className={`${styles.area2} animated-item`}>    
          <div className={`${styles.sectionContent} animated-item`}>   
            <section>
              <h2 className={`${styles.titledicas} animated-item`}>  {content.bloco2title}</h2>  
              <span>{content.bloco2content}</span> <br></br>
              <ActiveLink legacyBehavior href="/posts" activeClassName="posts">
                <a href="/posts">
                  <button>Confira aqui!</button>
                </a>
              </ActiveLink>
            </section>

            <ActiveLink legacyBehavior href="/posts" activeClassName="">
              <a href="/posts">
                <img src={content.bloco2banner} alt="Conteudo " />
              </a>
            </ActiveLink>
          </div>

          <div  className={`${styles.ebooks} animated-item`}>   
            <div className={`${styles.ebookscontent} animated-item`}>   
              <img src={content.bloco3banner} alt="Conteudo " />  

              <section>
                <h2 className={`${styles.titlebooks} animated-item`}> {content.bloco3}</h2>   
                <span>{content.bloco3content}</span>

                <ActiveLink
                  legacyBehavior
                  href="/ebooks"
                  activeClassName="ebooks"
                >
                  <a href="/ebooks">
                    <button className={`${styles.buttonbook} animated-item`}>   
                      Garanta já o seu!
                    </button>
                  </a>
                </ActiveLink>
              </section>
            </div>
          </div>
        </div>

        <div className={`${styles.area4} animated-item`}> 
          <div className={`${styles.nextLevelContent} animated-item`}>  
            <h2>
              "Honre sua <span className="styles.alunos"> saúde </span> com uma
              nutrição gentil."{" "}
            </h2>

            <div className={`${styles.imagelinks} animated-item`}>  
              <a
                href="https://www.youtube.com/@nutravia_terra8284"
                target="_blank"
              >
                <FaYoutube size={40} />
              </a>

              <a
                href="https://www.instagram.com/gislenejm/?igshid=YmMyMTA2M2Y="
                target="_blank"
              >
                <FaInstagram size={40} />
              </a>

              <a
                href="https://www.facebook.com/gislene.oliveira.7712"
                target="_blank"
              >
                <FaFacebook size={40} />
              </a>

              <a
                href="https://api.whatsapp.com/send/?phone=5531984091588&text=Contato&type=phone_number&app_absent=0"
                target="_blank"
              >
                <FaWhatsapp size={40} />
              </a>

              <a href="https://twitter.com/gislenejm?s=11" target="_blank">
                <FaTwitter size={40} />
              </a>

              <a
                href="https://hotmart.com/pt-br/marketplace/produtos/receitas-de-cafe-da-manha-praticas-e-saudaveis/H76773796C"
                target="_blank"
              >
                <FaShoppingCart size={40} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);
  //console.log(response.results[0].data);

  const {
    title,
    sub_title,
    link_action,
    imagetop,
    title2gi1,
    bloco2,
    bloco2content,
    bloco_2_baner,
    bloco3banner,
    bloco_3,
    bloco3content,
    footer,
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    imagetop: imagetop.url,
    title2gi1: RichText.asText(title2gi1),
    linkAction: link_action.url,
    bloco2title: RichText.asText(bloco2),
    bloco2content: RichText.asText(bloco2content),
    bloco2banner: bloco_2_baner.url,
    bloco3banner: bloco3banner.url,
    bloco3: RichText.asText(bloco_3),
    bloco3content: RichText.asText(bloco3content),

    footer: footer.url,
  };
  return {
    props: {
      content,
    },
    revalidate: 60 * 2, // a cada 2 minutos
  };
};
