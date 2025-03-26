import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ImageCarousel from "./ImageCarousel";
import ProductInfo from "./ProductInfo";
import { productImages, productThumbnails } from "../assets/imagedata";
import { data } from "../utils/data";

const Product = () => {
  const { productId } = useParams(); // Get productId from the URL

  // Fetch product data based on productId (replace with actual API call or data lookup)
  const product = {
    ...data,
    productId: parseInt(productId), // Use the productId from the URL
  };

  return (
    <ProductWrapper>
      <ImageCarousel
        productImages={productImages}
        productThumbnails={productThumbnails}
      />
      <ProductInfo {...product} />
    </ProductWrapper>
  );
};

const ProductWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    margin-top: 5rem;
  }

  @media only screen and (min-width: 1000px) {
    margin-top: 9rem;
    gap: 5rem;
    display: grid;
    grid-template-columns: 44.5rem 44.5rem;
  }

  @media only screen and (min-width: 1200px) {
    gap: 11rem;
  }
`;

export default Product;