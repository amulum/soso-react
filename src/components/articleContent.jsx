import React, { Component } from 'react';
import love from '../images/love.png';
import share from '../images/share.png';
import dislike from '../images/dislike.png';

class ListArticle extends Component {
    render () {
        return (
            <div className="list-article">
                <div className="list-berita">                
                    <div className="list-berita-border">                              
                        <img src={this.props.img} alt=""/>
                        <div className="news-content">
                            <h4><a href={this.props.url}>{this.props.title}</a></h4>
                            <p className="short-article" style={{color:'#3b3d4a'}}>{this.props.publishedAt.slice(0,10)}</p>
                            <p className="short-article">{this.props.content}</p>
                        </div>
                        <div className="berita-terkini share">
                            <div className="row align-items-center">
                                <div className="col-md-4 col-4 text-center"><a href="#"><img src={love} alt=""/></a></div>
                                <div className="col-md-4 col-4 text-center"><a href="#"><img src={share} alt=""/></a></div>
                                <div className="col-md-4 col-4 text-center"><a href="#"><img src={dislike} alt=""/></a></div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default ListArticle;