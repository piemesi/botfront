
import React  from 'react';

import './calendarpicker.scss'

import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import ruRU from 'rc-calendar/lib/locale/ru_RU';

import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/ru';
const format = 'YYYY-MM-DD HH:mm'; //:ss
const now = moment();
now.locale('ru').utcOffset(3);
function getFormat(time) {
    return time ? format : 'YYYY-MM-DD';
}
const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');
// function disabledTime(date) {
//     console.log('disabledTime', date);
//     if (date && (date.date() === 15)) {
//         return {
//             disabledHours() {
//                 return [3, 4];
//             },
//         };
//     }
//     return {
//         disabledHours() {
//             return [1, 2];
//         },
//     };
// }

function disabledDate(current) {
    if (!current) {
        // allow empty select
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();  // can not select days before today
}
const Test = React.createClass({
    propTypes: {
        defaultValue: React.PropTypes.object,
        defaultCalendarValue: React.PropTypes.object,
    },

    getInitialState() {
        return {
            showTime: true,
            showDateInput: true,
            disabled: false,
            value: this.props.defaultValue,
            working: false

        };
    },

    onChange(value) {
        console.log('DatePicker change: ', (value && value.format(format)));
        this.setState({
            value,
        });
    },

    // onShowTimeChange(e) {
    //     this.setState({
    //         showTime: e.target.checked,
    //     });
    // },

    // onShowDateInputChange(e) {
    //     this.setState({
    //         showDateInput: e.target.checked,
    //     });
    // },

    // toggleDisabled() {
    //     this.setState({
    //         disabled: !this.state.disabled,
    //     });
    // },


    handleClick() {
        if(this.state.body.trim() == '') return;
        this.setState({ working: true });

        let self = this,
            data = new FormData();

        data.append('body', self.state.body); // append the text to our FormData

        fetch(API_URL+"/todos/store", {
            method: 'post',
            body: data
        }).then((response) => {
            response.json().then((jsonReponse) => {
                if(jsonReponse.success) {
                    self.props.onTodoStore(jsonReponse.todo); // call onTodoStore
                    self.setState({ body: '' }); // empty our text input
                    this.setState({ working: false });
                }
            })
        });
    },

    render() {


        const timePickerElement = <TimePickerPanel showSecond={false} disabledSeconds={()=>false} defaultValue={moment(this.props.settedTime || '19:00:00', 'HH:mm')} />;


        let loading = this.state.working ? 'loading' : '';
        const state = this.state;
        const calendar = (<Calendar
            locale={ruRU}
            style={{ zIndex: 1800 }}
            dateInputPlaceholder="date of post"
            formatter={getFormat(state.showTime)}
            // disabledTime={state.showTime ? disabledTime : null}
            timePicker={state.showTime ? timePickerElement : null}
            defaultValue={this.props.defaultCalendarValue}
            showDateInput={state.showDateInput}
            disabledDate={disabledDate}
        />);
        return (<div style={{ width: 400, margin: 20, zIndex: 1600 }}>
            {/*<div style={{ marginBottom: 10 }}>*/}
                {/*<label>*/}
                    {/*<input*/}
                        {/*type="checkbox"*/}
                        {/*checked={state.showTime}*/}
                        {/*onChange={this.onShowTimeChange}*/}
                    {/*/>*/}
                    {/*showTime*/}
                {/*</label>*/}
                {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {/*<label>*/}
                    {/*<input*/}
                        {/*type="checkbox"*/}
                        {/*checked={state.showDateInput}*/}
                        {/*onChange={this.onShowDateInputChange}*/}
                    {/*/>*/}
                    {/*showDateInput*/}
                {/*</label>*/}
                {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {/*<label>*/}
                    {/*<input*/}
                        {/*checked={state.disabled}*/}
                        {/*onChange={this.toggleDisabled}*/}
                        {/*type="checkbox"*/}
                    {/*/>*/}
                    {/*disabled*/}
                {/*</label>*/}
            {/*</div>*/}
            <div style={{
                boxSizing: 'border-box',
                position: 'relative',
                display: 'block',
                lineHeight: 1.5,
                marginBottom: 22,
            }}
            >
                <DatePicker
                    animation="slide-up"
                    disabled={state.disabled}
                    calendar={calendar}
                    value={state.value}
                    onChange={this.onChange}
                    style={{zIndex:1600}}
                >
                    {
                        ({ value }) => {
                            return (
                                <span tabIndex="0">
                <input
                    placeholder="please select"
                    style={{ width: 250 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={value && value.format(getFormat(state.showTime)) || ''}
                />

                                     {/*<button className={`ui button blue ${loading}`} onClick={this.handleClick.bind(this)}>*/}
                    {/*<i className="plus icon"></i> Create*/}
                {/*</button>*/}
                </span>
                            );
                        }
                    }
                </DatePicker>
            </div>
        </div>);
    },
});

function onStandaloneSelect(value) {
    console.log('onStandaloneSelect');
    console.log(value && value.format(format));
}

function onStandaloneChange(value) {
    console.log('onStandaloneChange');
    console.log(value && value.format(format));
}

//
// (<div
//     style={{
//         zIndex: 1000,
//         position: 'relative',
//         width: 900,
//         margin: '20px auto',
//     }}
// >
//     <div>
//         <div style={{ margin: 10 }}>
//             <Calendar
//                 showWeekNumber={false}
//                 locale={cn ? zhCN : enUS}
//                 defaultValue={now}
//                 disabledTime={disabledTime}
//                 showToday
//                 formatter={getFormat(true)}
//                 showOk={false}
//                 timePicker={timePickerElement}
//                 onChange={onStandaloneChange}
//                 disabledDate={disabledDate}
//                 onSelect={onStandaloneSelect}
//             />
//         </div>
//         <div style={{ float: 'left', width: 300 }}>
//             <Test defaultValue={now} />
//         </div>
//         <div style={{ float: 'right', width: 300 }}>
//             <Test defaultCalendarValue={defaultCalendarValue} />
//         </div>
//         <div style={{ clear: 'both' }}></div>
//     </div>
// </div>)

export default Test;