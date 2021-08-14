import '../App.css';
import React, { Component } from 'react';

class Characteres extends Component {
    state = {
        loading: true,
        resultprople:[],
        people: [],
        count:1,
        char:{
            occupation:["Actor"],
            appearance:[1,2,3],
            better_call_saul_appearance:[1,2,3]
        },
        episode:[],
        epi:[],
        quote:[],
        searchTerm:''
      };
    
    async componentDidMount() {
        const url = "https://www.breakingbadapi.com/api/characters?category=Breaking+Bad";
        const url1 = "https://www.breakingbadapi.com/api/episodes"
        const response = await fetch(url);
        const response1 = await fetch(url1);
        const data = await response.json();
        const data1 = await response1.json();
        this.setState({resultprople:data});
        var temp = this.state.resultprople.slice(0,10)
        this.setState({people:temp, loading: false,episode:data1 });
      }
  nextHandler = () => {
    var increment = this.state.count +1
    this.setState({ count:increment }) 
    if(increment !==1){
        var length = increment*10
        var start = length - 10
        var temp = this.state.resultprople.slice(start,length)
        this.setState({people:temp});
    }
  }
  perviousHandler = () => {
    var decrement = this.state.count -1
    var temp 
    this.setState({ count:decrement }) 
    if(decrement === 1){
        temp = this.state.resultprople.slice(0,10)
        this.setState({people:temp});
    }
    else{
        var length = decrement*10
        var start = length - 10
        temp = this.state.resultprople.slice(start,length)
        this.setState({people:temp});
    }
  }

