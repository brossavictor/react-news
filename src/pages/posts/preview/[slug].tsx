import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { SubscribeNowButton } from '../../../components/SubscribeNowButton';
import { getPrismicClient } from '../../../services/prismic';
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

const PARAGRAPHSPLITTER = '!@#$%';

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/posts/${post.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const [firstParagraph, secondParagraph] =
    post.content.split(PARAGRAPHSPLITTER);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            // dangerouslySetInnerHTML={{ __html: post.content }}
          >
            <p>{firstParagraph}</p>
            <p>{secondParagraph}</p>
          </div>
          <SubscribeNowButton />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publication', String(slug), {});

  const [firstParagraph, secondParagraph] =
    response.data.content[0].text.split('\n\n');

  const newContent = [
    {
      ...response.data.content,
      text: [firstParagraph, secondParagraph].join(PARAGRAPHSPLITTER),
    },
  ];

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asText(newContent),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'en-ca',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30,
  };
};
