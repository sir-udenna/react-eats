import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Info() {
  const [info, setInfo] = useState({
    result: { name: '', location: '', phone: '', rating: '', photos: [''] },
  });

  const handleMoreInfo = (id) => {
    fetch(`http://localhost:3000/api/v1/yelp_restaurants_info/?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization:
          'Bearer TfAfZ9CEBvQhMOvO5CcgbnmVNh4raReuVs6pQ5T9feqpz8_QmXw-R1kWfxJTvMoE5d7mGrencCzHmRCR2alxB2whr8GMm0byjI22x0kia_u2TgHwPLdrwO31RBSwYHYx',
      },
    })
      .then((res) => res.json())
      .then((data) => setInfo(data));
  };

  useEffect(() => {
    const infoData = localStorage.infoData;
    if (infoData) {
      handleMoreInfo(infoData);
    }
  }, []);

  const goBack = () => {
    localStorage.removeItem('infoData');
    window.location.href = '/home';
  };

  if (typeof info.result.name === 'undefined') {
    return <h1>loading</h1>;
  } else {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              name: {info.result.name}
            </Typography>
            <Typography>location: {info.result.location.address1}</Typography>
            <Typography>phone: {info.result.phone}</Typography>
            <Typography>rating: {info.result.rating}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={goBack}>
              Back
            </Button>
          </CardActions>
        </Card>
        <ImageList rowHeight={400} cols={3}>
          {info.result.photos.map((tile, index) => (
            <ImageListItem key={index} cols={tile.cols || 1}>
              <img src={tile} alt={`${index}`} /> 
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}
