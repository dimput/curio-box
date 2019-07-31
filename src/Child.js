import React, { Component } from 'react';
// import { connect } from "react-redux";
import { storage } from './config/storageku';
import axios from 'axios';
import { Col, Button } from 'react-materialize';
import Row from 'react-materialize/lib/Row';

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            gambar: [],
            url: "",
            imagePreviewUrl: ""
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this.editGambar = this.editGambar.bind(this);
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

    editGambar() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0, 0, 100, 100);

        var jarak_kiri = 0;
        var jarak_atas = 0;
        var lebar = 0;
        var tinggi = 0;
        // Input
        jarak_kiri = 38
        jarak_atas = 14;
        lebar = 85;
        tinggi = 107;

        var background = new Image();
        var gambar = new Image();
        background.src = this.state.url
        console.log("asuu : " + background.src);
        gambar.src = this.state.imagePreviewUrl;
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 200, 200);
            ctx.drawImage(gambar, jarak_kiri, jarak_atas, lebar, tinggi);
        }
    }

    download() {
        
        console.log("download ...");
    }

    componentDidMount() {
        const { match } = this.props;
        axios.get('https://curio-box.firebaseio.com/gambar/' + match.params.id + '.json')
            .then(res => {
                const gambar = res.data;
                console.log(gambar);
                this.setState({ gambar });
            })
            .then(res => {
                console.log("asu" + this.state.gambar.image);
                storage.ref('images').child(this.state.gambar.image).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({
                        url: url
                    });
                });
            })
    }
    render() {
        // const {match} = this.props;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = imagePreviewUrl;
        }
        const hasil = $imagePreview ? this.editGambar() : "kosong";
        return (
            <div>
                <nav>
                    <div class="nav-wrapper">
                        <a href="." class="brand-logo center">Curio Box</a>
                    </div>
                </nav>
                {/* <h3>ID: {match.params.id}</h3> */}
                <div className="container">
                    <h3>
                        {this.state.gambar.judul}
                    </h3>
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
                    <Row>
                        <Col m={3}>
                            <h5>Wallpaper</h5>
                            <div style={{ width: "100%" }}>
                                <img src={this.state.url} alt="" style={{ width: "100%" }} />
                            </div>
                        </Col>
                        <Col m={1}>
                            <h5 style={{ textAlign: "center" }}>+</h5>
                        </Col>
                        <Col m={3}>
                            <h5>Custom Pict</h5>
                            <div style={{ width: "100%" }}>
                                <img src={$imagePreview} alt="" style={{ width: "100%" }} />
                            </div>
                        </Col>
                        <Col m={1}>
                            <h5 style={{ textAlign: "center" }}>=</h5>
                        </Col>
                        <Col m={3}>
                            <h5>Preview</h5>
                            <div style={{ width: "100%" }}>
                                {hasil}
                                <canvas ref="canvas" width={200} height={200} />
                                {/* <canvas ref="canvas" width={700} height={500} /> */}

                                {/* <img src={$hasilEditku} alt="" style={{ width: "100%" }} /> */}
                            </div>
                            <Button onClick={this.download}>Download</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default Child