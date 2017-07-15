import React, {Component} from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import * as colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import  FA from 'react-fontawesome';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SaveBtn from 'material-ui/svg-icons/content/save';
//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
const style = {
    btnAdd: {
        marginLeft: '20px'
    },
    flexDivStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "flex-end"
    },
    calendarInput: {
        margin: '0',
        maxWidth: '200px'

    }
}


import _ from 'lodash'

import EditBody from '../Add/EditBody'


import moment from 'moment';
import 'moment/locale/ru';





import IconButton from 'material-ui/IconButton';
import DateTimePicker from '../../containers/Pages/DateTimeSelect'


import ContentRemove from 'material-ui/svg-icons/content/remove';

class UpdatePage extends Component {

    constructor(props, context) {
        super(props, context)

        let {material} = this.props

        this.dates = [];
        this.periodsLast = 0;
        this.state = {
            header: material.title,
            data: null,
            days: null,
            daysArrRender: null,

        };





    }


    addPeriod = () => {

        let daysArr = this.state.days;
        let daysArrRender = this.state.daysRender;
        this.periodsLast = this.periodsLast+1;
        let keyK = `periods_` + this.periodsLast;
        let itemK = this.periodsLast;


        console.log('EEEEEE',this.periodsLast)

        daysArr.push(
            this.makeDaysItem(keyK, itemK))

        daysArrRender.push(
            <div className="daysRenderItem">
                {this.makeDaysItem(keyK, itemK)}
                {this.makeIconDaysDeleteBtn(itemK)}
            </div>
        )

        this.setState({
            days: daysArr,
            daysRender: daysArrRender
        })

    }




    removeDayItem = (item) => {

        let days = this.state.days
        let daysRender = this.state.daysRender

        this.setState({
            days: _.slice(days,item,item+1),
            daysRender: _.slice(daysRender,item,item+1),
        })


    }



    makeDaysItem = (key, i, value) => {

        let v = new Date(value)
        const dateValue = moment(value);
        dateValue.locale('ru').utcOffset(3);
        return <DateTimePicker style={{width: '200px', 'margin': '5px'}}

                               value={dateValue}
                               defaultValue={dateValue}

                               key={key}
                               ref={(r) => this.dates[i] = r}

        />
    }

    componentWillMount = () => {

        let days = [];
        let daysRender = [];




        this.props.material.periods.map((mper,item)=>{




            let keyK = `periods_` + this.periodsLast  ;
            let itemK = this.periodsLast;

            days.push(
                this.makeDaysItem(keyK, itemK, mper.start))

            daysRender.push(
                <div className="daysRenderItem">
                    {this.makeDaysItem(keyK, itemK, mper.start)}
                    {this.makeIconDaysDeleteBtn(itemK)}
                </div>
            )

            this.periodsLast++;
        })





        this.setState({
            days,
            daysRender
        })


    }


    _handleTextFieldChange = (e) => {


        this.setState({
            header: e.target.value,
            data: {...this.state.data, header: e.target.value}
        });
    };

    saveData() {


        console.log('reactQuillRef', this.reactQuillRef)
        console.log('reactQuillRef2', this.reactQuillRef.state.text)

        fetch("http://telegram.b:84/get_posts", {method: 'get'}).then((response) => {
            response.json().then((jsonReponse) => {
                if (jsonReponse.success) {
                    self.props.onTodoStore(jsonReponse.todo); // call onTodoStore
                    self.setState({body: ''}); // empty our text input
                    this.setState({working: false});
                }
            })
        });





        if (this.state.header.length < 2) {
            this.setState({
                headerErr: 'Please set header'
            })
            return false;
        }

        if (this.state.days.length < 1) {
            this.setState({
                headerErr: 'Please set dates of post publishing'
            })
            return false;
        }

        console.log('state', this.state)

        let {data} = this.state




        console.log("DATES are:", this.dates)

        let dates = [];
        this.dates.map((m) => {

            if(m && m.state.value){
                console.log('dates:', m.state.value.toString())
                dates.push(m.state.value.toString())
            }

        })

        if(dates.length <1) {
            this.setState({
                headerErr: 'Please set dates of post publishing'
            })
            return false;
        }





        let material = {...this.props.material,
            periods:dates,
            title:this.state.header,
            text:this.reactQuillRef.state.text
        }
        console.log('data', material);
       this.props.updateMaterial(material, material.id, true)

        this.props.closeBtn()

    }

    makeIconDaysDeleteBtn = (i) => {
        return <IconButton onClick={() => this.removeDayItem(i)}>
            <ContentRemove />
        </IconButton>
    }

    render() {
        return ( <div >
            <TextField
                hintText="Заголовок"
                fullWidth={true}
                onChange={this._handleTextFieldChange.bind()}
                value={this.state.header || ''}
                errorText={this.state.headerErr || ''}

            />

            <EditBody text={this.props.material.text} ref={(el) => {
                this.reactQuillRef = el
            }}
            />


            <div style={style.flexDivStyle}>
                <div className="datesInputs">
                    {this.state.daysRender.map((d) => d)}
                </div>
                <FloatingActionButton mini={true} style={style.btnAdd}
                                      onClick={this.addPeriod}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>


            <RaisedButton label="Save" ref={(r)=>this.saveBtn=r} onClick={this.saveData.bind(this)} rippleStyle={{
                color: this.props.muiTheme.palette.primary1Color,
                backgroundColor: this.props.muiTheme.palette.canvasColor
            }}
                          fullWidth={true}
                // overlayStyle={{marginBottom: 10}}
                          style={{
                              backgroundColor: this.props.muiTheme.palette.canvasColor,
                              color: colors.white,
                              marginBottom: 10
                          }}
                          primary={true} icon={<SaveBtn/>}/>

        </div> )
    }

}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMaterial: bindActionCreators(actions.updateMaterial, dispatch)
    }
}


const withMui = muiThemeable()(UpdatePage);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)


