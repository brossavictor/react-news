import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: String;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for </span>
            {new Intl.NumberFormat('en-ca', {
              style: 'currency',
              currency: 'CAD',
            }).format(product.amount)}
          </p>
          <SubscribeButton />
        </section>

        <Image
          width="336"
          height="521"
          src="/images/avatar.svg"
          alt="girl coding"
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LXWwJC7Ws2cORSHCQ2gKwD4', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100) as number,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
