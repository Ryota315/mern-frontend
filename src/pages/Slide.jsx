import { Divider, Box, Typography, Button, styled, Container, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart, addStuff } from '../redux/userSlice';

const Slide = ({ products, title }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Đưa vào trong component

    const currentRole = localStorage.getItem("role") || null;

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
        alert("You have to login or register first");
    };

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>

                <ViewAllButton
                    variant="contained"
                    onClick={() => { navigate("/Products") }}
                >
                    View All
                </ViewAllButton>
            </Deal>

            <Divider />

            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item"
            >
                {products.map((product, index) => (
                    <CardContainer key={index}>
                        <Link to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
                            <StyledCard>
                                <Image src={product.productImage} alt={product.productName} />
                                <StyledCardContent>
                                    <TitleText>{product.productName}</TitleText>
                                    <TextContainer>
                                        <Text style={{ color: '#525050', textDecoration: "line-through" }}>{product.price.mrp}</Text>
                                        <Text>{product.price.cost}đ</Text>
                                        <Text style={{ color: 'green' }}>{product.price.discountPercent}% off</Text>
                                    </TextContainer>
                                    <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
                                </StyledCardContent>
                            </StyledCard>
                        </Link>
                        <AddToCart>
                            {currentRole === "Customer" && (
                                <BasicButton onClick={(event) => handleAddToCart(event, product)}>Add To Cart</BasicButton>
                            )}
                            {currentRole === "Shopcart" && (
                                <BasicButton onClick={(event) => handleUpload(event, product)}>Upload</BasicButton>
                            )}
                            {currentRole === null && (
                                <BasicButton onClick={messageHandler}>Add To Cart</BasicButton>
                            )}
                        </AddToCart>
                    </CardContainer>
                ))}
            </Carousel>
        </Component>
    );
};

export default Slide;

// Responsive settings
const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

// Styled components
const Component = styled(Box)`margin-top: 10px;`;
const Deal = styled(Box)`display: flex; padding: 15px 20px;`;
const DealText = styled(Typography)`font-size: 22px; font-weight: 600; margin-right: 25px;`;
const CardContainer = styled('div')({
    margin: '15px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center'
});
const StyledCard = styled(Card)`
    max-width: 250px;
    margin: auto;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
const StyledCardContent = styled(CardContent)`text-align: center; padding: 16px;`;
const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #000;
    border-radius: 2px;
    font-size: 13px;
    &:hover { background-color: #5C5470; }
`;
const Image = styled('img')({
    width: 200,
    height: 200,
    objectFit: 'cover',
    borderRadius: '4px 4px 0 0',
    display: 'block',
    margin: 'auto'
});
const TitleText = styled(Typography)`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
    text-align: center;
`;
const Text = styled(Typography)`font-size: 14px;`;
const TextContainer = styled(Container)`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;
const AddToCart = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
const BasicButton = styled(Button)`
    background-color: #000;
    color: white;
    &:hover { background-color: #5C5470; }
`;
