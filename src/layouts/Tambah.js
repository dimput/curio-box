import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.jpeg';
import { Button, Modal } from 'react-materialize';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { storage } from '../config/storageku';
import { connect } from "react-redux";

class Tambah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: '',
            namaGambar: '',
            judul: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleJudulChange = this._handleJudulChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        // TODO: do something with -> this.state.file
        console.log("wow");
        const { namaGambar, judul } = this.state;
        const { addToDo } = this.props;
        this.handleUpload();

        addToDo({
            judul: judul,
            image: namaGambar
        });
        this.setState({ judul: "", namaGambar: "" });
    }
    handleUpload(e) {
        const { file, namaGambar } = this.state;

        console.log(namaGambar);
        const uploadTask = storage.ref(`images/${namaGambar}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log("upload gagal");
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(namaGambar).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                })
            });
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

        var rand = function () {
            return Math.random().toString(36).substr(2); // remove `0.`
        };

        var token = function () {
            return rand() + rand(); // to make it longer
        };

        var namaGambar = token();
        console.log(namaGambar);
        this.setState({
            namaGambar: namaGambar
        })

    }

    _handleJudulChange(e) {
        e.preventDefault();
        this.setState({
            judul: e.target.value 
        });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{ width: "100%" }} alt="" />);
        }
        const welcome = <Button>Welcome</Button>;
        return (
            <div className="App">
                <header className="App-header">
                    <Link to=".">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <Modal
                        header="Hasil Image"
                        trigger={welcome}
                    >
                        <form action="#" onSubmit={this._handleSubmit}>
                            <div className="file-field input-field">
                                <input id="judul" type="text" className="validate" onChange={this._handleJudulChange} required/>
                                <label htmlFor="judul">Judul</label>
                            </div>
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
                            <Button waves="light" style={{ marginRight: '5px' }} onClick={this._handleSubmit}>
                                Upload Image
                    </Button>
                    </Modal>
                </header>
            </div>
                )
            }
        }
const mapStateToProps = ({data}) => {
    return {
                    data
                };
            };
            
export default connect(mapStateToProps, actions)(Tambah);