import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ebookst from "../../../public/images/ebooks.png";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaShoppingCart,
} from "react-icons/fa";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

// https://png-pixel.com
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

type Ebook = {
  slug: string;
  titlebook: string;
  coverbook: string;
  descriptionbook: string;
  updatedAt: string;
  linkebook: string;
};

interface EbooksProps {
  ebooks: Ebook[];
  page: string;
  totalPage: string;
}

export default function Ebooks({
  ebooks: ebooksBlog,
  page,
  totalPage,
}: EbooksProps) {
  const [currentPage, setCurrentPage] = useState(Number(page));

  const [ebooks, setEbooks] = useState(ebooksBlog || []);

  //Buscar novos posts
  async function reqEbook(pageNumber: number) {
    const prismic = getPrismicClient();

    const response = await prismic.query(
      [Prismic.Predicates.at("document.type", "ebook")],
      {
        orderings: "[document.last_publication_date desc]",
        fetch: [
          "ebook.titlebook",
          "ebook.descriptionbook",
          "ebook.coverbook",
          "ebook.linkebook",
        ],
        pageSize: 3,
        page: String(pageNumber),
      }
    );
    return response;
  }

  async function navigatePage(pageNumber: number) {
    const response = await reqEbook(pageNumber);

    if (response.results.length === 0) {
      return;
    }

    const getEbooks = response.results.map((ebook) => {
      return {
        slug: ebook.uid,
        titlebook: RichText.asText(ebook.data.titlebook),
        descriptionbook:
          ebook.data.descriptionbook.find(
            (content) => content.type === "paragraph"
          )?.text ?? "",

        coverbook: ebook.data.coverbook.url,

        updatedAt: new Date(ebook.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
        linkebook: ebook.data.linkebook.url,
      };
    });

    setCurrentPage(pageNumber);
    setEbooks(getEbooks);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      // O código abaixo será executado apenas no navegador
      import("scrollreveal").then((ScrollRevealModule) => {
        const ScrollReveal = ScrollRevealModule.default || ScrollRevealModule;

        const sr = ScrollReveal({
          duration: 1000,
          reset: false,
          // Outras opções de configuração aqui
        });

        sr.reveal(".animated-item", {
          origin: "bottom",
          distance: "20px",
          easing: "ease-in-out",
        });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title> Gislene Oliveira | E-books</title>
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
      <div className={styles.containerPost}>
        {" "}
        <main className={styles.container}>
          <div className={styles.posts}>
            {ebooks.map((ebook) => (
              <Link
                key={ebook.slug}
                legacyBehavior
                href={`/ebooks/${ebook.slug}`}
              >
                <div className={styles.divbook}>
                  <a key={ebook.slug}>
                    <div className={`${styles.imgbook} animated-item`}>
                      <Image
                        src={ebook.coverbook}
                        alt={ebook.titlebook}
                        width={720}
                        height={410}
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPceQ4AAkYBiUQ8i/IAAAAASUVORK5CYII="
                      />
                    </div>
                    <div className={`${styles.textbook} animated-item`}>
                      {" "}
                      <strong>{ebook.titlebook}</strong>
                      <p>
                        {" "}
                        <strong
                          className={`${styles.cliqueesaibamais} animated-item`}
                        >
                          {" "}
                          CLIQUE E SAIBA MAIS{" "}
                        </strong>
                      </p>
                      <time>{ebook.updatedAt}</time>
                    </div>
                  </a>
                </div>
              </Link>
            ))}

            
          </div>
        </main>
      </div>
      <div className={styles.buttonNavigate}>
              {Number(currentPage) >= 2 && (
                <div>
                  {/*Voltar tudo <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft size={25} color="#fff" />
                        </button> */}

                  <button
                  className={styles.bvoltar}
                    title="Voltar"
                    onClick={() => navigatePage(Number(currentPage - 1))}
                  >
                    <FaArrowLeft size={40} color="#fff" />
                  </button>
                </div>
              )}

              {Number(currentPage) < Number(totalPage) && (
                <div>
                  <button
                    title="Próxima"
                    onClick={() => navigatePage(Number(currentPage + 1))}
                  >
                    <FaArrowRight size={40} color="#fff" />
                  </button>

                  {/*   <button title='Primeira' onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight size={25} color="#fff" />
                        </button> */}

                  <div></div>
                </div>
              )}
            </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "ebook")],
    {
      orderings: "[document.last_publication_date desc]",
      fetch: ["ebook.titlebook", "ebook.descriptionbook", "ebook.coverbook"],
      pageSize: 3,
    }
  );

  // console.log(JSON.stringify(response, null,2))
  const ebooks = response.results.map((ebook) => {
    return {
      slug: ebook.uid,
      titlebook: RichText.asText(ebook.data.titlebook),
      descriptionbook:
        ebook.data.descriptionbook.find(
          (content) => content.type === "paragraph"
        )?.text ?? "",

      coverbook: ebook.data.coverbook.url,
      updatedAt: new Date(ebook.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });
  return {
    props: {
      ebooks,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60 * 1, //atualiza a cada 30 minutos
  };
};
