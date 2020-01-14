import React from 'react';
import Header from '../components/Header'
import {Link} from 'react-router-dom'
import '../style/notMatch.css'

class NotMatch extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Header />
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                            <h2>404 - The Page can't be found</h2>
                        </div>
                        <Link to="/">Go TO Homepage</Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NotMatch