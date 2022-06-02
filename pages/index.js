import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import axios from "axios";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const todoData = getTodo();
  return {
    props: {
      res: JSON.parse(JSON.stringify(todoData)),
      allPostsData,
    },
  };
}

const getTodo = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  return res;
};

export default function Home({ allPostsData, todoData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <button onClick={getTodo}>get data</button>
        <p>{todoData}</p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
