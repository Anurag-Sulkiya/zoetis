import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  CssBaseline, 
  Button, 
  Menu, 
  MenuItem,
  Box,
  Paper,
  Snackbar
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import CountryPage from './CountryPage'; // Make sure this import is correct

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'India',
  'China'
];

const ZoetisPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [isRedirected, setIsRedirected] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    handleClose();
  };

  const handleContinue = () => {
    if (selectedCountry !== 'Select Country') {
      setIsRedirected(true);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    setIsRedirected(false);
    setSelectedCountry('Select Country');
  };

  if (isRedirected) {
    return <CountryPage country={selectedCountry} onBack={handleBack} />;
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            ZOETIS RDM PH REPORT
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Country Selection
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Select a country:
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClick}
              endIcon={<KeyboardArrowDown />}
            >
              {selectedCountry}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {countries.map((country) => (
                <MenuItem 
                  key={country} 
                  onClick={() => handleCountrySelect(country)}
                >
                  {country}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleContinue} 
              disabled={selectedCountry === 'Select Country'}
            >
              Continue
            </Button>
          </Box>
        </Paper>
        <Typography variant="body1" align="center">
          Welcome to the Zoetis RDM PH Report page.
        </Typography>
        {selectedCountry !== 'Select Country' && (
          <Typography variant="body1" sx={{ mt: 2 }} align="center">
            You have selected: {selectedCountry}
          </Typography>
        )}
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Please select a country before continuing"
      />
    </>
  );
};

export default ZoetisPage;