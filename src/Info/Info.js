import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default class Info extends React.Component {
    state = {
        info: {
            result: { name: '', location: '', phone: '', rating: '', photos: [''] }
        }
    }

    handleMoreinfo = (id) => {
        fetch(`http://localhost:3000/api/v1/yelp_restaurants_info/?id=${id}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer TfAfZ9CEBvQhMOvO5CcgbnmVNh4raReuVs6pQ5T9feqpz8_QmXw-R1kWfxJTvMoE5d7mGrencCzHmRCR2alxB2whr8GMm0byjI22x0kia_u2TgHwPLdrwO31RBSwYHYx'
            }
        })
            .then(res => res.json())
            .then(data => this.setState({ info: data }))
    }

    componentDidMount() {
        this.handleMoreinfo(localStorage.infoData)
        console.log(this.state, 'cdm')
    }

    goBack() {
        window.localStorage.removeItem('infoData');
        window.location.href = '/home'
    }


    render() {
        if (typeof this.state.info.result.name === 'undefined') {
            return (<h1>loading</h1>)
        } else {
            console.log("this.state.info.result.location.address1", this.state.info.result.photos)

            return (<div>
                <Card >
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">
                            name: {this.state.info.result.name}
                        </Typography>
                        <Typography>
                            location: {this.state.info.result.location.address1}
                        </Typography>
                        <Typography>
                            phone: {this.state.info.result.phone}
                        </Typography>
                        <Typography>
                            rating: {this.state.info.result.rating}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary" onClick={this.goBack}>Back</Button>
                    </CardActions>
                </Card>
                <GridList cellHeight={400} cols={3}>
                    {this.state.info.result.photos.map((tile) => (
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={tile} alt={tile.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>)

        }
    }
}
