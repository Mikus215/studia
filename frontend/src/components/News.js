import { useState, useEffect } from "react";
import axios from "axios";
import New from "./New";
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:1337/api/updates");
      setNews(data);
    };
    getData();
  }, []);

  return (
    <div className="news">
      {news?.data?.map((el) => (
        <New {...el.attributes} key={el.id} />
      ))}
    </div>
  );
};

export default News;
