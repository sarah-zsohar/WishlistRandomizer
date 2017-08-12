import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import io from 'socket.io-client'



class Randomizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            birthday:'',
            wishlist_one:''

        };

    }
    submitForm(){
        // let birthdayTest=this.state.bithday.split('-');
        // if (birthdayTest[0].length !== 0||2 && birthdayTest[1].length !== 0||2) {
        //     console.log("invalid bday");
        //     return;
        // }
        let self=this;
        var request = new XMLHttpRequest();
        let data=JSON.stringify(this.state);
        // request.open("GET", "http://localhost:9000/randomizer");
         request.open("GET", "/randomizer");
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send();
        request.onload = function() {

             var wishlist = request.response;

             wishlist= JSON.parse(wishlist);
             var month=wishlist.birthday.split('-');
             var day = month[2].split('T')[0]
            self.setState({
                name:wishlist.name,
                birthday:month[1]+'-'+day,
                wishlist_one: wishlist.wishlist_one,
                wishlist_two:'',
            })
        }

        // socket.emit('submitNew', {
        //     message: this.state
        // });

    }



    render () {

    return (
        <div>
        <div className="header">
            <div>Wishlist Randomizer for xxFitness</div>

        </div>

            <div className="random-list-box" style={{textAlign:'center'}}>
                <div className="form" >
                        <div className="return-value">Name:  <div className="value"> {this.state.name} </div></div>


                        <div className="return-value">Birthday: <div className="value"> {this.state.birthday}</div></div>
                        <div className="return-value">Wishlist: <div className="value">  <a style = {{fontSize: '15px'}} href={this.state.wishlist_one}>{this.state.wishlist_one}</a></div></div>
                        <button
                            style={{marginTop:'37px'}}
                            className="button"
                            onClick={() => this.submitForm()}
                        >
                            Get Random
                        </button>
                        <div >
                            <Link to = '/addInfo'>Add your list</Link>
                        </div>
                </div>

            <div>


             </div>
             </div>
        </div>


         )
    }
}

export default Randomizer