  quote(name){
    name = name.replace(" ", "+")
    const url3 = "https://www.breakingbadapi.com/api/quote?author="+name
    fetch(url3)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({quote:result})
        },
        (error) => {
          this.setState({
            quote:[]
          });
        }
      )
}

  modelHandler = (i) => {
    var item = this.state.people[i]
    var episodes=[]
    var episode = this.state.episode
    if(this.state.char.appearance.length !== 0){
        for(var j=0;j<item.appearance.length;j++){
            for(i=0;i<episode.length;i++){
                if(item.appearance[j] === episode[i].episode_id){
                    episodes.push(episode[i]);
                }
            }
        }
    }
    else{
        for(j=0;j<item.better_call_saul_appearance.length;j++){
            for(i=0;i<episode.length;i++){
                if(item.better_call_saul_appearance[j] === episode[i].episode_id){
                    episodes.push(episode[i]);
                }
            }
        }
    }
    this.quote(item.name)
    this.setState({char:item,epi:episodes})
  }
  search = (e) => {
    this.setState({searchTerm:e.target.value})
    if(e.target.value !==''){
        const filtered = this.state.resultprople.filter(country => {
            return country.portrayed.toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.setState({people:filtered})
    }
    else{
        var length = this.state.count*10
        var start = length - 10
        var temp = this.state.resultprople.slice(start,length)
        this.setState({people:temp});
    }
    
  }  
  render() {
    const buttonNext =( 
        <button className="btn btn-info" onClick={this.nextHandler}>
            <b>Next</b>
            <span className="material-icons">navigate_next</span>    
        </button>);
    const buttonPrev = (
        <button className="btn btn-info" onClick={this.perviousHandler}>
            <span className="material-icons">navigate_before</span>
            <b>Previous</b>  
        </button>
    );
    const nickname = ( 
        <div>
            <h6 className="mb-0"><b>Nickname</b></h6> 
            <em>{this.state.char.nickname}</em>
        </div>
    )
    const quotes = (
        <td>
            {this.state.quote.map((epi,index) =>(
                <ul key={index}>"{epi.quote}"</ul>
            ))}
        </td>
    )
    if (this.state.loading) {
        return (
            <div className="text-center pt-5 pb-5">
                <div className="spinner-border text-primary"></div>
                <h6  className="font-weight-bold" >Please wait while fetching the data</h6>
            </div>
        )
      }
  
      if (!this.state.people.length) {
        return(
            <div className="text-center pt-5 pb-5">
                <h3 className="font-weight-bold" >There is a problem in server, Refresh the page</h3>
                <span className="reload material-icons fs-2">
                replay_circle_filled
                </span>
            </div>
        );
      }
    return (
        <div id="characters">
            <div className="container-sm">
                <div className="row ml-0 mr-0">
                    <div className="col-sm-8">
                        <h2>Breaking Bad Cast</h2>
                    </div>
                    <div className="col-sm-4">
                        <form name="searchForm">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" 
                                placeholder="search" value={this.state.searchTerm} onChange={this.search}/>
                                <div className="input-group-append">
                                    <button className="btn btn-light" type="submit">Go</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row ml-0 mr-0">
                    {this.state.people.map((person,index) => (
                    <div className="col-sm-3 col-md-6 col-lg-3 mt-4 d-flex align-items-stretch" key={person.char_id}>
                        <div className="card flex-fill hover-card">
                            <div className="card-img-container">
                                <img className="card-img-top " width="100%" height="350" alt="Charachter" src={person.img}/>
                            </div>
                            <div className="card-body shadow">
                                <h3 className="card-title font-weight-bold text-truncate mb-0" style={{cursor: "pointer"}} title={person.portrayed	 ? person.portrayed	 : 'Character'}>
                                {person.portrayed	 ? person.portrayed	 : 'Character'}
                                </h3>
                                <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={person.name ? person.name : 'Character'}>
                                {person.name ? person.name : 'Character'}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.modelHandler(index)}>
                                        <b>View</b>  
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="buttonsrow">
                    <div>
                    {this.state.count === 1 ? '' : buttonPrev }
                    </div>
                    <div>
                        {this.state.count !== Math.ceil(this.state.resultprople.length/10) ? buttonNext : ''}
                    </div>
                </div>
                <div className="modal fade" data-bs-backdrop="static" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel"><b>{this.state.char.name}</b></h4><br/>
                                <span></span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row ml-0 mr-0">
                                    <div className="col-sm-6">
                                        <div className="card-img-container">
                                            <img className="card-img-top " width="100%" height="330" alt="Charachter" src={this.state.char.img}/>
                                        </div> 
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row ml-0 mr-0">
                                            <h3 className="modal-title mb-3" id="exampleModalLabel"><b>{this.state.char.name}</b></h3>
                                        </div>
                                        <div className="row ml-0 mr-0">
                                            <h6 className="mb-0"><b>Born</b></h6> 
                                            <em>{this.state.char.birthday}</em>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                        {this.state.char.nickname !== undefined ? nickname : ''}
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Portrayed</b></h6> 
                                            <em>{this.state.char.portrayed}</em>
                                        </div>
                                        <div className="row ml-0 mr-0 mt-3">
                                            <h6 className="mb-0"><b>Status</b></h6> 
                                            <em>{this.state.char.status}</em>
                                        </div>
                                        {/* <div className="font-weight-light active-campaign-sport text-capitalize mb-2" style={{cursor: "pointer"}} title={this.state.char.portrayed	 ? this.state.char.portrayed	 : 'Character'}>
                                            {this.state.char.portrayed	 ? this.state.char.portrayed: 'Character'}
                                        </div> */}
                                    </div>
                                </div>
                                <div className="row ml-0 mr-0">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">occupation</th>
                                            <td>
                                                {this.state.char.occupation.map((occ,index) =>(
                                                    <ul key={index}>{occ}</ul>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Appearance</th>
                                            <td>
                                                {this.state.epi.map((epi,index) =>(
                                                    <ul key={index}>{epi.title}</ul>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Seasons</th>
                                            <td>
                                                {this.state.char.appearance.length > 0 ? <ul>Breaking Bad</ul> : <ul>Better Call Saul</ul>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Quote</th>
                                            {this.state.quote.length === 0 ? <td><ul>No quotes available</ul></td> : quotes}
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Characteres;