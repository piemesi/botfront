import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import './font.less';

import faker from 'faker';

import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/person';
import Flight from 'material-ui/svg-icons/action/flight-takeoff';

const styles = {
    propContainer: {
        display:'none',
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};


    const tableData = [
{
    id:0,

    ac: 'male',//<Group />,
    region: 'Spain/Lloret de Mar',
    hotel: 'Beach Playa Resort 3*',
    duration: '8н.',
    meal: 'BB',
    dateIn: '20 июня',
    currency: 'rub',
    price: '32500',
    avia: 'plane',
    visa:  'address-card',
    status: 'green'
},
        {
            id:1,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:2,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:3,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:4,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:5,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:6,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },{
            id:7,

            ac: 'male',//<Group />,
            region: 'Spain/Lloret de Mar',
            hotel: 'Beach Playa Resort 3*',
            duration: '8н.',
            meal: 'BB',
            dateIn: '20 июня',
            currency: 'rub',
            price: '32500',
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        },







    ];

    /**
     * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
     */
    export default class InstantSearch extends Component {
    state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: true,
    showRowHover: true,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
        offers:tableData
};

    constructor(){
        super();

   //     setInterval(this.onlineImitate(), 6000);
    };
        componentDidMount () {
            this.timer = setInterval(this.onlineImitate, 30000);
        };

        componentWillUnmount () {
            clearInterval(this.timer);
        };

    onlineImitate = (e) =>  {
        console.log('smth');
        // console.log(this.state.offers);
        let  NewOffers = this.state.offers.concat();

        faker.locale = "ru";
        let newEl = {
            id:NewOffers.length+1,

            ac: 'male',//<Group />,
            region: faker.address.country() + ' / '+faker.address.city(),
            hotel: faker.random.word(),
            duration: faker.random.number() +'н.',
            meal: 'BB',
            dateIn:  faker.random.number()  +' '+faker.date.month(),
            currency: 'rub',
            price: faker.finance.amount(),
            avia: 'plane',
            visa:  'address-card',
            status: 'green'
        };

        console.log(newEl);


        NewOffers.unshift(newEl); //tableData[0]

        if(NewOffers.length >50) {
            return false;
        }
        //
        // let CurrentObj=Object.assign({},tableData[0]);

        console.log(NewOffers);

        // let NewOffers = Object.assign(CurrentObj,this.state.offers);
        // CurrentObj.concat(this.state.offers);
        // {tableData.find(0,...this.state.offers};
        // CurrentObj.concat()



        // console.log(NewOffers);
        this.setState({
           offers: NewOffers
        });

    };

    handleToggle = (event, toggled) => {
    this.setState({
    [event.target.name]: toggled,
});
};

    handleChange = (event) => {
    this.setState({height: event.target.value});
};

    render() {



    return (
    <div>
    <Table
        className="instantOfferTable"
    height={this.state.height}
    fixedHeader={this.state.fixedHeader}
    fixedFooter={this.state.fixedFooter}
    selectable={this.state.selectable}
    multiSelectable={this.state.multiSelectable}
    >
    <TableHeader
    displaySelectAll={this.state.showCheckboxes}
    adjustForCheckbox={this.state.showCheckboxes}
    enableSelectAll={this.state.enableSelectAll}
    >
    <TableRow>
    <TableHeaderColumn colSpan="10" tooltip="Super Header" style={{textAlign: 'center'}}>
    Предложения online
    </TableHeaderColumn>
    </TableRow>
    <TableRow>
    <TableHeaderColumn tooltip="The Name">Pax</TableHeaderColumn>
    <TableHeaderColumn tooltip="The Name"  colSpan="3"  >Регион/Отель/Питание</TableHeaderColumn>
     <TableHeaderColumn tooltip="The Name">Кол-во дней</TableHeaderColumn>

    <TableHeaderColumn tooltip="The Name">Дата заезда</TableHeaderColumn>
    <TableHeaderColumn tooltip="The Name">Цена</TableHeaderColumn>

    <TableHeaderColumn tooltip="The Name">Авиа</TableHeaderColumn>

    <TableHeaderColumn tooltip="The Name">Виза</TableHeaderColumn>


    <TableHeaderColumn tooltip="The Status">Доступность</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody
    displayRowCheckbox={this.state.showCheckboxes}
    deselectOnClickaway={this.state.deselectOnClickaway}
    showRowHover={this.state.showRowHover}
    stripedRows={this.state.stripedRows}
    >
    {this.state.offers.map((row, index) => (
        <TableRow key={index}>
            <TableRowColumn><i className={"fa fa-"+row.ac} aria-hidden="true"></i><i className={"fa fa-"+row.ac} aria-hidden="true"></i></TableRowColumn>
            <TableRowColumn  colSpan="3" >{row.region} / {row.hotel} / {row.meal}</TableRowColumn>

            <TableRowColumn>{row.duration}</TableRowColumn>
             <TableRowColumn>{row.dateIn}</TableRowColumn>

            <TableRowColumn><i className={"fa fa-"+row.currency} aria-hidden="true"></i>{row.price}</TableRowColumn>
            <TableRowColumn><i className={"fa fa-"+row.avia} aria-hidden="true"></i></TableRowColumn>
            <TableRowColumn><i className={"fa fa-"+row.visa} aria-hidden="true"></i></TableRowColumn>
            <TableRowColumn>{row.status}</TableRowColumn>
        </TableRow>
    ))}
    </TableBody>
    <TableFooter
    adjustForCheckbox={this.state.showCheckboxes}
    >
    <TableRow>
    <TableRowColumn>ID</TableRowColumn>
    <TableRowColumn>Name</TableRowColumn>
    <TableRowColumn>Status</TableRowColumn>
    </TableRow>
    <TableRow>
    <TableRowColumn colSpan="10" style={{textAlign: 'center'}}>
    Super Footer
    </TableRowColumn>
    </TableRow>
    </TableFooter>
    </Table>

    <div style={styles.propContainer}>
    <h3>Table Properties</h3>
    <TextField
    floatingLabelText="Table Body Height"
    defaultValue={this.state.height}
    onChange={this.handleChange}
    />
    <Toggle
    name="fixedHeader"
    label="Fixed Header"
    onToggle={this.handleToggle}
    defaultToggled={this.state.fixedHeader}
    />
    <Toggle
    name="fixedFooter"
    label="Fixed Footer"
    onToggle={this.handleToggle}
    defaultToggled={this.state.fixedFooter}
    />
    <Toggle
    name="selectable"
    label="Selectable"
    onToggle={this.handleToggle}
    defaultToggled={this.state.selectable}
    />
    <Toggle
    name="multiSelectable"
    label="Multi-Selectable"
    onToggle={this.handleToggle}
    defaultToggled={this.state.multiSelectable}
    />
    <Toggle
    name="enableSelectAll"
    label="Enable Select All"
    onToggle={this.handleToggle}
    defaultToggled={this.state.enableSelectAll}
    />
    <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
    <Toggle
    name="deselectOnClickaway"
    label="Deselect On Clickaway"
    onToggle={this.handleToggle}
    defaultToggled={this.state.deselectOnClickaway}
    />
    <Toggle
    name="stripedRows"
    label="Stripe Rows"
    onToggle={this.handleToggle}
    defaultToggled={this.state.stripedRows}
    />
    <Toggle
    name="showRowHover"
    label="Show Row Hover"
    onToggle={this.handleToggle}
    defaultToggled={this.state.showRowHover}
    />
    <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
    <Toggle
    name="showCheckboxes"
    label="Show Checkboxes"
    onToggle={this.handleToggle}
    defaultToggled={this.state.showCheckboxes}
    />
    </div>
    </div>
    );
}
}