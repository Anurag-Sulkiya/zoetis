import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  CssBaseline, 
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const CardItem = ({ title, description, onClick }) => (
  <Card sx={{ height: '100%' }}>
    <CardActionArea sx={{ height: '100%' }} onClick={onClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const DetailedView = ({ country, reportType, onBack }) => {
  // Generate dummy data for the table
  const tableData = Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => `Data ${rowIndex + 1}-${colIndex + 1}`)
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            This is the Zoetis RDM PH Report page for {country}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {reportType} for {country}
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                {Array.from({ length: 10 }, (_, index) => (
                  <TableCell key={index}>Column {index + 1}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={onBack}>
          Back to Reports
        </Button>
      </Container>
    </>
  );
};

const CountryPage = ({ country, onBack }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const cardData = [
    { 
      title: 'Commercial report', 
      description: 'Commercial report and data of ' + country,
    },
    { 
      title: 'Financial Report', 
      description: 'Financial report and data of ' + country,
    },
    { 
      title: 'SAP Report', 
      description: 'SAP report and data of ' + country,
    },
    { 
      title: '360 degree View', 
      description: '360 degree View report and data of ' + country,
    }
  ];

  if (selectedReport) {
    return (
      <DetailedView 
        country={country} 
        reportType={selectedReport} 
        onBack={() => setSelectedReport(null)} 
      />
    );
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            ZOETIS RDM PH REPORT - {country}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the {country} Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is the Zoetis RDM PH Report page for {country}. Select a category below to view more details.
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <CardItem {...card} onClick={() => setSelectedReport(card.title)} />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={onBack}>
          Back to Country Selection
        </Button>
      </Container>
    </>
  );
};

export default CountryPage;