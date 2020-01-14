import React from 'react';
import Header from '../components/Header'; 
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store/store";
import '../style/bootstrap.min.css'
import '../style/home.css'
import background from '../images/background.jpg'
import logo from '../images/logo-orange.svg'

const urlHeadLine = "https://api.edamam.com/search?to=21&app_id=7173ea48&app_key=609f58237cd3b846b334f7b7e3f681b2&q="

class Home extends React.Component {
    state = {
        isSearch: false
    }
    handleSearch = async () =>{
        await this.props.setChange('isLoading', true)
        const keyword = await this.props.search
        console.log(keyword)
        console.log(this.props)
        await this.setState({'isSearch':true})
        await this.props.handleGetApi(urlHeadLine+keyword)
        this.props.history.replace({pathname: '/search', search: '?q='+keyword})
        const data = await this.props.data
        const dict = {
            isLoading: false,
            listRecipe: data.hits
        }
        await this.props.setManyChanges(dict)
        console.log(this.props.listRecipe)
    }

    componentWillUnmount = async () => {
        try {
            await this.props.setChange('isLoading', true)
            await this.setState('isSearch', false)
        }
        catch (error) {
            console.log(error)
        }
    }

    render () {
        // let recipeToShow;
        // if(this.props.listRecipe!==undefined){
        //     const listRecipe = this.props.listRecipe;
        //     console.log(listRecipe)
        //     recipeToShow = listRecipe.map((item, key)=>{
        //         return(
        //             <ListRecipe
        //             key={key}
        //             number={key}
        //             image={item.recipe.image}
        //             title={item.recipe.label}
        //             {...this.props}/>
        //         )
        //     })
        // }
        return (
            <React.Fragment>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        
                    </div>
                    {this.props.isLoading?
                    <div className="loading-box mini" style={{display:this.state.isSearch? 'flex':'none'}}>
                        <i className="material-icons">cached</i>
                    </div>
                    :
                    <div className="row search-result">
                        {/* {recipeToShow} */}
                    </div>
                    }

                </div>
            </React.Fragment>

        )
    }
}
export default connect('isLoading, data, search, listRecipe',actions)(withRouter(Home));
