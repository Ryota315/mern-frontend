import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;


    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);


    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                                <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                
                                    <InfoContainer>
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>{productDetails && productDetails.price && productDetails.price.cost}đ</PriceCost>
                                            <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <div>---------------------------------------------</div>
                                        <Description>{productDetails && productDetails.description}</Description>
                                        <ProductDetails>
                                            <p>Category: {productDetails && productDetails.category}</p>
                                            <p>Subcategory: {productDetails && productDetails.subcategory}</p>
                                        </ProductDetails>
                                    </ProductInfo>

                                {
                                    currentRole === "Customer" &&
                                    <>
                                        <ButtonContainer>
                                            <BasicButton
                                                onClick={() => dispatch(addToCart(productDetails))}
                                            >
                                                Add to Cart
                                            </BasicButton>
                                        </ButtonContainer>
                                    </>
                                }
                                    </InfoContainer>
                                </ProductContainer>
                                <ReviewWritingContainer>
                                    <Typography variant="h4">Reviews</Typography>
                                </ReviewWritingContainer>

                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    <ReviewContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardDivision>
                                                    <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                                                        {String(review.reviewer.name).charAt(0)}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="h6">{review.reviewer.name}</Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

                                                            <Typography variant="body2">
                                                                {timeAgo(review.date)}
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                                        <Typography variant="body1">{review.comment}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer._id === reviewer &&
                                                        <>
                                                            <IconButton onClick={handleOpenMenu} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                                                <MoreVert sx={{ fontSize: "2rem" }} />
                                                            </IconButton>
                                                            <Menu
                                                                id="menu-appbar"
                                                                anchorEl={anchorElMenu}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                keepMounted
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                                onClick={handleCloseMenu}
                                                            >
                                                                <MenuItem onClick={() => {
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Edit</Typography>
                                                                </MenuItem>
                                                                <MenuItem onClick={() => {
                                                                    deleteHandler(review._id)
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Delete</Typography>
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                    }
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewContainer>
                                )
                                    :
                                    <ReviewWritingContainer>
                                        <Typography variant="h6">No Reviews Found. Add a review.</Typography>
                                    </ReviewWritingContainer>
                                }
                            </>
                    }
                </>
            }
        </>
    );
};

export default ViewProduct;






const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    padding: 40px;
    font-family: 'Poppins', sans-serif;
    max-width: 1200px;  /* Giới hạn kích thước tối đa */
    margin: 0 auto;  /* Căn giữa */

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
    }
`;


const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Đẩy button xuống dưới */
    height: 100%; /* Chiếm toàn bộ chiều cao của parent */
    padding: 20px;s
    // border-radius: 12px;
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
`;

const ProductImage = styled.img`
    height: 100vh;
    width: 100vw; /* Cập nhật width để chiếm toàn bộ chiều rộng */
    max-width: 100%;
    object-fit: cover;

    @media (min-width: 768px) {
        height: 60vh; /* Tăng chiều cao ảnh khi trên 768px */
        width: 50vw; /* Để hình ảnh chiếm 1/2 màn hình */
    }
`;

const ProductInfo = styled.div`
    flex: 1;
    text-align: center;
    max-width: 50%;

    @media (min-width: 768px) {
        text-align: left;
    }
`;

const ProductName = styled.h1`
    font-size: 60px;
    font-weight: 700;
    color: #333;
    margin-bottom: 12px;
`;

const ProductDetails = styled.p`
    font-size: 18px;
    color: #666;
    line-height: 1.6;
`;

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 12px;

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;

const PriceCost = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: #ff5722;
`;

const PriceDiscount = styled.p`
    font-size: 20px;
    color: darkgreen;
    font-weight: 600;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;

const StyledButton = styled.button`
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #ff5722;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: #e64a19;
    }
`;
const Description = styled.p`
    font-size: 18px;
    color: #555;
    line-height: 1.6;
    margin-top: 12px;
`;


const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
`;

const ReviewContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
    && {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        margin-bottom: 2rem;
    }
`;

const ReviewCardDivision = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
    flex: 1;
`;
