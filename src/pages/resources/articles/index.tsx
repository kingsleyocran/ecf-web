export async function getServerSideProps() {
  return { redirect: { destination: "/resources/hub", permanent: true } };
}
export default function ArticlesRedirect() { return null; }
