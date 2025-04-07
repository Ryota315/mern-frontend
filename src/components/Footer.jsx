import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000', // Changed from #1976d2 to black
  color: '#fff',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const SocialIcon = styled(IconButton)({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are dedicated to providing the best shopping experience for our customers
              with quality products and excellent service.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body2">69/68 Dang Thuy Tram, Binh Thanh, HCMC</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">+1 234 567 890</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">contact@sneakershop.com</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <SocialIcon aria-label="facebook">
                <FacebookIcon />
              </SocialIcon>
              {/* <SocialIcon aria-label="twitter">
                <TwitterIcon />
              </SocialIcon> */}
              <SocialIcon aria-label="instagram">
                <InstagramIcon />
              </SocialIcon>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Stay connected with us on social media for updates and promotions.
            </Typography>
          </Grid>
        </Grid>
        
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Sneakers Shop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 