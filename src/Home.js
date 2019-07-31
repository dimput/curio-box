import React, { Component } from 'react';
import logo from './logo.jpeg';
// import isi from './ISI.jpg';
import bg from './bg.jpg';
import _ from "lodash";
import { connect } from "react-redux";
import * as actions from "./actions";
// import { Link } from 'react-router-dom';
import './App.css';
import { Modal, Button, Row } from 'react-materialize';
import ImageModel from './ImageModel';
// import {Layer, Rect, Stage, Group} from 'react-konva';

// function App() {
//   
//   return (
//     
//   );
// }
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.hello = this.hello.bind(this);
    this.onloadImage = this.onloadImage.bind(this);
  }

  renderToDos() {
    console.log("babiiii")
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
      console.log("asuuuuuasuuu");
      return <ImageModel key={key} todoId={key} todo={value}/>;
    });
    console.log(toDos);
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    if(toDos==null){
      return (
        <div>
            Please Wait . . .
        </div>
      );
    }
  }
  componentWillMount() {
    this.props.fetchToDos();
    // console.log("asuuuuuu")
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  onloadImage() {
    console.log(this.state.imagePreviewUrl)
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);

    var background = new Image();
    var gambar = new Image();
    background.src = bg
    gambar.src = this.state.imagePreviewUrl
    background.onload = function () {
      ctx.drawImage(background, 0, 0, 700, 500);
      ctx.drawImage(gambar, 250, 100, 200, 300);
    }
  }


  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);

  }

  hello() {
    console.log("asu");
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{ width: "200px", height: "300px" }} alt="" />);
    }
    const trigger = <Button>Order</Button>;
    const upload = <Button>upload</Button>;
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Modal
            header="Upload Image"
            trigger={trigger}
            options={{ onCloseEnd: this.hello }}
          >
            <form action="#" onSubmit={this._handleSubmit}>
              (size 200x300)
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={this._handleImageChange} required />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </form>
            {$imagePreview}
            <br />
            {/* <Button waves="light" style={{marginRight: '5px'}} onClick={this._handleSubmit}>
              Upload Image
            </Button> */}
            <Modal
              header="Hasil Image"
              trigger={upload}
              options={{ onOpenStart: this.onloadImage }}
            >
              <canvas ref="canvas" width={700} height={500} />
            </Modal>
          </Modal>
          <Row style={{width:"90%"}}>
          {this.renderToDos()}
          </Row>
        </header>
      </div>
    )
  }

}
const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Home);