import React from 'react';
// import DatePicker from 'react-datepicker';
  import moment from 'moment';
import {SingleDatePicker,DayPickerRangeController, DateRangePicker} from 'react-dates'; //DateRangePicker,  DateRangePickerWrapper,
import omit from 'lodash.omit';
import momentPropTypes from 'react-moment-proptypes';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from 'react-dates/constants';
// import DateRangePicker from 'react-dates/src/components/DateRangePicker';
// import { DateRangePickerPhrases } from 'react-dates/src/defaultPhrases';
import DateRangePickerShape from 'react-dates/src/shapes/DateRangePickerShape';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
// import 'react-dates/lib/css/_datepicker.css';
import PropTypes from 'prop-types'

//
const propTypes = {
    // example props for the demo
    autoFocus: PropTypes.bool,
    autoFocusEndDate: PropTypes.bool,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj,

    ...omit(DateRangePickerShape, [
        'startDate',
        'endDate',
        'onDatesChange',
        'focusedInput',
        'onFocusChange',
    ]),
};

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,

    // input related props
    startDateId: START_DATE,
    startDatePlaceholderText: 'Start Date',
    endDateId: END_DATE,
    endDatePlaceholderText: 'End Date',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDates: false,
    showDefaultInputIcon: false,
    customInputIcon: null,
    customArrowIcon: null,
    customCloseIcon: null,

    // calendar presentation and interaction related props
    renderMonth: null,
    orientation: HORIZONTAL_ORIENTATION,
    anchorDirection: ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // day presentation and interaction related props
    renderDay: null,
    minimumNights: 1,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,

    // internationalization
    displayFormat: () => moment.localeData().longDateFormat('L'),
    monthFormat: 'MMMM YYYY',
    // phrases: DateRangePickerPhrases,
};
class DatePeriod extends React.Component {


    constructor(props) {
        super(props)
        moment.locale('ru')
        // this.state = {
        //     startDate: moment()
        // };
        // this.handleChange = this.handleChange.bind(this);


        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }

        this.state = {
            focusedInput,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }
    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }
    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;

        // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
        // example wrapper but are not props on the SingleDatePicker itself and
        // thus, have to be omitted.
        const props = omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
        ]);

        return (
            <div className="date-range-div">
                <DateRangePicker

                    {...props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />

            </div>
        )
    }
}


// DatePeriod.propTypes = propTypes;
DatePeriod.defaultProps = defaultProps;

export default DatePeriod;


// {/*<DatePicker*/}
// {/*selected={this.state.startDate}*/}
// {/*selectsStart*/}
// {/*startDate={this.state.startDate}*/}
// {/*endDate={this.state.endDate}*/}
// {/*onChange={this.handleChangeStart}*/}
// {/*/>*/}
//
// {/*<DatePicker*/}
// {/*selected={this.state.endDate}*/}
// {/*selectsEnd*/}
// {/*startDate={this.state.startDate}*/}
// {/*endDate={this.state.endDate}*/}
// {/*onChange={this.handleChangeEnd}*/}
// {/*/>*/}