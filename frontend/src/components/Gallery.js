import axios from "axios";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "http://localhost:1337/api/galleries/1?populate=dogs"
      );
      setImages(data.data.attributes.dogs.data);
    };
    getData();
  }, []);

  //   console.log(images[0].attributes.url);
  return (
    <div className="gallery__box">
      {images?.map((el) => (
        <img
          src={`http://localhost:1337${el?.attributes?.url}`}
          key={el.id}
          className="gallery__image"
        />
      ))}
    </div>
  );
};

export default Gallery;
