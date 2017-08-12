import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import io from 'socket.io-client'



class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            birthday:'',
            wishlist_one:''
        };
                this.handleChangeName=this.handleChangeName.bind(this);
                this.handleChangeBirth=this.handleChangeBirth.bind(this);
                this.handleChangeWish=this.handleChangeWish.bind(this);
                this.submitForm=this.submitForm.bind(this);
                // this.clearState=this.clearState.bind(this);

    }

    submitForm(){
        let date=this.state.birthday.split('-');
        if(date.length !==2 ){
            this.setState({
                error:'Invalid Date Entry',
            })
            return;
        }

        if (Number(date[0])>12){
            this.setState({
                error:'Invalid Date Entry',
            })
            return;
        }
        if (Number(date[1])>31){
            this.setState({
                error:'Invalid Date Entry',
            })
            return;
        }
        if(this.state.name.length <2 || this.state.wishlist_one.lenght <2){
            this.setState({
                error:'Please complete the form',
            })
            return;
        }
        var self = this;
        var request = new XMLHttpRequest();
        let data=JSON.stringify(this.state);
        // request.open("POST", "http://localhost:9000/updatePositions");
        request.open("POST", "/updatePositions");
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(data);
        request.onload = function() {

            if (request.status=="200") {
                f();
            }else{
                g();
            }
        }
        function g(){
            self.setState({
                name:'',
                birthday:'',
                wishlist_one:'',
                error:'Something went wrong.',
                success:false
            })
        }
        function f(){
            self.setState({
                name:'',
                birthday:'',
                wishlist_one:'',
                error:'',
                success:true
            })
        }

    }
    handleChangeName(e){

            let name = e.target.name;
            let value = e.target.value;


                this.setState({
                    name:value
                })

        };
        handleChangeBirth(e){

                let name = e.target.name;
                let value = e.target.value;

                    this.setState({
                        birthday:value
                    })
            };
            handleChangeWish(e){

                    let name = e.target.name;
                    let value = e.target.value;

                this.setState({
                    wishlist_one:value
                })
                };
    render () {

        const success=(
            <div className="random-list-box" style={{textAlign:'center'}}>
            <div className="form" style={{color:'white'}}>Success          <div >
            <div style={{marginTop:'75px'}}>
                         <Link style={{marginTop:'75px'}} to = '/randomlist'>Now get a random wishlist!</Link>
                         </div>
                     </div></div>
            </div>
        )
        const error=(
            <div style={{color:'red', fontSize:'11px', marginBottom:'-10px'}}> {this.state.error} </div>
        )
        const entry=(
            <div className="random-list-box" style={{textAlign:'center'}}>
            <div className="form" >
                <div> </div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"

                                 field="asset_name"
                                 placeholder="Name:"
                                 value={this.state.name}
                                 onChange={this.handleChangeName}
                 />
                 <div>  </div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"

                                 field="asset_name"
                                 placeholder="Birthday: (Must enter in MM-DD format)"
                                 value={this.state.birthday}
                                 onChange={this.handleChangeBirth}
                 />
                 <div>  </div>
                 <input type="text"
                                 inputId="define-rooms-input"
                                 labelId="define-rooms-label"

                                 field="asset_name"
                                 placeholder="Wishlist Address"
                                 value={this.state.wishlist_one}
                                onChange={this.handleChangeWish}
                 />

                 {
                     this.state.error ? error : null
                }

             <button
                 className="button"
                  onClick={() => this.submitForm()}

             >
                 Submit
             </button>

             <div >
                 <Link to = '/randomlist'>Or get a random wishlist</Link>
             </div>
                  </div>

            </div>

        )
    return (

            <div>
            <div className="header">
                <div>Wishlist Randomizer for xxFitness</div>
                </div>
                {
                    this.state.success ? success : entry
               }
            </div>




         )
    }
}

export default AddInfo
