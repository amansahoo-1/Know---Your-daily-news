import React from "react";
import { useParams } from "react-router-dom";
import News from "./News";

const NewsWrapper = () => {
  const { category } = useParams();
  return <News category={category || "general"} />;
};

export default NewsWrapper;
