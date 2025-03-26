import React, { useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
};

const handleUpload = (event, product) => {
    event.stopPropagation();
    dispatch(addStuff("ProductCreate", product));
};

const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first");
    setShowPopup(true);
};

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <NoResult>Không tìm thấy sản phẩm phù hợp.</NoResult>;
  }

  return (
    <>
      <StyledContainer>
        <ProductGrid container>
          {currentItems.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} onClick={() => navigate("/product/view/" + data._id)}>
              <ProductCard>
                <ProductImage src={data.productImage} />
                <ProductDetails>
                  <ProductName>{data.productName}</ProductName>
                  <PriceContainer>
                    <PriceMrp>{data.price.mrp}đ</PriceMrp>
                    <PriceCost>{data.price.cost}đ</PriceCost>
                    <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
                  </PriceContainer>
                  <AddToCart>
                    {currentRole === "Customer" && (
                      <BasicButton onClick={(event) => handleAddToCart(event, data)}>Add To Cart</BasicButton>
                    )}
                    {currentRole === "Shopcart" && (
                      <BasicButton onClick={(event) => handleUpload(event, data)}>Upload</BasicButton>
                    )}
                    {currentRole === null && (
                      <BasicButton onClick={messageHandler}>Add To Cart</BasicButton>
                    )}
                  </AddToCart>
                </ProductDetails>
              </ProductCard>
            </Grid>
          ))}
        </ProductGrid>
      </StyledContainer>

      <Container sx={{ mt: 5, display: "flex", justifyContent: 'center' }}>
        <Pagination count={Math.ceil(productData.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="secondary"  
        sx={{
    '& .MuiPaginationItem-root': {
      color: 'white',  // Màu chữ
      backgroundColor: 'black', // Màu nền
      '&:hover': {
        backgroundColor: 'gray', // Màu khi hover
      }
    },
    '& .Mui-selected': {
      backgroundColor: 'red', // Màu cho trang hiện tại
      color: 'white'
    }
  }} />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default Products;

// -------------------- CSS -------------------- //

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Tự động căn chỉnh */
  gap: 80px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;


const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Đảm bảo căn đều */
  align-items: center;
  background: #fff;
  padding: 16px;
  width: 200px; /* Đảm bảo đồng nhất */
  height: 300px; /* Thiết lập chiều cao cố định */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  margin-top: 3px;
`;

const PriceMrp = styled.p`
  font-size: 12px;
  text-decoration: line-through;
  color: #888;
`;

const PriceCost = styled.h3`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const PriceDiscount = styled.p`
  font-size: 12px;
  color: green;
  font-weight: 600;
`;

const AddToCart = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NoResult = styled.div`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-top: 20px;
`;





// import React, { useState } from 'react';
// import { Container, Grid, Pagination } from '@mui/material';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/userSlice';
// import { BasicButton } from '../utils/buttonStyles';
// import { useNavigate } from 'react-router-dom';
// import Popup from './Popup';
// import { addStuff } from '../redux/userHandle';

// const Products = ({ productData }) => {
//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const itemsPerPage = 9;

//   const { currentRole, responseSearch } = useSelector(state => state.user);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

//   const handleAddToCart = (event, product) => {
//     event.stopPropagation();
//     dispatch(addToCart(product));
//   };

//   const handleUpload = (event, product) => {
//     event.stopPropagation();
//     console.log(product);
//     dispatch(addStuff("ProductCreate", product));
//   };

//   const messageHandler = (event) => {
//     event.stopPropagation();
//     setMessage("You have to login or register first")
//     setShowPopup(true)
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (responseSearch) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <>
//       <ProductGrid container spacing={3}>
//         {currentItems.map((data, index) => (
//           <Grid item xs={12} sm={6} md={4}
//             key={index}
//             onClick={() => navigate("/product/view/" + data._id)}
//             sx={{ cursor: "pointer" }}
//           >
//             <ProductContainer>
//               <ProductImage src={data.productImage} />
//               <ProductName>{data.productName}</ProductName>
//               <PriceCost>{data.price.cost}đ</PriceCost>
//               <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
//               <AddToCart>
//                 {currentRole === "Customer" &&
//                   <>
//                     <BasicButton
//                       onClick={(event) => handleAddToCart(event, data)}
//                     >
//                       Add To Cart
//                     </BasicButton>
//                   </>
//                 }
//                 {currentRole === "Shopcart" &&
//                   <>
//                     <BasicButton
//                       onClick={(event) => handleUpload(event, data)}
//                     >
//                       Upload
//                     </BasicButton>
//                   </>
//                 }
//                 {currentRole === null &&
//                   <>
//                     <BasicButton
//                       onClick={messageHandler}
//                     >
//                       Add To Cart
//                     </BasicButton>
//                   </>
//                 }

//               </AddToCart>
//             </ProductContainer>
//           </Grid>
//         ))}
//       </ProductGrid>

//       <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
//         <Pagination
//           count={Math.ceil(productData.length / itemsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="secondary"
//         />
//       </Container>

//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </>
//   )
// };

// export default Products;

// const ProductContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 16px;
// `;

// const ProductGrid = styled(Grid)`
//   display: flex;
//   align-items: center;
// `;

// const ProductImage = styled.img`
//   width: 200px;
//   height: auto;
//   margin-bottom: 8px;
// `;

// const ProductName = styled.p`
//   font-weight: bold;
//   text-align: center;
// `;

// const Price = styled.p`
//   margin-top: 8px;
//   text-align: center;
//   text-decoration: line-through;
//   color: #525050;
// `;

// const PriceCost = styled.h3`
//   margin-top: 8px;
//   text-align: center;
// `;

// const PriceDiscount = styled.p`
//   margin-top: 8px;
//   text-align: center;
//   color: darkgreen;
// `;

// const AddToCart = styled.div`
//   margin-top: 16px;
// `;