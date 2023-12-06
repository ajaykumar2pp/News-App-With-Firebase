import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BsArrowRight } from "react-icons/bs";

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=in&apiKey=c7e92b0bb0794cc0a1e434031945849f'
                );

                setNews(response.data.articles);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchNews();
    }, []);
    return (
        <Container fluid>
            <Row>
                <Col xs={6} md={4} >
                    <h2>Latest News</h2>
                   {/* <div className='d-flex '> */}
                   {news.map((article) => (
                            <>
                                {/* <div className='d-flex'> */}
                                    <div className='border border-primary shadow p-3 m-3 rounded '>
                                        <Image src={article.urlToImage} alt="urlImage" className="img-fluid" rounded />
                                        <div>
                                            <span>{article.author}</span>
                                            <span className='ms-3'>
                                                <li style={{ color: 'red' }}>{article.publishedAt}</li>
                                            </span>
                                            <h5>{article.title}</h5>
                                            <p>
                                                {article.description}
                                            </p>
                                            <Button as="a" href={article.url} variant="primary" target="_blank" rel="noopener noreferrer">
                                                Read more <BsArrowRight />
                                            </Button>

                                        </div>
                                    </div>
                                {/* </div> */}
                            </>

                        ))}
                   
                   {/* </div> */}
                      
                </Col>
            </Row>
        </Container>

    )
}

export default NewsList
