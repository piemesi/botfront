import React, {Component} from 'react';
import ReactQuill from 'react-quill'
class EditBody extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.quillRef = null;
        this.modules = {
            toolbar: [
                [{'header': [1, 2, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        },

            this.formats = [
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
            ],


            // super(props)
        this.state = {text: this.props.text || '' }
    }


    handleChange = (value) => {
        this.setState({text: value})
        // this.quillRef.insertText(position, 'Hello, World! ')
    }


    render() {
        return (
            <div >
                <ReactQuill

                    ref={(el) => {
                        this.reactQuillRef = el
                    }}


                    modules={this.modules}
                    formats={this.formats}
                    theme="snow" value={this.state.text}
                    onChange={this.handleChange}/>

            </div>
        )
    }
}

export default EditBody