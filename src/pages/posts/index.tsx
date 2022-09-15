import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import * as Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';

export default function Posts() {
  return (
    <>
      <Head>Posts | Ignews</Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>15th september 2022</time>
            <strong>Trip down south</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              veritatis quas odio pariatur nulla beatae obcaecati dignissimos
              suscipit facere atque ducimus, quidem consequatur alias voluptatum
              sequi nihil temporibus, facilis molestias.
            </p>
          </a>
          <a href="">
            <time>15th september 2022</time>
            <strong>Trip down south</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              veritatis quas odio pariatur nulla beatae obcaecati dignissimos
              suscipit facere atque ducimus, quidem consequatur alias voluptatum
              sequi nihil temporibus, facilis molestias.
            </p>
          </a>
          <a href="">
            <time>15th september 2022</time>
            <strong>Trip down south</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              veritatis quas odio pariatur nulla beatae obcaecati dignissimos
              suscipit facere atque ducimus, quidem consequatur alias voluptatum
              sequi nihil temporibus, facilis molestias.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicate.at('document.type', 'publication')],
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    }
  );

  console.log(response);

  return { props: {} };
};
