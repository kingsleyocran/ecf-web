export async function getServerSideProps(context: any) {
  const { articleID } = context.query;
  return { redirect: { destination: `/resources/hub/${articleID}`, permanent: true } };
}
export default function ArticleRedirect() { return null; }
