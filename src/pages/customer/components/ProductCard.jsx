import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box, Link, Card, Stack, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 250,
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                },
            }}
        >
            <Box sx={{ pt: '100%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                <Box
                    component="img"
                    alt={product.productName}
                    src={product.productImage}
                    sx={{
                        top: 0,
                        height: 1,
                        width: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                    }}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 2, cursor: "pointer" }}>
                <Link
                    color="inherit"
                    underline="hover"
                    variant="subtitle2"
                    noWrap
                    onClick={() => navigate("/order/view/" + product._id)}
                    sx={{
                        fontWeight: 700,
                        transition: "color 0.3s",
                        "&:hover": { color: "primary.main" },
                    }}
                >
                    {product.productName}
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                color: "text.disabled",
                                textDecoration: "line-through",
                            }}
                        >
                            {product.price && product.price.mrp}đ
                        </Typography>
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "primary.main", fontWeight: 600 }}>
                        {product.price && product.price.cost }đ
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object,
};

export default ProductCard;
