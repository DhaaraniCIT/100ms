import Charachter from '../Component/characters';
import '../App.css';
import React, { Component } from 'react';
class Main extends Component{
    state = {
        choose:''
    }
    selected = (e) =>{
        this.setState({choose:e.target.value})
        console.log(this.state.choose)
    }
    render(){
        return(
            <div id="character" className="mt-5">
                <div className="catagory text-center">
                    <button className="btn btn-primary" style={{marginRight: "10px"}} type="submit" value="Breaking Bad" onClick={this.selected}>Breaking Bad</button>
                    <button className="btn btn-primary" type="submit" value="Better Call Saul" onClick={this.selected}>Better Call Saul</button>
                </div>
                <div className="char">
                    <Charachter catogory={this.state.choose}/>
                </div>
            </div>
        )
    }
}




export default Main;