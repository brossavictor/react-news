import * as Prismic from '@prismicio/client';

export function getPrismicClient() {
  const prismic = new Prismic.Client(process.env.PRISMIC_ENDPOINT, {
    accessToken:
      ' MC5ZeUtrQVJFQUFDVUFVZnBC.Ghvvv73vv73vv73vv71X77-977-9ce-_vUgodDYTWe-_vW4RaDQx77-977-977-977-977-977-977-9Nmg',
  });

  return prismic;
}
