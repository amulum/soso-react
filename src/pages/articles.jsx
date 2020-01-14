import React, { Component } from 'react';
import Header from "../components/Header"
import ListArticle from "../components/articleContent"
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import '../style/bootstrap.min.css'
import '../style/articles.css'
import '../style/loading.css'
import '../style/recipe.css'
import { Redirect } from 'react-router-dom';

const apiKey = "58fecc904b4e40ef920ae5582000d89a";
const baseUrl = "https://newsapi.org/v2/";
const urlHeadline = baseUrl + "top-headlines?q=diet&country=us&category=health&apiKey=" + apiKey;

class Articles extends Component {
    componentDidMount = async () => { 
        await this.props.handleGetApi(urlHeadline);
        await this.props.setChange('isLoading', false)
    }

    componentWillUnmount = async () => {
        await this.props.setChange('isLoading', true)
    }

    render () {
        let fullArticle;
        const listArticle = this.props.data.articles
        if(listArticle!==undefined){
            const articleItem = listArticle.filter(item => {
                if (item.content !== null && item.image !== null) {
                    return item;
                }
                return false;
            })
    
            fullArticle = articleItem.map((item, key) => {
                return (
                    <ListArticle 
                        key={key} 
                        title={item.title} 
                        img={item.urlToImage} 
                        content={item.description}
                        url={item.url}
                        publishedAt={item.publishedAt} 
                    />
                );
            });
        }

        if(this.props.auth===false){
            return(
                <Redirect to={{pathname:'/login'}}/>
            )
        } else{
            return (
                <React.Fragment>
                    <Header {...this.props} />
                    {this.props.isLoading?
                    <div className="loading-box">
                        <i className="material-icons">cached</i>
                    </div>
                    :
                    <div>
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-md-3 col-12"></div>
                                <div className="col-md-6 col-12 brief-box" style={{marginTop:"-7%"}}>
                                    <h1 className="text-center">Health News</h1>
                                    {fullArticle}
                                </div>
                                <div className="col-md-3 col-12"></div>
                            </div>
                        </div>
                    </div>  
                    }  
                </React.Fragment>
            );
        }
    }
}

export default connect("isLoading, data, auth", actions)(Articles);