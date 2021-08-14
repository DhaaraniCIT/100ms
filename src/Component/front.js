import Header from '../Component/header';
import '../App.css';

function Front() {
return(
    <div className="header">
        <Header/>
        <div className="container-sm content text-center">
            <h1>Know more about your <br/> Favorite charateres in Breaking Bad</h1>
            <a href="#characters"><button type="button" className="btn btn-light"><b>Know More</b></button></a>
        </div>
    </div>
)
}

export default Front;