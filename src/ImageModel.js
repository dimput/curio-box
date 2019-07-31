import React, { Component } from "react";
import { connect } from "react-redux";
import {storage} from './config/storageku';
import {Button, Col} from 'react-materialize';
import {Link} from 'react-router-dom';

class ImageModel extends Component {
  state = {
    image: "",
    key:""
  }

  componentDidMount(){
    const { todo,todoId } = this.props;
    storage.ref('images').child(todo.image).getDownloadURL().then(url => {
      console.log(url);
      console.log(todoId);
      this.setState({
        image:url,
        key:"edit/"+todoId
      });
    });
  }

  render() {
    const { todo } = this.props;
    return (
      // <div className="col s6 m3" onClick={this.handleClick}>
      //       <div class="card">
      //           <div class="card-image" style={{height:"200px"}}>
      //             <img class="circle" src={this.state.image} alt=""/>
      //           </div>
      //           <div class="card-content">
      //               <p className="truncate" style={{width:"150px",fontWeight:"900",textAlign:"center",color:"#000"}}>{todo.judul}</p>
      //               <p className="truncate" style={{width:"150px",fontWeight:"900",textAlign:"center"}}>{todo.superPower}</p>
      //           </div>
      //       </div>
      //   </div>
      <div>
        <Col m={2} s={12}>
            <div class="card">
              <div class="card-image" style={{height:"200px"}}>
                <img src={this.state.image} style={{margin:"auto auto"}} alt=""/>
              </div>
              <div class="card-action">
                <div className="card-title truncate" style={{color:"#000",fontSize:"18px"}}>{todo.judul}</div>
                <Button><Link to={this.state.key} style={{margin:"0 auto",color:"#fff"}}>Edit</Link></Button>
              </div>
            </div>
            </Col>
      </div>
    );
  }
}

export default connect(null)(ImageModel);